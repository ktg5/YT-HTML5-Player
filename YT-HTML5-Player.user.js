// ==UserScript==
// @name         YouTube 2012-15 HTML5 Player
// @namespace    http://ktg5.online/
// @version      1.2dev3
// @description  Try to recreate the old YouTube 2012-2015 player.
// @author       ktg5
// @match        *://www.youtube.com/*
// @updateURL    https://github.com/ktg5/YT-HTML5-Player/raw/dev/YT-HTML5-Player.user.js
// @downloadURL  https://github.com/ktg5/YT-HTML5-Player/raw/dev/YT-HTML5-Player.user.js
// @icon         https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/favicon.png
// @resource     CSS https://github.com/ktg5/YT-HTML5-Player/raw/dev/style.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

// Start
(function() {

    // IMPORT CSS
    const CSS_txt = GM_getResourceText("CSS")
    GM_addStyle(CSS_txt);


    // USER CUSTOMIZATION
    /// Controls background
    var controlsBack = "#1b1b1b"; // Default: #1b1b1b

    /// Progress bar
    var progressBarColor = "#b91f1f"; // Default: #b91f1f
    var volumeSliderBack = "#b91f1f"; // Default: #b91f1f

    /// Scrubber icon
    var scrubberIcon = "https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/scrubber.png" // Default: https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/dev/img/scrubber.png
    var scrubberSize = "18" // If changed, change the "scrubberTop" value to whatever looks centered for you. | Default: 18
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
.ytp-swatch-background-color {
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
    background-size: ${scrubberSize}px !important;
}

.ytp-scrubber-container {
    top: ${scrubberTop}px !important;
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