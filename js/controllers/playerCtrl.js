app.controller('playerCtrl', function($scope, $route, gameService) {
	gameService.setUpSession($route.current.params.hostSessionId, $scope);

	jQuery("#drawingModal").modal({
	 	keyboard: false,
	 	backdrop: "static",
	 	show: false
	 });

	jQuery("#notificationModal").modal({
	 	keyboard: false,
	 	backdrop: "static",
	 	show: false
	 });

	$scope.openModal = function() {	
		 jQuery("#drawingModal").modal("show");
	}

	$scope.$watch("session_id", function(newValue, oldValue) {
		// if(oldValue == undefined && newValue == null)
		// 	jQuery("#notificationModal").modal("show");
	});

	$scope.$watch("wait_for_drawing", function(newValue, oldValue) {
		if(newValue != undefined && !$scope.game_completed)
		{
			$scope.openModal();
		}
	});

	$scope.$watch("drawing_data_url", function(newValue, oldValue) {
		if(newValue != oldValue)
		{
			gameService.drawDataURLToCanvas($scope.drawing_data_url, jQuery('#drawingCanvas').get(0)); 
			$scope.ready_to_guess = true;
		}
	});
	
});