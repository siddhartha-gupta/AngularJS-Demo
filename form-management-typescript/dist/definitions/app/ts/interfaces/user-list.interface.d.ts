/// <reference path="../../_all.d.ts" />
declare module app {
    interface UsersListInterface {
        getUsers(): any;
        processServerData(data: any): any;
        addUser(): any;
        editUserClick(event: Event, key: string): any;
        updateUserData(data: any, userId: string): any;
        hideEditPopup(event?: Event): any;
        editUserDefault(): any;
        deleteUserClick(event: Event, key: string): any;
        deleteUserConfirm(key: string): any;
        hideModalDialogue(event?: Event): any;
        modalDialogueDefault(): any;
    }
}
