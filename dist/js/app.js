var app = angular.module('myApp',[]);
  app.controller('mainCtrl', ['$rootScope','$scope', '$http', 'calcService','$q', function ($rootScope, $scope, $http, calcService, $q) {

	$rootScope.config = {
		version: '0.0.1',
		urlApi: 'calc.json'       
	};

	$scope.list = {};

	$scope.design = 0;
	$scope.moduls = 0;
	$scope.lang   = 0;

	$scope.result = 0;


	$scope.colorF = '#00f';


	
	$scope.modulsPrice = function(price,event){
		var el = event.currentTarget;		
		if (el.checked) {
			$scope.moduls += parseInt(price);
			calc();
		}else{
			$scope.moduls -= parseInt(price);			
			calc();
		}
	};

	$scope.designPrice = function(price){				
		$scope.design = parseInt(price);
		calc();
	};

	$scope.langPrice = function(price){				
		$scope.lang = parseInt(price);
		calc();
	};

	var calc = function(){
		$scope.result =  $scope.design + $scope.moduls + $scope.lang;
	};

	$scope.resetRes = function(){
		$scope.result = 0;	
	};

	// $scope.$watch('design', function(){
	// });


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