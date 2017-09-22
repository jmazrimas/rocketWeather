"use strict";

angular.module("rocketWeather")
.controller("rocketWeatherController", function($scope, $http, locationFactory, weatherFactory) {

    $scope.testFunc = function() {
      return 999;
    }

    var defaultLocation = {latitude: 41.885383, longitude: -87.644481}
    $scope.locationSearchInProgress = true;

    locationFactory.getUserLocation().then(
      function(location){
        $scope.locationSearchInProgress = false;
        $scope.location = location;
        getWeather($scope.location);
      },
      function(error){
        $scope.locationSearchInProgress = false;
        $scope.location = defaultLocation;
        $scope.error=error;
        getWeather($scope.location);
      }
    )

    var getWeather = function(location) {
      weatherFactory.getWeather(location.latitude, location.longitude).then(
        function(response){
          $scope.currentWeatherData = weatherFactory.cleanData(response.data);
        },
        function(response){
          $scope.error = "Error getting weather data."
        }
      )
    }

});
