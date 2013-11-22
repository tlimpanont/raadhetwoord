app.controller("playerCharactersPadCtrl", function($scope, game, gameService, gamePad) {

	// when we ready to play the game, it's possible to use the keyboard
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
		// which character do we pressed on the keyboard
		var character = (String.fromCharCode(e.which));
		// only the allowed characters can be presetend on the front-end
		if(_.contains($scope.allowed_characters, character))
		{
			// which padButtonCharacter model can we find based on the pressed character?
			var padButtonCharacter =_.findWhere($scope.character_buttons, {character: character});
			$scope.guess(padButtonCharacter);
			$scope.$apply();
		}
	}
	
	//try to make a guess based on one single character
	$scope.guess = function(padButtonCharacter) {
		$scope.guess_count++;		
		// how many characters can we find that has a match
		var current_guess_objects = _.where($scope.game_characters, 
		{
			character: padButtonCharacter.character.toLowerCase()
		});
			

		// we have one or more match
		if(current_guess_objects.length > 0) 
		{
			$scope.score += current_guess_objects.length;
			padButtonCharacter.guessed = true;
			console.log(padButtonCharacter.character + ": " + "bestaat. Goed geraden!");

			// all the characters that are match can now have guessed status
			_.map(current_guess_objects, function(character, index, list) {
				character.guessed = true;
			});
			// how many characters have we correctly guessed?
			var corrected_game_characters_count = _.countBy($scope.game_characters, function(character) {
  				return character.guessed;
			}).true
			
			

			
			// we guessed all characters correctly
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
		// the character can not been matched
		else
		{
			padButtonCharacter.guessed = false;
			console.log(padButtonCharacter.character + ": " + "bestaat niet!. Niet Goed geraden!");
		}
		// we can not choose the character anymore
		padButtonCharacter.selected = true;
	}
}); // end controller
