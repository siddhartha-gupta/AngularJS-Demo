/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class ModalDialogue implements ng.IDirective {
		public restrict = 'E';
        public scope = {
            isVisible: '=',
			title: '=',
			user: '=',
			userId: '=',
			hideModal: '&',
			updateData: '&'
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/modal-dialogue.directive.html';
		public controller = 'ModalDialogueController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() {}

		static factory(): ng.IDirectiveFactory {
			return( () => new ModalDialogue());
		}
    }
} 
directives.directive('modalDialogue', app.ModalDialogue.factory());
