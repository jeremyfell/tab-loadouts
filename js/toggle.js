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
