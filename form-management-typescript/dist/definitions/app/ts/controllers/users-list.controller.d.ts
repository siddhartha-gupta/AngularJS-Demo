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
        private infoSlider;
        private sortOrder;
        private tableHeading;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, apiService: APIService, utilsService: UtilsService, sharedService: SharedService);
        actionHandler(type: string, userId: string, userData?: any): void;
        saveUserClick(userId: string, userData: any): void;
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        validateEmail(val: string): void;
        editUserClick(userId: string): void;
        updateUserData(data: any, userId: string): void;
        onUserUpdated(): void;
        hideEditPopup(event?: Event): void;
        deleteUserClick(userId: string): void;
        deleteUserConfirm(userId: string): void;
        onUserDeleted(): void;
        hideModalDialogue(event?: Event): void;
        manageSortOrder(orderBy: any): void;
        showInfoSlider(params: any): void;
        hideInfoSlider(): void;
        createtableHeading(): void;
        editUserDefault(): void;
        modalDialogueDefault(): void;
        infoSliderDefault(): void;
    }
}
