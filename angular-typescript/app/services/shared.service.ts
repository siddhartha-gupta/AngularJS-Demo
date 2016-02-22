/// <reference path='../_all.ts' />

module app {
    'use strict';

    export class SharedService {
        static $inject = ['$rootScope'];

        constructor(private $rootScope: ng.IRootScopeService) { }

        broadcastEvent = function(eventName, data) {
            this.$rootScope.$broadcast(eventName, data);
        };
    }
}
services.service('SharedService', app.SharedService);
