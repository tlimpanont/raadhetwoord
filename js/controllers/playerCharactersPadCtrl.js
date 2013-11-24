app.controller("playerCharactersPadCtrl", function($scope, game, gameService, gamePad) {

	$scope.$watch("ready_to_guess", function(newValue, oldValue){
		if(newValue)
		{
			if(game.keyboard_allowed) 
			{
				angular.element(window).on("keypress", $scope.keypressHandler);
			}
		}			
	});

	$scope.keypressHandler = function(e) {
		var character = (String.fromCharCode(e.which));
		
		if(_.contains($scope.allowed_characters, character))
		{
			var padButtonCharacter =_.findWhere($scope.character_buttons, {character: character});
			$scope.guess(padButtonCharacter);
			$scope.$apply();
		}
	}
	
	$scope.guess = function(padButtonCharacter) {
		$scope.guess_count++;		

		var guessed_game_characters = gameService.checkGuessedGameCharacters($scope.game_characters, padButtonCharacter.character);
			
		if(guessed_game_characters.length > 0) 
		{
			$scope.score += guessed_game_characters.length;
			padButtonCharacter.guessed = true;
			console.log(padButtonCharacter.character + ": " + "bestaat. Goed geraden!");

			gameService.setGameCharactersToGuessed(guessed_game_characters);
		
			var corrected_game_characters_count = gameService.countGuessedGameCharacters($scope.game_characters);
								
			if(corrected_game_characters_count == $scope.game_characters.length)
			{
				$scope.game_completed = true;
				$scope.character_buttons = gamePad.createCharacterButtons();
				angular.element(window).off("keypress", $scope.keypressHandler);
			}
			else
			{	
				$scope.game_completed = false;
				console.log("ga door je hebt nog niet alles geraden!")
			}	
		}
		else
		{
			$scope.wait_for_drawing = true;
			padButtonCharacter.guessed = false;
			console.log(padButtonCharacter.character + ": " + "bestaat niet!. Niet Goed geraden!");
		}
	
		padButtonCharacter.selected = true;
	}
}); 
