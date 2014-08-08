'use strict';

var app = angular.module('Pickie', ['ui.router', 'ngAnimate']);
// Live reload.  Keep this here in dev mode
(function(){
  var path = './';
  var fs = require('fs');

  fs.watch(path, function() {
    if (location)
      location.reload();
  });
}());
'use strict';

app.controller('CpController', ['$scope', '$interval', 'ClipboardService', 'Database', 
  function($scope, $interval, ClipboardService, Database){

  $scope.clips = JSON.parse(Database.get('clips'));

  ClipboardService.listener(function(new_item){
    $scope.clips.unshift(new_item);
  });

  $scope.$watchCollection('clips', function(){
    Database.set('clips', $scope.clips);
  });

  $scope.removeItem = function(clip){
    $scope.clips.forEach(function(element, index, array){
      if(element == clip){
        $scope.clips.splice(index, 1);
      }
    });

    if(clip.text == ClipboardService.current())
    {
      ClipboardService.erase();
    }
  }

  $scope.clearHistory = function(){
    $scope.clips = [];
    ClipboardService.erase();
  }

  $scope.copyClip = function(clip){
    ClipboardService.add(clip.text);
  }

}]);
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
'use strict';

app.factory('Database', function(){

  
  function Db(){
    this.database = localStorage;
  };


  Db.prototype.set = function(key, value){
    this.database.setItem(key, JSON.stringify(value));
  };

  Db.prototype.get = function(key){
    return this.database.getItem(key);
  };

  return new Db;

});