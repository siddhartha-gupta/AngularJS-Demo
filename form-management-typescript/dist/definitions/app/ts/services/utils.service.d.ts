/// <reference path="../../_all.d.ts" />
declare module app {
    class UtilsService {
        constructor();
        getDataType(obj: any): any;
        isNullUndefined(val: any, validateZeroNaN?: Boolean): Boolean;
        clone(obj: any): any;
        validateEmail(email: string): Boolean;
        log(...msg: any[]): void;
    }
}
