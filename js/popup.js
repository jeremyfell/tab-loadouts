function openEditTab() {
  document.body.className = "edit-body";
  document.getElementById("select-tab").classList.add("invisible");
  document.getElementById("edit-tab").classList.remove("invisible");
  HOME = false;

}

function closeEditTab() {
  document.body.className = "select-body";
  document.getElementById("select-tab").classList.remove("invisible");
  document.getElementById("edit-tab").classList.add("invisible");
  HOME = true;
}

document.getElementById("open-options-button").addEventListener("click", function() {
  openEditTab();
});

document.getElementById("close-options-button").addEventListener("click", function() {
  closeEditTab();
});

document.getElementById("edit-button").addEventListener("click", function() {
  saveLoadout(SELECTED_LOADOUT);
});

document.getElementById("swap-button").addEventListener("click", function() {
  SWAP = true;
  selectSwapButton();
});

document.getElementById("delete-button").addEventListener("click", function() {
  deleteLoadout(SELECTED_LOADOUT);
});

document.getElementById("loadout-name-input").addEventListener("keydown", function(e) {
  // if (e.which === 9) this.blur();
})


getLoadoutsFromLocalStorage();
