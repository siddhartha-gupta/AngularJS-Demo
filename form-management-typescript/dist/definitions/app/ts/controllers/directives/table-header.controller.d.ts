/// <reference path="../../../_all.d.ts" />
declare module app {
    class TableHeaderController {
        sortFunc: Function;
        constructor();
        manageSortOrder(event: Event, sortOrder: string): void;
    }
}
