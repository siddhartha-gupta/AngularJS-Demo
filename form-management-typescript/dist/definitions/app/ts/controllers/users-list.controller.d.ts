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
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        actionHandler(type: string, userId: string, userData?: UserDataInterface): void;
        validateEmail(val: string): void;
        editUserClick(userId: string): void;
        updateUserData(data: UserDataInterface, userId: string): void;
        onUserUpdateResp(resp: Boolean): void;
        deleteUserClick(userId: string): void;
        deleteUserConfirm(userId: string): void;
        onUserDeleted(resp: Boolean): void;
        hideEditPopup(event?: Event): void;
        hideModalDialogue(event?: Event): void;
        manageSortOrder(orderBy: string): void;
        showInfoSlider(params: InfoSliderInterface): void;
        hideInfoSlider(): void;
        createtableHeading(): void;
        editUserDefault(): void;
        modalDialogueDefault(): void;
        infoSliderDefault(): void;
    }
}
