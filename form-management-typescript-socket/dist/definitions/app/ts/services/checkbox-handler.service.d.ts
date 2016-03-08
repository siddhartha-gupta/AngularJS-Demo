/// <reference path="../../_all.d.ts" />
declare module app {
    class CheckboxHandlerService {
        private sharedService;
        checkboxCounter: number;
        private selectedAll;
        static $inject: string[];
        constructor(sharedService: SharedService);
        checkAll(): void;
        manageCheckboxCounter(isChecked: Boolean): void;
    }
}
