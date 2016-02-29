/// <reference path="../../../_all.d.ts" />
declare module app {
    class UserInfoController {
        private readOnlyMode;
        constructor();
        startEditMode($event: Event, userId: string): void;
        cancelEditMode(event?: Event): void;
    }
}
