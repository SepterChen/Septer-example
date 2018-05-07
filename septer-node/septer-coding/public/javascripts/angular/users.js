/**
* user Module
*
* Description
*/
var app = angular.module('user', []);
app.controller('loginController', ['$scope','$http', function(){
	
	$http.post('/login', $scope.user, function(data) {
		
	});

}])