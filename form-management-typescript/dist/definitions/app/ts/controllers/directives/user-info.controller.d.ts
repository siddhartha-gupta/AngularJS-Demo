/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserInfoController implements UserInfoInterface {
        private $scope;
        private docEventService;
        private readOnlyMode;
        private actionHandler;
        private userData;
        static $inject: string[];
        constructor($scope: ng.IScope, docEventService: DocEventService);
        startEditMode($event: Event): void;
        cancelEditMode(event?: Event): void;
        actionCallback(event: Event, type: string, userId: string): void;
    }
}
