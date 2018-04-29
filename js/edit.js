function deleteLoadout(loadoutNumber) {
  removeLoadoutFromLocalStorage(loadoutNumber);
  disableOpenLoadoutButton(loadoutNumber);
  disableSelectLoadoutButton(loadoutNumber);
}


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
