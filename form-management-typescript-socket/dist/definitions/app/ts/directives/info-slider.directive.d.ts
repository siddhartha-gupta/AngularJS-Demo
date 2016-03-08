/// <reference path="../../_all.d.ts" />
declare module app {
    class InfoSliderDirective implements ng.IDirective {
        restrict: string;
        scope: {
            title: string;
            body: string;
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
