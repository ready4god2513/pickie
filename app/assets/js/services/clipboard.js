'use strict';

app.factory('ClipboardService', ['$interval', function($interval){

  var gui = require('nw.gui');

  function Clip(){
    this.clipboard = gui.Clipboard.get();
  }


  // Listen for changes to the clipboard
  // And on change call the callback function
  // Passing in the following object-
  // { text: clipboard.get('text'), id: new Date() }
  Clip.prototype.listener = function(cb){
    var that = this;
    var current = that.current();

    $interval(function(){
      var newest = that.current();

      if(newest && current != newest){
        cb({
          text: newest,
          id: new Date()
        });

        current = newest;
      }
    }, 1000);
  };

  Clip.prototype.current = function(){
    return this.clipboard.get('text');
  };

  Clip.prototype.add = function(clip){
    this.clipboard.set(clip, 'text');
  };

  Clip.prototype.erase = function(){
    this.clipboard.set('', 'text');
  }

  return new Clip;

}]);