/// <reference path="../../../_all.d.ts" />
declare module app {
    interface HeaderInterface {
        onRouteChangeStart(event: Event, params: Object): void;
        onRouteChangeSuccess(event: Event, params: any): void;
        onRouteChangeError(event: any, params: any): void;
        setUserListHeader(): void;
        setAddUserHeader(): void;
        callFunction(event: Event, clickFunc: string): void;
        goToAddUser(): void;
        addUser(): void;
        goBack(): void;
    }
}
