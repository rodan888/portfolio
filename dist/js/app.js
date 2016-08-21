var app = angular.module('myApp',[]);
  app.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
    // $http.get('table-tripsbook.json')
    //   .success(function (data) {
    //     $scope.list = data;
    // });

    // $http.get('table-header.json')
    //   .success(function (data) {
    //     $scope.headers = data;
    // });
    $scope.title = 'Site landing page';
  }]);