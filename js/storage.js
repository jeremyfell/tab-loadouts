// Fetches all user loadouts from Chrome local storage and puts them into the global LOADOUTS variable
function getLoadoutsFromLocalStorage() {
  chrome.storage.local.get(null, function(storage) {

      LOADOUTS = [null, null, null, null, null, null, null, null, null, null];

      var i = 0;
      for (var key in storage) {
        LOADOUTS[(parseInt(key) + 9) % 10] = storage[key];
        i++;
      }

      if (i === 10) UNUSED_LOADOUT = false;

      configureLoadoutButtons();
  });
}

// Saves all tabs in the current window into a new loadout
function saveLoadoutToLocalStorage(number) {
  var loadout = {};
  var newTabLoadout = {};
  var name = document.getElementById("loadout-name-input").value;

  if (name === "") name = String(number);
  loadout.name = name;
  loadout.links = [];

  chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      tab = tabs[i];
      loadout.links.push(tab.url);
    }

    newTabLoadout[String(number)] = loadout;
    chrome.storage.local.set(newTabLoadout);
  });

}

function removeLoadoutFromLocalStorage(number) {
  chrome.storage.local.remove(String(number));
}
