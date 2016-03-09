/// <reference path="../../_all.d.ts" />
declare module app {
    class SocketService implements SocketServiceInterface {
        private utilsService;
        private sharedService;
        private socket;
        static $inject: string[];
        constructor(utilsService: UtilsService, sharedService: SharedService);
        initSocket(callback?: Function): void;
        msgSender(identifier: string, data?: Object): void;
        msgReceiver(): void;
    }
}
