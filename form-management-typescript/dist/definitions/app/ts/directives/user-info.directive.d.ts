/// <reference path="../../_all.d.ts" />
declare module app {
    class UserInfoDirective implements ng.IDirective {
        restrict: string;
        scope: {
            userData: string;
            actionHandler: string;
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
