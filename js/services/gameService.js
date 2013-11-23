app.factory("gameService", function($rootScope, game, gamePad, angularFire) {
	return {
		destroySession: function() {

				var ref = new Firebase(game.firebase_url);
				ref.set(null);
		},
		setUpSession: function(hostSessionId, $scope) {
			var sessionRef = new Firebase(game.firebase_url+hostSessionId);
			$scope.session = {};
			angularFire(sessionRef, $scope, 'session');
			angularFire(sessionRef, $scope, 'session_id');
			angularFire(sessionRef.child("ready_to_guess"), $scope, 'ready_to_guess');
			angularFire(sessionRef.child("game_characters"), $scope, 'game_characters');
			angularFire(sessionRef.child("character_buttons"), $scope, 'character_buttons');
			angularFire(sessionRef.child("score"), $scope, 'score');
			angularFire(sessionRef.child("allowed_characters"), $scope, 'allowed_characters');	
			angularFire(sessionRef.child("game_completed"), $scope, 'game_completed');
			angularFire(sessionRef.child("word"), $scope, 'word');
			angularFire(sessionRef.child("guess_count"), $scope, 'guess_count');
			angularFire(sessionRef.child("selected_characters"), $scope, 'selected_characters');
			angularFire(sessionRef.child("wait_for_approval_character"), $scope, 'wait_for_approval_character');
			angularFire(sessionRef.child("wait_for_drawing"), $scope, 'wait_for_drawing');
			angularFire(sessionRef.child("drawing_data_url"), $scope, 'drawing_data_url');
		},
		checkGuessedGameCharacters : function(game_characters, padButtonCharacter) {
			return _.where(game_characters, {
				character: padButtonCharacter.character.toLowerCase()
			});
		},
		setGameCharactersToGuessed: function(matched_game_characters) {
			_.map(matched_game_characters, function(character, index, list) {
				character.guessed = true;
			});
		},
		countGuessedGameCharacters : function(game_characters) {
			return _.countBy(game_characters, function(character) {
  				return character.guessed;
			}).true
		},
		getCanvasDataURL : function(canvas) {
		    return canvas.toDataURL("image/png");
		},
		drawDataURLToCanvas: function(data, canvas) {
		    var img = new Image();
		    img.onload = function() {
		        canvas.width = img.width;
		        canvas.height = img.height;
		        canvas.getContext("2d").drawImage(img, 0, 0);
		    };
		    img.src = data;
		}	
	}
});