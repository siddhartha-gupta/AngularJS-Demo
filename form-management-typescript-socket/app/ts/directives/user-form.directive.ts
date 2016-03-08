/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class UserFormDirective implements ng.IDirective {
		public restrict = 'E';
        public scope = {
			userData: '=',
			userId: '=',
			editMode: '=',
			validateEmail: '&',
			formSubmit: '&',
			discardForm: '&'
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/user-form.directive.html';
		public controller = 'UserFormController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() {}

		static factory(): ng.IDirectiveFactory {
			return (() => new UserFormDirective());
		}
    }
} 
directives.directive('userForm', app.UserFormDirective.factory());
