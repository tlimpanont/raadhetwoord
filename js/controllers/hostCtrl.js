app.controller('hostCtrl', function($scope, $timeout, game, gamePad, gameService, $location) {
	gameService.destroySession();
	gameService.setUpSession(game.hostSessionId, $scope);

	jQuery("#drawingModal").modal({
	 	keyboard: false,
	 	backdrop: "static",
	 	show: false
	 });

	$scope.saveDataURL = function() {
		$scope.session.drawing_data_url = gameService.getCanvasDataURL(jQuery('#drawingCanvas').get(0)); 
		jQuery("#drawingModal").modal("hide");
		$scope.session.wait_for_drawing = false;
	}

	$scope.openModal = function() {	
		 jQuery("#drawingModal").modal("show");
	}

	$scope.resetGame = function() {
		$scope.session.session_id =  game.hostSessionId;
		$scope.session.drawing_data_url = null;
		$scope.session.wait_for_approval_character = null;
		$scope.session.allowed_characters = game.allowed_characters;
		$scope.session.ready_to_guess = false;
		$scope.session.character_buttons = gamePad.createCharacterButtons();
		$scope.session.game_characters = [];
		$scope.session.game_completed = false;
		$scope.session.score = 0;
		$scope.session.guess_count = 0;
		$scope.user_input = "";
	}

	$scope.startGame = function(event) {
		event.currentTarget.blur();
		$scope.session.ready_to_guess = true;
		$scope.clearDrawingCanvas();
	}

	$scope.clearDrawingCanvas = function() {
		jQuery('#drawingCanvas').sketch().actions = [];   
		gameService.clearDrawingCanvas(jQuery('#drawingCanvas').get(0));	
	}
	
	$scope.play_url = $location.$$absUrl.replace(/host$/g, "speel/"+game.hostSessionId);
	$scope.game = game;
	$scope.resetGame();
	$scope.$watch("user_input", function(newValue, oldValue) {
		if(newValue != undefined)
		{
			var character = gamePad.createGameCharacters(newValue);
			$scope.session.game_characters = character;  
			$scope.word = newValue;
		}
	});

	$scope.$watch("wait_for_approval_character", function(newValue, oldValue) {
		if(newValue != undefined)
		{
			// $scope.openModal();
		}
	});

	$scope.$watch("wait_for_drawing", function(newValue, oldValue) {
		if(newValue)
		{
			$scope.openModal();
		}
	});
});
