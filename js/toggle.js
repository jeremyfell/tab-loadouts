function disableOpenLoadoutButton(loadoutNumber) {
    document.getElementById("open-loadout-" + String(loadoutNumber)).setAttribute("disabled", "true");
}

function enableOpenLoadoutButton(loadoutNumber) {
  document.getElementById("open-loadout-" + String(loadoutNumber)).removeAttribute("disabled");
}

function disableSelectLoadoutButton(loadoutNumber) {
  document.getElementById("select-loadout-" + String(loadoutNumber)).setAttribute("disabled", "true");
}

function enableSelectLoadoutButton(loadoutNumber) {
  document.getElementById("select-loadout-" + String(loadoutNumber)).removeAttribute("disabled");
}

function unselectLoadout() {
  if (SELECTED_LOADOUT === -1) return;
  document.getElementById("select-loadout-" + String(SELECTED_LOADOUT)).classList.remove("selected-loadout");
}

function disableEditButton() {
  document.getElementById("edit-button").setAttribute("disabled", "true");
}

function enableEditButton() {
  document.getElementById("edit-button").removeAttribute("disabled");
}

function disableSwapButton() {
  document.getElementById("swap-button").setAttribute("disabled", "true");
}

function enableSwapButton() {
  document.getElementById("swap-button").removeAttribute("disabled");
}

function selectSwapButton() {
  document.getElementById("swap-button").classList.add("selected-swap");
}

function unselectSwapButton() {
  document.getElementById("swap-button").classList.remove("selected-swap");
}

function disableDeleteButton() {
  document.getElementById("delete-button").setAttribute("disabled", "true");
}

function enableDeleteButton() {
  document.getElementById("delete-button").removeAttribute("disabled");
}

function setEditToAdd() {
  document.getElementById("edit-button").title = "Save current tabs as new loadout in the selected slot";
  document.getElementById("edit-icon").setAttribute("src", "../svg/save.svg");
}

function setEditToOverwrite() {
  document.getElementById("edit-button").title = "Overwrite loadout in the selected slot with current tabs";
  document.getElementById("edit-icon").setAttribute("src", "../svg/edit.svg");
}

function setOpenLoadoutButtonTitle(loadoutNumber, title) {
  document.getElementById("open-loadout-" + String(loadoutNumber)).title = title;
}

function setSelectLoadoutButtonTitle(loadoutNumber, title) {
  document.getElementById("select-loadout-" + String(loadoutNumber)).title = title;
}
