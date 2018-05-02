// Returns the button element corresponding the shortcut key that was pressed
function getButtonFromShortcutCode(shortcutCode) {

  if (shortcutCode === -1) return;
  if (shortcutCode <= 9) {
    if (CURRENT_TAB_IS_SELECT) {
      return document.getElementById("open-loadout-" + String(shortcutCode));
    } else {
      return document.getElementById("select-loadout-" + String(shortcutCode));
    }
  } else if (shortcutCode === 10) {
    if (CURRENT_TAB_IS_SELECT) {
      return document.getElementById("open-options-button");
    } else {
      return document.getElementById("close-options-button");
    }
  } else if (shortcutCode === 11) {
    return document.getElementById("info-button");
  } else if (shortcutCode === 12) {
    return document.getElementById("edit-button");
  } else if (shortcutCode === 13) {
    return document.getElementById("swap-button");
  } else if (shortcutCode === 14) {
    return document.getElementById("delete-button");
  }

}

// Returns the number 0-9 if a number is pressed above the keyboard, or in the numpad
// Returns 10 if a dash was pressed, as a shortcut for options
// Returns 11 if a question mark was pressed, as a shortcut for info
// Returns 12, 13, 14 if a, s, d, was pressed, as shortcuts for add, swap, and delete
// Returns -1 for any other key
function getShortcutCodeFromKeyPress(e) {

  if (e.which >= CHARCODE_MIN_NUMBER && e.which <= CHARCODE_MAX_NUMBER) {
    // Key pressed was 0-9
    return e.which - CHARCODE_MIN_NUMBER;

  } else if (e.which >= CHARCODE_MIN_NUMPAD && e.which <= CHARCODE_MAX_NUMPAD) {
    // Key pressed was 0-9 on the numpad
    return e.which - CHARCODE_MIN_NUMPAD;

  } else if (e.which === CHARCODE_HYPHEN) {
    // Key pressed was '-', which is a shortcut for options
    return 10;

  } else if (!CURRENT_TAB_IS_SELECT) {

    if (e.which === CHARCODE_QUESTION) {
      // Key pressed was '?', which is a shortcut for info
      return 11;
    } else if (e.which === CHARCODE_A) {
      // Key pressed was 'a', which is a shortcut for add/overwrite loadout
      return 12;
    } else if (e.which === CHARCODE_S) {
      // Key pressed was 's', which is a shortcut for swap loadouts
      return 13;
    } else if (e.which === CHARCODE_D) {
      // Key pressed was 'd', which is a shortcut for delete loadout
      return 14;
    }
  }

  // Some other key was pressed
  return -1;
}
