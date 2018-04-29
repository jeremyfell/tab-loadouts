function deleteLoadout(loadoutNumber) {
  if (loadoutNumber === -1) return;
  removeLoadoutFromLocalStorage(loadoutNumber);
  disableOpenLoadoutButton(loadoutNumber);
  disableSelectLoadoutButton(loadoutNumber);
  unselectLoadout();
  setEditToAdd();
  disableEditButton();
  disableSwapButton();
  disableDeleteButton();
}

function saveLoadout(loadoutNumber) {
  if (loadoutNumber === -1) return;
  saveLoadoutToLocalStorage(loadoutNumber);
  enableOpenLoadoutButton(loadoutNumber);
  enableSelectLoadoutButton(loadoutNumber);
  unselectLoadout();
  (allSlotsInUse()) ? setEditToOverwrite() : setEditToAdd();
  disableEditButton();
  disableSwapButton();
  disableDeleteButton();
}

function swapLoadouts(loadoutNumber1, loadoutNumber2) {
  var newTabLoadouts = {};
  var index1 = loadoutNumberToIndex(loadoutNumber1);
  var index2 = loadoutNumberToIndex(loadoutNumber2);

  var loadout1 = LOADOUTS[index1];
  newTabLoadouts[String(loadoutNumber2)] = loadout1;

  if (LOADOUTS[index2]) {

    var loadout2 = LOADOUTS[index2];
    newTabLoadouts[String(loadoutNumber1)] = loadout2;

    LOADOUTS[index1] = LOADOUTS[index2];
    LOADOUTS[index2] = newTabLoadouts[String(loadoutNumber2)];

    chrome.storage.local.set(newTabLoadouts, function() {

      unselectLoadout();
      unselectSwapButton();
      disableEditButton();
      disableSwapButton();
      disableDeleteButton();

    });

  } else {
    LOADOUTS[index2] = LOADOUTS[index1];
    LOADOUTS[index1] = null;

    chrome.storage.local.set(newTabLoadouts, function() {
      chrome.storage.local.remove(String(loadoutNumber1), function() {

        unselectLoadout();
        unselectSwapButton();
        disableEditButton();
        disableSwapButton();
        disableDeleteButton();

        disableOpenLoadoutButton(loadoutNumber1);
        enableOpenLoadoutButton(loadoutNumber2);
        disableSelectLoadoutButton(loadoutNumber1);
        enableSelectLoadoutButton(loadoutNumber2);

        if (LOADOUTS[index1].name !== loadoutNumber2) setOpenLoadoutButtonTitle(loadoutNumber1, LOADOUTS[index1].name);
        if (LOADOUTS[index2].name !== loadoutNumber1) setOpenLoadoutButtonTitle(loadoutNumber2, LOADOUTS[index2].name);

      });
    });

  }


}


function openInfo() {

}

chrome.commands.onCommand.addListener(function() {
  alert("hey");
});
