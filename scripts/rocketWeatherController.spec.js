describe('Rocket Weather Controller', function() {
  beforeEach(RocketWeather = angular.mock.module('rocketWeather'));

  var $controller;
  var $scope = {};

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  it('has can execute a test func off of scope', function(){
    var controller = $controller('rocketWeatherController', { $scope: $scope });
    expect($scope.testFunc()).toEqual(999);
  });

});
