function openEditTab() {
  document.body.className = "edit-body";
  document.getElementById("select-tab").classList.add("invisible");
  document.getElementById("edit-tab").classList.remove("invisible");

}

function closeEditTab() {
  document.body.className = "select-body";
  document.getElementById("select-tab").classList.remove("invisible");
  document.getElementById("edit-tab").classList.add("invisible");
}
