/// <reference path="../../_all.d.ts" />
declare module app {
    class TestController {
        private $scope;
        private utilsService;
        private validEmail;
        static $inject: string[];
        constructor($scope: ng.IScope, utilsService: UtilsService);
        validateEmail(val: string): void;
    }
}
