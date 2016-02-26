/// <reference path="../../_all.d.ts" />
declare module app {
    class TableHeaderDirective implements ng.IDirective {
        restrict: string;
        scope: {
            tableHeading: string;
            sortFunc: string;
        };
        templateUrl: string;
        controller: string;
        controllerAs: string;
        bindToController: boolean;
        static factory(): ng.IDirectiveFactory;
    }
}
