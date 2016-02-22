/// <reference path="../_all.d.ts" />
declare module app {
    class ModalDialogue implements ng.IDirective {
        private myFactory;
        restrict: string;
        scope: {
            isVisible: string;
            title: string;
            user: string;
            userId: string;
            hideModal: string;
            updateData: string;
        };
        templateUrl: string;
        controller: string;
        controllerAs: string;
        bindToController: boolean;
        constructor(myFactory: app.services.MyFactory);
        static factory(): ng.IDirectiveFactory;
    }
}
