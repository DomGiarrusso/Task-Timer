# ![Task:Timer Logo](icons/icon32.png) Task:Timer

#### Video Demo: <https://youtu.be/XkoS3EZJ3oI>

## Overview:

What is Task:Timer? You maybe asking. Task:Timer is a Chrome extension that allows you to set two timers at once. Why two-timers? you may now be asking. Well, the idea follows the time management method called _The Pomodoro Technique_. This technique follows the concept that you work more efficiently by working for a set number of time and then taking a break usually for a shorter amount of time. An example of this would be working for 30 minutes and then taking a break for 5 minutes. Task:Timer is to help time manage better.

### How to install:

#### Unpacked:

**1.** First you will need to download the GitHub repository. Click [here](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives) on how to download a GitHub repository.

**2.** Once you have downloaded the zip file you will then need to unzip it. Click [here](https://www.wikihow.com/Unzip-a-File) to find out how to unzip. You should then have a folder with the same name as the zip file you downloaded.

**3.** You now want to go into Google Chrome or any Chromium based browswer. Click [here](https://alternativeto.net/category/browsers/chromium-based/) for a list of Chromium based browsers. In the browser go to URL bar and enter in `chrome://extensions`.(This only works for Chrome only) The other way is navigating to find **Manage Extensions**. (This should work for most other browsers)

**4.** Once there in the top right corner of the page ther should be a toggle switch to turn on developer mode.(For Chrome)

**5.** Now that it is turned on you should now see under **Extensions** in the top left corner of the page. 3 new buttons **Load unpacked Pack extension Update**. You want to select **Load unpacked**.

**6.** It should then popup with file explorer and navigate to the folder you unzip earlier. Then select it and ta-da you added the extension.

> [!NOTE]
> This isn't the best long term method of running the extension since it requires a lot of work and isn't easy to update.

> [!IMPORTANT]
> Currently this method is the only way to add the extension. Working on adding it to Chrome Web store

### How to use:

#### How to start timers:

**1.** Click the ![Task:Timer Logo](icons/icon16.png) or the puzzle icon to the right of the URL bar.

-   If you use the puzzle icon then select the Task:Timer icon

**2.** It should then popup with Task:Timer Timer and Timer Controls. Here is where you can set the timers up and watch the timers if you wanted.

**3.** To start the timer you first will need to input the how long the timers will go.

-   Start with the Work Timer Controls and enter a number in the `Hours` or `Minutes`. <sub>Required</sub>

*   Go down to Break Timer Controls and enter a number in the `Hours` or `Minutes`. <sub>Required</sub>

-   Move down to Repeat Count and enter in a number in where it says `Times to Repeat`. <sub>Optional</sub>

*   The click the `Start` Button to start the timers.

> [!TIP]
> If you ever want to reset any of the timer controls just click the `Reset` Button.

#### Timers Running:

You should now see the Work Timer running and counting down the time. Once the timer reaches zero you will get a notification telling you that you can take a break. Also when it reaches zero it will start the Break Timer which you can visually see where it used to say Work Timer.

> [!NOTE]
> That the timer will automatically repeat if you entered in a number in the Repeat Count field.

#### Timers Controls:

You will find the Timer controls right under the timer.
You have 2 options.

**1.** Your first option is to pause the timer by clicking on the `Pause` Button.

-   If you click it the button will change to say `Play` if you click the button again it will start playing the timer again and change back to saying `Pause`.

> [!CAUTION]
> If you pause and click out of the popup it will clear the timer if you click back into the popup. The pause functionality currently only works if you keep the popup still open.

### Under the Hood:

So you want to know how this baby runs do ya. Well honestly I wish I could tell you but I barely know how it runs.
All jokes aside, I will go through each of the files to show you how it works.

#### manifest.json

This file is for letting Chrome know that this is a Chrome extension and giving it the needed information to run the files and allow the files to work with the rest of Chrome.

In manifest.json you will find the

-   manifest
    -   what version of the Chrome extension manifest it is using

```json
"manifest_version": 3,
```

-   name
    -   name of the extension

```json
"name": "Task:Timer",
```

-   description
    -   a description of the extension

```json
"description": "A task timer that allows for easy task management inside of chrome.",
```

-   version
    -   tells the version of the extension

```json
"version": "1.0.0",
```

-   action
    -   action sets up some default options and some other things you can find in the [Chrome Documentation](https://developer.chrome.com/docs/extensions/reference/api/action). Currently I just set the default popup to be [popup.html](popup.html)

```json
"action": {
        "default_popup": "popup.html"
    },
```

-   background
    -   Sets what file is the service-worker which is used to run anything for the extension in the background of Chrome.

```json
"background": {
        "service_worker": "service_worker.js"
    },
```

-   permissions
    -   what permissions are needed to run the extension. Currently the extension only needs to be able to use notifications.

```json
"permissions": ["notifications"],
```

-   icons
    -   tells Chrome the various icons size it can use and where to find them

```json
"icons": {
        "16": "icons/icon16.png",
        "32": "icons/icon32.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
    }
```

Here is the entirity of the manifest.json

```json
// manifest.json
{
    "manifest_version": 3,
    "name": "Task:Timer",
    "description": "A task timer that allows for easy task management inside of chrome.",
    "version": "1.0.0",
    "action": {
        "default_popup": "popup.html"
    },
    "background": {
        "service_worker": "service_worker.js"
    },
    "permissions": ["notifications"],
    "icons": {
        "16": "icons/icon16.png",
        "32": "icons/icon32.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
    }
}
```

> [!NOTE]
> If you want to know more about Chrome extension manifest please look at the documentation found [here](https://developer.chrome.com/docs/extensions/reference/manifest#register-a-content-script).

#### popup.html

This file contains all the HTML formatting needed for the popup found in the browser.

Click [here](popup.html) to go to popup.html.

### popup.css

This file contains all of the custom styling I did for the popup.html

> [!NOTE]
> Base styling is using Bootstrap CSS which is linked in the header of the popup.html.

```html
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
/>
```

### popup.js

popup.js is the main JavaScript connected to popup.html and speaks to service_worker.js

**Purpose for popup.js:**

-   Get information submitted by popup.html
-   Check that the information needed is there
    -   if not it sends an error back to user
-   Send information to service_worker.js
-   Retrieve information from service_worker.js
-   Update popup.html

> [!NOTE]
> This is a generalized view of how popup.js works. More info is given below.

**Deep Dive popup.js**

**1.** Event Listener

The entire script is encapsulated with an Event Listener checking if the DOM is Loaded

```javascript
// popup.js
document.addEventListener("DOMContentLoaded", function () {
    // Entire rest of the script
});
```

**2.** Base Varibles created

A number of varibles are created and set getting elements from popup.html.

```javascript
// popup.js
// Get the elements from the DOM
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");
const timerTitle = document.getElementById("timerTitle");
const timerDisplay = document.getElementById("timerDisplay");
```

**3.** Start Button function

This function controls what happens once the Start Button is clicked.

Overview of Start Button function:

```javascript
// popup.js

startButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Rest of the function
});
```

-   Creating form variables

    I then create input variables getting the values entered in from the form found in popup.html.
    I also create another set of variables using the first set to later be used to pass on to service_worker.js.

```javascript
//popup.js
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
```

> [!NOTE]
> Even though each variables set are using the same inputs. The first set is used for Error Handling and the second set is used for the actual calculations of the timers.

-   Error Handling

    I then use 2 if statements checking the first set of variables to see if they are filled in or not. If they arent it then sends a message back to the user saying that they need to enter in something to at least one of the fields.

```javascript
// popup.js
// Error Handling Input Fields
if (workHoursInput === "") {
    if (workMinutesInput === "") {
        console.log("Please fill in at least one field for Work Timer Control");

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
```

-   Calulateing total timer and sending to service_worker.js

    Create 2 variables that calculate the total time in seconds for each timer. Then gets passed onto service_worker.js using the Chrome extension API passing in all the variables needed.

```javascript
// popup.js
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
```

**4.** Pasue Button function

This functions controls what happens when Pause Button is clicked.

-   What does it do?

    1. It uses an Event Listener to check if the button is clicked.
    2. Sends a message to serice_worker.js.
    3. Changes the button text from pause to play.

Overview of Pause Function:

```javascript
//popup.js
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
```

**5.** Stop Button function

This functions controls what happens when Stop Button is clicked.

-   What does it do?
    1. It uses an Event Listener to check if the button is clicked.
    2. Sends a message to serice_worker.js.
    3. Resets the timer display back to zero.

Overview of Pause Function:

```javascript
//popup.js
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
```

**6.** Update Timer Display functions

The next two functions update the timer itself and update the timer title.

1. First Function checks if it needs to update the timer display

    - What does it do?
        1. It uses the Chrome extension API to request any messages was sent back from service_worker.js.
        2. If it has it then checks if the request sent a message to update the timer.
        3. If it is true then it creates a new variable getting the data from service_worker.js.
        4. Then it runs the updateTimer function to actually update the time

2. Second Function checks if the timer title needs to be updated

    - What does it do?
        1. It uses the Chrome extension API to request any messages was sent back from service_worker.js.
        2. If it has it then checks if the request sent a message to update the timer.
        3. If it is true then it creates a new variable getting the data from service_worker.js.
        4. Then changes the text in popup.html.

Overview of the functions:

```javascript
// popup.js
// Update timer display
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
```

> [!NOTE]
> The first function uses `updateTimer(currentTime);`. the definition of the function is found below.

**7.** Update timer function

This function is used above to actually update the timer display.

-   What does it do?

    1. Uses a parameter to pass in the current time
    2. It then converts that time back into hours, minutes and seconds.
    3. Then uses if statments to add a zero if it is less than 10.
    4. Updates the text found in popup.html

Overiew of Update timer function:

```javascript
//popup.js
// Update timer function
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
```

### **service_worker.js**

service_worker.js is where the actual count down of the timer happens. It happens here rather than popup.js because the timer itself needs to be able to run in the background.

**Purpose for service_worker.js:**

-   Get information sent from popup.js
-   Run both timers
-   Repeat timers if needed
-   Send back information to popup.js
-   Allow everything to run in the background if the popup isn't open

**Deep Dive service_worker.js**

**1.** Setting default variables

Sets some variables used throughout the script

```javascript
//service_worker.js
// Setting default variables
let timerIntervalId;
let isPaused = false;
let isStopped = false;
let timerTitle = `Work Timer`;
```

**2.** Run function

This function is used to run the timer as well as the other functionality tided to the timer.

-   Chrome extension API Listener

```javascript
// service_worker.js
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "startTimer") {
        // Code to run everything is action start is recieved
    }
});
```

-   If statement requesting action: startTimer form popup.js

```javascript
// service_worker.js
if (request.action === "startTimer") {
    // Code that runs if statement is met
}
```

-   Gets the variables needed for startTimer from popup.js

    ```javascript
    // service_worker.js
    // Get timer variables from popup.js
    const totalWorkTime = request.totalWorkTime;
    const totalBreakTime = request.totalBreakTime;
    const repeat = request.repeat;
    isStopped = false;
    ```

-   Clear the timer if start is clicked and create repeat count

    ```javascript
    // service_worker.js
    // Clear interval if it is already running
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
    }
    //Set the repeat count to 0
    let repeatCount = 0;
    ```

-   Function to repeat timer

    ```javascript
    // service_worker.js
    function repeatTimer() {
        startTimer(totalWorkTime, totalBreakTime);
        repeatCount++;
        console.log("repeatCount: " + repeatCount);
        console.log("repeat" + repeat);

        if (repeatCount < repeat) {
            setTimeout(repeatTimer, (totalWorkTime + totalBreakTime) * 1000);
        }
    }

    //Runs the function
    repeatTimer();
    ```

-   Else ifs for pause and stop timer

```javascript
// service_worker.js
else if (request.action === "pauseTimer") {
    isPaused = !isPaused;
} else if (request.action === "stopTimer") {
    isStopped = true;
}
```

**3.** Start Timer Function

This function is used for running both timers. Passing in as parameters the workTime and breakTime.

-   Base structure of the function

```javascript
// service_worker.js
function startTimer(workTime, breakTime) {
    var currentTime = workTime;
    timerTitle = `Work Timer`;
    // Work and Break timers
    return intervalId;
}
```

-   Work Timer

```javascript
// service_worker.js
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
    // Break Timer
    // ...
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
```

-   Break Timer

```javascript
// service_worker.js
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
    }, 1000);
} // End of Break Timer
```

**4.** Show notification function

This function uses the Chrome extension API to be able to send out a notification to the users device.

```javascript
// service_worker.js
function showNotification(message) {
    chrome.notifications.create("", {
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Task:Timer",
        message: message,
    });
}
```
