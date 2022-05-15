// ==UserScript==
// @name         YouTube HTML5 Player
// @namespace    https://github.com/ktg5/YT-HTML5-Player/
// @version      1.3.1
// @description  Try to recreate the old YouTube player looks.
// @author       ktg5
// @match        *://www.youtube.com/*
// @updateURL    https://github.com/ktg5/YT-HTML5-Player/raw/main/YT-HTML5-Player.user.js
// @downloadURL  https://github.com/ktg5/YT-HTML5-Player/raw/main/YT-HTML5-Player.user.js
// @icon         https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/favicon.png
// @resource     CSS https://github.com/ktg5/YT-HTML5-Player/raw/main/style.css
// @resource     3RD-PARTY https://github.com/ktg5/YT-HTML5-Player/raw/main/3rd-party-style.css
// @require      https://github.com/ktg5/YT-HTML5-Player/raw/main/3rd-party-script.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

// Start
setTimeout(function() {

    // IMPORT CSS
    const CSS1 = GM_getResourceText("CSS")
    GM_addStyle(CSS1);
    const CSS2 = GM_getResourceText("3RD-PARTY")
    GM_addStyle(CSS2);


    // USER CUSTOMIZATION
    // If you'd like to take a look at some examples,
    // check out the README from our GitHub!
    /// Controls background
    var controlsBack = "#1b1b1b"; // Default: #1b1b1b

    /// Progress bar
    var progressBarColor = "#b91f1f"; // Default: #b91f1f
    var volumeSliderBack = "#b91f1f"; // Default: #b91f1f

    /// Scrubber icon
    var scrubberIcon = "https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/scrubber.png" // Default: https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/scrubber.png
    var scrubberIconHover = "https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/scrubber-hover.png" // Default: https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/scrubber-hover.png

    var scrubberPosition = "0px 0px" // Default: 0px 0px
    var scrubberSize = "18" // If changed, change the "scrubberTop" value to whatever looks centered for you. | Default: 18
    
    var scrubberWidth = "18"
    var scrubberHeight = "18"

    var scrubberTop = "1" // Default: 1

    /// End Screen Buttons/Elements [OPTIONAL]
    var endScreenToggle = true // true = Enabled | false = Disabled

    // #################################

    // IMPORT USER CUSTOMIZATION

    GM_addStyle(`
/* CONTROLS BASE */
.ytp-chrome-controls {
    background: ${controlsBack} !important;
}

/* PROGRESS BAR */
.ytp-play-progress.ytp-swatch-background-color {
    background: ${progressBarColor} !important;
}

.ytp-hover-progress.ytp-hover-progress-light {
    background: ${progressBarColor} !important;
}

.ytp-hover-progress-light {
    background: ${progressBarColor} !important;
}

/* VOLUME SLIDER */
.ytp-volume-slider-handle::before {
    background: ${volumeSliderBack} !important;
}

/* SCRUBBER */
.ytp-scrubber-button {
    background: url(${scrubberIcon}) !important;
    background-position: ${scrubberPosition} !important;
    background-size: ${scrubberSize}px !important;  
    height: ${scrubberHeight}px !important;
    width: ${scrubberWidth}px !important;
}

.ytp-scrubber-button:hover {
    background: url(${scrubberIconHover}) !important;
    background-position: ${scrubberPosition} !important;
    background-size: ${scrubberSize}px !important;  
    height: ${scrubberHeight}px !important;
    width: ${scrubberWidth}px !important;
}

.ytp-scrubber-button.ytp-swatch-background-color {
    background-color: transparent !important;
}

.ytp-scrubber-container {
    top: ${scrubberTop}px !important;
    margin-top: -5px;
}
    `);

    if (endScreenToggle == false) {
        GM_addStyle(`
.ytp-ce-element {
    display: none !important;
}
        `)
    }

    // #################################

    // MOVING ELEMENTS
    function moveElement(element, targetDiv, pasteDiv) {
        console.log(`moveElement function: ${targetDiv.contains(element)}`)
        if (targetDiv.contains(element)) {
            pasteDiv.parentNode.insertBefore(targetDiv.removeChild(element), pasteDiv.parentNode.firstElementChild);
            moveElement(element, targetDiv, pasteDiv);
        } else {
            return;
        }
    }

    /// WATCH LATER BUTTON
    var WatchLaterButton = document.getElementsByClassName("ytp-watch-later-button")[0];
    var targetDiv1 = WatchLaterButton.parentElement;
    var pastDiv1 = document.getElementsByClassName("ytp-subtitles-button")[0];

    moveElement(WatchLaterButton, targetDiv1, pastDiv1);

    // #################################

    // CHANGING ELMENTS ON CLICK
    /// WATCH LATER BUTTON
    // WatchLaterButton.onclick = changeTitle(WatchLaterButton);

    // function changeTitle(element) {
    //     if (element.title == "Watch later") {
    //         element.title = "Added to Watch later"
    //     } else if (element.title == "Added to Watch later") {
    //         element.title = "Watch later"
    //     }
    // }

}, 2500)();