if ("undefined" == typeof(PBXRecording)) {
  var PBXRecording = {};
};

/**
 * Controls the browser overlay for the Ctalk Recording extension.
 */
PBXRecording.BrowserOverlay = {

  startPrivacy : function(aEvent) {
	this.sendCommandToToolbar("stopRecording");
  },


  stopPrivacy : function(aEvent) {
	this.sendCommandToToolbar("startRecording");
  },

  sendCommandToToolbar : function(method) {
    chrome.extension.sendRequest({'action': method}, function() {});
  }

};

function attachOnFocusHandler(item) {
	item.onfocus = function() {
		PBXRecording.BrowserOverlay.startPrivacy("");
	}
}

window.addEventListener ("load", PBXRecordingMyMain, false);

function PBXRecordingMyMain (evt) {
    
    var doc = document.body;
    PBXRecording.BrowserOverlay.stopPrivacy("");

	var nodes = doc.querySelectorAll("input, select");

    var nameArray = ["ccname","cctype","ccnum","ccsecnum","ccmval","ccyval","ccmexp","ccyexp","issue","bankaccname","banknum","banksort","bankname","bankadd1","bankyears","bankmonths"];

    for (var i = 0; i < nodes.length; ++i) {
        var item = nodes[i];
        if(nameArray.indexOf(item.name) != -1) {
            attachOnFocusHandler(item);
        }
    }
}
