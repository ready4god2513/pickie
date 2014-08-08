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