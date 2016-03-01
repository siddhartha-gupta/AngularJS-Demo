/// <reference path="../../../_all.d.ts" />
declare module app {
    interface UsersListInterface {
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        actionHandler(type: string, userId: string, userData?: UserDataInterface): void;
        validateEmail(val: string): void;
        editUserClick(userId: string): void;
        updateUserData(data: UserDataInterface, userId: string): void;
        onUserUpdateResp(resp: Boolean): void;
        deleteUserClick(key: string): void;
        deleteUserConfirm(key: string): void;
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
