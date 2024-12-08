document.addEventListener('DOMContentLoaded', function () {
    const adBlockToggle = document.getElementById('enableExtension');
    const refreshPageButton = document.getElementById('reloadPage');

    chrome.storage.sync.get(['featureEnabled'], function (result) {
        adBlockToggle.checked = result.featureEnabled || false;
    });

    adBlockToggle.addEventListener('change', function () {
        chrome.storage.sync.set({ 'featureEnabled': this.checked }, function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });

    refreshPageButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const popUpBlockToggle = document.getElementById('enableExtension2');

    chrome.storage.sync.get(['popUpBlockerEnabled'], function (result) {
        popUpBlockToggle.checked = result.popUpBlockerEnabled || false;
    });

    popUpBlockToggle.addEventListener('change', function () {
        chrome.storage.sync.set({ 'popUpBlockerEnabled': this.checked }, function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const bannerBlockToggle = document.getElementById('enableExtension3');

    chrome.storage.sync.get(['bannerBlockerEnabled'], function (result) {
        bannerBlockToggle.checked = result.bannerBlockerEnabled || false;
    });

    bannerBlockToggle.addEventListener('change', function () {
        chrome.storage.sync.set({ 'bannerBlockerEnabled': this.checked }, function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});

