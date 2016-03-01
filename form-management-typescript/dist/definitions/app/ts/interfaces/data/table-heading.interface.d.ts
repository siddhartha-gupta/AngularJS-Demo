/// <reference path="../../../_all.d.ts" />
declare module app {
    interface TableHeadingInterface {
        className: string;
        sortOrder: string;
        text: string;
        customFunc?: Function;
        customHTML?: Boolean;
    }
}
