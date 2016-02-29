/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserFormController {
        formSubmit: Function;
        userData: UserDataInterface;
        userDataId: string;
        constructor();
        onFormSubmit(event: Event): void;
    }
}
