function loadData() {
	chrome.tabs.executeScript(null,{code:"showSavedData()"});
}

chrome.browserAction.onClicked.addListener(loadData);