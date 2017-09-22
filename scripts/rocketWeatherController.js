"use strict";

angular.module("rocketWeather")
.controller("rocketWeatherController", function($scope, $http, locationFactory) {

    $scope.testFunc = function() {
      return 999;
    }

    var defaultLocation = {latitude: 41.885383, longitude: -87.644481}
    $scope.locationSearchInProgress = true;

    locationFactory.getUserLocation().then(
      function(location){
        console.log(location)
        $scope.locationSearchInProgress = false;
        $scope.location = location;
      },
      function(error){
        $scope.locationSearchInProgress = false;
        $scope.location = defaultLocation;
        $scope.error=error;
      }
    )

});
