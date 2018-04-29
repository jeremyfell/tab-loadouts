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
  disableDeleteButton();
  disableSwapButton();
}


function openInfo() {

}
