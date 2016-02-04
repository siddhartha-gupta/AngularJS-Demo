'use strict';

booksApp.directive('collapseSection', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/directives/collapseSection.html',
		scope: {
			imgsrc: '=',
			title: '=',
			publisher: '=',
			saleability: '=',
			amount: '=',
			id: '=',
			showbookfn: '='
		},
		controller: 'collapseSection'
	};
});
