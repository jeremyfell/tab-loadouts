// Fetches all user loadouts from Chrome local storage and puts them into the global LOADOUTS variable
function getLoadoutsFromLocalStorage() {
  chrome.storage.local.get(null, function(storage) {

      LOADOUTS = [null, null, null, null, null, null, null, null, null, null];

      for (var key in storage) {
        LOADOUTS[(key + 9) % 10] = storage[key];
      }

      configureLoadoutButtons();
      configureEditButtons();
  });
}

// Loadout consists of a name and the links
function saveLoadoutToLocalStorage(number, loadout) {
  var newTabLoadout = {};
  newTabLoadout[String(number)] = loadout;

  chrome.storage.local.set(newTabLoadout);
}

function removeLoadoutFromLocalStorage(number) {
  chrome.storage.local.remove(String(number));
}
