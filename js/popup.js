localize();
document.activeElement.blur();
getLoadoutsFromLocalStorage(function() {
  configureLoadoutButtons();
});
