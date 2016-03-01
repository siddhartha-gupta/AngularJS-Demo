/// <reference path="../../_all.d.ts" />
declare module app {
    class DocEventService {
        private $document;
        private docRef;
        static $inject: string[];
        constructor($document: ng.IDocumentService);
        bindMouseEvent(): void;
        bindKeyboardEvent(callback: any): void;
        unbindMouseEvent(): void;
        unbindKeyboardEvent(): void;
    }
}
