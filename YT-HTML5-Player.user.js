// ==UserScript==
// @name         YouTube HTML5 Player
// @namespace    https://github.com/ktg5/YT-HTML5-Player/
// @version      2.0dev3
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
// Make sure to set 'customTheme' to 'true'
var customTheme = false;
// If you'd like to take a look at some examples,
// https://github.com/ktg5/YT-HTML5-Player#user-customization

// #### Take a copy of any of the examples and put them here!! ####

// Other user customization
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
    var mainCSS
    switch (playerYear) {
        case 2015:
            // IMPORT CSS
            mainCSS = GM_getResourceText(playerYear)
            GM_addStyle(mainCSS);

            // IMPORT USER CUSTOMIZATION
            if (customTheme === true) {
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
            }

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

        case 2012:
            // IMPORT CSS
            mainCSS = GM_getResourceText(playerYear)
            GM_addStyle(mainCSS);

            // IMPORT USER CUSTOMIZATION
            if (customTheme == true) {
                GM_addStyle(`
                /* CONTROLS BASE */
                .ytp-chrome-controls {
                    background: ${controlsBack15} !important;
                }

                /* PROGRESS BAR */
                .ytp-play-progress.ytp-swatch-background-color, .ytp-hover-progress.ytp-hover-progress-light, .ytp-hover-progress-light {
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

                .ytp-scrubber-container {
                    top: ${scrubberTop15}px !important;
                    margin-top: -5px;
                }
                `);
            }

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