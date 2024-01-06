document.addEventListener("DOMContentLoaded", function () {
    // Get the elements from the DOM
    const startButton = document.getElementById("startButton");
    const pauseButton = document.getElementById("pauseButton");
    const stopButton = document.getElementById("stopButton");
    const timerTitle = document.getElementById("timerTitle");
    const timerDisplay = document.getElementById("timerDisplay");

    // Start Button function
    startButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the values from the input fields
        const workHoursInput = document.getElementById("wHours").value;
        const workMinutesInput = document.getElementById("wMinutes").value;
        const breakHoursInput = document.getElementById("bHours").value;
        const breakMinutesInput = document.getElementById("bMinutes").value;

        // Convert the input values to numbers
        const workHours = parseInt(workHoursInput) || 0;
        const workMinutes = parseInt(workMinutesInput) || 0;
        const breakHours = parseInt(breakHoursInput) || 0;
        const breakMinutes = parseInt(breakMinutesInput) || 0;
        const repeat = parseInt(document.getElementById("repeat").value) || 0;

        //Error Handling Input Fields
        if (workHoursInput === "") {
            if (workMinutesInput === "") {
                console.log(
                    "Please fill in at least one field for Work Timer Control"
                );

                let errorWorkText = document.getElementById("errorWorkText");

                // Set the text element to visible
                errorWorkText.style.display = "block";

                // Set to time out for certain amount of seconds
                setTimeout(function () {
                    // Set text back to hidden
                    errorWorkText.style.display = "none";
                }, 5000); // 5000 ms = 5 seconds
                return;
            }
        }
        if (breakHoursInput === "") {
            if (breakMinutesInput === "") {
                console.log(
                    "Please fill in at least one field for Break Timer Control"
                );

                let errorBreakText = document.getElementById("errorBreakText");

                // Set the text element to visible
                errorBreakText.style.display = "block";

                // Set to time out for certain amount of seconds
                setTimeout(function () {
                    // Set text back to hidden
                    errorBreakText.style.display = "none";
                }, 5000); // 5000 ms = 5 seconds
                return;
            }
        }
        // Calculate total times in seconds
        totalWorkTime = workHours * 3600 + workMinutes * 60;
        totalBreakTime = breakHours * 3600 + breakMinutes * 60;

        // Send message to service worker
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

    // Pause Button function
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

    // Stop Button function
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
