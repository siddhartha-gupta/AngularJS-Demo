/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserInfoController implements UserInfoInterface {
        private $scope;
        private $timeout;
        private $element;
        private docEventService;
        private readOnlyMode;
        private actionHandler;
        private userData;
        static $inject: string[];
        constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, $element: ng.IRootElementService, docEventService: DocEventService);
        startEditMode($event: Event): void;
        onMouseClick(event: any): void;
        cancelEditMode(event?: Event, noreset?: Boolean): void;
        actionCallback(event: Event, type: string, userId: string): void;
    }
}
