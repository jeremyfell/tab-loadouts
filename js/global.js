// Holds the 10 tab loadouts
// If a tab loadout is not saved for a certain number, it is null
// Loadouts are stored the array in the left to right order that they appear in the popup
// Thus loadouts 1-9 have index 0-8, and loadout 0 has index 9
var LOADOUTS = [];

// Stores the 0-9 number of the currently selected loadout for editing in the options tab
var SELECTED_LOADOUT = -1;

// True if the current tab is
var CURRENT_TAB_IS_SELECT = true;
var SWAPPING_LOADOUTS = false;

// Set to true when the shift key is pressed
// When opening a loadout, if shift is pressed tabs will be appended after the last tab in the window
var SHIFT_IS_PRESSED = false;

// Set to true when the control key is pressed
// When opening a loadout, if control and shift are pressed then tabs will be inserted directly after the current selected tab in the window
var CONTROL_IS_PRESSED = false;

// Charcodes for all keyboard shortcuts, used for key down and key up event listeners
const CHARCODE = Object.freeze({
  MIN_NUMBER: 48,
  MAX_NUMBER: 57,
  MIN_NUMPAD: 96,
  MAX_NUMPAD: 105,
  HYPHEN: 189,
  QUESTION: 191,
  PERIOD: 190,
  A: 65,
  S: 83,
  D: 68,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17
});
