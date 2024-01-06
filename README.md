# ![Task:Timer Logo](icons/icon32.png) Task:Timer

#### Video Demo: <URL HERE>

## Overview:

What is Task:Timer? You maybe asking. Task:Timer is a chrome extenstion allowing you to set two timers at once. Why two timers? you may now be asking. Well the idea follows the time management method called _The Pomodoro Technique_. This technique follows the concept that you work more effiently by working for a set number of time and then taking a break usually for a shorter amount of time. An example of this would me working for 30 minutes and then taking a break for 5 minutes. Task:Timer is to help time manange better.

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
> More ways coming soon to add Task:Timer

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

#### popup.js

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

This function controls what happens once the Start Button is pressed.

Overview of Start Button function:

```javascript
// popup.js

startButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Rest of the function
});
```
