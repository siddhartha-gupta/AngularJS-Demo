/// <reference path="../../_all.d.ts" />
declare module app {
    class UserInfoDirective implements ng.IDirective {
        restrict: string;
        scope: {
            [key: string]: string;
        };
        templateUrl: string;
        controller: string;
        controllerAs: string;
        bindToController: boolean;
        constructor();
        link(scope: UserInfoScopeInterface, element: ng.IRootElementService): void;
        static factory(): ng.IDirectiveFactory;
    }
}
