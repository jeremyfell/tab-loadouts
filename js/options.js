function setupOptionsPage() {

  var editButton = document.getElementById("edit-button");
  var createButton = document.getElementById("create-button");

  editButton.addEventListener("click", function() {
    document.getElementById("create-button").removeAttribute("disabled");
    this.setAttribute("disabled", true);
    document.getElementById("create-content").classList.add("hidden");
    document.getElementById("edit-content").classList.remove("hidden");
  });

  createButton.addEventListener("click", function() {
    document.getElementById("edit-button").removeAttribute("disabled");
    this.setAttribute("disabled", true);
    document.getElementById("edit-content").classList.add("hidden");
    document.getElementById("create-content").classList.remove("hidden");
  })

  configureCreateTab();
}

getLoadoutsFromLocalStorage(true);
setupOptionsPage();
