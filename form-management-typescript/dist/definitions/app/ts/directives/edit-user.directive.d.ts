/// <reference path="../../_all.d.ts" />
declare module app {
    class EditUserDirective implements ng.IDirective {
        restrict: string;
        scope: {
            isVisible: string;
            title: string;
            user: string;
            userId: string;
            hidePopup: string;
            updateData: string;
        };
        templateUrl: string;
        controller: string;
        controllerAs: string;
        bindToController: boolean;
        constructor();
        link(scope: ng.IScope): void;
        static factory(): ng.IDirectiveFactory;
    }
}
