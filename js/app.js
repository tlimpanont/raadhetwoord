var app = angular.module("raadhetwoord", ['ngAnimate-animate.css','ngAnimate', 'ui.bootstrap']);

app.config(function($provide) {
	$provide.provider('game', function() {
		var allowed_characters;
		var level_type = "basic"; setLevelType(level_type);
		var keyboard_allowed = true; keyboardAllowed(keyboard_allowed);

		function setLevelType (level_type) {
			switch(level_type) {
				case "basic" :
					setAllowedCharacters("abcdefghijklmnopqrstuvwxyz");
				break;
					
				case "advanced" :
					setAllowedCharacters("!#@$%&^()_<>");
				break;
			}

			level_type = level_type;
		}
		function setAllowedCharacters(characters) {
			if(hasWhiteSpace(characters))
				throw new Error("Whitespace is not allowed");

			allowed_characters = characters.toLowerCase().split('');
			if(hasDuplicate(allowed_characters))
				throw new Error("Duplication of characters not allowed!");


			function hasDuplicate(arr){
   				return (arr.length != _.uniq(arr).length);
			}
			function hasWhiteSpace(s) {
 				 return /\s/g.test(s);
 			}
		}
		function keyboardAllowed(value) {
			keyboard_allowed = value;
		}
		return {
			setLevelType: setLevelType,
			setAllowedCharacters: setAllowedCharacters,
			keyboardAllowed: keyboardAllowed,
			$get: function() {
				return {
					allowed_characters: allowed_characters,
					level_type: level_type,
					keyboard_allowed: keyboard_allowed
				}
			}
		}
	});
});

app.config(function(gameProvider) {
	gameProvider.setLevelType("basic");
	gameProvider.keyboardAllowed(true);
});