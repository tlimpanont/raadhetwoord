app.controller('playerCtrl', function($scope, $route, gameService) {
	gameService.setUpSession($route.current.params.hostSessionId, $scope);
});