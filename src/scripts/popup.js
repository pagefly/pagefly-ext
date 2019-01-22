import ext from './utils/ext'
import storage from './utils/storage'

var popup = document.getElementById('app')
storage.get('color', function (resp) {
  var color = resp.color
  if (color) {
    popup.style.backgroundColor = color
  }
})

var renderMessage = (message) => {
  var displayContainer = document.getElementById('display-container')
  displayContainer.innerHTML = `<p class='message'>${message}</p>`
}

var renderBookmark = (data) => {
  console.log('data', data)
  if (data && data.isUsed) {
    const {isUsed} = data
    if (isUsed === 'PageFly') {
      renderMessage('This page is using PageFly.')
    } else if (isUsed === 'Shogun') {
      renderMessage('This page is using Shogun.')
    } else if (isUsed === 'Gempage') {
      renderMessage('This page is using GemPage.')
    } else {
      renderMessage('This page does not use any page builder app.')
    }
  } else {
    renderMessage('This page does not use any page builder app.')
  }
}

ext.tabs.query({active: true, currentWindow: true}, function (tabs) {
  var activeTab = tabs[0]
  chrome.tabs.sendMessage(activeTab.id, {action: 'process-page', activeTab}, renderBookmark)
})

var optionsLink = document.querySelector('.js-options')
optionsLink.addEventListener('click', function (e) {
  e.preventDefault()
  ext.tabs.create({'url': ext.extension.getURL('options.html')})
})