/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class UserInfoController implements UserInfoInterface {
		private readOnlyMode: Boolean;
		private actionHandler: Function;
		private userData: UserDataInterface;

		public static $inject = [
			'$scope',
			'$timeout',
			'$element',
			'DocEventService'
		];

		constructor(
			private $scope: ng.IScope,
			private $timeout: ng.ITimeoutService,
			private $element: ng.IRootElementService,
			private docEventService: DocEventService
		) {
			this.readOnlyMode = true;
		}

		startEditMode($event: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			if (this.readOnlyMode) {
				this.readOnlyMode = false;
				this.docEventService.bindKeyboardEvent(this.cancelEditMode.bind(this));
				this.docEventService.bindMouseEvent(this.onMouseClick.bind(this));
			}
		}

		onMouseClick(event) {
			let tagName = event.target.tagName.toLowerCase();

			if ((tagName !== 'input' && tagName !== 'select') || (this.$element.find(event.target).length === 0)) {
				this.cancelEditMode(event);
			}
		}

		cancelEditMode(event?: Event, noreset?: Boolean) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.docEventService.unbindKeyboardEvent();
			this.docEventService.unbindMouseEvent();

			this.readOnlyMode = true;
			/*if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
				this.$scope.$apply();
			}*/

			if (!noreset) {
				console.log('in noreset');
				angular.element('#firstname').val(this.userData.firstname);
				angular.element('#lastname').val(this.userData.lastname);
				angular.element('#location').val(this.userData.location);

				this.$timeout(() => {
					this.$scope.$apply();
				});
			}
		}

		actionCallback(event: Event, type: string, userId: string) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			console.log('actionCallback: ', type, ' : ', userId);
			if (type === 'save') {
				var userData = {
					id_member: this.userData.id_member,
					firstname: angular.element('#firstname').val(),
					lastname: angular.element('#lastname').val(),
					email: this.userData.email,
					phonenumber: this.userData.phonenumber,
					location: angular.element('#location').val()
				};
				this.cancelEditMode(null, true);
			}

			this.actionHandler({ type: type, userId: userId, userData: userData });
		}
	}
}
controllers.controller('UserInfoController', app.UserInfoController);
