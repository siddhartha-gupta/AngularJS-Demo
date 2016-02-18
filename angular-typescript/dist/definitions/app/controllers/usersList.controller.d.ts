/// <reference path="../_all.d.ts" />
declare module app {
    class usersListController {
        private $scope;
        private $location;
        private $log;
        private apiService;
        private usersList;
        private appConfig;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $log: ng.ILogService, apiService: APIService);
        getUsers(): void;
        processServerData(data: any): void;
    }
}
