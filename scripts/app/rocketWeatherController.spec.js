describe('Rocket Weather Controller', function() {
  beforeEach(RocketWeather = angular.mock.module('rocketWeather'));

  var $controller;
  var $scope = {};

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;

    inject(function(_locationFactory_, _weatherFactory_) {
      locationFactory = _locationFactory_;
      weatherFactory = _weatherFactory_;
    });

  }));

  it('has can execute a test func off of scope', function(){
    var controller = $controller('rocketWeatherController', { $scope: $scope });
    expect($scope.testFunc()).toEqual(999);
  });

  it('locationFactory start test', function(done){
    var location;

    locationFactory.getUserLocation().then(function(loc){
     location = loc;
     expect(loc).toEqual('abc');
     done();
    })

  });

  it('weatherFactory start test', function(done){
    var weather;

    weatherFactory.getWeather().then(function(loc){
     weather = loc;
     expect(weather).toEqual('abc');
     done();
    })

  });

});
