if ("undefined" == typeof(PBXRecording)) {
  var PBXRecording = {};
};

/**
 * Controls the browser overlay for the Ctalk Recording extension.
 */
PBXRecording.BrowserOverlay = {

  startPrivacy : function(aEvent) {
	console.log("stopRecording");
	this.sendCommandToToolbar("stopRecording");
  },


  stopPrivacy : function(aEvent) {
	console.log("startRecording");
	this.sendCommandToToolbar("startRecording");
  },

  sendCommandToToolbar : function(method) {
    chrome.extension.sendRequest({'action': method}, function() {});
  }

};

var PBXRecordingRunning = true;

window.addEventListener ("load", myMain, false);
window.addEventListener ("DOMSubtreeModified", myMain, false);

function myMain (evt) {
    var li = document.getElementById('payment');
	if (li){
		if (li.className == "current"){
			if (PBXRecordingRunning){
				console.log("Stop the recordings...");
				PBXRecording.BrowserOverlay.startPrivacy("");
				PBXRecordingRunning = false;
			}
		} else {
			if (!PBXRecordingRunning){
				console.log("Start the recording...");
				PBXRecording.BrowserOverlay.stopPrivacy("");
				PBXRecordingRunning = true;
			}
		}
	}
}
