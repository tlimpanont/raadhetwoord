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
			angularFire(sessionRef.child("ready_to_guess"), $scope, 'ready_to_guess');
			angularFire(sessionRef.child("game_characters"), $scope, 'game_characters');
			angularFire(sessionRef.child("character_buttons"), $scope, 'character_buttons');
			angularFire(sessionRef.child("score"), $scope, 'score');
			angularFire(sessionRef.child("allowed_characters"), $scope, 'allowed_characters');	
			angularFire(sessionRef.child("game_completed"), $scope, 'game_completed');
			angularFire(sessionRef.child("word"), $scope, 'word');
			angularFire(sessionRef.child("guess_count"), $scope, 'guess_count');
			angularFire(sessionRef.child("selected_characters"), $scope, 'selected_characters');
		}
	}
});