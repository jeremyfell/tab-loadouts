function configureLoadoutEdit(loadoutEdit, isHotkey) {


  var statusIcon = document.createElement("img");

  var loadoutEditNameInput = document.createElement("div");

  var editLinksButton = document.createElement("div");
  var editLinksIcon = document.createElement("img");

  var deleteLoadoutButton = document.createElement("div");
  var deleteLoadoutIcon = document.createElement("img");

  loadoutEdit.className = "loadout-edit";

  statusIcon.className = isHotkey ? "hotkey-icon" : "other-icon";
  statusIcon.src = isHotkey ? "../svg/hotkey.svg" : "../svg/other.svg";

  editLinksButton.className = "edit-links-button";
  editLinksIcon.className = "link-icon";
  editLinksIcon.src = "../svg/link.svg";

  deleteLoadoutButton.className = "delete-loadout-button";

  deleteLoadoutIcon.className = "delete-icon";
  deleteLoadoutIcon.src = "../svg/delete.svg";


  editLinksButton.appendChild(editLinksIcon);
  deleteLoadoutButton.appendChild(deleteLoadoutIcon);

  loadoutEdit.appendChild(statusIcon);
  loadoutEdit.appendChild(editLinksButton);
  loadoutEdit.appendChild(deleteLoadoutButton);

}

function resetEditTab() {

  var loadoutEditContainer = document.getElementById("loadout-edit-container");

  for (var i = 0; i < HOTKEY_LOADOUTS.length; i++) {
    var loadoutEdit = document.createElement("div");
    configureLoadoutEdit(loadoutEdit, true);
    loadoutEditContainer.appendChild(loadoutEdit);
  }



}
