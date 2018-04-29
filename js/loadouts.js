function openLoadout(loadoutNumber) {
  var loadoutButton = document.getElementById("open-loadout-" + String(loadoutNumber));
  if (loadoutButton.getAttribute("disabled")) return;

  var currentLoadoutLinks = LOADOUTS[String(loadoutButton.dataset.index)].links;
  if (currentLoadoutLinks.length === 0) return;

  chrome.tabs.getAllInWindow(null, function(tabs) {
    var tabIds = [];

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

    // Closes the extension popup
    window.close();
  });

}

function configureLoadoutButtons() {
  openLoadoutButtons = document.getElementsByClassName("open-loadout-button");
  selectLoadoutButtons = document.getElementsByClassName("select-loadout-button");

  for (var i = 0; i < 10; i++) {
    if (LOADOUTS[i]) {
      // Sets title to the corresponding loadout name
      openLoadoutButtons[i].title = LOADOUTS[i].name;
      selectLoadoutButtons[i].title = LOADOUTS[i].name;
    } else {
      // Disables unused loadout buttons
      openLoadoutButtons[i].setAttribute("disabled", "true");
      selectLoadoutButtons[i].setAttribute("disabled", "true");
    }

    // Adds click event to open the corresponding loadout
    openLoadoutButtons[i].addEventListener("click", function() {
      openLoadout(parseInt(this.id.slice(-1)));
    });

    selectLoadoutButtons[i].addEventListener("click", function() {
      selectLoadout(parseInt(this.id.slice(-1)));
    });

  }
}

function configureSelectButton(selectButton) {

  selectButton.addEventListener("click", function() {

    if (this.getAttribute("disabled")) {

    } else {

    }

  });

}


function selectLoadout(loadoutNumber) {
  var selectLoadoutButton = document.getElementById("select-loadout-" + String(loadoutNumber));
  if (loadoutNumber === SELECTED_LOADOUT) {
    SELECTED_LOADOUT = -1;
    selectLoadoutButton.classList.remove("selected-loadout");
    disableDeleteButton();
    disableSwapButton();

  } else {

    if (SELECTED_LOADOUT !== -1) {
      document.getElementById("select-loadout-" + String(SELECTED_LOADOUT)).classList.remove("selected-loadout");
    }

    SELECTED_LOADOUT = loadoutNumber;
    selectLoadoutButton.classList.add("selected-loadout");

    if (selectLoadoutButton.getAttribute("disabled")) {
      disableDeleteButton();
      disableSwapButton();
    } else {
      enableDeleteButton();
      enableSwapButton();
    }

  }

}



// Highlights a loadout button when the corresponding keyboard number is pressed
function highlightButton(loadoutNumber, color) {
  var hex = COLORS[color];

  if (loadoutNumber === 10) {
      if (HOME) {
        document.getElementById("open-options-button").style.backgroundColor = hex;
      } else {
        document.getElementById("close-options-button").style.backgroundColor = hex;
      }
  } else {
    var loadoutButton;
    if (HOME) {
      loadoutButton = document.getElementById("open-loadout-" + String(loadoutNumber));
    } else {
      loadoutButton = document.getElementById("select-loadout-" + String(loadoutNumber));
    }
    if (loadoutButton.getAttribute("disabled")) return;
    loadoutButton.style.backgroundColor = hex;
  }
}

// Returns the number 0-9 if a number is pressed above the keyboard, or in the numpad
// Returns 10 if a dash was pressed, as a shortcut for options
// Returns -1 for any other key
function getLoadoutNumberFromKeyPress(e) {

  if (e.which >= CHARCODE_MIN_NUMBER && e.which <= CHARCODE_MAX_NUMBER) {
    // Key pressed was 0-9
    return e.which - CHARCODE_MIN_NUMBER;
  } else if (e.which >= CHARCODE_MIN_NUMPAD && e.which <= CHARCODE_MAX_NUMPAD) {
    // Key pressed was 0-9 on the numpad
    return e.which - CHARCODE_MIN_NUMPAD;
  } else if (e.which === CHARCODE_HYPHEN) {
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
  highlightButton(loadoutNumber, "blue");

});

// On key up, if a number is pressed, open the corresponding tab loadout
// On key up, if a dash is pressed, open options
document.addEventListener("keyup", function(e) {

  loadoutNumber = getLoadoutNumberFromKeyPress(e);
  if (loadoutNumber === -1) return;

  if (HOME) {
    (loadoutNumber === 10) ? openEditTab() : openLoadout(loadoutNumber);
  } else {
    (loadoutNumber === 10) ? closeEditTab() : selectLoadout(loadoutNumber)
  }

});
