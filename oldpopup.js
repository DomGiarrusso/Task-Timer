document.addEventListener("DOMContentLoaded", function () {
    const timerForm = document.getElementById("timerForm");
    const timerDisplay = document.getElementById("timerDisplay");
    let activeTimer = null;
    let countdownInterval = null;

    timerForm.addEventListener("startButton", function (e) {
        e.preventDefault();
        const workHours =
            parseInt(document.getElementById("wHours").value) || 0;
        const workMinutes =
            parseInt(document.getElementById("wMinutes").value) || 0;
        const breakHours =
            parseInt(document.getElementById("bHours").value) || 0;
        const breakMinutes =
            parseInt(document.getElementById("bMinutes").value) || 0;

        startTimer(workHours, workMinutes, breakHours, breakMinutes);
    });

    function startTimer(workHours, workMinutes, breakHours, breakMinutes) {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        const workTotalTime = workHours * 60 + workMinutes;
        const breakTotalTime = breakHours * 60 + breakMinutes;
        let remainingTime = workTotalTime;
        let timerName = "Work Timer";

        countdownInterval = setInterval(() => {
            const hours = Math.floor(remainingTime / 60);
            const minutes = remainingTime % 60;
            timerDisplay.textContent = `${timerName}: ${hours}h ${minutes}m`;

            if (remainingTime <= 0) {
                if (timerName === "Work Timer") {
                    remainingTime = breakTotalTime;
                    timerName = "Break Timer";
                    // Set alarm for break timer
                    chrome.alarms.create("breakAlarm", {
                        delayInMinutes: breakTotalTime,
                    });
                } else {
                    clearInterval(countdownInterval);
                    timerDisplay.textContent = `${timerName} elapsed`;
                    activeTimer = null;
                    // Set alarm for work timer
                    chrome.alarms.create("workAlarm", {
                        delayInMinutes: workTotalTime,
                    });
                    return;
                }
            }

            remainingTime -= 1;
        }, 60000); // 1 minute interval
    }

    function startTimer(workHours, workMinutes, breakHours, breakMinutes) {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        const workTotalTime = workHours * 60 + workMinutes;
        const breakTotalTime = breakHours * 60 + breakMinutes;
        let remainingTime = workTotalTime;
        let timerName = "Work Timer";

        countdownInterval = setInterval(() => {
            const hours = Math.floor(remainingTime / 60);
            const minutes = remainingTime % 60;
            timerDisplay.textContent = `${timerName}: ${hours}h ${minutes}m`;

            if (remainingTime <= 0) {
                if (timerName === "Work Timer") {
                    remainingTime = breakTotalTime;
                    timerName = "Break Timer";
                    // Set alarm for break timer
                    chrome.alarms.create("breakAlarm", {
                        delayInMinutes: breakTotalTime,
                    });
                } else {
                    clearInterval(countdownInterval);
                    timerDisplay.textContent = `${timerName} elapsed`;
                    activeTimer = null;
                    // Set alarm for work timer
                    chrome.alarms.create("workAlarm", {
                        delayInMinutes: workTotalTime,
                    });
                    return;
                }
            }

            remainingTime -= 1;
        }, 60000); // 1 minute interval
    }
});
