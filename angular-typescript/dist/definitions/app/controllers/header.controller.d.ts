/// <reference path="../_all.d.ts" />
declare module app {
    class HeaderController {
        private $scope;
        private $location;
        private $window;
        private $log;
        private sharedService;
        heading: string;
        headerLeftBtn: Object;
        headerRightBtn: Object;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $window: ng.IWindowService, $log: ng.ILogService, sharedService: SharedService);
        onRouteChangeStart(event: Event, params: Object): void;
        onRouteChangeSuccess(event: Event, params: Object): void;
        onRouteChangeError(event: any, params: any): void;
        callFunction(event: Event, clickFunc: string): void;
        goToAddUser: () => void;
        addUser(): void;
        goBack(): void;
    }
}
