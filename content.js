function onInjectContentScript() {
    // Injected content script
    console.log("Injected content script");
    let ytdApp = document.getElementsByTagName("ytd-app")[0];
    console.log(ytdApp);
    let popupContainer = document.getElementsByTagName("ytd-popup-container")[0];
    if (popupContainer != null  && popupContainer != undefined){
        popupContainer.remove();
    }
    ytdPopupContainerMutationObserver.observe(ytdApp, { childList: true });
}

function ytdAppMutationCallback(mutationList, observer) {
    let ytdApp = document.getElementsByTagName("ytd-app")[0];
    for (const mutation of mutationList) {
        if (mutationList.type == 'childList') {
            //for every added node check if its ytd-popup-container
            console.log('A child node has been added or removed.');
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.nodeName == "YTD-POPUP-CONTAINER") {
                    console.log("ytd-popup-container added");
                    addedNode.remove();
                }
            }
        }
    }
}

var ytdPopupContainerMutationObserver = new MutationObserver(ytdAppMutationCallback);

onInjectContentScript();