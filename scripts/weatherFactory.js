angular.module("rocketWeather")
.factory('weatherFactory', function($http){

    var weatherFactory = {};

    weatherFactory.getCurrentWeather = function(lat, long) {
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
    }

    weatherFactory.getFiveDayWeather = function(lat, long) {
      var params = {
        lat: lat,
        lon: long,
        APPID: "d19efd67d9de2274a25488678f271955",
        units: "Imperial"
      }
      return $http({
          url: 'http://api.openweathermap.org/data/2.5/forecast',
          method: "GET",
          params: params
       });
    }

    weatherFactory.cleanData = function(weatherData) {
      var cleanedData = {
        description: weatherData.weather.description,
        temp: weatherData.main.temp,
        tempHigh: weatherData.main.temp_max,
        tempLow: weatherData.main.temp_min,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed
      }

      if (weatherData.dt) {
        var utc = weatherData.dt;
        var date = new Date(0);
        date.setUTCSeconds(utc);
        cleanedData.dateTime = date;
      }

      return cleanedData;
    }

    weatherFactory.cleanFiveDay = function(rawFiveDay) {
      var cleanedFiveDay = rawFiveDay.map(function(dataSet){
        return weatherFactory.cleanData(dataSet)
      })
      cleanedFiveDay = groupFiveDay(cleanedFiveDay);
      return cleanedFiveDay;
    }

    var groupFiveDay = function(cleanedFiveDay) {
      var fiveDaySet = {};
      var currentDate = null;
      cleanedFiveDay.forEach(function(dataSet){
        if (currentDate != dataSet.dateTime.toDateString()) {
          currentDate = dataSet.dateTime.toDateString();
        }
        fiveDaySet[currentDate] = fiveDaySet[currentDate] || [];
        fiveDaySet[currentDate].push(dataSet);
      })
      return fiveDaySet;
    }

    return weatherFactory;

})
