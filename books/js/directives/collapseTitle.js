'use strict';

booksApp.directive('collapseTitle', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/directives/collapseTitle.html',
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
