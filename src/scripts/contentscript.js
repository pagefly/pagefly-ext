import ext from "./utils/ext";

var extractTags = () => {
	var url = document.location.href;
	if(!url || !url.match(/^http/) || !url.match(/^https/)) 
		return;

	var data = {
		isUsed : false
	}

	var signId = document.querySelector("#__pf");
	if(signId) {
		data.isUsed = true;
	} else {
		data.isUsed = false;
	}

	return data;
}

function onRequest(request, sender, sendResponse) {
	if (request.action === 'process-page') {
		sendResponse(extractTags())
	}
}

ext.runtime.onMessage.addListener(onRequest);