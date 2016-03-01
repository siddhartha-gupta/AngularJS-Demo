/// <reference path="../../../_all.d.ts" />
declare module app {
    interface UserInfoInterface {
        startEditMode(event: Event): void;
        cancelEditMode(event?: Event, noreset?: Boolean): void;
        onMouseClick(event: Event): void;
        actionCallback(event: Event, type: string, userId: string): void;
        validateForm(): void;
    }
}
