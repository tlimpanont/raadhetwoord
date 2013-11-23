app.directive("drawingCanvas" , function() {
	return {
		scope: {
			writable: "@"
		},
		template: '<center><canvas id="drawingCanvas" width="500" height="300" style="border: 1px solid black;"></canvas></center>',
		link: function(scope, element, attrs) {
			if(attrs.writable == "true")
				jQuery('#drawingCanvas').sketch();
		}
	}
});