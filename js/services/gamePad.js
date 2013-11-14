app.service("gamePad", function(game)  {
	GameCharacter = function(character, guessed) {
		this.character = character;
		this.guessed = guessed;
	}

	PadButtonCharacter = function(character, selected) {
		this.character = character;
		this.selected = selected;
	}
	
	return  {
		createCharacterButtons : function() {
			return _.map(game.allowed_characters, function(character) {
      			return new PadButtonCharacter(character, false);
    		});
		},
		createGameCharacters : function(user_input) {
			var game_characters = user_input.toLowerCase().split('');
			return _.map(game_characters, function(character) {
      			return new GameCharacter(character, false);
    		});
		}
	}
});	