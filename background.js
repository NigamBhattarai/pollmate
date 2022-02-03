var myAudio = new Audio("audio.wav?");
const clicked = new Array();
chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "alert") {
    if (
      request.source.alertType == "poll" ||
      request.source.alertType == "removed" ||
      request.source.alertType == "ended" ||
      request.source.alertType == "unmuted"
    ) {
      myAudio.play();
      var message;
      if (request.source.alertType == "removed") {
        message = "You have been removed from the meeting!";
      } else if (request.source.alertType == "ended") {
        message = "The meeting has ended!";
      } else if (request.source.alertType == "unmuted") {
        message = "You have been unmuted!";
      } else {
        message = "You have a poll waiting";
      }
      chrome.notifications.create(
        sender.tab.id + "_" + request.source.alertType + "_alert",
        {
          type: "basic",
          iconUrl: "logo.png",
          title: sender.tab.title + " [ Poll Mate ]",
          message: message,
          priority: 2,
        }
      );
      chrome.notifications.onClicked.addListener(function (
        notificationID,
        byUser
      ) {
        chrome.tabs.update(sender.tab.id, { selected: true });
      });
    }
  }
});
