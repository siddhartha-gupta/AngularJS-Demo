/// <reference path="../_all.d.ts" />
declare module formApp {
    class APIService {
        private $http;
        static $inject: string[];
        httpService: ng.IHttpService;
        constructor($http: ng.IHttpService);
        getCall(params: any): ng.IHttpPromise<{}>;
        postCall(params: any): ng.IHttpPromise<{}>;
    }
}
