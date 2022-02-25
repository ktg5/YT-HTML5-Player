/* This JS script is used for making sure
some 3rd-party scripts work with this script
correctly.

If you have any plugins/scripts you'd like to
be fixed for this script, please send a issue
on the GitHUb repo! Much thanks! */

/* Annotations Restored */
var SponsorBlockElement = document.getElementById('previewbar');
if (SponsorBlockElement) {
    var targetDiv = SponsorBlockElement.nextSibling.nextSibling
    var pastDiv = SponsorBlockElement.parentElement

    targetDiv.appendChild(pastDiv.removeChild(SponsorBlockElement));
}