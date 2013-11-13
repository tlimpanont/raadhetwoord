app.directive("charactersPad", function(game) {
	return {
		templateUrl: "js/directives/templates/charactersPad.html",
		controller: function($scope) {
				
				// when we ready to play the game, it's possible to use the keyboard
				$scope.$watch("ready_to_guess", function(newValue, oldValue){
					if(newValue)
					{
						if(game.keyboard_allowed) 
						{
							angular.element(window).on("keypress", function(e){
						    	// which character do we pressed on the keyboard
						    	var character = (String.fromCharCode(e.which));
						    	// only the allowed characters can be presetend on the front-end
						    	if(_.contains(game.allowed_characters, character))
						    	{
						    		// which padButtonCharacter model can we find based on the pressed character?
						    		var padButtonCharacter =_.findWhere($scope.character_buttons, {character: character});
							    	$scope.guess(padButtonCharacter);
							    	$scope.$apply();
						    	}
							});
						}
					}			
				});
				
				//try to make a guess based on one single character
				$scope.guess = function(padButtonCharacter) {
					// how many characters can we find that has a match
					var current_guess_objects = _.where($scope.game_characters, 
					{
						character: padButtonCharacter.character.toLowerCase()
					});
					// we have one or more match
					if(current_guess_objects.length > 0) 
					{
						console.log(padButtonCharacter.character + ": " + "bestaat. Goed geraden!");
						// all the characters that are match can now have guessed status
						_.map(current_guess_objects, function(character, index, list) {
							character.guessed = true;
						});
						// how many characters have we correctly guessed?
						var corrected_game_characters_count = _.countBy($scope.game_characters, function(character) {
			  				return character.guessed;
						}).true
						
						// we guessed all characters correctly guessed
						if(corrected_game_characters_count == $scope.game_characters.length)
						{
							console.log("alles goed geraden!");
							// if so, we can reset the game
							$scope.resetGame();
						}
						else
						{	
							// continue to play the game
							console.log("ga door je hebt nog niet alles geraden!")
						}
					}
					// the character can not been matched
					else
					{
						console.log(padButtonCharacter.character + ": " + "bestaat niet!. Niet Goed geraden!");
					}
					// we can not choose the character anymore
					padButtonCharacter.is_selected = true;
				}
			}// end controller
		} // end returning directive
});