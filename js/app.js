var app = angular.module("raadhetwoord",  ['ngRoute', 'ngAnimate-animate.css','ngAnimate', 'ui.bootstrap', "firebase"]);


app.config(function($provide, $locationProvider, $routeProvider) {
	
	$routeProvider.when('/', {
      redirectTo: "/host"
    });

    $routeProvider.when('/speel/:hostSessionId', {
        templateUrl: 'templates/playerTemplate.html', 
      	controller: 'playerCtrl'
    });

    $routeProvider.when('/host', {
      templateUrl: 'templates/hostTemplate.html', 
      controller: 'hostCtrl'
    });

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
					keyboard_allowed: keyboard_allowed,
					hostSessionId: Math.floor(Math.random() * 1000)
				}
			}
		}
	});
});

app.config(function(gameProvider) {
	gameProvider.setLevelType("basic");
	gameProvider.keyboardAllowed(true);
});


app.run(function($rootScope) {
    
});

app.factory("gameService", function($rootScope, game, gamePad, angularFire) {

	return {
		destroySession: function() {
				var ref = new Firebase('https://raadhetwoord.firebaseio.com/');
				ref.set(null);
		},
		setUpSession: function(hostSessionId, $scope) {
			var sessionRef = new Firebase('https://raadhetwoord.firebaseio.com/'+hostSessionId);
			$scope.session = {};
			angularFire(sessionRef, $scope, 'session');
			angularFire(sessionRef.child("ready_to_guess"), $scope, 'ready_to_guess');
			angularFire(sessionRef.child("game_characters"), $scope, 'game_characters');
			angularFire(sessionRef.child("character_buttons"), $scope, 'character_buttons');
			angularFire(sessionRef.child("score"), $scope, 'score');
			angularFire(sessionRef.child("allowed_characters"), $scope, 'allowed_characters');	
			angularFire(sessionRef.child("game_completed"), $scope, 'game_completed');
		},
		resetGame: function($scope) {
		
		},
		startGame: function(event, $scope) {
			
		}
	}
});

app.controller('hostCtrl', function($scope, $timeout, game, gamePad, gameService) {
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

	$scope.game_information = JSON.stringify(game, null, 4);
	$scope.resetGame();
	$scope.$watch("user_input", function(newValue, oldValue) {
		if(newValue != undefined)
			$scope.session.game_characters = gamePad.createGameCharacters(newValue);
	});

	$scope.$watch("game_completed", function(newValue) {
		if(newValue == true)
			$scope.resetGame();
	});
});


app.controller('playerCtrl', function($scope, $route, gameService, gamePad, game) {
	gameService.setUpSession($route.current.params.hostSessionId, $scope);
});