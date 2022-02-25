// How to install:
// Go into the Tampermonkey panel on your toolbar.
// Locate the YouTube Player script and click on it,
// then choose "Edit". Then copy the code below into
// the parts of the script where the variables are
// located. Should be simple enough.

/// Progress bar
var progressBarColor = "#dd90c3"; // Default: #b91f1f
var volumeSliderBack = "#dd90c3"; // Default: #b91f1f

/// Scrubber icon
var scrubberIcon = "https://i.imgur.com/KNcGM0f.png" // Default: https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/scrubber.png
var scrubberIconHover = "https://i.imgur.com/KNcGM0f.png" // Default: https://raw.githubusercontent.com/ktg5/YT-HTML5-Player/main/img/scrubber-hover.png

var scrubberPosition = "0px 0px" // Default: 0px 0px
var scrubberSize = "20" // If changed, change the "scrubberTop" value to whatever looks centered for you. | Default: 18

var scrubberHeight = "20"
var scrubberWidth = "20"

var scrubberTop = "1" // Default: 1