angular.module("rocketWeather")
.factory('weatherFactory', function($http){
  return {
    getWeather: function(lat, long) {
      var params = {
        lat: lat,
        lon: long,
        APPID: "d19efd67d9de2274a25488678f271955",
        units: "Imperial"
      }
      return $http({
          url: 'http://api.openweathermap.org/data/2.5/weather',
          method: "GET",
          params: params
       });
    },
    cleanData: function(weatherData) {
      return {
        description: weatherData.weather.description,
        temp: weatherData.main.temp,
        tempHigh: weatherData.main.temp_max,
        tempLow: weatherData.main.temp_min,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed
      }
    }
  }
})
