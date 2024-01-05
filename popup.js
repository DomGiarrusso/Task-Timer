document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const pauseButton = document.getElementById("pauseButton");
    const stopButton = document.getElementById("stopButton");
    const timerTitle = document.getElementById("timerTitle");
    const timerDisplay = document.getElementById("timerDisplay");

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
            workHours,
            workMinutes,
            breakHours,
            breakMinutes,
            repeat,
        });
    });

    pauseButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Send message to service worker
        chrome.runtime.sendMessage({
            action: "pauseTimer",
        });
        // Change the button text
        if (pauseButton.textContent === "Pause") {
            pauseButton.textContent = "Play";
        } else {
            pauseButton.textContent = "Pause";
        }
    });

    stopButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Send message to service worker
        chrome.runtime.sendMessage({
            action: "stopTimer",
        });

        //Reset the timer
        timerDisplay.textContent = "00h:00m:00s";
    });

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "updateTimer") {
            const currentTime = request.currentTime;
            updateTimer(currentTime);
        }
    });
    // Update timer title
    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "timerTitle") {
            const currentTimer = request.timerTitle;
            timerTitle.textContent = currentTimer;
        }
    });

    // Update time display on popup
    function updateTimer(currentTime) {
        let hours = Math.floor(currentTime / 3600);
        let minutes = Math.floor((currentTime % 3600) / 60);
        let seconds = currentTime % 60;
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        timerDisplay.textContent = `${hours}h:${minutes}m:${seconds}s`;
    }
});
