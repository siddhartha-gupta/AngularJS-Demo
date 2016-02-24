/// <reference path="../../_all.d.ts" />
declare module app {
    class UsersListController implements UsersListInterface {
        private $scope;
        private $location;
        private apiService;
        private utilsService;
        private sharedService;
        private usersList;
        private appConfig;
        private editUser;
        private modalDialogue;
        private sortOrder;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, apiService: APIService, utilsService: UtilsService, sharedService: SharedService);
        dataAvailable(): boolean;
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        editUserClick(event: Event, userId: string): void;
        updateUserData(data: any, userId: string): void;
        hideEditPopup(event?: Event): void;
        editUserDefault(): void;
        deleteUserClick(event: Event, userId: string): void;
        deleteUserConfirm(userId: string): void;
        hideModalDialogue(event?: Event): void;
        modalDialogueDefault(): void;
        manageSortOrder(event: Event, orderBy: string): void;
    }
}
