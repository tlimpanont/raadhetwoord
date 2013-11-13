app.service("gamePad", function(game)  {
	GameCharacter = function(character, is_guessed) {
		this.character = character;
		this.is_guessed = is_guessed;
	}

	PadButtonCharacter = function(character, is_choosen) {
		this.character = character;
		this.is_choosen = is_choosen;
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

app.directive('checkAllowedCharacters',  function(game){
	return {
		link: function($scope, iElm, iAttrs, controller) {
			angular.element(iElm).on("keypress", function(e) {
				var character = (String.fromCharCode(e.which)).toLowerCase();
				if(!_.contains(game.allowed_characters, character))
					return false;
			});
		}
	};
});


app.controller("mainCtrl", function($scope, $timeout, game, gamePad) {

	$scope.resetGame = function() {
		angular.element(window).off("keypress");
		$scope.characters = game.allowed_characters;
		$scope.ready_to_guess = false;
		$scope.character_buttons = gamePad.createCharacterButtons();
		$scope.game_characters = [];
		$scope.user_input = "";
	}

	$scope.game_information = JSON.stringify(game, null, 4);
	$scope.resetGame();
	$scope.$watch("user_input", function(newValue, oldValue) {
		if(newValue != undefined)
			$scope.game_characters = gamePad.createGameCharacters(newValue);
	});
	
});
