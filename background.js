
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case 'toggle':
            toggleSpeed();
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

function toggleSpeed() {
    getCurrentTab().then((currentTab) => {
        chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            function: _toggleSpeed
        });
    });
}

function _toggleSpeed() {
    if (document.querySelector('video').playbackRate != 1.0) {
        document.querySelector('video').playbackRate = 1.0
    } else {
        document.querySelector('video').playbackRate = 2.0
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
