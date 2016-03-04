/// <reference path="../../_all.d.ts" />
declare module app {
    class TestController {
        private validEmail;
        constructor();
        validateEmail(val: string): void;
    }
}
