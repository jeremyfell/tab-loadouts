HOTKEY_LOADOUTS = [
  {
    name: "testing",
    hotkey: 1,
    links: [
      "https://www.w3schools.com/jsref/met_win_prompt.asp",
      "https://www.reddit.com/r/mealtimevideos/",
      "https://developer.chrome.com/extensions/tabs#method-create",
      "https://www.reddit.com/r/videos/",
    ]
  }

  , null, 3, 4, null, null, null, null, null, null
]

function disableUnusedLoadoutNumbers() {
  loadoutButtons = document.getElementsByClassName("loadout-button");
  for (var i = 0; i < 10; i++) {
    if (!HOTKEY_LOADOUTS[i]) loadoutButtons[i].setAttribute("disabled", "true");
  }
}

function addLoadoutButtonClickEvents() {
  loadoutButtons = document.getElementsByClassName("loadout-button");

  for (var i = 0; i < 10; i++) {
    loadoutButtons[i].addEventListener("click", function() {
      openLoadout(parseInt(this.id[this.id.length - 1]));
    });
  }
}

function openLoadout(loadoutNumber) {
  if (document.getElementById("open-loadout-" + String(loadoutNumber)).getAttribute("disabled")) return;
  currentLoadoutLinks = HOTKEY_LOADOUTS[(loadoutNumber + 9) % 10].links;
  if (currentLoadoutLinks.length === 0) return;

  chrome.tabs.getAllInWindow(null, function(tabs) {
    var tabIds = []

    // Removes all tabs in the current window except for the first tab
    if (tabs.length > 1) {

      for (var i = 1; i < tabs.length; i++) {
        tabIds.push(tabs[i].id);
      }

      chrome.tabs.remove(tabIds);
    }

    // Updates the first tab, and creates new tabs, to create the tab loadout
    chrome.tabs.update(tabs[0].id, {url: currentLoadoutLinks[0]})

    for (var i = 1; i < currentLoadoutLinks.length; i++) {
      chrome.tabs.create({url: currentLoadoutLinks[i]});
    }

  });

}


function openSettings() {
}


function highlightButton(loadoutNumber) {
  if (loadoutNumber === 10) {
      document.getElementById("open-settings").style.backgroundColor = "#75A4F4";
    } else {
    var loadoutButton = document.getElementById("open-loadout-" + String(loadoutNumber));
    if (loadoutButton.getAttribute("disabled")) return;
    loadoutButton.style.backgroundColor = "#75A4F4";
  }
}

function getLoadoutNumberFromKeyPress(e) {
  if (e.which >= 48 && e.which <= 57) {
    // Key pressed was 0-9
    return e.which - 48;
  } else if (e.which >= 96 && e.which <= 105) {
    // Key pressed was 0-9 on the numpad
    return e.which - 96
  } else if (e.which === 189) {
    // Key pressed was '-', which is a shortcut for settings
    return 10;
  } else {
    // Some other key was pressed
    return -1;
  }
}

document.addEventListener("keydown", function(e) {
  loadoutNumber = getLoadoutNumberFromKeyPress(e);
  if (loadoutNumber === -1) return;
  highlightButton(loadoutNumber);

});

document.addEventListener("keyup", function(e) {

  loadoutNumber = getLoadoutNumberFromKeyPress(e);
  if (loadoutNumber === -1) return;
  (loadoutNumber === 10) ? openSettings() : openLoadout(loadoutNumber);

});


addLoadoutButtonClickEvents();
disableUnusedLoadoutNumbers();
