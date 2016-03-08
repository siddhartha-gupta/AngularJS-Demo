/// <reference path="../../../_all.d.ts" />
declare module app {
    class TableHeaderController implements TableHeaderInterface {
        private $element;
        private $sce;
        private checkboxHandlerService;
        private sortFunc;
        private defaultClass;
        private lastSortOrder;
        static $inject: string[];
        constructor($element: ng.IRootElementService, $sce: ng.ISCEService, checkboxHandlerService: CheckboxHandlerService);
        manageSortOrder(event: Event, sortOrder: string): void;
    }
}
