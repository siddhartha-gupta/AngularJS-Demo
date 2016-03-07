/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class UserInfoController implements UserInfoInterface {
		private readOnlyMode: Boolean;
		private actionHandler: Function;
		private userData: UserDataInterface;
		private userEditData: userEditDataInterface;
		private checkboxSelected: Boolean;

		public static $inject = [
			'$scope',
			'$timeout',
			'$element',
			'DocEventService',
			'UtilsService',
			'CheckboxHandlerService'
		];

		constructor(
			private $scope: ng.IScope,
			private $timeout: ng.ITimeoutService,
			private $element: ng.IRootElementService,
			private docEventService: DocEventService,
			private utilsService: UtilsService,
			private checkboxHandlerService: CheckboxHandlerService
		) {
			this.readOnlyMode = true;
			this.checkboxSelected = false;
			this.userEditDataDefault();

			this.$scope.$on('check-all', (event, params: any) => {
				this.onCheckboxClicked(null, params);
			});

			/*this.$scope.$on('checkbox-counter-changed', (event, params: any) => {
				this.onCheckboxCounterChanged(event, params);
			});*/
		}

		startEditMode(event: Event) {
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
				this.$element.find('#firstname').val(this.userData.firstname);
				this.$element.find('#lastname').val(this.userData.lastname);
				this.$element.find('#location').val(this.userData.location);

				this.$timeout(() => {
					this.$scope.$apply();
				});
			}
		}

		onMouseClick(event: Event) {
			let target = <HTMLElement>event.target;
			let tagName = target.tagName.toLowerCase();

			if ((tagName !== 'input' && tagName !== 'select') || (this.$element.find(target).length === 0)) {
				this.cancelEditMode(event);
			}
		}

		actionCallback(event: Event, type: string, userId: string) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			if (type === 'save') {
				if (this.validateForm()) {
					var userData = {
						id_member: this.userData.id_member,
						firstname: this.userEditData.firstname,
						lastname: this.userEditData.lastname,
						email: this.userData.email,
						phonenumber: this.userData.phonenumber,
						location: this.userEditData.location
					};
					this.cancelEditMode(null, true);
				} else {
					this.userEditDataDefault();
					return false;
				}
			}
			this.actionHandler({ type: type, userId: userId, userData: userData });
		}

		validateForm() {
			let firstname = this.userEditData.firstname,
				lastname = this.userEditData.lastname,
				location = this.userEditData.location;

			if (this.utilsService.isNullUndefined(firstname) ||
				this.utilsService.isNullUndefined(lastname) ||
				this.utilsService.isNullUndefined(location)) {
				return false;
			}
			return true
		}

		userEditDataDefault() {
			this.userEditData = {
				firstname: this.userData.firstname,
				lastname: this.userData.lastname,
				location: this.userData.location
			};
		}

		onCheckboxClicked(event?: Event, params?: any) {
			let changed = false;
			if(event) {
				changed = true;
			} else if ((params && params.state !== this.checkboxSelected)) {
				this.checkboxSelected = params.state;
				changed = true;
			}

			if(changed) {
				this.checkboxHandlerService.manageCheckboxCounter(this.checkboxSelected);
			}
		}
	}
}
controllers.controller('UserInfoController', app.UserInfoController);
