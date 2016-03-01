/// <reference path="../../../_all.d.ts" />
declare module app {
    class TableHeaderController implements TableHeaderInterface {
        private $element;
        private sortFunc;
        private defaultClass;
        private lastSortOrder;
        static $inject: string[];
        constructor($element: ng.IRootElementService);
        manageSortOrder(event: Event, sortOrder: string): void;
    }
}
