app.service('calcService', ['$http', function ($http) {
	this.getItems = function (url) {
		return $http({
			headers: { 'Content-Type': 'application/json' },
			url: url,
			method: "GET"
		});
	};
} ]);

// app.directive('check', function() {
//     return {
//         restrict: 'AE',
//         link: function (scope, element, attrs) {
//             element.on('click',function(){                
//                 console.log( element.checking );

//                  if (element.checked){
//                 		console.log("Флажок установлен" );
//     							}else{
//                 		console.log("Флажок не установлен");
//     							}
//             });
//         }
//     }
// });