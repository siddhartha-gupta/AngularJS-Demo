/// <reference path="../../../_all.d.ts" />
declare module app {
    interface SharedServiceInterface {
        broadcastEvent(eventName: string, data: any): void;
    }
}
