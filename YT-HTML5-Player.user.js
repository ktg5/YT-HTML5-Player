// ==UserScript==
// @name         YouTube 2012-15 HTML5 Player
// @namespace    https://github.com/ktg5/YT-HTML5-Player/
// @version      1.3dev3
// @description  Try to recreate the old YouTube 2012-2015 player.
// @author       ktg5
// @match        *://www.youtube.com/*
// @updateURL    https://github.com/ktg5/YT-HTML5-Player/raw/main/YT-HTML5-Player.user.js
// @downloadURL  https://github.com/ktg5/YT-HTML5-Player/raw/main/YT-HTML5-Player.user.js
// @icon         https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/favicon.png
// @resource     CSS https://github.com/ktg5/YT-HTML5-Player/raw/dev/style.css
// @resource     3RD-PARTY https://github.com/ktg5/YT-HTML5-Player/raw/dev/3rd-party-style.css
// @require      https://github.com/ktg5/YT-HTML5-Player/raw/dev/3rd-party-script.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

// Start
(function() {

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

})();