angular.module("rocketWeather", ['ui.router'])
.config(function($urlRouterProvider) {
  console.log("module loading")
  $urlRouterProvider.otherwise("/");
});
