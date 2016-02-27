/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class APIService {
        static $inject = ['$http'];
        httpService: ng.IHttpService;

        constructor(private $http: ng.IHttpService) {
            this.httpService = $http;
        }

        getCall(params: any) {
            let config = params.config || {};
            return this.httpService.get(params.url, params);
        }

        postCall(params: any) {
            console.log('params: ', params);
            return this.httpService.post(params.url, params.data, {
                headers: params.headers
            });
            /*return this.httpService({
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            url: params.url,
                            method: 'POST',
                            data: $.param(params.data)
                     });*/
        }
    }
}
services.service('APIService', app.APIService);
