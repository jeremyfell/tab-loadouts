HOTKEY_LOADOUTS = [
  1, null, 3, 4, null, null, null, null, null, null
]

function disableUnusedLoadoutNumbers() {
  loadoutButtons = document.getElementsByClassName("loadout-button");
  for (var i = 0; i < 10; i++) {
    if (!HOTKEY_LOADOUTS[i]) loadoutButtons[i].setAttribute("disabled", "true");
  }
}

function addLoadoutButtonClickEvents() {
  loadoutButtons = document.getElementsByClassName("loadout-button");

  for (var i = 0; i < 10; i++) {
    loadoutButtons[i].addEventListener("click", function() {
      openLoadout(this.id[this.id.length - 1]);
    });
  }
}

function openLoadout(loadoutNumber) {
  if (document.getElementById("open-loadout-" + String(loadoutNumber)).getAttribute("disabled")) return;
  alert(loadoutNumber);
  currentLoadout = HOTKEY_LOADOUTS[loadoutNumber];

  // for (var i = 0; i < currentLoadout.length; i++) {

  // }
}

function openSettings() {

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
    return e.which - 48;
  } else if (e.which >= 96 && e.which <= 105) {
    return e.which - 96
  } else if (e.which === 189) {
    return 10;
  } else {
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


addLoadoutButtonClickEvents();
disableUnusedLoadoutNumbers();
