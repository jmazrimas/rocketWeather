"use strict";

angular.module("rocketWeather")
.controller("rocketWeatherController", function($scope, $http, locationFactory, weatherFactory, externalLocationFactory) {

    $scope.testFunc = function() {
      return 999;
    }

    var defaultLocation = {latitude: 41.885383, longitude: -87.644481}
    $scope.locationSearchInProgress = true;

     locationFactory.getUserLocation().then(
       function(location){
         $scope.locationSearchInProgress = false;
         $scope.setLocationAndGetWeather(null, location);
       },
       function(error){
         $scope.locationSearchInProgress = false;
         $scope.error=error;
         $scope.setLocationAndGetWeather(null, defaultLocation);
       }
     )

    var getWeather = function(location) {

      weatherFactory.getWeather(location.latitude, location.longitude, true).then(
        function(response){
          $scope.currentWeatherData = weatherFactory.cleanData(response.data);
        },
        function(response){
          $scope.error = "Error getting current weather data."
        }
      )

      weatherFactory.getWeather(location.latitude, location.longitude).then(
        function(response){
          $scope.fiveDayWeatherData = weatherFactory.cleanFiveDay(response.data.list);
        },
        function(response){
          $scope.error = "Error getting 5-day weather data."
        }
      )
    }

    $scope.setLocationAndGetWeather = function(search, latLong) {
      externalLocationFactory.findNewLocation({searchTerm: search, latlng: latLong}).then(function(response){
        // response = {name: str, lat: int, long: int}
        $scope.selectedLocation = response;
        getWeather({latitude: response.lat, longitude: response.long});
      })
    }

});
