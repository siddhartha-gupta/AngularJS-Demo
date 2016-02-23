/// <reference path="../../_all.d.ts" />
declare module app {
    class UsersListInterface {
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        deleteUserClick(event: Event, key: string): void;
        editUserClick(event: Event, key: string): void;
        updateUserData(data: any, userId: string): void;
        hideEditPopup(event?: Event): void;
        dataAvailable(): void;
    }
}
