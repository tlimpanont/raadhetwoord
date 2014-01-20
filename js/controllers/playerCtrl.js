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

	$scope.closeModal = function() {	
		// remove modal after the host completed the drawing
		setTimeout(function() {
			$scope.$apply(function() {
				jQuery("#drawingModal").modal("hide");		
			});
		}, 1000); // a little bit of delay for user to have time to see the drawing
	}
	
	$scope.$watch("wait_for_drawing", function(newValue, oldValue) {
		if(newValue != undefined && !$scope.game_completed)
		{
			$scope.openModal();
		}
		
		if(newValue == false)
		{
			$scope.closeModal();
		}
	});

	$scope.$watch("drawing_data_url", function(newValue, oldValue) {
		if(newValue != null)
		{
			gameService.drawDataURLToCanvas(newValue, jQuery('#drawingCanvas').get(0)); 
		}
		else
		{
			gameService.clearDrawingCanvas(jQuery('#drawingCanvas').get(0));
		}
	});
	
});
