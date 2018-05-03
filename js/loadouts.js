function configureLoadoutButtons() {
  var openLoadoutButtons = document.getElementsByClassName("open-loadout-button");
  var selectLoadoutButtons = document.getElementsByClassName("select-loadout-button");

  for (let i = 0; i < 10; i++) {
    if (LOADOUTS[i]) {
      // Sets title to the corresponding loadout name
      openLoadoutButtons[i].title = LOADOUTS[i].name;
      selectLoadoutButtons[i].title = LOADOUTS[i].name;
    } else {
      // Disables unused loadout buttons
      openLoadoutButtons[i].setAttribute("disabled", "true");
      selectLoadoutButtons[i].classList.add("free");
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

function openLoadout(loadoutNumber) {
  var openLoadoutButton = document.getElementById("open-loadout-" + String(loadoutNumber));
  if (openLoadoutButton.getAttribute("disabled")) return;

  var currentLoadoutLinks = LOADOUTS[loadoutNumberToIndex(loadoutNumber)].links;
  if (currentLoadoutLinks.length === 0) return;

  if (SHIFT_IS_PRESSED && CONTROL_IS_PRESSED) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      // Gets the tab position of the current selected tab
      var currentTabIndex = tabs[0].index;

      // Creates new tabs after the current selected tab in the window
      for (let i = 0; i < currentLoadoutLinks.length; i++) {
        chrome.tabs.create({url: currentLoadoutLinks[i], active: false, index: currentTabIndex + i + 1})
      }

      closePopup();
    });

  } else if (SHIFT_IS_PRESSED) {

    // Creates new tabs after the last tab in the window
    for (let i = 0; i < currentLoadoutLinks.length; i++) {
      chrome.tabs.create({url: currentLoadoutLinks[i], active: false});
    }

    closePopup();

  } else {

    chrome.tabs.getAllInWindow(null, function(tabs) {
      // Removes all tabs in the current window except for the first tab
      var tabIds = [];

      if (tabs.length > 1) {

        for (let i = 1; i < tabs.length; i++) {
          tabIds.push(tabs[i].id);
        }

        chrome.tabs.remove(tabIds);
      }

      // Updates the first tab
      chrome.tabs.update(tabs[0].id, {url: currentLoadoutLinks[0], active: true});

      // Creates the rest of the new tabs
      for (let i = 1; i < currentLoadoutLinks.length; i++) {
        chrome.tabs.create({url: currentLoadoutLinks[i], active: false});
      }

      closePopup();
    });

  }
}

function selectLoadout(loadoutNumber) {
  var selectLoadoutButton = document.getElementById("select-loadout-" + String(loadoutNumber));
  if (loadoutNumber === SELECTED_LOADOUT) {

    disableAndUnselectAllButtons();
    document.activeElement.blur();

  } else {

    if (SELECTED_LOADOUT !== -1) {
      unselectLoadout();
    }

    if (SWAPPING_LOADOUTS) {

        swapLoadouts(SELECTED_LOADOUT, loadoutNumber);

    } else {

      SELECTED_LOADOUT = loadoutNumber;
      selectLoadoutButton.classList.add("selected-loadout");

      if (selectLoadoutButton.classList.contains("free")) {
        disableDeleteButton();
        disableSwapButton();
        setEditToAdd();
      } else {
        enableDeleteButton();
        enableSwapButton();
        setEditToOverwrite();
      }
      enableEditButton();
    }
  }
}
