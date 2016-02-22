/// <reference path="../../_all.d.ts" />
declare module app {
    class AddUserController implements AddUserInterface {
        private $scope;
        private $location;
        private $log;
        private apiService;
        private validEmail;
        private userdata;
        private appConfig;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $log: ng.ILogService, apiService: APIService);
        validateEmail(val: string): void;
        addUser(): void;
    }
}
