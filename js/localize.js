function localize() {
  document.querySelectorAll('[title]').forEach(element => {
    element.title = chrome.i18n.getMessage(element.title)
  });

  document.querySelectorAll('[placeholder]').forEach(element => {
    element.placeholder = chrome.i18n.getMessage(element.placeholder)
  });
}
