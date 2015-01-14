/*
 * Handles data sent via chrome.extension.sendRequest().
 * @param request Object Data sent in the request.
 * @param sender Object Origin of the request.
 * @param callbackFunction Function The method to call when the request completes.
 */

function onRequest(request, sender, callbackFunction) {
    var url;

    if (request["action"] == "startRecording"){
        url = 'recording/start';
    } else if (request["action"] == "stopRecording"){
        url = 'recording/stop';
    }

    //alert(url);

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() { if (httpRequest.readyState == 4){ /*alert( httpRequest.responseText );*/ } };
    httpRequest.open('GET', "http://localhost:9871/" + url);
    httpRequest.send();
};

/*
 * Add request listener
 */

 chrome.extension.onRequest.addListener(onRequest);
