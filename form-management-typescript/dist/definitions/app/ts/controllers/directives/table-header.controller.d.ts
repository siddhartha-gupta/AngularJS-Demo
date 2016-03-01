/// <reference path="../../../_all.d.ts" />
declare module app {
    class TableHeaderController implements TableHeaderInterface {
        private $element;
        private $sce;
        private sortFunc;
        private defaultClass;
        private lastSortOrder;
        static $inject: string[];
        constructor($element: ng.IRootElementService, $sce: ng.ISCEService);
        manageSortOrder(event: Event, sortOrder: string): void;
        toTrustedHTML(html: string): any;
    }
}
