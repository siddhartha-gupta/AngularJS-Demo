/// <reference path="../../../_all.d.ts" />
declare module app {
    interface UsersListInterface {
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        actionHandler(type: string, userId: string, userData?: any): void;
        validateEmail(val: string): void;
        editUserClick(userId: string): void;
        updateUserData(data: any, userId: string): void;
        onUserUpdateResp(resp: Boolean): void;
        deleteUserClick(key: string): void;
        deleteUserConfirm(key: string): void;
        onUserDeleted(resp: Boolean): void;
        hideEditPopup(event?: Event): void;
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
