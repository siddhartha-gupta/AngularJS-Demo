/// <reference path="../../_all.d.ts" />
declare module app {
    class UsersListController implements UsersListInterface {
        private $scope;
        private $location;
        private $log;
        private apiService;
        private usersList;
        private appConfig;
        private modalDialogue;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $log: ng.ILogService, apiService: APIService);
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        deleteUser(event: Event, key: string): void;
        editUserClick(event: Event, key: string): void;
        clone(obj: any): any;
        updateUserData(data: any, userId: string): void;
        hideModal(event?: Event): void;
        dataAvailable(): boolean;
    }
}
