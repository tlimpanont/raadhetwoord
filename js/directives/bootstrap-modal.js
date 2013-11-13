app.directive("bootstrapModal", function($compile, $parse) {
	return {
		controller: function($scope) {
			$scope.title = new Date();
		},
		link: function(scope, element, attrs, controller) {
			
			jQuery.ajax({
				url: attrs.template,
				dataType: "html",
				success: function(data) {
				 	angular.element(element).append($compile(data)(scope));	
					scope.modalInstance = jQuery("#"+attrs.id).modal();
				}
			});
		},
		
	}
});