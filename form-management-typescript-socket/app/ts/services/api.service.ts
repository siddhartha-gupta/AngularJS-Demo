/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class APIService implements APIServiceInterface {
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
			return this.httpService.post(params.url, params.data, {
				headers: params.headers
			});
		}
	}
}
services.service('APIService', app.APIService);
