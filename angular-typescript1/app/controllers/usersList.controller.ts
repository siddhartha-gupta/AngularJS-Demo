/// <reference path='../_all.ts' />
module formApp {
    'use strict';

    export class usersListController {
        // private todos: TodoItem[];
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
            console.log('constructor called');
            this.getUsers();
        }

        getUsers() {
            console.log('getUsers');

            this.apiService.getCall({
                'url': 'http://localhost:8080/getuserslist'
            })
                .success((data, status) => this.processServerData(data))
                .error((data, status) => console.log('err'));
        }

        processServerData(data: any) {
            console.log('processServerData: ', data);

            if (data && Object.keys(data).length > 0) {
                console.log('adding server data');
                this.usersList = data;
            } else {
                this.usersList = {};
            }
        }
    }

    /*export class usersListController {
        constructor() {
            console.log('test');
        }
    }*/
} 
