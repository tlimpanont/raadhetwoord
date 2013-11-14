app.directive("bootstrapModal", function($compile) {
	return {
		controller: "mainCtrl",
		link: function(scope, element, attrs, controller) {
			jQuery.ajax({
				url: attrs.template,
				dataType: "html",
				success: function(data) {
					var modal = jQuery(jQuery.parseHTML(data)).find("div:first").parent();
					var id = modal.attr("id");
				 	angular.element(element).before($compile(modal)(scope));	
					scope.endGameModal = jQuery("#"+id).modal({
						show: false
					});
				}
			});
		}
	}
});