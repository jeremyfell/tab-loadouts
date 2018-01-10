//
function validateTabLoadout() {
  var loadoutName = document.getElementById("loadout-name");
  var linkInputs = document.getElementById("link-inputs-container").childNodes;
  var addLoadoutButton = document.getElementById("add-loadout-button");

  if (
    (loadoutName.classList.contains("loadout-name-valid") && linkInputs[0].value !== "") ||
    (linkInputs.length > 1 && linkInputs[1].value !== "")
  ) {
    addLoadoutButton.removeAttribute("disabled");
  } else {
    addLoadoutButton.setAttribute("disabled", true);
  }

}

// Changes color of loadout name input box depending on if it is empty, invalid, or valid
function validateLoadoutName() {

  var loadoutName = document.getElementById("loadout-name");

  if (loadoutName.value === "") {
    loadoutName.classList.remove("loadout-name-valid");
    loadoutName.classList.remove("loadout-name-invalid");
  } else if (!isLoadoutNameUnused(loadoutName.value)) {
    loadoutName.classList.add("loadout-name-invalid");
    loadoutName.classList.remove("loadout-name-valid");
  } else {
    loadoutName.classList.add("loadout-name-valid");
    loadoutName.classList.remove("loadout-name-invalid");
  }

  validateTabLoadout();

}

// Returns false if the loadout name is already in use, and so is invalid for a new tab loadout
function isLoadoutNameUnused(name) {
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

function configureCreateTab() {

  var content = document.getElementById("content");
  trimElement(content);

  var hotkeyDropdownMenu = document.createElement("div");
  var hotkeyDropdownSelection = document.createElement("div");
  var hotkeyDropdownContent = document.createElement("div");

  var loadoutName = document.createElement("input");

  var linkInputsContainer = document.createElement("div");
  var firstLink = document.createElement("input");

  var addLoadoutButton = document.createElement("div");

  hotkeyDropdownMenu.id = "hotkey-dropdown-menu";
  hotkeyDropdownSelection.id = "hotkey-dropdown-selection";
  hotkeyDropdownContent.id = "hotkey-dropdown-content";
  hotkeyDropdownSelection.innerHTML = "Hotkey: None";

  loadoutName.id = "loadout-name";
  loadoutName.setAttribute("type", "text");
  loadoutName.setAttribute("maxlength", 20);
  loadoutName.setAttribute("placeholder", "Loadout name");
  loadoutName.addEventListener("keyup", function() {
    validateLoadoutName();
  });

  linkInputsContainer.id = "link-inputs-container";
  configureLinkInput(firstLink, 0);

  addLoadoutButton.id = "add-loadout-button";
  addLoadoutButton.innerHTML = "Add loadout tab";
  addLoadoutButton.setAttribute("disabled", true);

  for (var i = 0; i <= 10; i++) {
    var text = "";
    var hotkeyDropdownOption = document.createElement("div");

    if (i < 9) {
      text = String(i + 1);
      hotkeyDropdownOption.id = "hotkey-" + String(i + 1);
      hotkeyDropdownOption.dataset.value = text;
      if (HOTKEY_LOADOUTS[i]) text += " (currently used)";
    } else if (i === 9) {
      text = "0";
      hotkeyDropdownOption.id = "hotkey-0";
      hotkeyDropdownOption.dataset.value = text;
      if (HOTKEY_LOADOUTS[9]) text += " (currently used)";
    } else {
      text = "None";
      hotkeyDropdownOption.dataset.value = text;
      hotkeyDropdownOption.id = "hotkey-none";
    }

    hotkeyDropdownOption.className = "hotkey-dropdown-option";
    hotkeyDropdownOption.innerHTML = text;

    hotkeyDropdownOption.addEventListener("click", function() {
      this.parentNode.parentNode.childNodes[0].innerHTML = "Hotkey: " + this.dataset.value;
      this.parentNode.parentNode.childNodes[0].dataset.value = this.dataset.value;
    });

    hotkeyDropdownContent.appendChild(hotkeyDropdownOption);
  }

  hotkeyDropdownMenu.appendChild(hotkeyDropdownSelection);
  hotkeyDropdownMenu.appendChild(hotkeyDropdownContent);

  linkInputsContainer.appendChild(firstLink);

  content.appendChild(hotkeyDropdownMenu);
  content.appendChild(loadoutName);
  content.appendChild(linkInputsContainer);
  content.appendChild(addLoadoutButton);
}
