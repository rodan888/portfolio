var app = angular.module('myApp',[]);
  app.controller('mainCtrl', ['$rootScope','$scope', '$http', 'calcService','$q', function ($rootScope, $scope, $http, calcService, $q) {

	$rootScope.config = {
		version: '0.0.1',
		urlApi: 'calc.json'       
	};

	$scope.list = {};	
	$scope.result = 0;

	// $scope.test = function(){
	// 	console.log('test');
	// };
	// $scope.$watch('result', function() {
 //        alert('hey, myVar has changed!');
 //  });
 



	$scope.check = function(price,event){
		var el = event.currentTarget;
		console.log(event);
		if (el.checked) {
			$scope.result += parseInt(price);
		}else{
			$scope.result -= parseInt(price);			
		}
	};

	$scope.getFromApi = function() {		
		var deferred = $q.defer();
				deferred.notify();

		calcService.getItems($rootScope.config.urlApi)
			.success(function(data) {
				deferred.resolve();
				$scope.list = data;				
			})
			.error(function() {
				deferred.reject();
			});
		return deferred.promise;
	};	
	var promise = $scope.getFromApi();
	promise.then(function(data) { // success callback
    // console.log("success"); 
  }, function(rejectParam) { // error callback with reason
    // console.log("rejected");
  }, function(notifyParam) { // notification
    // console.log("notify");
  });



}]);