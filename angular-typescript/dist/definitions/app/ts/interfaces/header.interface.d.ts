/// <reference path="../../_all.d.ts" />
declare module app {
    interface ButtonsInterface {
        'showBtn': Boolean;
        'clickFunc': string;
        'text': string;
    }
    interface HeaderInterface {
        onRouteChangeStart(event: Event, params: Object): any;
        onRouteChangeSuccess(event: Event, params: any): any;
        onRouteChangeError(event: any, params: any): any;
        setUserListHeader(): any;
        setAddUserHeader(): any;
        callFunction(event: Event, clickFunc: string): any;
        goToAddUser(): any;
        addUser(): any;
        goBack(): any;
    }
}
