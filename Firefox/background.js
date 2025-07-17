chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("/page/index.html")
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkTab") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const active = tabs[0];
      const msgurl = sender.tab?.url || "";

      var play=active && active.url !== msgurl;
      sendResponse({ play })
    });

    return true;
  }
});
