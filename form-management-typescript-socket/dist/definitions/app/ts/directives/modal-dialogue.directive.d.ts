/// <reference path="../../_all.d.ts" />
declare module app {
    class ModalDialogueDirective implements ng.IDirective {
        restrict: string;
        scope: {
            isVisible: string;
            title: string;
            body: string;
            btn1Txt: string;
            btn2Txt: string;
            showBtn2: string;
            btn1Callback: string;
            btn2Callback: string;
            closeBtnCallback: string;
        };
        templateUrl: string;
        controller: string;
        controllerAs: string;
        bindToController: boolean;
        constructor();
        link(scope: ng.IScope, element: ng.IRootElementService): void;
        static factory(): ng.IDirectiveFactory;
    }
}
