document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const timerDisplay = document.getElementById("timerDisplay");
    const breakTime = "It's time to take a break!";
    const workTime = "It's time to get back to work!";

    startButton.addEventListener("click", function (e) {
        e.preventDefault();
        const workHours =
            parseInt(document.getElementById("wHours").value) || 0;
        const workMinutes =
            parseInt(document.getElementById("wMinutes").value) || 0;
        const breakHours =
            parseInt(document.getElementById("bHours").value) || 0;
        const breakMinutes =
            parseInt(document.getElementById("bMinutes").value) || 0;
        const repeat = parseInt(document.getElementById("repeat").value) || 0;

        totalWorkTime = workHours * 3600 + workMinutes * 60;
        totalBreakTime = breakHours * 3600 + breakMinutes * 60;

        chrome.runtime.sendMessage({
            action: "startTimer",
            totalWorkTime,
            totalBreakTime,
            repeat,
        });
        //let i = 0;
        //do {
        //    timer(workHours, workMinutes, breakTime);
        //timer(breakHours, breakMinutes, workTime);
        //    i++;
        //} while (i < repeat);
    });

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "updateTimer") {
            const currentTime = request.currentTime;
            updateTimer(currentTime);
        }
    });

    // Update time display on popup
    function updateTimer(currentTime) {
        const hours = Math.floor(currentTime / 3600);
        const minutes = Math.floor((currentTime % 3600) / 60);
        const seconds = currentTime % 60;
        timerDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;
    }

    function timer(hours, minutes, timesUp) {
        const countdown = setInterval(() => {
            totalTime--;
            const hours = Math.floor(totalTime / 3600);
            const minutes = Math.floor((totalTime % 3600) / 60);
            const seconds = totalTime % 60;
            timerDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;
            console.log("Test timer");

            if (totalTime <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = timesUp;
            }
        }, 1000);
        return countdown;
    }
});
