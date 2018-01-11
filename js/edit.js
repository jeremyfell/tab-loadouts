function configureLoadoutEdit(loadoutEdit) {



  var loadoutEditNameInput = document.createElement("div");

  var editLinksButton = document.createElement("div");
  var editLinksIcon = document.createElement("img");

  var deleteLoadoutButton = document.createElement("div");
  var deleteLoadoutIcon = document.createElement("img");

  loadoutEdit.className = "loadout-edit";


  editLinksButton.className = "edit-links-button";
  editLinksIcon.className = "links-icon";
  editLinksIcon.src = "../svg/link.svg";

  deleteLoadoutButton.className = "delete-loadout-button";

  deleteLoadoutIcon.className = "delete-icon";
  deleteLoadoutIcon.src = "../svg/delete.svg";


  editLinksButton.appendChild(editLinksIcon);
  deleteLoadoutButton.appendChild(deleteLoadoutIcon);

}

function resetEditTab() {

  var loadoutEditContainer = document.getElementById("loadout-edit-container");

  for (var i = 0; i < HOTKEY_LOADOUTS.length; i++) {
    var loadoutEdit = document.createElement("div");
    configureLoadoutEdit(loadoutEdit);
    loadoutEditContainer.appendChild(loadoutEdit);
  }



}
