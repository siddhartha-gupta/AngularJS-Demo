/// <reference path="../../_all.d.ts" />
declare module app {
    class HeaderController implements HeaderInterface {
        private $scope;
        private $location;
        private $window;
        private $log;
        private sharedService;
        heading: string;
        headerLeftBtn: ButtonsInterface;
        headerRightBtn: ButtonsInterface;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $window: ng.IWindowService, $log: ng.ILogService, sharedService: SharedService);
        onRouteChangeStart(event: Event, params: Object): void;
        onRouteChangeSuccess(event: Event, params: any): void;
        onRouteChangeError(event: any, params: any): void;
        setUserListHeader(): void;
        setAddUserHeader(): void;
        callFunction(event: Event, clickFunc: string): void;
        goToAddUser(): void;
        addUser(): void;
        goBack(): void;
    }
}
