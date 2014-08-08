// Live reload.  Keep this here in dev mode
(function(){
  var path = './';
  var fs = require('fs');

  fs.watch(path, function() {
    if (location)
      location.reload();
  });
}());