(function(window) {
	var scripts = [
		{"mordernizr": "js/libs/modernizr-2.6.2.min.js"},
		{"prefixfree" : "js/libs/prefixfree.min.js" },
		{"underscore" : "js/libs/underscore.js"},
		{"jquery": "js/libs/jquery-1.9.1.js"},
		{"jquery_ui": "js/libs/jquery-ui.js"},
		{"angular": "js/libs/angular.min.js"},
		{"angular_route": "js/libs/angular-route.min.js"},
		{"angular_animate": "js/libs/angular-animate.min.js"},
		{"firebase" : "js/libs/firebase.js"},
		{"firebase_simple_login" : "js/libs/firebase-simple-login.js"},
		{"angularfire": "js/libs/angularfire.js"},
		{"bootstrap" : "js/libs/bootstrap.min.js"},
		"js/app.js",
		"js/controllers/mainCtrl.js",
		"js/controllers/hostCtrl.js",
		"js/controllers/playerCtrl.js",
		"js/services/gamePad.js",
		"js/services/gameService.js",
		"js/directives/check-allowed-characters.js",
		"js/directives/characters-pad.js"
	];

	app = {};

	head.load(scripts, function() {
						
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
				var firebase_url = ""; 

				
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
				function setFirebaseUrl(url) {
					firebase_url = url;
				}

				return {
					setLevelType: setLevelType,
					setAllowedCharacters: setAllowedCharacters,
					keyboardAllowed: keyboardAllowed,
					setFirebaseUrl: setFirebaseUrl,
					$get: function() {
						return {
							allowed_characters: allowed_characters,
							level_type: level_type,
							keyboard_allowed: keyboard_allowed,
							hostSessionId: Math.floor(Math.random() * 1000),
							firebase_url: firebase_url
						}
					}
				}
			});
		});

		app.config(function(gameProvider) {
			gameProvider.setLevelType("basic");
			gameProvider.keyboardAllowed(true);
			gameProvider.setFirebaseUrl("https://raadhetwoord.firebaseio.com/");
		});
	});

})(window)
