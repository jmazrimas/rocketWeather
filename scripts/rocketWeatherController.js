angular.module("rocketWeather")
.controller("rocketWeatherController", function($scope) {

    $scope.testFunc = function() {
      return 999;
    }

    var getLocation = function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);
    }

    function showError(error) {
      if (error.PERMISSION_DENIED) {
        console.log("user denied");
      } else {
        console.log("other error")
      }
    }

    getLocation();
});
