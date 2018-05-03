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
  SWAPPING_LOADOUTS ? unselectSwapButton() : selectSwapButton();
});

document.getElementById("delete-button").addEventListener("click", function() {
  deleteLoadout(SELECTED_LOADOUT);
});

document.getElementById("info-button").addEventListener("click", function() {
  openInfo();
});

document.getElementById("loadout-name-input").addEventListener("focus", function() {
  ALLOW_KEYBOARD_SHORTCUTS = false;
});

document.getElementById("loadout-name-input").addEventListener("blur", function() {
  ALLOW_KEYBOARD_SHORTCUTS = true;
});

document.getElementById("loadout-name-input").addEventListener("keydown", function(e) {
  if (e.which === CHARCODE_ENTER && !document.getElementById("edit-button").getAttribute("disabled")) {
    saveLoadout(SELECTED_LOADOUT);
    this.blur();
  }

});

// On key down, if a number is pressed, highlight its corresponding button
document.addEventListener("keydown", function(e) {
  if (!ALLOW_KEYBOARD_SHORTCUTS) return;

  if (e.which === CHARCODE_SHIFT) SHIFT_IS_PRESSED = true;

  if (e.which === CHARCODE_CONTROL) CONTROL_IS_PRESSED = true;

  var shortcutCode = getShortcutCodeFromKeyPress(e);
  if (shortcutCode === -1) return;
  highlightButton(shortcutCode);
});

// On key up, if a number is pressed, open the corresponding tab loadout
// On key up, if a dash is pressed, open options
document.addEventListener("keyup", function(e) {
  if (!ALLOW_KEYBOARD_SHORTCUTS) return;

  if (e.which === CHARCODE_SHIFT) SHIFT_IS_PRESSED = false;

  if (e.which === CHARCODE_CONTROL) CONTROL_IS_PRESSED = false;

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
        if (!document.getElementById("edit-button").getAttribute("disabled")) saveLoadout(SELECTED_LOADOUT);
        break;
      case 13:
        if (!document.getElementById("swap-button").getAttribute("disabled")) {
          SWAPPING_LOADOUTS ? unselectSwapButton() : selectSwapButton();
        }
        break;
      case 14:
        if (!document.getElementById("delete-button").getAttribute("disabled")) deleteLoadout(SELECTED_LOADOUT);
        break;
      default:
        selectLoadout(shortcutCode);
    }
  }

});
