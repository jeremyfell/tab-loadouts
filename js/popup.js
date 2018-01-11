getLoadoutsFromLocalStorage(true);
document.getElementById("open-options").addEventListener("click", function() {
  chrome.runtime.openOptionsPage();
});
