let timerIntervalId;

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "startTimer") {
        const totalWorkTime = request.totalWorkTime;
        const totalBreakTime = request.totalBreakTime;
        const repeat = request.repeat;
        if (timerIntervalId) {
            clearInterval(timerIntervalId);
        }
        // Probably add the do while loop here and if after this
        let repeatCount = 0;
        do {
            timerIntervalId = startTimer(totalWorkTime, totalBreakTime);
            repeatCount++;
            console.log(repeatCount);
            console.log(repeat);
        } while (repeatCount < repeat);
        //timerIntervalId = startTimer(totalWorkTime, totalBreakTime);
    }
});

function startTimer(workTime, breakTime) {
    var currentTime = workTime;

    var intervalId = setInterval(() => {
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
