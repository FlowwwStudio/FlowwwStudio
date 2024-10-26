chrome.runtime.onInstalled.addListener(() => {
  console.log('Webflow Keyword Density extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('.webflow.com')) {
    chrome.tabs.sendMessage(tabId, { action: 'checkWebflowDesigner' });
  }
});

