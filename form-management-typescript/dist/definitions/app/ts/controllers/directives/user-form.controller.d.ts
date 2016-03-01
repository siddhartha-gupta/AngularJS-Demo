/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserFormController implements UserFormInterface {
        private formSubmit;
        private userData;
        private userDataId;
        constructor();
        onFormSubmit(event: Event): void;
    }
}
