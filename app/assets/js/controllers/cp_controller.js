'use strict';

app.controller('CpController', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout){

  var gui = require('nw.gui'),
      clipboard = gui.Clipboard.get(),
      db = localStorage;
    
  if(typeof db.getItem('clips') == "undefined")
  {
    $scope.clearHistory();
  }

  $scope.clips = JSON.parse(db.getItem('clips'));

  var updateDB = function(){
    db.setItem('clips', JSON.stringify($scope.clips));
  };

  var listenToClipboard = function(){
    var latest = $scope.clips[0],
        current = clipboard.get('text');

    if(current.length == 0)
    {
      return;
    }

    if(typeof latest == "undefined" || current != latest.text){
      $scope.clips.unshift({
        text: current,
        id: new Date()
      });
      updateDB();
    }
  };

  var copyToClipboard = function(clip){
    clipboard.set(clip, 'text');
  };

  var clearClipboard = function(){
    clipboard.set('', 'text');
  }

  $interval(function(){
    listenToClipboard();
  }, 2000);

  $scope.removeFromList = function(clip){
    $scope.clips.forEach(function(element, index, array){
      if(element == clip){
        array.splice(index, 1);
      }
    });

    updateDB();

    if(clip.text == clipboard.get('text'))
    {
      clearClipboard();
    }
  }

  $scope.clearHistory = function(){
    $scope.clips = [];
    db.setItem('clips', JSON.stringify([]));
    clearClipboard();
  }

  $scope.copyFromList = function(clip){
    copyToClipboard(clip.text);
  }

}]);