'use strict';

booksApp.filter('renderHTML', function($sce) {
	return function(string, defaultText) {
		if (string) {
			return $sce.trustAsHtml(string);
		} else {
			return $sce.trustAsHtml(defaultText);
		}
	};
});
