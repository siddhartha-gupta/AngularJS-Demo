/// <reference path="_all.d.ts" />
declare module app {
    class Config {
        static $inject: string[];
        constructor($routeProvider: ng.route.IRouteProvider);
    }
}
