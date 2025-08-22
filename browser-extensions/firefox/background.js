
// Show sign in popup when extension is installed
browser.runtime.onInstalled.addListener(() => {
  browser.windows.create({
    url: "signin.html",
    type: "popup",
    width: 400,
    height: 300
  });
});


const transactionalKeywords = [
  "amazon", "ebay", "walmart", 
  "target", "bestbuy", "etsy",
  "shopify"
];

const tabUrls = {};

browser.webNavigation.onBeforeNavigate.addListener(details => {
  if (details.frameId === 0) {
    tabUrls[details.tabId] = details.url;
  }
});

browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (removeInfo.isWindowClosing) {
    return;
  }

  const url = tabUrls[tabId];
  if (url) {
    const urlObject = new URL(url);
    if (transactionalKeywords.some(keyword => urlObject.hostname.includes(keyword))) {
      browser.windows.create({
        url: "popup.html",
        type: "popup",
        width: 400,
        height: 300
      });
    }
    delete tabUrls[tabId];
  }
});