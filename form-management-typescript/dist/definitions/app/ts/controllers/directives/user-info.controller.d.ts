/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserInfoController implements UserInfoInterface {
        private $scope;
        private $timeout;
        private $element;
        private docEventService;
        private utilsService;
        private readOnlyMode;
        private actionHandler;
        private userData;
        private userEditData;
        static $inject: string[];
        constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, $element: ng.IRootElementService, docEventService: DocEventService, utilsService: UtilsService);
        startEditMode($event: Event): void;
        cancelEditMode(event?: Event, noreset?: Boolean): void;
        onMouseClick(event: Event): void;
        actionCallback(event: Event, type: string, userId: string): boolean;
        validateForm(): boolean;
        userEditDataDefault(): void;
    }
}
