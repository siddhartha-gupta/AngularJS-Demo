/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserInfoController implements UserInfoInterface {
        private docEventService;
        private readOnlyMode;
        private actionHandler;
        private userData;
        static $inject: string[];
        constructor(docEventService: DocEventService);
        startEditMode($event: Event): void;
        cancelEditMode(event?: Event): void;
        actionCallback(event: Event, type: string, userId: string): void;
    }
}
