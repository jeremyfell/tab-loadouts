getLoadoutsFromLocalStorage(false);
document.getElementById("open-options").addEventListener("click", function() {
  chrome.runtime.openOptionsPage();
});
