// On chrome first startup, open all tabs located in Init folder in bookmarks and group to a single tab group

chrome.runtime.onStartup.addListener(() => {
  chrome.bookmarks.search({ title: "Init" }, (folders) => {
    if (folders.length > 0) {
      chrome.bookmarks.getChildren(folders[0].id, (initBookmarks) => {
        initBookmarks.forEach((bookmark) => {
          if (bookmark.url) {
            chrome.tabs.create({ url: bookmark.url });
          }
        });

        // Check if all tabs are created
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
          const tabIds = tabs.map(tab => tab.id);
          chrome.tabs.group({ tabIds: tabIds }, (groupId) => {
             chrome.tabGroups.update(groupId, {
                title: "",
                color: "blue"
             });
          });

	  // Remove default tab
          chrome.tabs.remove(tabs[0].id);

	  // Open a new empty tab
	  chrome.tabs.create({
     	    url: "chrome://apps/"
	  });
        });
      });
    } 
  });
});