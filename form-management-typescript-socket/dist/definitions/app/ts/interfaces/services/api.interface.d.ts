/// <reference path="../../../_all.d.ts" />
declare module app {
    interface APIServiceInterface {
        getCall(params: any): any;
        postCall(params: any): any;
    }
}
