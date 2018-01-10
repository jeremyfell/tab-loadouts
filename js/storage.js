function getLoadoutsFromLocalStorage(getAll) {
  chrome.storage.local.get(null, function(storage) {

      HOTKEY_LOADOUTS = [null, null, null, null, null, null, null, null, null, null];

      for (var key in storage) {
        if (storage[key].hotkey >= 0) HOTKEY_LOADOUTS[(storage[key].hotkey + 9) % 10] = storage[key];
        if (getAll) LOADOUTS[key] = storage[key];
        // if (getAll) LOADOUTS.push(storage[key]);
      }

      if (Object.keys(storage).length === 0 && getAll) LOADOUTS = {};

      // Should possibly be in popup.js, but must be called only one loadouts have been fetched
      configureLoadoutButtons();

  });
}

function saveLoadoutToLocalStorage(loadout) {
  var newTabLoadout = {};
  newTabLoadout[loadout.name] = loadout;
  chrome.storage.local.set(newTabLoadout);
}

function removeLoadoutFromLocalStorage(key) {
  chrome.storage.local.remove(key);
}
