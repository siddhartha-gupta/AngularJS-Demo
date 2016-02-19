/// <reference path='_all.ts' />
var app;
(function (app) {
    app.formApp = angular.module('formApp', ['ngRoute']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', app.RouteHandler]);
    app.formApp.controller('usersListCtrl', app.usersListController);
    app.formApp.controller('headerController', app.headerController);
    app.formApp.service('apiService', app.APIService);
})(app || (app = {}));


/// <reference path='_all.ts' />
var app;
(function (app) {
    'use strict';
    var Constants = (function () {
        function Constants() {
        }
        Object.defineProperty(Constants, "Default", {
            get: function () {
                return {
                    serverUrl: 'http://localhost:8080/',
                    templateUrl: 'templates/'
                };
            },
            enumerable: true,
            configurable: true
        });
        return Constants;
    })();
    app.Constants = Constants;
})(app || (app = {}));


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='_all.ts' />
var app;
(function (app) {
    'use strict';
    var Config = (function () {
        function Config($routeProvider) {
            $routeProvider.when("/userslist", {
                templateUrl: app.Constants.Default.templateUrl + '/usersList.html',
                controller: 'usersListCtrl',
                controllerAs: 'customController'
            })
                .otherwise({ redirectTo: '/userslist' });
        }
        Config.$inject = [
            '$routeProvider'
        ];
        return Config;
    })();
    app.Config = Config;
})(app || (app = {}));


/// <reference path='_all.ts' />
var app;
(function (app) {
    'use strict';
    var RouteHandler = (function () {
        function RouteHandler($rootScope, //any
            $location) {
            /*this.$rootScope.Utils = {
                keys: Object.keys
            };*/
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.$rootScope.$on("$routeChangeStart", function (event, next, current) {
                // this.sharedService.broadcastEvent('routeChangeStart', {
                // 	next: next,
                // 	current: current
                // });
            });
            this.$rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                // this.sharedService.broadcastEvent('routeChangeSuccess', {
                // 	next: next,
                // 	current: current
                // });
            });
            this.$rootScope.$on("$routeChangeError", function (event, next, current) {
                // this.sharedService.broadcastEvent('routeChangeError', {
                // 	next: next,
                // 	current: current
                // });
            });
        }
        RouteHandler.$inject = [
            '$rootScope',
            '$location'
        ];
        return RouteHandler;
    })();
    app.RouteHandler = RouteHandler;
})(app || (app = {}));


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var usersListController = (function () {
        function usersListController($scope, $location, $log, apiService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.apiService = apiService;
            this.appConfig = app.Constants.Default;
            this.getUsers();
        }
        usersListController.prototype.getUsers = function () {
            var _this = this;
            this.apiService.getCall({
                'url': this.appConfig.serverUrl + 'getuserslist'
            })
                .success(function (data, status) { return _this.processServerData(data); })
                .error(function (data, status) { return _this.$log.log('err'); });
        };
        usersListController.prototype.processServerData = function (data) {
            this.$log.log('processServerData: ', data);
            if (data && Object.keys(data).length > 0) {
                this.usersList = data;
            }
            else {
                this.usersList = {};
            }
        };
        usersListController.$inject = [
            '$scope',
            '$location',
            '$log',
            'apiService'
        ];
        return usersListController;
    })();
    app.usersListController = usersListController;
})(app || (app = {}));


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var headerController = (function () {
        function headerController($scope, $location, $window, $log) {
            this.$scope = $scope;
            this.$location = $location;
            this.$window = $window;
            this.$log = $log;
            this.heading = 'User management';
            this.headerLeftBtn = {
                'showBtn': false,
                'clickFunc': function () { },
                'text': ''
            };
            this.headerRightBtn = {
                'showBtn': false,
                'clickFunc': function () { },
                'text': ''
            };
            this.goToAddUser = function () {
                // angular.element(document.getElementById("header")).scope()
                this.$location.path('/addUser').replace();
                this.$window.location.reload();
            };
            $scope.$on("routeChangeStart", this.onRouteChangeStart);
            $scope.$on("routeChangeSuccess", this.onRouteChangeSuccess);
            $scope.$on("routeChangeError", this.onRouteChangeError);
        }
        headerController.prototype.onRouteChangeStart = function (event, params) {
            this.$log.log('onRouteChangeStart: ', params);
        };
        headerController.prototype.onRouteChangeSuccess = function (event, params) {
            this.$log.log('onRouteChangeSuccess: ', params);
            if (params.next && params.next.$$route && params.next.$$route.controller) {
                switch (params.next.$$route.controller) {
                    case 'usersListController':
                        this.headerLeftBtn = {
                            'showBtn': false,
                            'clickFunc': function () { },
                            'text': ''
                        };
                        this.headerRightBtn = {
                            'showBtn': true,
                            'clickFunc': 'goToAddUser',
                            'text': 'New user'
                        };
                        break;
                    case 'addUserController':
                        this.headerLeftBtn = {
                            'showBtn': true,
                            'clickFunc': 'goBack',
                            'text': 'Back'
                        };
                        this.headerRightBtn = {
                            'showBtn': false,
                            'clickFunc': 'addUser',
                            'text': 'Add user'
                        };
                        break;
                }
            }
            else {
                this.headerLeftBtn = {
                    'showBtn': false,
                    'clickFunc': function () { },
                    'text': ''
                };
                this.headerRightBtn = {
                    'showBtn': true,
                    'clickFunc': 'addUser',
                    'text': 'Add user'
                };
            }
        };
        headerController.prototype.onRouteChangeError = function (event, params) {
            this.$log.log('onRouteChangeError: ', params);
        };
        headerController.prototype.callFunction = function (event, clickFunc) {
            event.preventDefault();
            if (angular.isFunction(this[clickFunc])) {
                this[clickFunc]();
            }
        };
        headerController.prototype.addUser = function () {
            // this.sharedService.broadcastEvent('add-user', {});
        };
        headerController.prototype.goBack = function () {
            event.preventDefault();
            this.$location.path('/userslist').replace();
        };
        headerController.$inject = [
            '$scope',
            '$location',
            '$window',
            '$log',
        ];
        return headerController;
    })();
    app.headerController = headerController;
    console.log('app.formApp: ', app);
})(app || (app = {}));


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var APIService = (function () {
        function APIService($http) {
            this.$http = $http;
            this.httpService = $http;
        }
        APIService.prototype.getCall = function (params) {
            var config = params.config || {};
            return this.httpService.get(params.url, params);
        };
        APIService.prototype.postCall = function (params) {
            return this.httpService.post(params.url, params.data);
        };
        APIService.$inject = ['$http'];
        return APIService;
    })();
    app.APIService = APIService;
})(app || (app = {}));


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var SharedService = (function () {
        function SharedService($rootScope) {
            this.$rootScope = $rootScope;
            this.broadcastEvent = function (eventName, data) {
                this.$rootScope.$broadcast(eventName, data);
            };
        }
        SharedService.$inject = ['$rootScope'];
        return SharedService;
    })();
    app.SharedService = SharedService;
})(app || (app = {}));


/// <reference path='../bower_components/DefinitelyTyped/jquery/jquery.d.ts' />
/// <reference path='../bower_components/DefinitelyTyped/angularjs/angular.d.ts' />
/// <reference path="../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts" />
/// <reference path='app.ts' />
/// <reference path='constants.ts' />
/// <reference path='interfaces/appConfig.interface.ts' />
/// <reference path='config.ts' />
/// <reference path='route-handler.ts' />
/// <reference path='controllers/usersList.controller.ts' />
/// <reference path='controllers/header.controller.ts' />
/// <reference path='services/api.service.ts' />
/// <reference path='services/shared.service.ts' />



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJhcHAudHMiLCJjb25zdGFudHMudHMiLCJpbnRlcmZhY2VzL2FwcENvbmZpZy5pbnRlcmZhY2UudHMiLCJjb25maWcudHMiLCJyb3V0ZS1oYW5kbGVyLnRzIiwiY29udHJvbGxlcnMvdXNlcnNMaXN0LmNvbnRyb2xsZXIudHMiLCJjb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInNlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwic2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJfYWxsLnRzIl0sIm5hbWVzIjpbImFwcCIsImFwcC5Db25zdGFudHMiLCJhcHAuQ29uc3RhbnRzLmNvbnN0cnVjdG9yIiwiYXBwLkNvbnN0YW50cy5EZWZhdWx0IiwiYXBwLkNvbmZpZyIsImFwcC5Db25maWcuY29uc3RydWN0b3IiLCJhcHAuUm91dGVIYW5kbGVyIiwiYXBwLlJvdXRlSGFuZGxlci5jb25zdHJ1Y3RvciIsImFwcC51c2Vyc0xpc3RDb250cm9sbGVyIiwiYXBwLnVzZXJzTGlzdENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAudXNlcnNMaXN0Q29udHJvbGxlci5nZXRVc2VycyIsImFwcC51c2Vyc0xpc3RDb250cm9sbGVyLnByb2Nlc3NTZXJ2ZXJEYXRhIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIiLCJhcHAuaGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5oZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdGFydCIsImFwcC5oZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdWNjZXNzIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZUVycm9yIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIuY2FsbEZ1bmN0aW9uIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5oZWFkZXJDb250cm9sbGVyLmdvQmFjayIsImFwcC5BUElTZXJ2aWNlIiwiYXBwLkFQSVNlcnZpY2UuY29uc3RydWN0b3IiLCJhcHAuQVBJU2VydmljZS5nZXRDYWxsIiwiYXBwLkFQSVNlcnZpY2UucG9zdENhbGwiLCJhcHAuU2hhcmVkU2VydmljZSIsImFwcC5TaGFyZWRTZXJ2aWNlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBUVQ7QUFSRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ0FBLFdBQU9BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO0lBRTVEQSxXQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFNQSxDQUFDQSxDQUFDQTtJQUN2QkEsV0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsRUFBRUEsV0FBV0EsRUFBRUEsZ0JBQVlBLENBQUNBLENBQUNBLENBQUNBO0lBQ3ZEQSxXQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxlQUFlQSxFQUFFQSx1QkFBbUJBLENBQUNBLENBQUNBO0lBQ3pEQSxXQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLEVBQUVBLG9CQUFnQkEsQ0FBQ0EsQ0FBQ0E7SUFDekRBLFdBQU9BLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLEVBQUVBLGNBQVVBLENBQUNBLENBQUNBO0FBQzNDQSxDQUFDQSxFQVJNLEdBQUcsS0FBSCxHQUFHLFFBUVQ7OztBQ1ZELGdDQUFnQztBQUVoQyxJQUFPLEdBQUcsQ0FXVDtBQVhELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7SUFFWkE7UUFBQUM7UUFPQUMsQ0FBQ0E7UUFOQUQsc0JBQVdBLG9CQUFPQTtpQkFBbEJBO2dCQUNDRSxNQUFNQSxDQUFDQTtvQkFDTkEsU0FBU0EsRUFBRUEsd0JBQXdCQTtvQkFDbkNBLFdBQVdBLEVBQUVBLFlBQVlBO2lCQUN6QkE7WUFDRkEsQ0FBQ0E7OztXQUFBRjtRQUNGQSxnQkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQUQ7SUFQWUEsYUFB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QUM1RCx5REFBeUQ7QUFDekQsZ0RBQWdEO0FBQ2hELG1EQUFtRCIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHRleHBvcnQgdmFyIGZvcm1BcHAgPSBhbmd1bGFyLm1vZHVsZSgnZm9ybUFwcCcsIFsnbmdSb3V0ZSddKTtcblxuXHRmb3JtQXBwLmNvbmZpZyhDb25maWcpO1xuXHRmb3JtQXBwLnJ1bihbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgUm91dGVIYW5kbGVyXSk7XG5cdGZvcm1BcHAuY29udHJvbGxlcigndXNlcnNMaXN0Q3RybCcsIHVzZXJzTGlzdENvbnRyb2xsZXIpO1xuXHRmb3JtQXBwLmNvbnRyb2xsZXIoJ2hlYWRlckNvbnRyb2xsZXInLCBoZWFkZXJDb250cm9sbGVyKTtcblx0Zm9ybUFwcC5zZXJ2aWNlKCdhcGlTZXJ2aWNlJywgQVBJU2VydmljZSk7XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XG5cdFx0c3RhdGljIGdldCBEZWZhdWx0KCk6IGFueSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvJ1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0J1xuXG5cdGV4cG9ydCBpbnRlcmZhY2UgYXBwQ29uZmlnSW50ZXJmYWNlIHtcblx0XHRzZXJ2ZXJVcmw6IHN0cmluZztcblx0XHR0ZW1wbGF0ZVVybDogc3RyaW5nO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0ZXhwb3J0IGNsYXNzIENvbmZpZyB7XG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xuICAgICAgICAgICAgJyRyb3V0ZVByb3ZpZGVyJ1xuICAgICAgICBdO1xuXG5cdFx0Y29uc3RydWN0b3IoJHJvdXRlUHJvdmlkZXI6IG5nLnJvdXRlLklSb3V0ZVByb3ZpZGVyKSB7XG5cdFx0XHQkcm91dGVQcm92aWRlci53aGVuKFwiL3VzZXJzbGlzdFwiLCB7XG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnL3VzZXJzTGlzdC5odG1sJyxcblx0XHRcdFx0Y29udHJvbGxlcjogJ3VzZXJzTGlzdEN0cmwnLFxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJ1xuXHRcdFx0fSlcblx0XHRcdFx0Lm90aGVyd2lzZSh7IHJlZGlyZWN0VG86ICcvdXNlcnNsaXN0JyB9KTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCdcblxuXHRleHBvcnQgY2xhc3MgUm91dGVIYW5kbGVyIHtcblx0XHRzdGF0aWMgJGluamVjdCA9IFtcbiAgICAgICAgICAgICckcm9vdFNjb3BlJyxcbiAgICAgICAgICAgICckbG9jYXRpb24nXG4gICAgICAgICAgICAvLyAnc2hhcmVkU2VydmljZSdcbiAgICAgICAgXTtcblxuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0cHVibGljICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCAvL2FueVxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2Vcblx0XHRcdC8vIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxuXHRcdCkge1xuXHRcdFx0Lyp0aGlzLiRyb290U2NvcGUuVXRpbHMgPSB7XG5cdFx0XHRcdGtleXM6IE9iamVjdC5rZXlzXG5cdFx0XHR9OyovXG5cblx0XHRcdHRoaXMuJHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xuXHRcdFx0XHQvLyB0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCB7XG5cdFx0XHRcdC8vIFx0bmV4dDogbmV4dCxcblx0XHRcdFx0Ly8gXHRjdXJyZW50OiBjdXJyZW50XG5cdFx0XHRcdC8vIH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuJHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XG5cdFx0XHRcdC8vIHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdWNjZXNzJywge1xuXHRcdFx0XHQvLyBcdG5leHQ6IG5leHQsXG5cdFx0XHRcdC8vIFx0Y3VycmVudDogY3VycmVudFxuXHRcdFx0XHQvLyB9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLiRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcblx0XHRcdFx0Ly8gdGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZUVycm9yJywge1xuXHRcdFx0XHQvLyBcdG5leHQ6IG5leHQsXG5cdFx0XHRcdC8vIFx0Y3VycmVudDogY3VycmVudFxuXHRcdFx0XHQvLyB9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnQgY2xhc3MgdXNlcnNMaXN0Q29udHJvbGxlciB7XG5cdFx0cHJpdmF0ZSB1c2Vyc0xpc3Q6IE9iamVjdDtcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xuXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xuXHRcdFx0JyRzY29wZScsXG5cdFx0XHQnJGxvY2F0aW9uJyxcblx0XHRcdCckbG9nJyxcblx0XHRcdCdhcGlTZXJ2aWNlJ1xuXHRcdF07XG5cblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcblx0XHRcdHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2Vcblx0XHQpIHtcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xuXHRcdFx0dGhpcy5nZXRVc2VycygpO1xuXHRcdH1cblxuXHRcdGdldFVzZXJzKCkge1xuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLmdldENhbGwoe1xuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2dldHVzZXJzbGlzdCdcblx0XHRcdH0pXG5cdFx0XHRcdC5zdWNjZXNzKChkYXRhLCBzdGF0dXMpID0+IHRoaXMucHJvY2Vzc1NlcnZlckRhdGEoZGF0YSkpXG5cdFx0XHRcdC5lcnJvcigoZGF0YSwgc3RhdHVzKSA9PiB0aGlzLiRsb2cubG9nKCdlcnInKSk7XG5cdFx0fVxuXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KSB7XG5cdFx0XHR0aGlzLiRsb2cubG9nKCdwcm9jZXNzU2VydmVyRGF0YTogJywgZGF0YSk7XG5cblx0XHRcdGlmIChkYXRhICYmIE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSB7fTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0ZXhwb3J0IGNsYXNzIGhlYWRlckNvbnRyb2xsZXIge1xuXHRcdGhlYWRpbmc6IHN0cmluZyA9ICdVc2VyIG1hbmFnZW1lbnQnO1xuXG5cdFx0aGVhZGVyTGVmdEJ0bjogT2JqZWN0ID0ge1xuXHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcblx0XHRcdCdjbGlja0Z1bmMnOiBmdW5jdGlvbigpIHsgfSxcblx0XHRcdCd0ZXh0JzogJydcblx0XHR9O1xuXG5cdFx0aGVhZGVyUmlnaHRCdG46IE9iamVjdCA9IHtcblx0XHRcdCdzaG93QnRuJzogZmFsc2UsXG5cdFx0XHQnY2xpY2tGdW5jJzogZnVuY3Rpb24oKSB7IH0sXG5cdFx0XHQndGV4dCc6ICcnXG5cdFx0fTtcblxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcblx0XHRcdCckc2NvcGUnLFxuXHRcdFx0JyRsb2NhdGlvbicsXG5cdFx0XHQnJHdpbmRvdycsXG5cdFx0XHQnJGxvZycsXG5cdFx0XHQvLyAnc2hhcmVkU2VydmljZSdcblx0XHRdO1xuXG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXG5cdFx0XHRwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcblx0XHRcdC8vIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxuXHRcdCkge1xuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQpO1xuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdWNjZXNzKTtcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIHRoaXMub25Sb3V0ZUNoYW5nZUVycm9yKTtcblx0XHR9XG5cblx0XHRvblJvdXRlQ2hhbmdlU3RhcnQoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdCkge1xuXHRcdFx0dGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xuXHRcdH1cblxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcblx0XHRcdHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VTdWNjZXNzOiAnLCBwYXJhbXMpO1xuXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcblx0XHRcdFx0c3dpdGNoIChwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcblx0XHRcdFx0XHRjYXNlICd1c2Vyc0xpc3RDb250cm9sbGVyJzpcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcblx0XHRcdFx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICcnXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29Ub0FkZFVzZXInLFxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdOZXcgdXNlcidcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ2FkZFVzZXJDb250cm9sbGVyJzpcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcblx0XHRcdFx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvQmFjaycsXG5cdFx0XHRcdFx0XHRcdCd0ZXh0JzogJ0JhY2snXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2FkZFVzZXInLFxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdBZGQgdXNlcidcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xuXHRcdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXG5cdFx0XHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxuXHRcdFx0XHRcdCd0ZXh0JzogJydcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xuXHRcdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcblx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2FkZFVzZXInLFxuXHRcdFx0XHRcdCd0ZXh0JzogJ0FkZCB1c2VyJ1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XG5cdFx0XHR0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlRXJyb3I6ICcsIHBhcmFtcyk7XG5cdFx0fVxuXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpc1tjbGlja0Z1bmNdKSkge1xuXHRcdFx0XHR0aGlzW2NsaWNrRnVuY10oKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRnb1RvQWRkVXNlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyXCIpKS5zY29wZSgpXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcblx0XHRcdHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHR9XG5cblx0XHRhZGRVc2VyKCkge1xuXHRcdFx0Ly8gdGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdhZGQtdXNlcicsIHt9KTtcblx0XHR9XG5cblx0XHRnb0JhY2soKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcblx0XHR9XG5cdH1cblx0Y29uc29sZS5sb2coJ2FwcC5mb3JtQXBwOiAnLCBhcHApO1xuXHQvLyBhcHAuZm9ybUFwcC5jb250cm9sbGVyKCdoZWFkZXJDb250cm9sbGVyJywgaGVhZGVyQ29udHJvbGxlcik7XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBleHBvcnQgY2xhc3MgQVBJU2VydmljZSB7XG5cdFx0c3RhdGljICRpbmplY3QgPSBbJyRodHRwJ107XG5cdFx0aHR0cFNlcnZpY2U6IG5nLklIdHRwU2VydmljZTtcblxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSkge1xuXHRcdFx0dGhpcy5odHRwU2VydmljZSA9ICRodHRwO1xuXHRcdH1cblxuICAgICAgICBnZXRDYWxsKHBhcmFtczogYW55KSB7XG5cdFx0XHRsZXQgY29uZmlnID0gcGFyYW1zLmNvbmZpZyB8fCB7fTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChwYXJhbXMudXJsLCBwYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcG9zdENhbGwocGFyYW1zOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QocGFyYW1zLnVybCwgcGFyYW1zLmRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufSBcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7IH1cblxuICAgICAgICBicm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9qcXVlcnkvanF1ZXJ5LmQudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci5kLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLXJvdXRlLmQudHNcIiAvPlxuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhcHAudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb25zdGFudHMudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdpbnRlcmZhY2VzL2FwcENvbmZpZy5pbnRlcmZhY2UudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb25maWcudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdyb3V0ZS1oYW5kbGVyLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udHJvbGxlcnMvdXNlcnNMaXN0LmNvbnRyb2xsZXIudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMnIC8+XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
