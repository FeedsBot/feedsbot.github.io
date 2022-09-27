(function() {
  var scriptElem = document.getElementById('feedsbot-widget');
  var scriptHref = scriptElem.getAttribute('src').replace('.js', '.html');
  scriptElem.parentNode.removeChild(scriptElem);

  function refresh() {
    var widget = document.getElementById('feedsbot-widget');
    if (!widget) return;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.status == 200) {
          widget.innerHTML = xhttp.responseText;
        }
        else {
          widget.innerHTML = 'An error occurred.';
        }

        setTimeout(refresh,30000);
      }
    };
    xhttp.open('GET', scriptHref, true);
    xhttp.send();
  }

  document.writeln('<div id="feedsbot-widget"><span class="feedsbot-loading">Loading...</span></div>');
  setTimeout(refresh, 100);
}());
