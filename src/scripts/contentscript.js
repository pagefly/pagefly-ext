import ext from './utils/ext'

var extractTags = () => {
  console.log('process page....', document, location)
  var url = document.location.href
  if (!url || !url.match(/^http/) || !url.match(/^https/))
    return

	var data = {
		isUsed : false
	}

  data.isUsed = (document.querySelector('#__pf'))

  return data
}

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    if (request.activeTab && request.activeTab.url === document.location.href) {
      sendResponse(extractTags())
    }
  }
}

ext.runtime.onMessage.addListener(onRequest)
