/// <reference path="../../../_all.d.ts" />
declare module app {
    class TableHeaderController {
        private $element;
        sortFunc: Function;
        defaultClass: string;
        lastSortOrder: string;
        static $inject: string[];
        constructor($element: ng.IRootElementService);
        manageSortOrder(event: Event, sortOrder: string): void;
    }
}
