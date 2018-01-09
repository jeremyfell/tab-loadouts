LOADOUTS = []
HOTKEY_LOADOUTS = []
LOADOUT_CHANGES = [];
HOTKEY_LOADOUTS = [
  {
    name: "testing",
    hotkey: 1,
    links: [
      "https://www.w3schools.com/jsref/met_win_prompt.asp",
      "https://www.reddit.com/r/mealtimevideos/",
      "https://developer.chrome.com/extensions/tabs#method-create",
      "https://www.reddit.com/r/videos/",
    ]
  }

  , null, 3, 4, null, null, null, null, null, null
]

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


function configureLoadoutButtons() {
  loadoutButtons = document.getElementsByClassName("loadout-button");

  for (var i = 0; i < 10; i++) {
    // Disables unused loadout buttons
    if (!HOTKEY_LOADOUTS[i]) loadoutButtons[i].setAttribute("disabled", "true");

    // Adds click event to open the corresponding loadout
    loadoutButtons[i].addEventListener("click", function() {
      openLoadout(parseInt(this.id[this.id.length - 1]));
    });

    // Sets title to the corresponding loadout name
    if (HOTKEY_LOADOUTS[i]) loadoutButtons[i].title = HOTKEY_LOADOUTS[i].name;

  }
}

function openLoadout(loadoutNumber) {
  if (document.getElementById("open-loadout-" + String(loadoutNumber)).getAttribute("disabled")) return;

  var currentLoadoutLinks = HOTKEY_LOADOUTS[(loadoutNumber + 9) % 10].links;
  if (currentLoadoutLinks.length === 0) return;

  chrome.tabs.getAllInWindow(null, function(tabs) {
    var tabIds = []

    // Removes all tabs in the current window except for the first tab
    if (tabs.length > 1) {

      for (var i = 1; i < tabs.length; i++) {
        tabIds.push(tabs[i].id);
      }

      chrome.tabs.remove(tabIds);
    }

    // Updates the first tab, and creates new tabs, to create the tab loadout
    chrome.tabs.update(tabs[0].id, {url: currentLoadoutLinks[0], active: true})

    for (var i = 1; i < currentLoadoutLinks.length; i++) {
      chrome.tabs.create({url: currentLoadoutLinks[i], active: false});
    }

    window.close();
  });

}

function trimElement(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}

function openSettings() {
  trimElement(document.body);
  document.body.id = "settings";

  var menu = document.createElement("div");
  var content = document.createElement("div");
  var createButton = document.createElement("div");
  var editButton = document.createElement("div");
  var createIcon = document.createElement("img");
  var editIcon = document.createElement("img");

  menu.id = "menu";
  content.id = "content";

  editButton.className = "menu-button";
  createButton.className = "menu-button";
  editButton.id = "edit-button";
  createButton.id = "create-button";

  editIcon.className = "menu-icon";
  createIcon.className = "menu-icon";
  editIcon.id = "edit-icon";
  createIcon.id = "create-icon";


  editIcon.src = "../svg/edit.svg";
  createIcon.src = "../svg/add.svg";

  editButton.appendChild(editIcon);
  createButton.appendChild(createIcon);

  createButton.setAttribute("disabled", true);

  editButton.addEventListener("click", function() {
    document.getElementById("create-button").removeAttribute("disabled");
    this.setAttribute("disabled", true);
    configureEditTab();
  });

  createButton.addEventListener("click", function() {
    document.getElementById("edit-button").removeAttribute("disabled");
    this.setAttribute("disabled", true);
    configureCreateTab();
  })

  menu.appendChild(editButton);
  menu.appendChild(createButton);

  document.body.appendChild(menu);
  document.body.appendChild(content);

  configureCreateTab();

}

function configureCreateTab() {

  var content = document.getElementById("content");
  trimElement(content);

  var hotkeyDropdownMenu = document.createElement("div");
  var hotkeyDropdownSelection = document.createElement("div");
  var hotkeyDropdownContent = document.createElement("div");

  var loadoutName = document.createElement("input");

  hotkeyDropdownMenu.id = "hotkey-dropdown-menu";
  hotkeyDropdownSelection.id = "hotkey-dropdown-selection";
  hotkeyDropdownContent.id = "hotkey-dropdown-content";

  hotkeyDropdownSelection.innerHTML = "Hotkey: None";

  loadoutName.setAttribute("type", "text");

  for (var i = 0; i <= 10; i++) {
    var text = ""
    var hotkeyDropdownOption = document.createElement("div");

    if (i === 0) {
      text = "None";
      hotkeyDropdownOption.id = "hotkey-none";
    } else if (i < 10) {
      text = i;
      hotkeyDropdownOption.id = "hotkey-" + String(i);
      if (HOTKEY_LOADOUTS[i - 1]) text += " (currently used)";
    } else {
      text = "0";
      hotkeyDropdownOption.id = "hotkey-0";
      if (HOTKEY_LOADOUTS[9]) text += " (currently used)";
    }

    hotkeyDropdownOption.className = "hotkey-dropdown-option";
    hotkeyDropdownOption.innerHTML = text;

    hotkeyDropdownOption.addEventListener("click", function() {
      this.parentNode.childNodes[0].innerHTML = this.innerHTML;
    });

    hotkeyDropdownContent.appendChild(hotkeyDropdownOption);
  }

  hotkeyDropdownMenu.appendChild(hotkeyDropdownSelection);
  hotkeyDropdownMenu.appendChild(hotkeyDropdownContent);

  content.appendChild(hotkeyDropdownMenu);
  content.appendChild(loadoutName);
}


function highlightButton(loadoutNumber) {
  if (loadoutNumber === 10) {
      document.getElementById("open-settings").style.backgroundColor = "#75A4F4";
    } else {
    var loadoutButton = document.getElementById("open-loadout-" + String(loadoutNumber));
    if (loadoutButton.getAttribute("disabled")) return;
    loadoutButton.style.backgroundColor = "#75A4F4";
  }
}

function getLoadoutNumberFromKeyPress(e) {
  if (e.which >= 48 && e.which <= 57) {
    // Key pressed was 0-9
    return e.which - 48;
  } else if (e.which >= 96 && e.which <= 105) {
    // Key pressed was 0-9 on the numpad
    return e.which - 96
  } else if (e.which === 189) {
    // Key pressed was '-', which is a shortcut for settings
    return 10;
  } else {
    // Some other key was pressed
    return -1;
  }
}

document.addEventListener("keydown", function(e) {

  loadoutNumber = getLoadoutNumberFromKeyPress(e);
  if (loadoutNumber === -1) return;
  highlightButton(loadoutNumber);

});

document.addEventListener("keyup", function(e) {

  loadoutNumber = getLoadoutNumberFromKeyPress(e);
  if (loadoutNumber === -1) return;
  (loadoutNumber === 10) ? openSettings() : openLoadout(loadoutNumber);

});

configureLoadoutButtons();
document.getElementById("open-settings").addEventListener("click", function() {openSettings()});
