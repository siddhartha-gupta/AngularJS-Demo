/// <reference path="_all.d.ts" />
declare module app {
    class RouteHandler {
        static inject: string[];
        constructor($rootScope: any, $location: ng.ILocationService);
    }
}
