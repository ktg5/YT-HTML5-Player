// ==UserScript==
// @name         YouTube HTML5 Player
// @namespace    https://github.com/ktg5/YT-HTML5-Player/
// @version      2.0dev2
// @description  Try to recreate the old YouTube player looks.
// @author       ktg5
// @match        *://*.youtube.com/*
// @updateURL    https://github.com/ktg5/YT-HTML5-Player/raw/dev/YT-HTML5-Player.user.js
// @downloadURL  https://github.com/ktg5/YT-HTML5-Player/raw/dev/YT-HTML5-Player.user.js
// @icon         https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/dev/img/favicon.png
// @resource     2015 https://github.com/ktg5/YT-HTML5-Player/raw/dev/styles/2015.css
// @resource     2012 https://github.com/ktg5/YT-HTML5-Player/raw/dev/styles/2012.css
// @resource     2010 https://github.com/ktg5/YT-HTML5-Player/raw/dev/styles/2010.css
// @resource     2006 https://github.com/ktg5/YT-HTML5-Player/raw/dev/styles/2006.css
// @resource     3RD-PARTY https://github.com/ktg5/YT-HTML5-Player/raw/dev/3rd-party-style.css
// @require      https://github.com/ktg5/YT-HTML5-Player/raw/dev/3rd-party-script.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

// SELECT PLAYER YEAR
var playerYear = 2015;

// 2015 CUSTOMIZATION
// If you'd like to take a look at some examples,
// check out the README from our GitHub!
/// Controls background
var controlsBack15 = "#1b1b1b"; // Default: #1b1b1b

/// Progress bar
var progressBarColor15 = "#b91f1f"; // Default: #b91f1f
var volumeSliderBack15 = "#b91f1f"; // Default: #b91f1f

/// Scrubber icon
var scrubberIcon15 = "https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/dev/img/scrubber.png" // Default: https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/dev/img/scrubber.png
var scrubberIconHover15 = "https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/dev/img/scrubber-hover.png" // Default: https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/dev/img/scrubber-hover.png

var scrubberPosition15 = "0px 0px" // Default: 0px 0px
var scrubberSize15 = "18" // If changed, change the "scrubberTop" value to whatever looks centered for you. | Default: 18

var scrubberWidth15 = "18"
var scrubberHeight15 = "18"

var scrubberTop15 = "1" // Default: 1

/// End Screen Buttons/Elements [OPTIONAL]
var endScreenToggle15 = true // true = Enabled | false = Disabled

/// Disable "Show other videos" box in embed videos [OPTIONAL]
var embedOtherVideos15 = true // true = Enabled | false = Disabled

// #################################

// Import 3rd-party CSS
const CSS3rd = GM_getResourceText("3RD-PARTY")
GM_addStyle(CSS3rd);

// Start
const starter = setInterval(function () {
    if (document.location.pathname == "/watch") {
    switch (playerYear) {
        case 2015:
            // IMPORT CSS
            const mainCSS = GM_getResourceText(playerYear)
            GM_addStyle(mainCSS);

            // IMPORT USER CUSTOMIZATION
            GM_addStyle(`
            /* CONTROLS BASE */
            .ytp-chrome-controls {
                background: ${controlsBack15} !important;
            }

            /* PROGRESS BAR */
            .ytp-play-progress.ytp-swatch-background-color {
                background: ${progressBarColor15} !important;
            }

            .ytp-hover-progress.ytp-hover-progress-light {
                background: ${progressBarColor15} !important;
            }

            .ytp-hover-progress-light {
                background: ${progressBarColor15} !important;
            }

            /* VOLUME SLIDER */
            .ytp-volume-slider-handle::before {
                background: ${volumeSliderBack15} !important;
            }

            /* SCRUBBER */
            .ytp-scrubber-button {
                background: url(${scrubberIcon15}) !important;
                background-position: ${scrubberPosition15} !important;
                background-size: ${scrubberSize15}px !important;
                height: ${scrubberHeight15}px !important;
                width: ${scrubberWidth15}px !important;
            }

            .ytp-scrubber-button:hover {
                background: url(${scrubberIconHover15}) !important;
                background-position: ${scrubberPosition15} !important;
                background-size: ${scrubberSize15}px !important;
                height: ${scrubberHeight15}px !important;
                width: ${scrubberWidth15}px !important;
            }

            .ytp-scrubber-button.ytp-swatch-background-color {
                background-color: transparent !important;
            }

            .ytp-scrubber-container {
                top: ${scrubberTop15}px !important;
                margin-top: -5px;
            }
            `);

            // toggles
            if (endScreenToggle15 == false) {
                GM_addStyle(`
                .ytp-ce-element {
                    display: none !important;
                }
                `)
            }

            if (embedOtherVideos15 == false) {
                GM_addStyle(`
                .ytp-expand-pause-overlay .ytp-pause-overlay {
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
        break;
    
        default:
            console.error(`YT-HTML5-Player: no playerYear is selected, please fix that.`);
        break;
    }

    // End Start Checker
    clearInterval(starter);
    }
}, 2500)