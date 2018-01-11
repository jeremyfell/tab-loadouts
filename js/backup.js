function configureCreateTab() {

  var content = document.getElementById("content");
  trimElement(content);

  var hotkeyDropdownMenu = document.createElement("div");
  var hotkeyDropdownSelection = document.createElement("div");
  var hotkeyDropdownContent = document.createElement("div");

  var loadoutNameInput = document.createElement("input");

  var linkInputsContainer = document.createElement("div");
  var firstLink = document.createElement("input");

  var addLoadoutButton = document.createElement("div");

  hotkeyDropdownMenu.id = "hotkey-dropdown-menu";
  hotkeyDropdownSelection.id = "hotkey-dropdown-selection";
  hotkeyDropdownSelection.addEventListener("mouseenter", function() {
    setHotkeyDropdownOptionsVisibility(true);
  });

  hotkeyDropdownContent.id = "hotkey-dropdown-content";
  hotkeyDropdownSelection.innerHTML = "Hotkey: None";
  hotkeyDropdownSelection.dataset.value = "None";

  loadoutNameInput.id = "loadout-name-input";
  loadoutNameInput.setAttribute("type", "text");
  loadoutNameInput.setAttribute("maxlength", 20);
  loadoutNameInput.setAttribute("placeholder", "Loadout name");
  loadoutNameInput.addEventListener("keyup", function() {
    validateloadoutNameInput();
  });

  linkInputsContainer.id = "link-inputs-container";
  configureLinkInput(firstLink, 0);

  addLoadoutButton.id = "add-loadout-button";
  addLoadoutButton.innerHTML = "Add loadout tab";
  addLoadoutButton.setAttribute("disabled", true);
  addLoadoutButton.addEventListener("click", function() {
    addTabLoadout();
  });

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

      setHotkeyDropdownOptionsVisibility(false);

    });

    hotkeyDropdownContent.appendChild(hotkeyDropdownOption);
  }

  hotkeyDropdownMenu.appendChild(hotkeyDropdownSelection);
  hotkeyDropdownMenu.appendChild(hotkeyDropdownContent);

  linkInputsContainer.appendChild(firstLink);

  content.appendChild(hotkeyDropdownMenu);
  content.appendChild(loadoutNameInput);
  content.appendChild(linkInputsContainer);
  content.appendChild(addLoadoutButton);
}


function openOptions() {
  trimElement(document.body);
  document.body.id = "options";

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
