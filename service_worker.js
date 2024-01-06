// Setting default variables
let timerIntervalId;
let isPaused = false;
let isStopped = false;
let timerTitle = `Work Timer`;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "startTimer") {
        // Get timer variables from popup.js
        const totalWorkTime = request.totalWorkTime;
        const totalBreakTime = request.totalBreakTime;
        const repeat = request.repeat;
        isStopped = false;

        // Clear interval if it is already running
        if (timerIntervalId) {
            clearInterval(timerIntervalId);
        }
        //Set the repeat count to 0
        let repeatCount = 0;
        function repeatTimer() {
            startTimer(totalWorkTime, totalBreakTime);
            repeatCount++;
            console.log("repeatCount: " + repeatCount);
            console.log("repeat" + repeat);

            if (repeatCount < repeat) {
                setTimeout(
                    repeatTimer,
                    (totalWorkTime + totalBreakTime) * 1000
                );
            }
        }

        repeatTimer();
    } else if (request.action === "pauseTimer") {
        isPaused = !isPaused;
    } else if (request.action === "stopTimer") {
        isStopped = true;
    }
});

// Start Timer Function
function startTimer(workTime, breakTime) {
    var currentTime = workTime;
    timerTitle = `Work Timer`;

    // Work Timer
    var intervalId = setInterval(() => {
        if (isPaused) {
            return;
        }
        if (isStopped) {
            clearInterval(intervalId);
            return;
        }
        currentTime--;
        // Break timer
        if (currentTime <= 0) {
            clearInterval(intervalId);
            showNotification(`Time to take a break!`);
            currentTime = breakTime;
            timerTitle = `Break Timer`;
            intervalId = setInterval(() => {
                if (isPaused) {
                    return;
                }
                if (isStopped) {
                    clearInterval(intervalId);
                    return;
                }
                currentTime--;
                if (currentTime <= 0) {
                    clearInterval(intervalId);
                    showNotification(`Time to get back to work!`);
                }
                // Sends message back to update timer
                chrome.runtime.sendMessage({
                    action: "updateTimer",
                    currentTime,
                });
                // Sends message back to update timer title
                chrome.runtime.sendMessage({
                    action: "timerTitle",
                    timerTitle,
                });
            }, 1000); // End of Break Timer
        }
        // Sends message back to update timer
        chrome.runtime.sendMessage({
            action: "updateTimer",
            currentTime,
        });
        // Sends message back to update timer title
        chrome.runtime.sendMessage({
            action: "timerTitle",
            timerTitle,
        });
    }, 1000);

    return intervalId;
}

// Show notification function

function showNotification(message) {
    chrome.notifications.create("", {
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Task:Timer",
        message: message,
    });
}
