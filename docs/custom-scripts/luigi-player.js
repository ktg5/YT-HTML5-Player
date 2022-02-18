// How to install:
// Go into the Tampermonkey panel on your toolbar.
// Locate the YouTube Player script and click on it,
// then choose "Edit". Then copy the code below into
// the parts of the script where the variables are
// located. Should be simple enough.

/// Progress bar
var progressBarColor = "#1fba22"; // Default: #b91f1f
var volumeSliderBack = "#1fba22"; // Default: #b91f1f

/// Scrubber icon
var scrubberIcon = "https://i.imgur.com/hJbFUyj.gif" // Default: https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/scrubber.png
var scrubberPosition = "-3px 0px" // Default: 0px 0px
var scrubberSize = "36" // If changed, change the "scrubberTop" value to whatever looks centered for you. | Default: 18

var scrubberHeight = "24"
var scrubberWidth = "30"

var scrubberTop = "-2" // Default: 1