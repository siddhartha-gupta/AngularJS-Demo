/// <reference path="../../../_all.d.ts" />
declare module app {
    interface TableHeaderInterface {
        manageSortOrder(event: Event, sortOrder: string): void;
    }
}
