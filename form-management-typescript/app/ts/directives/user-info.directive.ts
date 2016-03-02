/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class UserInfoDirective implements ng.IDirective {
		// private timer: number;

		public restrict = 'E';
		public scope: { [key: string]: string } = {
			userData: '=',
			actionHandler: '&'
		};
		public templateUrl = app.Constants.Default.templateUrl + 'directives/user-info.directive.html';
		public controller = 'UserInfoController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() { }

		link(scope: UserInfoScopeInterface, element: ng.IRootElementService) { }

		static factory(): ng.IDirectiveFactory {
			return (() => new UserInfoDirective());
		}
	}
}
directives.directive('userInfo', app.UserInfoDirective.factory());
