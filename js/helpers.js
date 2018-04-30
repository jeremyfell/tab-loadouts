// Returns true if all loadout slots are currently full
function allSlotsInUse() {
  for (var i = 0; i < 10; i++) {
    if (!LOADOUTS[i]) {
      return false;
    }
  }
  return true;
}

// Converts the loadout number (what is shown on screen and accessed by the keyboard) to its index (the loadout's position in the LOADOUT array)
function loadoutNumberToIndex(loadoutNumber) {
  return (parseInt(loadoutNumber) + 9) % 10;
}
