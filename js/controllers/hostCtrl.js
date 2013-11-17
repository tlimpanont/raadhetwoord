app.controller('hostCtrl', function($scope, $timeout, game, gamePad, gameService, $location) {
	gameService.destroySession();
	gameService.setUpSession(game.hostSessionId, $scope);


	$scope.resetGame = function() {
		$scope.session.allowed_characters = game.allowed_characters;
		$scope.session.ready_to_guess = false;
		$scope.session.character_buttons = gamePad.createCharacterButtons();
		$scope.session.game_characters = [];
		$scope.session.game_completed = false;
		$scope.session.score = 0;
		$scope.user_input = ""; 
	}

	$scope.startGame = function(event) {
		event.currentTarget.blur();
		$scope.session.ready_to_guess =  true;
		$scope.session.score = 0;
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
});
