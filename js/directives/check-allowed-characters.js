app.directive('checkAllowedCharacters',  function(game){
	return {
		link: function($scope, iElm, iAttrs, controller) {
			angular.element(iElm).on("keypress", function(e) {
				var character = (String.fromCharCode(e.which)).toLowerCase();
				if(e.keyCode == 8  )
					return true
				if(!_.contains(game.allowed_characters, character))
					return false;

			});
		}
	};
});
