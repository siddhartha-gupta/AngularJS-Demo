/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserFormController {
        formSubmit: Function;
        userData: any;
        userDataId: any;
        constructor();
        onFormSubmit(event: Event): void;
    }
}
