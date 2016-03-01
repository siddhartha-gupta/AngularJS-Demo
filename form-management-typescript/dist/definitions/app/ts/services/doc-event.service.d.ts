/// <reference path="../../_all.d.ts" />
declare module app {
    class DocEventService {
        private $document;
        private docRef;
        static $inject: string[];
        constructor($document: ng.IDocumentService);
        bindMouseEvent(callback: Function): void;
        bindKeyboardEvent(callback: Function): void;
        unbindMouseEvent(): void;
        unbindKeyboardEvent(): void;
    }
}
