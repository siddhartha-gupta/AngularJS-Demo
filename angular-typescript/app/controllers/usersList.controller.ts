/// <reference path='../_all.ts' />

module formApp {
    'use strict';

    export class usersListController {
        private usersList: Object;

        public static $inject = [
            '$scope',
            '$location',
            '$log',
            'apiService'
        ];

        constructor(
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private $log: ng.ILogService,
            private apiService: APIService
        ) {
            this.$log.log('constructor called test');
        }

        getUsers() {
            this.$log.log('getUsers');

            this.apiService.getCall({
                'url': 'http://localhost:8080/getuserslist'
            })
                .success((data, status) => this.processServerData(data))
                .error((data, status) => this.$log.log('err'));
        }

        processServerData(data: any) {
            this.$log.log('processServerData: ', data);

            if (data && Object.keys(data).length > 0) {
                this.$log.log('adding server data');
                this.usersList = data;
            } else {
                this.usersList = {};
            }
        }
    }
} 
