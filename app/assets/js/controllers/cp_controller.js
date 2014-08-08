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

    // If we are erasing the most recent item from the clipboard history
    // we need to remove it from the actual system clipboard as well
    // in order to ensure that it is not added back to the top of the list
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