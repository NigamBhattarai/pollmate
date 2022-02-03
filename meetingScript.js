window.onload = loaded();
function loaded() {
  if (document.querySelector("#frame") != null)
    if (confirm("Do you want to leave this page and go to Poll Mate mode?")) {
      window.location.href = document.querySelector("#frame").src;
    }
  startRequest();
}
var sent = false;
function startRequest() {
  var source = document.querySelector("html").innerHTML,
    pollVal = source.includes('data-test="pollingContainer"'),
    removeVal = source.includes("You have been removed from the meeting"),
    endVal = source.includes("This session was ended by"),
    unmuteVal = source.includes('button aria-label="Mute"');
  if (pollVal || removeVal || endVal || unmuteVal) {
    if (!sent) {
      var type = "poll";
      if (pollVal) {
        type = "poll";
      } else if (removeVal) {
        type = "removed";
      } else if (endVal) {
        type = "ended";
      } else if (unmuteVal) {
        type = "unmuted";
      }
      chrome.runtime.sendMessage({
        action: "alert",
        source: { alertType: type },
      });
      sent = true;
    }
  } else {
    sent = false;
  }
  timeout = setTimeout(startRequest, 1000);
}
