/// <reference path="../../_all.d.ts" />
declare module app {
    class UsersListController implements UsersListInterface {
        private $scope;
        private $location;
        private $log;
        private apiService;
        private usersList;
        private appConfig;
        private editUser;
        private modalDialogue;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $log: ng.ILogService, apiService: APIService);
        dataAvailable(): boolean;
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        editUserClick(event: Event, key: string): void;
        clone(obj: any): any;
        updateUserData(data: any, userId: string): void;
        hideEditPopup(event?: Event): void;
        editUserDefault(): void;
        deleteUserClick(event: Event, key: string): void;
        deleteUserConfirm(key: string): void;
        hideModalDialogue(event?: Event): void;
        modalDialogueDefault(): void;
    }
}
