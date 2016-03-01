/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class ModalDialogueDirective implements ng.IDirective {
		public restrict = 'E';
        public scope = {
			isVisible: '=',
			title: '=',
			body: '=',
			btn1Txt: '=',
			btn2Txt: '=',
			showBtn2: '=',
			btn1Callback: '&',
			btn2Callback: '&',
			closeBtnCallback: '&',
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/modal-dialogue.directive.html';
		public controller = 'ModalDialogueController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() { }

		link(scope:ng.IScope, element: ng.IRootElementService) {
			scope.$on('show-modal', function(event, params: any) {
				element.find(document.getElementById(params.id)).modal('show');
			});

			scope.$on('hide-modal', function(event, params: any) {
				element.find(document.getElementById(params.id)).modal('hide');
			});
		}

		static factory(): ng.IDirectiveFactory {
			return (() => new ModalDialogueDirective());
		}
    }
}
directives.directive('modalDialogue', app.ModalDialogueDirective.factory());
