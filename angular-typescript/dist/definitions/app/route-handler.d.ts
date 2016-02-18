/// <reference path="_all.d.ts" />
declare module app {
    class RouteHandler {
        $rootScope: ng.IRootScopeService;
        private $location;
        static $inject: string[];
        constructor($rootScope: ng.IRootScopeService, $location: ng.ILocationService);
    }
}
