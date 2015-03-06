if ("undefined" == typeof(PBXRecordingSky)) {
  var PBXRecordingSky = {};
};

/**
 * Controls the browser overlay for the Ctalk Recording extension.
 */
PBXRecordingSky.BrowserOverlay = {

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

var PBXRecordingSkyRunning = true;

window.addEventListener ("load", PBXRecordingSkyMyMain, false);
window.addEventListener ("DOMSubtreeModified", PBXRecordingSkyMyMain, false);

function PBXRecordingSkyMyMain (evt) {
    var li = document.getElementById('payment');
	if (li){
		if (li.className == "current"){
			if (PBXRecordingSkyRunning){
				console.log("Stop the recordings...");
				PBXRecordingSky.BrowserOverlay.startPrivacy("");
				PBXRecordingSkyRunning = false;
			}
		} else {
			if (!PBXRecordingSkyRunning){
				console.log("Start the recording...");
				PBXRecordingSky.BrowserOverlay.stopPrivacy("");
				PBXRecordingSkyRunning = true;
			}
		}
	}
}
