// ==UserScript==
// @name         YouTube HTML5 Player
// @namespace    https://github.com/ktg5/YT-HTML5-Player/
// @version      2.1.2
// @description  Try to recreate the old YouTube player looks.
// @author       ktg5
// @match        http://*.youtube.com/*
// @match        http://youtube.com/*
// @match        https://*.youtube.com/*
// @match        https://youtube.com/*
// @match        *://*.youtube.com/*
// @updateURL    https://github.com/ktg5/YT-HTML5-Player/raw/main/YT-HTML5-Player.user.js
// @downloadURL  https://github.com/ktg5/YT-HTML5-Player/raw/main/YT-HTML5-Player.user.js
// @icon         https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/favicon.png
// @resource     2015 https://github.com/ktg5/YT-HTML5-Player/raw/main/styles/2015.css
// @resource     2012 https://github.com/ktg5/YT-HTML5-Player/raw/main/styles/2012.css
// @resource     2010 https://github.com/ktg5/YT-HTML5-Player/raw/main/styles/2010.css
// @resource     2006 https://github.com/ktg5/YT-HTML5-Player/raw/main/styles/2006.css
// @resource     3RD-PARTY https://github.com/ktg5/YT-HTML5-Player/raw/main/3rd-party-style.css
// @resource     MENU https://github.com/ktg5/YT-HTML5-Player/raw/main/styles/menu-style.css
// @require      https://github.com/ktg5/YT-HTML5-Player/raw/main/3rd-party-script.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getResourceURL
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_info
// @grant        unsafeWindow
// ==/UserScript==

var version = `2.1.2`;

// Default user config.
var def_yt_html5 = {
    // First-time ppl & release note checking.
    releaseNote: 0,

    // Basic settings.
    year: '2015',
    autoplayButton: false,
    endScreenToggle: true,
    embedOtherVideos: true,
    customTheme: false,

    // Only for custom themes.
    controlsBack: null,
    progressBarColor: null,
    volumeSliderBack: null,
    scrubberIcon: null,
    scrubberIconHover: null,
    scrubberPosition: null,
    scrubberSize: null,
    scrubberHeight: null,
    scrubberWidth: null,
    scrubberTop: null,
    scrubberLeft: null,
}

// Get user config.
var userConfig = GM_getValue('yt-html5');
if (GM_getValue("yt-html5") == undefined) GM_setValue("yt-html5", def_yt_html5);
console.log(`YT-HTML5 USER DATA:`, userConfig)
unsafeWindow.userConfig = userConfig;

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
// And make check progress bar value in case to change it.
var currentPath = window.location.href;
var progressbar = document.getElementsByClassName('ytp-progress-bar')[0];
setInterval(() => {
    // Check progress bar
    if (!progressbar) return; // For some reason, the userscript likes to run "multiple" times. Using @noframes in the userscript info will break embeds.
    else if (progressbar.ariaValueMax == progressbar.ariaValueNow) {
        progressbar.classList.add('finished');
        console.log('YT-HTML5-Player', `video finished, progress bar should be all main color.`);
    } else {
        if (progressbar.classList.contains('finished')) {
            progressbar.classList.remove('finished');
            console.log(`YT-HTML5-Player`, `video started, reerting back.`);
        }
    }
}, 1000);

setInterval(() => {
    // Check window href
    if (window.location.href == currentPath) {
        return;
    } else {
        startPlayer()
        startMenu();
        currentPath = window.location.href;
    }
}, 1000);

// Start
startPlayer();
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

// Custom theme stuff
function enableCustomTheme() {
    var outputCss = `/* hi this is the custom theme you set lolz */`;
    if (userConfig.controlsBack !== null) {
        outputCss += `
        :root {
            --background: ${userConfig.controlsBack} !important;
        }
        `
    } if (userConfig.progressBarColor !== null) {
        outputCss += `
        :root {
            --main-colour: ${userConfig.progressBarColor} !important;
        }
        `
    } if (userConfig.volumeSliderBack !== null) {
        outputCss += `
        .ytp-volume-slider-handle::before {
            background: ${userConfig.volumeSliderBack} !important;
        }
        `
    } if (userConfig.scrubberIcon !== null) {
        outputCss += `
        .ytp-scrubber-button {
            background: url(${userConfig.scrubberIcon}) no-repeat center !important;
        }
        `
    } if (userConfig.scrubberIconHover == null && userConfig.scrubberIcon !== null) {
        outputCss += `
        .ytp-scrubber-button:hover {
            background: url(${userConfig.scrubberIcon}) no-repeat center !important;
        }
        `
    } if (userConfig.scrubberIconHover !== null) {
        outputCss += `
        .ytp-scrubber-button:hover {
            background: url(${userConfig.scrubberIconHover}) no-repeat center !important;
        }
        `
    } if (userConfig.scrubberPosition !== null) {
        outputCss += `
        .ytp-scrubber-button {
            background-position: ${userConfig.scrubberPosition} !important;
        }
        .ytp-scrubber-button:hover {
            background-position: ${userConfig.scrubberPosition} !important;
        }
        `
    } if (userConfig.scrubberSize !== null) {
        outputCss += `
        .ytp-scrubber-button {
            background-size: ${userConfig.scrubberSize}px !important;
        }
        .ytp-scrubber-button:hover {
            background-size: ${userConfig.scrubberSize}px !important;
        }
        `
    } if (userConfig.scrubberHeight !== null) {
        outputCss += `
        .ytp-scrubber-button {
            height: ${userConfig.scrubberHeight}px !important;
        }
        .ytp-scrubber-button:hover {
            height: ${userConfig.scrubberHeight}px !important;
        }
        `
    } if (userConfig.scrubberWidth !== null) {
        outputCss += `
        .ytp-scrubber-button {
            width: ${userConfig.scrubberWidth}px !important;
        }
        .ytp-scrubber-button:hover {
            width: ${userConfig.scrubberWidth}px !important;
        }
        `
    } if (userConfig.scrubberTop !== null) {
        outputCss += `
        .ytp-scrubber-container {
            top: ${userConfig.scrubberTop}px !important;
        }
        `
    } if (userConfig.scrubberLeft !== null) {
        outputCss += `
        .ytp-scrubber-container {
            left: ${userConfig.scrubberLeft}px !important;
        }
        `
    }
    // output css
    GM_addStyle(outputCss)
}

function startPlayer() {
    // Make sure player part of the script is loaded on "watch" pages.
    // Keep going until we hit it.
    const starter = setInterval(function () {
        switch (userConfig.year) {
            case '2015':
                // IMPORT CSS (if it wasn't already loaded)
                if (loadedPlayerStyle == false) {
                    GM_addStyle(GM_getResourceText(userConfig.year));
                    loadedPlayerStyle = true;
                }

                // IMPORT USER CUSTOMIZATION
                if (customTheme === true) {
                    enableCustomTheme();
                    // .ytp-scrubber-button.ytp-swatch-background-color {
                    //     background-color: transparent !important;
                    // }
                }

                // #################################    
                /// WATCH LATER BUTTON
                var WatchLaterButton = document.getElementsByClassName("ytp-watch-later-button")[0];
                if (WatchLaterButton) {
                    var targetDiv1 = WatchLaterButton.parentElement;
                    var pastDiv1 = document.getElementsByClassName("ytp-subtitles-button")[0];
    
                    moveElement(WatchLaterButton, targetDiv1, pastDiv1);
                }
            break;

            case '2012':
                // IMPORT CSS (if it wasn't already loaded)
                if (loadedPlayerStyle == false) {
                    GM_addStyle(GM_getResourceText(userConfig.year));
                    loadedPlayerStyle = true;
                }

                // IMPORT USER CUSTOMIZATION
                if (customTheme === true) {
                    enableCustomTheme();
                }

                // #################################

                /// WATCH LATER BUTTON
                var WatchLaterButton = document.getElementsByClassName("ytp-watch-later-button")[0];
                if (WatchLaterButton) {
                    var targetDiv1 = WatchLaterButton.parentElement;
                    var pastDiv1 = document.getElementsByClassName("ytp-subtitles-button")[0];
    
                    moveElement(WatchLaterButton, targetDiv1, pastDiv1);
                }
            break;

            case '2010':
                // IMPORT CSS (if it wasn't already loaded)
                if (loadedPlayerStyle == false) {
                    GM_addStyle(GM_getResourceText(userConfig.year));
                    loadedPlayerStyle = true;
                }

                // IMPORT USER CUSTOMIZATION
                if (customTheme === true) {
                    enableCustomTheme();

                    GM_addStyle(`
                    /* someother custom theme stuff for 2010 */

                    .ytp-chrome-controls {
                        border-top: solid 2px #d1d1d180 !important;
                    }

                    .ytp-chrome-bottom .ytp-chrome-controls:before {
                        position: absolute;
                        content:"";
                        height:100%;
                        width:100%;
                        top:0;
                        left:0;
                        background: linear-gradient(rgb(0 0 0 / 35%), rgb(255 255 255 / 35%));
                    }

                    .ytp-chrome-bottom .ytp-button {
                        border: solid 1px rgb(255 255 255 / 35%);
                        background: linear-gradient(rgb(255 255 255 / 35%), rgb(0 0 0 / 35%)) !important;
                    }
                    `)
                }
            break;

            default:
                console.error(`YT-HTML5 ERROR:`, `no userConfig.year is selected, please fix that.`);
            break;
        };

        // End Start Checker
        clearInterval(starter);
    }, 1000);
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

/// Reset settings cuz I've been having to manually do it so many times YOU DON'T KNOW BRO IT GETS TO ME MAN!!!!!!!!!
function resetConfig() {
    GM_setValue(`yt-html5`, def_yt_html5);
    console.log(`YT-HTML5 USER DATA RESET:`, GM_getValue(`yt-html5`));
    alert(`Your YT-HTML5-Player config has been reset, please refresh the page!!!`);
}
unsafeWindow.resetConfig = resetConfig;

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
        case 'input':
            if (values == 'color') {
                return `
                <div class="menu-option">
                    <div class="menu-name">${desc}</div>
                    <div style="position: absolute; right: 14px;">
                        <input type="color" class="menu-input" onchange="changeUserDB('${opinion}', this.value); this.style.background = this.value;" style="background: ${userConfig[opinion] ?? '#ffffff'};" value="${userConfig[opinion] ?? '#ffffff'}">
                        <button class='menu-input-reset' style="width: 2em;" onclick="changeUserDB('${opinion}', null); this.parentElement.children[0].value = '#ffffff'; this.parentElement.children[0].style.background = '#ffffff'; alert('The ${opinion} setting has been reset.')">
                            <img src="https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/reset.png" style="height: 1em;">
                        </button>
                    </div>
                </div>
                `
            } else if (values == 'text') {
                return `
                <div class="menu-option">
                    <div class="menu-name">${desc}</div>
                    <div>
                        <input type="text" class="menu-input" onchange="changeUserDB('${opinion}', this.value)" value="${userConfig[opinion] ??  ''}">
                        <button class='menu-input-reset' style="width: 2em;" onclick="changeUserDB('${opinion}', null); this.parentElement.children[0].value = ''; alert('The ${opinion} setting has been reset.')">
                            <img src="https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/reset.png" style="height: 1em;">
                        </button>
                    </div>
                </div>
                `
            } else if (values == 'pxs') {
                return `
                <div class="menu-option">
                    <div class="menu-name" style="max-width: 12em;">${desc}</div>
                    <div style="position: absolute; right: 14px;">
                        <input type="text" style="width: 4em;" class="menu-input" onchange="changeUserDB('${opinion}', this.value)" value="${userConfig[opinion] ??  ''}">px
                        <button class='menu-input-reset' style="width: 2em;" onclick="changeUserDB('${opinion}', null); this.parentElement.children[0].value = ''; alert('The ${opinion} setting has been reset.')">
                            <img src="https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/reset.png" style="height: 1em;">
                        </button>
                    </div>
                </div>
                `
            } else if (values == 'url') {
                return `
                <div class="menu-option">
                    <div class="menu-name">${desc} (Must be an <kbd>https</kbd> link!)</div>
                    <div>
                        <input type="text" class="menu-input" value="${userConfig[opinion] ??  ''}" onchange="
                        if (this.value.startsWith('https://')) {
                            changeUserDB('${opinion}', this.value)
                        } else {
                            alert(\`That link didn't start in 'https://'!\`)
                        }
                        ">
                        <button class='menu-input-reset' style="width: 2em;" onclick="changeUserDB('${opinion}', null); this.parentElement.children[0].value = ''; alert('The ${opinion} setting has been reset.')">
                            <img src="https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/reset.png" style="height: 1em;">
                        </button>
                    </div>
                </div>
                `
            }
    }
}

/// Get year options for menu
var years = [2015, 2012, 2010];
var yearOptions = '';
years.forEach(element => {
    if (element == userConfig['year']) {
        yearOptions += `<option value="${element}" selected>${element}</option> `
    } else {
        yearOptions += `<option value="${element}">${element}</option> `
    }
});

/// Get user config to display
function getUserConfig() {
    var output = '{';
    var count = 0;
    for (let element in userConfig) {
        count++;
    };
    var counted = 0;
    for (let element in userConfig) {
        counted++
        if (counted == count) {
            if (typeof userConfig[element] !== 'string') {
                output += ` "${element}": ${userConfig[element]}`
            } else if (userConfig[element]) {
                output += ` "${element}": "${userConfig[element]}"`
            }
        } else {
            if (typeof userConfig[element] !== 'string') {
                output += ` "${element}": ${userConfig[element]},`
            } else if (userConfig[element]) {
                output += ` "${element}": "${userConfig[element]}",`
            }
        }
    }
    output += '}'
    console.log(`getUserConfig`, output)
    return output;
};
unsafeWindow.getUserConfig = getUserConfig;

/// Set user config from input element at the bottom of the settings menu
function overWriteUserConfig(input) {
    // Starting vars
    var completedCount = 0;
    var unknownCount = 0;

    var jsonInput;
    try {
        jsonInput = JSON.parse(input);
    } catch (error) {
        alert(`A error happened when trying to set the config! Did you put any extra characters?`)
    }
    
    // Check 
    for (let element in jsonInput) {
        if (def_yt_html5[element] === undefined) {
            unknownCount++;
        } else {
            userConfig[element] = jsonInput[element];
            completedCount++;
        }
    }
    GM_setValue(`yt-html5`, userConfig);

    // Finish
    alert(`User config completed. ${completedCount} settings were written, ${unknownCount} settings were not written`);
    console.log(`overWriteUserConfig input:`, jsonInput);
    console.log(`overWriteUserConfig current config:`, userConfig);
}
unsafeWindow.overWriteUserConfig = overWriteUserConfig;

// Start menu
function startMenu() {
    setTimeout(function () {
        if (!document.getElementById('yt-html5-menu-button') && !document.getElementById(`buttons`)) {
            return;
        } else if (document.getElementById('yt-html5-menu-button')) {
            return;
        } else {
            // Important CSS if it wasn't ported already
            if (loadedMenuStyle == false) {
                GM_addStyle(GM_getResourceText("MENU"));
                loadedMenuStyle = true;
            }

            var collectedUserConfig = getUserConfig();
            document.getElementById(`buttons`).insertAdjacentHTML(
                'afterbegin',

                `<!-- Menu Button -->
                <div id="yt-html5-menu-button">
                    <button id="menu-button" style="height: 40px; width: 40px;" onclick="menuToggle()">
                        <img src="https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/menu-icon.png">
                    </button>
                </div>

                <!-- Menu -->
                <div id="yt-html5-menu" class="menu-off">
                    <a><div class="reload-page">
                        <h3>Reload page for changes to take effect!</h3>
                    </div></a>

                    <h2>YT-HTML5-Player</h2><div class="version"> v${version}</div>

                    <h3>General Settings</h3>

                    ${makeMenuOption(`selection`, `year`, `Change year of Player`, yearOptions)}

                    ${makeMenuOption(`toggle`, `autoplayButton`, `Toggle the Autoplay toggle on the right-side of the player`)}

                    ${makeMenuOption('toggle', 'endScreenToggle', 'Toggle end screen (The buttons that display at the end of a video)')}

                    ${makeMenuOption('toggle', 'embedOtherVideos', 'Toggle the "Show other videos" box in embeds')}

                    <br>

                    <h3>Custom Theme Settings</h3>

                    ${makeMenuOption('toggle', 'customTheme', 'Toggle Custom Theme')}

                    <div id='menu-custom-opinions'></div>

                    <br>

                    <h3>Import, Copy, or Reset Settings</h3>

                    <textarea
                    id="menu-config-selection"
                    style="width: 21.2em; height: 8em; resize: vertical;"
                    >
                        ${collectedUserConfig}
                    </textarea>
                </div>
            `);

            if (userConfig.customTheme === true) {
                document.getElementById(`menu-custom-opinions`).insertAdjacentHTML(
                    `afterbegin`,

                    `
                    <b>
                        Note: You're editing raw CSS values. If something like
                        the Scrubber doesn't seem to appear, try changing the
                        Scrubber size. Else, open up your browser's Developer Tools.
                    </b>
                    ${makeMenuOption('input', 'controlsBack', 'Change the color of the player\'s background', 'color')}

                    ${makeMenuOption('input', 'progressBarColor', 'Change the color of the Progress Bar', 'color')}

                    ${makeMenuOption('input', 'volumeSliderBack', 'Change the color of the Volume Silder', 'color')}
                    <div class='menu-opinion-note'>If you want to use the exact same color as the Progress Bar for the Volume Silder, you don't need to change this value.</div>

                    ${makeMenuOption('input', 'scrubberIcon', 'Change the image of the Scrubber', 'url')}

                    ${makeMenuOption('input', 'scrubberIconHover', 'Change the image of the Scrubber <b>when hovering</b>', 'url')}
                    <div class='menu-opinion-note'>If you want to use the same image for the value above, you don't need to change this value.</div>

                    ${makeMenuOption('input', 'scrubberSize', 'Change the size of the Scrubber', 'pxs')}
                    <div class='menu-opinion-note'>It is recommended to change this if you change the Scrubber icon; start low (Something like <kbd>12</kbd>) then go up</div>

                    ${makeMenuOption('input', 'scrubberHeight', 'Change the height of the Scrubber', 'pxs')}

                    ${makeMenuOption('input', 'scrubberWidth', 'Change the width of the Scrubber', 'pxs')}

                    ${makeMenuOption('input', 'scrubberTop', 'Move the Scrubber down (Make value negative to move up)', 'pxs')}

                    ${makeMenuOption('input', 'scrubberLeft', 'Move the Scrubber right (Make value negative to move left)', 'pxs')}

                    ${makeMenuOption('input', 'scrubberPosition', 'If needed, change the Scrubber image position.', 'text')}
                    <div class='menu-opinion-note'>
                        Example: <kbd>10px (for x) 5px (for y)</kbd>
                        <br>
                        Note this <b>does not</b> change where the
                        Scrubber will be moved to, you still have to
                        play off of all the other sizing settings
                        above.
                    </div>
                    `
                )
            }

            document.getElementById(`menu-config-selection`).insertAdjacentHTML(
                `afterend`,
                
                `
                <button onclick='overWriteUserConfig(document.getElementById(\`menu-config-selection\`).value)'>
                    Apply settings
                </button>

                <br>
                <br>

                <button class="nuke-all" onclick="resetConfig()">
                    THE BIG NUKE BUTTON. (aka reset all settings) NO TURNING BACK WHEN THIS IS PRESSED.
                </button>

                <div class="blank"></div>
            `)

            var currentNote = 1;
            if (userConfig.releaseNote < currentNote || !userConfig.releaseNote) {
                document.getElementById(`buttons`).insertAdjacentHTML(
                    `afterend`,

                    `
                    <!-- Message for first-time users -->
                    <div id="yt-html5-release-notes" class="menu-message">
                        <button onclick="this.parentElement.remove(); changeUserDB('releaseNote', ${currentNote})"><img src='https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/2010%20icons/x-1.png'></button>

                        <h2>YT-HTML5-Player has been updated to v${version}</h2>
                        So what's new?
                        <li>Usable in embeds once again!</li>
                        <li>Reverted back Progress Bar patch + a tiny patch with it.</li>
                        <li>Fixed styling and other stuff.</li>

                        <br>

                        As always, if you have any issues,
                        <a href='https://github.com/ktg5/YT-HTML5-Player/issues'>please report them on the GitHub page!</a>
                        <br>
                        Enjoy!
                    </div>
                    `
                )
            }
        }
    }, 3000)
}