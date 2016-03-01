/// <reference path="../../../_all.d.ts" />
declare module app {
    interface DocEventServiceInterface {
        bindMouseEvent(callback: Function): void;
        bindKeyboardEvent(callback: Function): void;
        unbindMouseEvent(): void;
        unbindKeyboardEvent(): void;
    }
}
