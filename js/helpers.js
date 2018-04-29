// Removes all child elements of an element
function trimElement(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}

function allSlotsInUse() {
  for (var i = 0; i < 10; i++) {
    if (!LOADOUTS[i]) {
      return false;
    }
  }
  return true;
}
