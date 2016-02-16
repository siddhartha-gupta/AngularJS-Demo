'use strict';

formApp.directive('modalDialogue', function() {
	return {
		restrict: 'E',
		// require: '?user',
		scope: {
			isVisible: '=',
			title: '=',
			user: '=',
			userId: '=',
			hideModal: '&',
			updateData: '&'
		},
		templateUrl: 'templates/directives/modal-dialogue.directive.html',
		controller: 'modalDialogue',
		controllerAs: 'customController',
		bindToController: true
	};
});
