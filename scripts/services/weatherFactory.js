angular.module("rocketWeather")
.factory('weatherFactory', function($http){

    var weatherFactory = {};

    weatherFactory.getWeather = function(lat, long, current) {
      return $http({
          url: '/keys.json',
          method: "GET"
       }).then(function(response){
         var params = {
           lat: lat,
           lon: long,
           APPID: response.data.openweathermap,
           units: "Imperial"
         }
         if (current) {
           var url = 'http://api.openweathermap.org/data/2.5/weather';
         } else {
           var url = 'http://api.openweathermap.org/data/2.5/forecast';
         }
         return $http({
           url: url,
           method: "GET",
           params: params
         });
       })

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
