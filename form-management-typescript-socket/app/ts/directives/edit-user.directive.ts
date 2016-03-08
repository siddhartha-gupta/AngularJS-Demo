/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class EditUserDirective implements ng.IDirective {
		public restrict = 'E';
        public scope = {
            isVisible: '=',
			title: '=',
			userData: '=',
			userId: '=',
			hidePopup: '&',
			updateData: '&',
			discardForm: '&'
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/edit-user.directive.html';
		public controller = 'EditUserController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() {}

		link(scope: ng.IScope, element: ng.IRootElementService) {
			scope.$on('show-edit-modal', function(event) {
				(<any>element.find('#editUserModal')).modal('show');
			});

			scope.$on('hide-edit-modal', function(event) {
				(<any>element.find('#editUserModal')).modal('hide');
			});
		}

		static factory(): ng.IDirectiveFactory {
			return( () => new EditUserDirective());
		}
    }
} 
directives.directive('editUser', app.EditUserDirective.factory());
