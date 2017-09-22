angular.module("rocketWeather")
.factory('locationFactory', function($q){

  return {
    getUserLocation: function() {
      var deferred = $q.defer();

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            // success callback
            function(location) {
              // pulling out the coords before returning from factory
              //   expected format: {latitude: 41.885383, longitude: -87.644481}
              deferred.resolve(location.coords);
            },
            // failure callback
            function(location) {
              deferred.reject("Not able to access location.");
            }
          );
      } else {
        // cant not access location
          deferred.reject("Geolocation is not supported by this browser.");
      }
      return deferred.promise;
    }
  }
})
