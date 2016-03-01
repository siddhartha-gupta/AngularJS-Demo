/// <reference path="../../../_all.d.ts" />
declare module app {
    interface UserFormInterface {
        startEditMode(event: Event): void;
        cancelEditMode(event?: Event): void;
        actionCallback(event: Event, type: string, userId: string): void;
    }
}
