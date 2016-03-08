/// <reference path="../../../_all.d.ts" />
declare module app {
    interface SocketServiceInterface {
        initSocket(callback: Function): void;
        msgSender(identifier: string, data?: Object): void;
        msgReceiver(): void;
    }
}
