/// <reference path="../../_all.d.ts" />
declare module app {
    class UserFormDirective implements ng.IDirective {
        restrict: string;
        scope: {
            userData: string;
            userId: string;
            editMode: string;
            validateEmail: string;
            formSubmit: string;
            discardForm: string;
        };
        templateUrl: string;
        controller: string;
        controllerAs: string;
        bindToController: boolean;
        constructor();
        static factory(): ng.IDirectiveFactory;
    }
}
