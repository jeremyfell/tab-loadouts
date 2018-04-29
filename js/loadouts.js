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
    unselectSwapButton();
    SWAP = false;
    disableEditButton();
    (allSlotsInUse()) ? setEditToOverwrite() : setEditToAdd() ;

  } else {

    if (SELECTED_LOADOUT !== -1) {
      unselectLoadout();
    }

    if (SWAP) {
      swapLoadouts(SELECTED_LOADOUT, loadoutNumber);

    } else {
      SELECTED_LOADOUT = loadoutNumber;
      selectLoadoutButton.classList.add("selected-loadout");

      if (selectLoadoutButton.getAttribute("disabled")) {
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

function highlightButton(shortcutCode) {
  var button = getButtonFromShortcutCode(shortcutCode);

  if (button.getAttribute("disabled") && !button.classList.contains("select-loadout-button")) return;
  button.classList.add("highlighted");
}

function unhighlightButton(shortcutCode) {
  var button = getButtonFromShortcutCode(shortcutCode);
  button.classList.remove("highlighted");
}
