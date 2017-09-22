angular.module("rocketWeather")
.factory('weatherFactory', function($http){
  return {
    getWeather: function(lat, long) {
      var params = {
        lat: lat,
        lon: long,
        APPID: "d19efd67d9de2274a25488678f271955"
      }
      return $http({
          url: 'http://api.openweathermap.org/data/2.5/weather',
          method: "GET",
          params: params
       });
    }
  }
})
