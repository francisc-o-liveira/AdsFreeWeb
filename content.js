(function () {
    chrome.storage.sync.get(['isFeatureActive'], function (result) {
        if (result.isFeatureActive) {
            log("Feature is active");
            initializeAdBlocker();
        }
    });

    const isPopupBlockerActive = true;
    const isLoggingActive = true;

    log("Script started");

    if (isPopupBlockerActive) blockPopups();

    function blockPopups() {
        log("blockPopups() active");

        setInterval(() => {
            // Generic overlay and popup selectors
            const overlays = document.querySelectorAll("[class*='overlay'], [id*='overlay']");
            const popups = document.querySelectorAll("[class*='popup'], [id*='popup'], [class*='modal'], [id*='modal']");
            const closeButtons = document.querySelectorAll("[class*='close'], [id*='close'], [aria-label*='close'], button");

            // Allow scrolling
            document.body.style.setProperty('overflow-y', 'auto', 'important');

            overlays.forEach((overlay) => overlay.remove());
            popups.forEach((popup) => popup.remove());

            closeButtons.forEach((button) => {
                if (button.innerText.toLowerCase().includes('close') || button.getAttribute('aria-label')?.toLowerCase().includes('close')) {
                    button.click();
                }
            });

            log("Popups and overlays removed");
        }, 1000);
    }

    function initializeAdBlocker() {
        log("initializeAdBlocker()");

        setInterval(() => {
            const adElements = document.querySelectorAll("[class*='ad'], [id*='ad'], [class*='sponsor'], [id*='sponsor']");
            adElements.forEach((ad) => {
                ad.style.display = "none";
                log("Ad removed", "info", ad);
            });

            const skipButtons = document.querySelectorAll("[class*='skip'], [id*='skip'], button");
            skipButtons.forEach((button) => {
                if (button.innerText.toLowerCase().includes('skip')) {
                    button.click();
                    log("Skip button clicked", "info", button);
                }
            });
        }, 500);
    }

    function log(message, level = 'info', ...args) {
        if (!isLoggingActive) return;

        const prefix = 'UniversalBlocker:';
        const formattedMessage = `${prefix} ${message}`;
        switch (level) {
            case 'error':
                console.error(formattedMessage, ...args);
                break;
            case 'warn':
                console.warn(formattedMessage, ...args);
                break;
            case 'info':
                console.info(formattedMessage, ...args);
                break;
            default:
                console.log(formattedMessage, ...args);
        }
    }
})();
