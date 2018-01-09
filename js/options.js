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
