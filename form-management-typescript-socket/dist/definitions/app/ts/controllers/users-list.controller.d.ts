/// <reference path="../../_all.d.ts" />
declare module app {
    class UsersListController implements UsersListInterface {
        private $scope;
        private $location;
        private socketService;
        private utilsService;
        private sharedService;
        private checkboxHandlerService;
        private usersList;
        private appConfig;
        private editUser;
        private modalDialogue;
        private infoSlider;
        private sortOrder;
        private tableHeading;
        private showLoader;
        static $inject: string[];
        constructor($scope: ng.IScope, $location: ng.ILocationService, socketService: SocketService, utilsService: UtilsService, sharedService: SharedService, checkboxHandlerService: CheckboxHandlerService);
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        actionHandler(type: string, userId: string, userData?: UserDataInterface): void;
        validateEmail(val: string): void;
        editUserClick(userId: string): void;
        updateUserData(data: UserDataInterface, userId: string): void;
        onUserUpdateResp(resp: any): void;
        deleteUserClick(userId: string): void;
        deleteUserConfirm(userId: string): void;
        onUserDeleted(resp: Boolean): void;
        deleteAll($event: any): void;
        deleteAllUsersConfirm(userId: string): void;
        onAllUsersDeleted(resp: Boolean): void;
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
