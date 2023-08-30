// ==UserScript==
// @name         YouTube HTML5 Player
// @namespace    https://github.com/ktg5/YT-HTML5-Player/
// @version      2.0dev7.1
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
// @resource     MENU https://github.com/ktg5/YT-HTML5-Player/raw/dev/styles/menu-style.css
// @require      https://github.com/ktg5/YT-HTML5-Player/raw/dev/3rd-party-script.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getResourceURL
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_info
// @grant        unsafeWindow
// ==/UserScript==

var version = `2.0dev7.1`;

// Default user config.
var yt_html5 = {
    // Basic settings.
    year: 2015,
    autoplayButton: false,
    endScreenToggle: true,
    embedOtherVideos: true,
    customTheme: false,

    // Only for custom themes.
    progressBarColor: '',
    volumeSliderBack: '',
    scrubberIcon: '',
    scrubberIconHover: '',
    scrubberPosition: '',
    scrubberSize: '',
    scrubberHeight: '',
    scrubberWidth: '',
    scrubberTop: '',
}

// Get user config.
// GM_setValue("yt-html5", yt_html5)
var userConfig = GM_getValue('yt-html5');
if (GM_getValue("yt-html5") == undefined) GM_setValue("yt-html5", yt_html5)
console.log(`YT-HTML5 USER DATA:`, userConfig)

// Custom theme enabled
var customTheme = userConfig.customTheme;
// If you'd like to take a look at some examples,
// https://github.com/ktg5/YT-HTML5-Player#user-customization

// #################################

// Import 3rd-party CSS
const CSS3rd = GM_getResourceText("3RD-PARTY")
GM_addStyle(CSS3rd);


// MOVING ELEMENTS
function moveElement(element, targetDiv, pasteDiv) {
    console.log(`moveElement function: ${targetDiv.contains(element)}`)
    if (targetDiv.contains(element)) {
        pasteDiv.parentNode.insertBefore(targetDiv.removeChild(element), pasteDiv.parentNode.firstElementChild);
        moveElement(element, targetDiv, pasteDiv);
    } else {
        return;
    }
};


// Make sure script reruns on page update.
var currentPath = window.location.href;
setInterval(() => {
    if (window.location.href == currentPath) {
        return;
    } else {
        if (document.location.pathname == "/watch") startPlayer();
        startMenu();
        currentPath = window.location.href;
    }
}, 1000);

// Start
if (document.location.pathname == "/watch") startPlayer();
startMenu();

// You might be asking, "why is this a thing?"
// You'd only understand if you were dealing
// CSS.
var loadedPlayerStyle = false;
var loadedMenuStyle = false;

// toggles
if (userConfig.endScreenToggle == false) {
    GM_addStyle(`
    .ytp-ce-element.ytp-ce-element-show {
        display: none !important;
    }
    `)
}

if (userConfig.embedOtherVideos == false) {
    GM_addStyle(`
    .ytp-expand-pause-overlay .ytp-pause-overlay {
        display: none !important;
    }
    `)
}

if (userConfig.autoplayButton == false) {
    GM_addStyle(`
    .ytp-button[data-tooltip-target-id="ytp-autonav-toggle-button"] {
        display: none !important;
    }
    `)
}

function startPlayer() {
    // Make sure player part of the script is loaded on "watch" pages.
    // Keep going until we hit it.
    const starter = setInterval(function () {
        if (document.location.pathname == "/watch") {
            switch (userConfig.year) {
                case '2015':
                    // IMPORT CSS (if it wasn't already loaded)
                    if (loadedPlayerStyle == false) {
                        GM_addStyle(GM_getResourceText(userConfig.year));
                        loadedPlayerStyle = true;
                    }
    
                    // IMPORT USER CUSTOMIZATION
                    if (customTheme === true) {
                        GM_addStyle(`
                        /* CONTROLS BASE */
                        .ytp-chrome-controls {
                            background: ${userConfig.controlsBack} !important;
                        }
    
                        /* PROGRESS BAR */
                        .ytp-play-progress.ytp-swatch-background-color {
                            background: ${userConfig.progressBarColor} !important;
                        }
    
                        .ytp-hover-progress.ytp-hover-progress-light {
                            background: ${userConfig.progressBarColor} !important;
                        }
    
                        .ytp-hover-progress-light {
                            background: ${userConfig.progressBarColor} !important;
                        }
    
                        /* VOLUME SLIDER */
                        .ytp-volume-slider-handle::before {
                            background: ${userConfig.volumeSliderBack} !important;
                        }
    
                        /* SCRUBBER */
                        .ytp-scrubber-button {
                            background: url(${userConfig.scrubberIcon}) !important;
                            background-position: ${userConfig.scrubberPosition} !important;
                            background-size: ${userConfig.scrubberSize}px !important;
                            height: ${userConfig.scrubberHeight}px !important;
                            width: ${userConfig.scrubberWidth}px !important;
                        }
    
                        .ytp-scrubber-button:hover {
                            background: url(${userConfig.scrubberIconHover}) !important;
                            background-position: ${userConfig.scrubberPosition} !important;
                            background-size: ${userConfig.scrubberSize}px !important;
                            height: ${userConfig.scrubberHeight}px !important;
                            width: ${userConfig.scrubberWidth}px !important;
                        }
    
                        .ytp-scrubber-button.ytp-swatch-background-color {
                            background-color: transparent !important;
                        }
    
                        .ytp-scrubber-container {
                            top: ${userConfig.scrubberTop}px !important;
                            margin-top: -5px;
                        }
                        `);
                    }
    
                    // #################################    
                    /// WATCH LATER BUTTON
                    var WatchLaterButton = document.getElementsByClassName("ytp-watch-later-button")[0];
                    var targetDiv1 = WatchLaterButton.parentElement;
                    var pastDiv1 = document.getElementsByClassName("ytp-subtitles-button")[0];
    
                    moveElement(WatchLaterButton, targetDiv1, pastDiv1);
                break;
    
                case '2012':
                    // IMPORT CSS (if it wasn't already loaded)
                    if (loadedPlayerStyle == false) {
                        GM_addStyle(GM_getResourceText(userConfig.year));
                        loadedPlayerStyle = true;
                    }
    
                    // IMPORT USER CUSTOMIZATION
                    if (userConfig.customTheme == true) {
                        GM_addStyle(`
                        /* CONTROLS BASE */
                        .ytp-chrome-controls {
                            background: ${userConfig.controlsBack} !important;
                        }
    
                        /* PROGRESS BAR */
                        .ytp-play-progress.ytp-swatch-background-color, .ytp-hover-progress.ytp-hover-progress-light, .ytp-hover-progress-light {
                            background: ${userConfig.progressBarColor} !important;
                        }
    
                        /* VOLUME SLIDER */
                        .ytp-volume-slider-handle::before {
                            background: ${userConfig.volumeSliderBack} !important;
                        }
    
                        /* SCRUBBER */
                        .ytp-scrubber-button {
                            background: url(${userConfig.scrubberIcon}) !important;
                            background-position: ${userConfig.scrubberPosition} !important;
                            background-size: ${userConfig.scrubberSize}px !important;
                            height: ${userConfig.scrubberHeight}px !important;
                            width: ${userConfig.scrubberWidth}px !important;
                        }
    
                        .ytp-scrubber-button:hover {
                            background: url(${userConfig.scrubberIconHover}) !important;
                            background-position: ${userConfig.scrubberPosition} !important;
                            background-size: ${userConfig.scrubberSize}px !important;
                            height: ${userConfig.scrubberHeight}px !important;
                            width: ${userConfig.scrubberWidth}px !important;
                        }
    
                        .ytp-scrubber-container {
                            top: ${userConfig.scrubberTop}px !important;
                            margin-top: -5px;
                        }
                        `);
                    }
    
                    // #################################
    
                    /// WATCH LATER BUTTON
                    var WatchLaterButton = document.getElementsByClassName("ytp-watch-later-button")[0];
                    var targetDiv1 = WatchLaterButton.parentElement;
                    var pastDiv1 = document.getElementsByClassName("ytp-subtitles-button")[0];
    
                    moveElement(WatchLaterButton, targetDiv1, pastDiv1);
                break;

                case '2010':
                    // IMPORT CSS (if it wasn't already loaded)
                    if (loadedPlayerStyle == false) {
                        GM_addStyle(GM_getResourceText(userConfig.year));
                        loadedPlayerStyle = true;
                    }
                break;
    
                default:
                    console.error(`YT-HTML5-Player: no userConfig.year is selected, please fix that.`);
                break;
            };
    
            // End Start Checker
            clearInterval(starter);
        };
    }, 2500);
}


// Menu functions
/// Toggle Menu
var menuToggled = false;
function menuToggle() {
    if (document.getElementById('yt-html5-menu').classList.contains('menu-off')) {
        document.getElementById('yt-html5-menu').classList.remove('menu-off');
        document.getElementById(`menu-button`).style = 'rotate: 180deg;';
        menuToggled = true;
    } else {
        document.getElementById('yt-html5-menu').classList.add('menu-off');
        document.getElementById(`menu-button`).style = 'rotate: 0deg;';
        menuToggled = false;
    }
}
unsafeWindow.menuToggle = menuToggle;

/// Update User DB
function changeUserDB(option, newValue, lightElement) {
    if (lightElement) {
        if (lightElement.children[0].classList.contains('true')) {
            lightElement.children[0].classList.remove('true');
            lightElement.children[0].classList.add('false');
            userConfig[option] = false;
            GM_setValue(`yt-html5`, userConfig);
        } else if (lightElement.children[0].classList.contains('false')) {
            lightElement.children[0].classList.remove('false');
            lightElement.children[0].classList.add('true');
            userConfig[option] = true;
            GM_setValue(`yt-html5`, userConfig);
        } else {
            lightElement.children[0].classList.add('true');
            userConfig[option] = true;
            GM_setValue(`yt-html5`, userConfig);
        }
    } else {
        userConfig[option] = newValue;
        GM_setValue(`yt-html5`, userConfig);
    }
    console.log(`YT-HTML5 USER DATA CHANGED:`, GM_getValue(`yt-html5`));
}
unsafeWindow.changeUserDB = changeUserDB;

/// Make opinions in menu
function makeMenuOption(type, opinion, desc, values) {
    switch (type) {
        case 'selection':
            return `
            <div class="menu-option">
                <div class="menu-name">${desc}</div>
                <select onchange="changeUserDB('${opinion}', this.value)">
                    ${values}
                </select>
            </div>
            `

        case 'toggle':
            return `
            <div class="menu-option">
                <div class="menu-name">${desc}</div>
                <button class="menu-toggle" onclick="changeUserDB('${opinion}', '', this)">
                    <div class="light ${userConfig[opinion]}"></div>
                </button>
            </div>
            `
    }
}

/// Get year options for menu
var years = [2015, 2012, 2010, 2006];
var yearOptions = '';
years.forEach(element => {
    if (element == userConfig['year']) {
        yearOptions += `<option value="${element}" selected>${element}</option> `
    } else {
        yearOptions += `<option value="${element}">${element}</option> `
    }
});

// Start menu
function startMenu() {
    setTimeout(function () {
        if (!document.getElementById('yt-html5-menu-button') && !document.getElementById(`buttons`)) {
            return;
        } else {
            // Important CSS if it wasn't ported already
            if (loadedMenuStyle == false) {
                GM_addStyle(GM_getResourceText("MENU"));
                loadedMenuStyle = true;
            }
            document.getElementById(`buttons`).insertAdjacentHTML(
                'afterbegin',

                `<!-- Menu Button -->
                <div id="yt-html5-menu-button">
                    <button id="menu-button" style="height: 40px; width: 40px;" onclick="menuToggle()">
                        <img src="https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/dev/img/menu-icon.png">
                    </button>
                </div>

                <!-- Menu -->
                <div id="yt-html5-menu" class="menu-off">
                    <a><div class="reload-page">
                        <h3>Reload page for changes to take effect!</h3>
                    </div></a>

                    <h2>YT-HTML5-Player Menu</h2><div class="version"> v${version}</div>

                    <h3>General Settings</h3>

                    ${makeMenuOption(`selection`, `year`, `Year of Player`, yearOptions)}
                    <b>2010 has been added as of this update. 2006 still isn't developed yet, please wait for that!</b>

                    ${makeMenuOption(`toggle`, `autoplayButton`, `Toggle the Autoplay toggle on the right of the player`)}

                    ${makeMenuOption('toggle', 'endScreenToggle', 'Toggle end screen (Things that display at the end of video)')}

                    ${makeMenuOption('toggle', 'embedOtherVideos', 'Toggle "Show other videos" box in embeds')}

                    <br>

                    <h3>Custom Theme Settings</h3>
                    soon.

                    <div class="blank"></div>
                </div>`
            );
        }
    }, 3500)
}