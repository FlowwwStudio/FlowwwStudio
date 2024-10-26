chrome.runtime.onInstalled.addListener(() => {
  console.log('Webflow Keyword Density extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('.design.webflow.com')) {
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, { action: 'checkWebflowDesigner' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
        }
      });
    }, 1000); // 1 second delay
  }
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes('.design.webflow.com')) {
    chrome.tabs.sendMessage(tab.id, { action: 'toggleKeywordDensity' }, (response) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
    });
  }
});
