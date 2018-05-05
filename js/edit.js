function openEditTab() {
  unhighlightAllButtons();

  document.body.className = "edit-body";
  document.getElementById("select-tab").classList.add("invisible");
  document.getElementById("edit-tab").classList.remove("invisible");

  CURRENT_TAB_IS_SELECT = false;
}

function closeEditTab() {
  disableAndUnselectAllButtons();
  unhighlightAllButtons();

  document.body.className = "select-body";
  document.getElementById("select-tab").classList.remove("invisible");
  document.getElementById("edit-tab").classList.add("invisible");

  CURRENT_TAB_IS_SELECT = true;
}

function deleteLoadout(loadoutNumber) {
  if (loadoutNumber === -1) return;

  removeLoadoutFromLocalStorage(loadoutNumber);
  disableOpenLoadoutButton(loadoutNumber);
  disableSelectLoadoutButton(loadoutNumber);

  disableAndUnselectAllButtons();
}

function saveLoadout(loadoutNumber) {
  if (loadoutNumber === -1) return;

  saveLoadoutToLocalStorage(loadoutNumber);
  enableOpenLoadoutButton(loadoutNumber);
  enableSelectLoadoutButton(loadoutNumber);

  disableAndUnselectAllButtons();
}

function swapLoadouts(loadoutNumber1, loadoutNumber2) {
  var storageChanges = {};
  var index1 = loadoutNumberToIndex(loadoutNumber1);
  var index2 = loadoutNumberToIndex(loadoutNumber2);
  var loadout1 = LOADOUTS[index1];

  SWAPPING_LOADOUTS = false;

  storageChanges[String(loadoutNumber2)] = loadout1;

  if (LOADOUTS[index2]) {
    // Switch an existing loadout with another existing loadout
    var loadout2 = LOADOUTS[index2];

    storageChanges[String(loadoutNumber1)] = loadout2;

    LOADOUTS[index1] = loadout2;
    LOADOUTS[index2] = loadout1;

    chrome.storage.local.set(storageChanges, function() {

      disableAndUnselectAllButtons();

      setOpenLoadoutButtonTitle(loadoutNumber1, loadout2.name);
      setOpenLoadoutButtonTitle(loadoutNumber2, loadout1.name);
      setSelectLoadoutButtonTitle(loadoutNumber1, loadout2.name);
      setSelectLoadoutButtonTitle(loadoutNumber2, loadout1.name);

    });

  } else {
    // Switch an existing loadout with an empty slot
    LOADOUTS[index2] = loadout1;
    LOADOUTS[index1] = null;

    chrome.storage.local.set(storageChanges, function() {
      chrome.storage.local.remove(String(loadoutNumber1), function() {

        disableAndUnselectAllButtons();

        disableOpenLoadoutButton(loadoutNumber1);
        disableSelectLoadoutButton(loadoutNumber1);
        enableOpenLoadoutButton(loadoutNumber2);
        enableSelectLoadoutButton(loadoutNumber2);

        setOpenLoadoutButtonTitle(loadoutNumber1, "");
        setOpenLoadoutButtonTitle(loadoutNumber2, loadout1.name);
        setSelectLoadoutButtonTitle(loadoutNumber1, "");
        setSelectLoadoutButtonTitle(loadoutNumber2, loadout1.name);

      });
    });
  }
}

function openInfo() {
  chrome.tabs.create({url: "../html/info.html"});
}
