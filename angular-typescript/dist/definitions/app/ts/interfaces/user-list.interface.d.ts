/// <reference path="../../_all.d.ts" />
declare module app {
    class UsersListInterface {
        getUsers(): void;
        processServerData(data: any): void;
        addUser(): void;
        deleteUser(event: Event, key: string): void;
        editUserClick(event: Event, key: string): void;
        clone(obj: any): void;
        updateUserData(data: any, userId: string): void;
        hideModal(event?: Event): void;
        dataAvailable(): void;
    }
}
