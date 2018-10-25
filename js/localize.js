function localize() {
  var page = document.getElementsByTagName('html')[0];
  var oldPage = page.innerHTML.toString();

  var newPage = oldPage.replace(/__MSG_(\w+)__/g, function(match, key) {
    return key ? chrome.i18n.getMessage(key) : "";
  });

  if (oldPage !== newPage) page.innerHTML = newPage;
}
