// Fetches all user loadouts from Chrome local storage and puts them into the global LOADOUTS variable
function getLoadoutsFromLocalStorage() {
  chrome.storage.local.get(null, function(storage) {

      LOADOUTS = [null, null, null, null, null, null, null, null, null, null];

      for (var key in storage) {
        LOADOUTS[loadoutNumberToIndex(key)] = storage[key];
      }

      configureLoadoutButtons();
  });
}

// Saves all tabs in the current window into a new loadout
function saveLoadoutToLocalStorage(number) {
  var loadout = {};
  var newTabLoadout = {};
  var name = document.getElementById("loadout-name-input").value;
  document.getElementById("loadout-name-input").value = "";

  if (name === "") name = String(number);
  loadout.name = name;
  setOpenLoadoutButtonTitle(number, name);
  setSelectLoadoutButtonTitle(number, name);
  loadout.links = [];

  // Sets to true for special case of detecting whether all slots are used (since chrome.tabs adds a delay)
  LOADOUTS[loadoutNumberToIndex(number)] = true;

  chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      tab = tabs[i];
      loadout.links.push(tab.url);
    }

    LOADOUTS[loadoutNumberToIndex(number)] = loadout;
    newTabLoadout[String(number)] = loadout;
    chrome.storage.local.set(newTabLoadout);
  });

}

function removeLoadoutFromLocalStorage(number) {
  LOADOUTS[loadoutNumberToIndex(number)] = null;
  chrome.storage.local.remove(String(number));
}
