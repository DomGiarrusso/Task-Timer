let timerIntervalId;
let isPaused = false;
let isStopped = false;

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

function startTimer(workTime, breakTime) {
    var currentTime = workTime;

    var intervalId = setInterval(() => {
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
            currentTime = breakTime;
            intervalId = setInterval(() => {
                currentTime--;
                if (currentTime <= 0) {
                    clearInterval(intervalId);
                }
                chrome.runtime.sendMessage({
                    action: "updateTimer",
                    currentTime,
                });
            }, 1000);
        }
        chrome.runtime.sendMessage({
            action: "updateTimer",
            currentTime,
        });
    }, 1000);

    return intervalId;
}
