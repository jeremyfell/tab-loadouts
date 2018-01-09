function getLoadoutsFromLocalStorage(getAll) {
  chrome.storage.local.get(null, function(storage) {

      HOTKEY_LOADOUTS = [null, null, null, null, null, null, null, null, null, null];

      for (var key in storage) {
        if (storage[key].hotkey >= 0) HOTKEY_LOADOUTS[(storage[key].hotkey + 9) % 10] = storage[key];
        if (getAll) LOADOUTS.push(storage[key]);
      }

      if (Object.keys(storage).length === 0 && getAll) LOADOUTS = {};
  });
}

function setLoadoutToLocalStorage(key, loadout) {
  chrome.storage.local.set({key: loadout});
}

function removeLoadoutFromLocalStorage(key) {
  chrome.storage.local.remove(key);
}
