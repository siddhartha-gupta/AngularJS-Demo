'use strict';

booksApp.directive('collapseTitle', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div><h4 class="well-title" ng-click="toggleDetails()">{{text}}</h4><div ng-transclude ng-show="isvisible"></div></div>',
		transclude: true,
		scope: {
			text: "@"
		},
		controller: 'collapse'
	};
});
