/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserInfoController {
        private readOnlyMode;
        private actionHandler;
        constructor();
        startEditMode($event: Event): void;
        cancelEditMode(event?: Event): void;
        actionCallback(event: Event, type: string, userId: string): void;
    }
}
