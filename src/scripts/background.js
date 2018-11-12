import ext from "./utils/ext";

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request)
    if(request.action === "perform-save") {
      sendResponse({ action: "saved" });
    }
  }
);