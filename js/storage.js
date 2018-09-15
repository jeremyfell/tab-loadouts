// Fetches all user loadouts from Chrome local storage and puts them into the global LOADOUTS variable
function getLoadoutsFromLocalStorage(callback) {
  chrome.storage.local.get(null, function(storage) {

      LOADOUTS = Array.from(Array(10).fill(null));

      for (var key in storage) {
        LOADOUTS[loadoutNumberToIndex(key)] = storage[key];
      }

      callback();
  });
}

// Saves all tabs in the current window into a new loadout
function saveLoadoutToLocalStorage(loadoutNumber) {
  var loadout = {};
  var storageChanges = {};
  var name = document.getElementById("loadout-name-input").value;
  document.getElementById("loadout-name-input").value = "";

  loadout.name = name;
  loadout.links = [];
  loadout.titles = [];
  setOpenLoadoutButtonTitle(loadoutNumber, name);
  setSelectLoadoutButtonTitle(loadoutNumber, name);

  // Sets to true for special case of detecting whether all slots are used (since chrome.tabs adds a delay)
  LOADOUTS[loadoutNumberToIndex(loadoutNumber)] = true;

  chrome.tabs.getAllInWindow(null, function(tabs) {
    // Adds all tab urls to the loadout's links
    for (let i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      loadout.links.push(tab.url);
      loadout.titles.push(tab.title);
    }

    LOADOUTS[loadoutNumberToIndex(loadoutNumber)] = loadout;
    storageChanges[String(loadoutNumber)] = loadout;
    chrome.storage.local.set(storageChanges);
  });

}

// Delete loadout
function removeLoadoutFromLocalStorage(loadoutNumber) {
  LOADOUTS[loadoutNumberToIndex(loadoutNumber)] = null;
  chrome.storage.local.remove(String(loadoutNumber));
}
