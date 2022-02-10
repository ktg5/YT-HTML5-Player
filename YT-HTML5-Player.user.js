// ==UserScript==
// @name         YouTube 2012-15 HTML5 Player
// @namespace    http://ktg5.online/
// @version      1.1dev1
// @description  Try to recreate the old YouTube 2012-2015 player.
// @author       ktg5
// @match        *://*.youtube.com/*
// @icon         https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/favicon.png
// @resource     CSS https://github.com/ktg5/YT-HTML5-Player/raw/dev/style.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function() {

// Most of the work of this script is from the CSS which is located at (CSS link on le GitHub)
const myCss = GM_getResourceText("CSS");
GM_addStyle(myCss);

})();
