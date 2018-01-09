// Removes all child elements of an element
function trimElement(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}
