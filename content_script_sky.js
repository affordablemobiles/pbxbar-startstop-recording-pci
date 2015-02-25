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

var PBXRecordingEvents = [];

function attachOnFocusHandler(item) {
	if (!PBXRecordingEvents[item.name]){
		PBXRecordingEvents[item.name] = [];
	}
	if (!PBXRecordingEvents[item.name]["focusin"]){
		item.addEventListener("focusin", function() {
			PBXRecording.BrowserOverlay.startPrivacy("");
		});
		PBXRecordingEvents[item.name]["focusin"] = true;
		console.log("Added focus-in handler");
	}
	if (!PBXRecordingEvents[item.name]["focusout"]){
		item.addEventListener("focusout", function() {
			PBXRecording.BrowserOverlay.stopPrivacy("");
		});
		PBXRecordingEvents[item.name]["focusout"] = true;
		console.log("Added focus-out handler");
	}
}

window.addEventListener ("load", myMain, false);
window.addEventListener ("DOMSubtreeModified", myMain, false);

function myMain (evt) {
    // DO YOUR STUFF HERE.

    var doc = document.body;
    //PBXRecording.BrowserOverlay.stopPrivacy("");

	var nodes = doc.querySelectorAll("input, select");
	
	//alert('hooking values');

    var nameArray = ["displayCardNumber","displaySecurityCode"];

    for (var i = 0; i < nodes.length; ++i) {
        var item = nodes[i];
        if(nameArray.indexOf(item.name) != -1) {
            attachOnFocusHandler(item);
        }
    }
}
