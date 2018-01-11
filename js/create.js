//
function setHotkeyDropdownOptionsVisibility(visible) {
  var options = document.getElementsByClassName("hotkey-dropdown-option");
  for (var i = 0; i < options.length; i++) {
    options[i].style.display = (visible) ? null : "none";
  }
}

// Creates a new tab loadout with the information specified in the page, and saves it to storage
function addTabLoadout() {
  var hotkeySelection = document.getElementById("hotkey-dropdown-selection");
  var loadoutName = document.getElementById("loadout-name-input").value;
  var linkInputs = document.getElementsByClassName("link-input");

  var hotkey = (hotkeySelection.dataset.value === "None") ? -1 : parseInt(hotkeySelection.dataset.value);

  var links = [];

  for (var i = 0; i < linkInputs.length; i++) {
    if (linkInputs[i].value !== "") links.push(linkInputs[i].value);
  }

  var newTabLoadout = {
    "name": loadoutName,
    "hotkey": hotkey,
    "links": links
  }

  if (hotkey !== -1 && HOTKEY_LOADOUTS[(hotkey + 9) % 10]) {
    HOTKEY_LOADOUTS[(hotkey + 9) % 10].hotkey = -1;
    saveLoadoutToLocalStorage(HOTKEY_LOADOUTS[(hotkey + 9) % 10]);
  }

  saveLoadoutToLocalStorage(newTabLoadout);

  window.close();

}


// Enables the add tab loadout button if the loadout name input is valid, and there is at least one link
function validateTabLoadout() {
  var loadoutNameInput = document.getElementById("loadout-name-input");
  var linkInputs = document.getElementById("link-inputs-container").childNodes;
  var addLoadoutButton = document.getElementById("add-loadout-button");

  if (
    loadoutNameInput.classList.contains("loadout-name-input-valid")
    &&
    (linkInputs[0].value !== "" || (linkInputs.length > 1 && linkInputs[1].value !== ""))
  ) {
    addLoadoutButton.removeAttribute("disabled");
  } else {
    addLoadoutButton.setAttribute("disabled", true);
  }

}

// Changes color of loadout name input box depending on if it is empty, invalid, or valid
function validateloadoutNameInput() {

  var loadoutNameInput = document.getElementById("loadout-name-input");

  if (loadoutNameInput.value === "") {
    loadoutNameInput.classList.remove("loadout-name-input-valid");
    loadoutNameInput.classList.remove("loadout-name-input-invalid");
  } else if (!isloadoutNameUnused(loadoutNameInput.value)) {
    loadoutNameInput.classList.add("loadout-name-input-invalid");
    loadoutNameInput.classList.remove("loadout-name-input-valid");
  } else {
    loadoutNameInput.classList.add("loadout-name-input-valid");
    loadoutNameInput.classList.remove("loadout-name-input-invalid");
  }

  validateTabLoadout();

}

// Returns false if the loadout name is already in use, and so is invalid for a new tab loadout
function isloadoutNameUnused(name) {
  // for (var key in LOADOUTS) {
    // if (key === name) return false;
  // }
  // return true;
  return (LOADOUTS[name] ? false : true);
}

function configureLinkInput(linkInput, id) {
  linkInput.className = "link-input";
  linkInput.setAttribute("type", "text");
  linkInput.setAttribute("spellcheck", false);
  linkInput.dataset.id = id;
  MAX_INPUT = id;

  // If an input box is the bottommost, and is filled, create a new empty bottommost input box
  linkInput.addEventListener("keyup", function() {

    if (this.value !== "" && parseInt(this.dataset.id) === MAX_INPUT) {

      var newLinkInput = document.createElement("input");
      configureLinkInput(newLinkInput, parseInt(this.dataset.id) + 1);
      document.getElementById("link-inputs-container").appendChild(newLinkInput);

    }

    validateTabLoadout();
  });

  // If an input box is empty, is not currently selected, and is not the bottommost input box, remove it
  linkInput.addEventListener("blur", function() {
    if (this.value === "" && parseInt(this.dataset.id) !== MAX_INPUT) this.remove();
    validateTabLoadout();
  });
}



function resetCreateTab() {
  var hotkeyDropdownSelection = document.getElementById("hotkey-dropdown-selection");
  hotkeyDropdownSelection.innerHTML = "Hotkey: None";
  hotkeyDropdownSelection.dataset.value = "None";

  var loadoutNameInput = document.getElementById("loadout-name-input");
  loadoutNameInput.value = "";
  loadoutNameInput.classList.remove("loadout-name-input-valid");
  loadoutNameInput.classList.remove("loadout-name-input-invalid");

  var linkInputsContainer = document.getElementById("link-inputs-container");
  while (linkInputsContainer.childNodes.length > 1) {
    linkInputsContainer.removeChild(linkInputsContainer.lastChild);
  }
  linkInputsContainer.childNodes[0].value = "";
}



function configureCreateTab() {

  var hotkeyDropdownSelection = document.getElementById("hotkey-dropdown-selection");
  var hotkeyDropdownOptions = document.getElementsByClassName("hotkey-dropdown-option");
  var loadoutNameInput = document.getElementById("loadout-name-input");

  var linkInputsContainer = document.getElementById("link-inputs-container");

  var firstLink = document.createElement("input");

  var addLoadoutButton = document.getElementById("add-loadout-button");

  hotkeyDropdownSelection.addEventListener("mouseenter", function() {
    setHotkeyDropdownOptionsVisibility(true);
  });

  loadoutNameInput.addEventListener("keyup", function() {
    validateloadoutNameInput();
  });

  configureLinkInput(firstLink, 0);

  addLoadoutButton.addEventListener("click", function() {
    addTabLoadout();
  });

  for (var i = 0; i <= 10; i++) {
    var text = "";
    if (i < 9) {
      text = String(i + 1);
      if (HOTKEY_LOADOUTS[i]) text += " (currently used)";
    } else if (i === 9) {
      text = "0";
      if (HOTKEY_LOADOUTS[9]) text += " (currently used)";
    } else {
      text = "None";
    }

    hotkeyDropdownOptions[i].innerHTML = text;

    hotkeyDropdownOptions[i].addEventListener("click", function() {
      var selection = document.getElementById("hotkey-dropdown-selection");
      selection.innerHTML = "Hotkey: " + this.dataset.value;
      selection.dataset.value = this.dataset.value;

      setHotkeyDropdownOptionsVisibility(false);

    });

  }

  linkInputsContainer.appendChild(firstLink);

}
