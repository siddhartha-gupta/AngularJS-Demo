/// <reference path="../../../_all.d.ts" />
declare module app {
    interface UtilsServiceInterface {
        getDataType(obj: Object): string;
        isNullUndefined(val: any, validateZeroNaN?: Boolean): Boolean;
        clone(obj: any): any;
        validateEmail(email: string): Boolean;
        getObjectFromArr(arr: Array<any>, propName: string, propValue: any): any;
        log(...msg: any[]): void;
    }
}
