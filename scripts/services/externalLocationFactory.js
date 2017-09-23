angular.module("rocketWeather")
.factory('externalLocationFactory', function($q, $http){

  return {
    findNewLocation: function(searchParams) {
      var deferred = $q.defer();
      $http({
          url: '/keys.json',
          method: "GET"
       }).then(
         function(response){

         var params = {key: response.data.googleMaps}

         if (searchParams.latlng) {
           params.latlng = searchParams.latlng.latitude+","+searchParams.latlng.longitude
         } else {
           params.address = searchParams.searchTerm
         }

         $http({
           url: 'https://maps.google.com/maps/api/geocode/json',
           method: "GET",
           params: params
         }).then(
           function(response){
             deferred.resolve(
               {
                 name: response.data.results[0].formatted_address,
                 lat: response.data.results[0].geometry.location.lat,
                 long: response.data.results[0].geometry.location.lng
               }
             );
           },
           function(error){
             deferred.reject(error);
           }
         )
       })
    return deferred.promise;
    }
  }
})
