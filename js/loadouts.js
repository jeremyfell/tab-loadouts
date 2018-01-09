function openLoadout(loadoutNumber) {
  if (document.getElementById("open-loadout-" + String(loadoutNumber)).getAttribute("disabled")) return;

  var currentLoadoutLinks = HOTKEY_LOADOUTS[(loadoutNumber + 9) % 10].links;
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
    chrome.tabs.update(tabs[0].id, {url: currentLoadoutLinks[0], active: true})

    for (var i = 1; i < currentLoadoutLinks.length; i++) {
      chrome.tabs.create({url: currentLoadoutLinks[i], active: false});
    }

    window.close();
  });

}

function configureLoadoutButtons() {
  loadoutButtons = document.getElementsByClassName("loadout-button");

  for (var i = 0; i < 10; i++) {
    // Disables unused loadout buttons
    if (!HOTKEY_LOADOUTS[i]) loadoutButtons[i].setAttribute("disabled", "true");

    // Adds click event to open the corresponding loadout
    loadoutButtons[i].addEventListener("click", function() {
      openLoadout(parseInt(this.id[this.id.length - 1]));
    });

    // Sets title to the corresponding loadout name
    if (HOTKEY_LOADOUTS[i]) loadoutButtons[i].title = HOTKEY_LOADOUTS[i].name;

  }
}

// Highlights a loadout button when the corresponding keyboard number is pressed
function highlightButton(loadoutNumber) {
  if (loadoutNumber === 10) {
      document.getElementById("open-options").style.backgroundColor = "#75A4F4";
  } else {
    var loadoutButton = document.getElementById("open-loadout-" + String(loadoutNumber));
    if (loadoutButton.getAttribute("disabled")) return;
    loadoutButton.style.backgroundColor = "#75A4F4";
  }
}

// Returns the number 0-9 if a number is pressed above the keyboard, or in the numpad
// Returns 10 if a dash was pressed, as a shortcut for options
// Returns -1 for any other key
function getLoadoutNumberFromKeyPress(e) {
  if (e.which >= 48 && e.which <= 57) {
    // Key pressed was 0-9
    return e.which - 48;
  } else if (e.which >= 96 && e.which <= 105) {
    // Key pressed was 0-9 on the numpad
    return e.which - 96
  } else if (e.which === 189) {
    // Key pressed was '-', which is a shortcut for options
    return 10;
  } else {
    // Some other key was pressed
    return -1;
  }
}

// On key down, if a number is pressed, highlight its corresponding button
document.addEventListener("keydown", function(e) {

  loadoutNumber = getLoadoutNumberFromKeyPress(e);
  if (loadoutNumber === -1) return;
  highlightButton(loadoutNumber);

});

// On key up, if a number is pressed, open the corresponding tab loadout
// On key up, if a dash is pressed, open options
document.addEventListener("keyup", function(e) {

  loadoutNumber = getLoadoutNumberFromKeyPress(e);
  if (loadoutNumber === -1) return;
  (loadoutNumber === 10) ? openOptions() : openLoadout(loadoutNumber);

});
