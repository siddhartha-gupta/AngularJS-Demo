/// <reference path="../../_all.d.ts" />
declare module app {
    class TableHeaderDirective implements ng.IDirective {
        private $compile;
        private $parse;
        restrict: string;
        scope: {
            tableHeading: string;
            sortFunc: string;
            checkAll: string;
        };
        templateUrl: string;
        controller: string;
        controllerAs: string;
        bindToController: boolean;
        constructor($compile: ng.ICompileService, $parse: ng.IParseService);
        static factory(): ng.IDirectiveFactory;
    }
}
