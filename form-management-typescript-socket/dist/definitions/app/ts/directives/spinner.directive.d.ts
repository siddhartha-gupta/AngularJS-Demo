/// <reference path="../../_all.d.ts" />
declare module app {
    class SpinnerDirective implements ng.IDirective {
        restrict: string;
        scope: {
            showLoader: string;
        };
        templateUrl: string;
        controller: string;
        controllerAs: string;
        bindToController: boolean;
        constructor();
        static factory(): ng.IDirectiveFactory;
    }
}
