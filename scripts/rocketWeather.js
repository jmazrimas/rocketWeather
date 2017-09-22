"use strict";

angular.module("rocketWeather", ['ui.router'])
.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
});
