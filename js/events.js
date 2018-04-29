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

document.getElementById("loadout-name-input").addEventListener("focus", function() {
  ALLOW_KEYBOARD_SHORTCUTS = false;
});

document.getElementById("loadout-name-input").addEventListener("blur", function() {
  ALLOW_KEYBOARD_SHORTCUTS = true;
});

// On key down, if a number is pressed, highlight its corresponding button
document.addEventListener("keydown", function(e) {
  if (!ALLOW_KEYBOARD_SHORTCUTS) return;
  shortcutCode = getShortcutCodeFromKeyPress(e);
  if (shortcutCode === -1) return;
  highlightButton(shortcutCode);
});

// On key up, if a number is pressed, open the corresponding tab loadout
// On key up, if a dash is pressed, open options
document.addEventListener("keyup", function(e) {
  if (!ALLOW_KEYBOARD_SHORTCUTS) return;
  var shortcutCode = getShortcutCodeFromKeyPress(e);
  if (shortcutCode === -1) return;

  if (CURRENT_TAB_IS_SELECT) {
    if (shortcutCode === 10) {
      unhighlightButton(shortcutCode);
      openEditTab();
    } else {
      openLoadout(shortcutCode);
    }

  } else {
    unhighlightButton(shortcutCode);
    switch(shortcutCode) {
      case 10:
        closeEditTab();
        break;
      case 11:
        openInfo();
        break;
      case 12:
        saveLoadout(SELECTED_LOADOUT);
        break;
      case 13:
        SWAP = true;
        selectSwapButton();
        break;
      case 14:
        deleteLoadout(SELECTED_LOADOUT);
        break;
      default:
        selectLoadout(shortcutCode);
    }
  }

});
