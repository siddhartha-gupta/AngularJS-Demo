/// <reference path="../_all.d.ts" />
declare module app {
    class AddUserController {
        private $scope;
        private $location;
        private $log;
        private apiService;
        private user;
        private validEmail;
        private appConfig;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $log: ng.ILogService, apiService: APIService);
        validateEmail: (val: any) => void;
        addUser: () => void;
    }
}
