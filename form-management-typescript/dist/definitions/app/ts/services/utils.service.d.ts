/// <reference path="../../_all.d.ts" />
declare module app {
    class UtilsService {
        constructor();
        getDataType(obj: any): any;
        isNullUndefined(val: any, validateZeroNaN?: Boolean): Boolean;
        clone(obj: any): any;
        validateEmail(email: string): Boolean;
        getObjectFromArr(arr: Array<any>, propName: string, propValue: any): any;
        log(...msg: any[]): void;
    }
}
