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
        function RouteHandler($rootScope, //ng.IRootScopeService,
            $location) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                // sharedService.broadcastEvent('routeChangeStart', {
                // 	next: next,
                // 	current: current
                // });
            });
            $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                // sharedService.broadcastEvent('routeChangeSuccess', {
                // 	next: next,
                // 	current: current
                // });
            });
            $rootScope.$on("$routeChangeError", function (event, next, current) {
                // sharedService.broadcastEvent('routeChangeError', {
                // 	next: next,
                // 	current: current
                // });
            });
        }
        RouteHandler.inject = ['$rootScope', '$location'];
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJjb25zdGFudHMudHMiLCJpbnRlcmZhY2VzL2FwcENvbmZpZy5pbnRlcmZhY2UudHMiLCJjb25maWcudHMiLCJyb3V0ZS1oYW5kbGVyLnRzIiwiY29udHJvbGxlcnMvdXNlcnNMaXN0LmNvbnRyb2xsZXIudHMiLCJjb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInNlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwic2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIl0sIm5hbWVzIjpbImFwcCIsImFwcC5Db25zdGFudHMiLCJhcHAuQ29uc3RhbnRzLmNvbnN0cnVjdG9yIiwiYXBwLkNvbnN0YW50cy5EZWZhdWx0IiwiYXBwLkNvbmZpZyIsImFwcC5Db25maWcuY29uc3RydWN0b3IiLCJhcHAuUm91dGVIYW5kbGVyIiwiYXBwLlJvdXRlSGFuZGxlci5jb25zdHJ1Y3RvciIsImFwcC51c2Vyc0xpc3RDb250cm9sbGVyIiwiYXBwLnVzZXJzTGlzdENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAudXNlcnNMaXN0Q29udHJvbGxlci5nZXRVc2VycyIsImFwcC51c2Vyc0xpc3RDb250cm9sbGVyLnByb2Nlc3NTZXJ2ZXJEYXRhIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIiLCJhcHAuaGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5oZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdGFydCIsImFwcC5oZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdWNjZXNzIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZUVycm9yIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIuY2FsbEZ1bmN0aW9uIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5oZWFkZXJDb250cm9sbGVyLmdvQmFjayIsImFwcC5BUElTZXJ2aWNlIiwiYXBwLkFQSVNlcnZpY2UuY29uc3RydWN0b3IiLCJhcHAuQVBJU2VydmljZS5nZXRDYWxsIiwiYXBwLkFQSVNlcnZpY2UucG9zdENhbGwiLCJhcHAuU2hhcmVkU2VydmljZSIsImFwcC5TaGFyZWRTZXJ2aWNlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBV1Q7QUFYRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBQUFDO1FBT0FDLENBQUNBO1FBTkFELHNCQUFXQSxvQkFBT0E7aUJBQWxCQTtnQkFDQ0UsTUFBTUEsQ0FBQ0E7b0JBQ05BLFNBQVNBLEVBQUVBLHdCQUF3QkE7b0JBQ25DQSxXQUFXQSxFQUFFQSxZQUFZQTtpQkFDekJBO1lBQ0ZBLENBQUNBOzs7V0FBQUY7UUFDRkEsZ0JBQUNBO0lBQURBLENBQUNBLElBQUFEO0lBUFlBLGFBQVNBLFlBT3JCQTtBQUNGQSxDQUFDQSxFQVhNLEdBQUcsS0FBSCxHQUFHLFFBV1Q7OztBQ2JELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FPVDtBQVBELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7QUFNYkEsQ0FBQ0EsRUFQTSxHQUFHLEtBQUgsR0FBRyxRQU9UOzs7QUNURCxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBaUJUO0FBakJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7SUFFWkE7UUFLQ0ksZ0JBQVlBLGNBQXVDQTtZQUNsREMsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUE7Z0JBQ2pDQSxXQUFXQSxFQUFFQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxHQUFHQSxpQkFBaUJBO2dCQUNsRUEsVUFBVUEsRUFBRUEsZUFBZUE7Z0JBQzNCQSxZQUFZQSxFQUFFQSxrQkFBa0JBO2FBQ2hDQSxDQUFDQTtpQkFDQUEsU0FBU0EsQ0FBQ0EsRUFBRUEsVUFBVUEsRUFBRUEsWUFBWUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFD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Q2hELENBQUMsQ0FBQ0E7UUFKc0RBLENBQUNBO1FBRmxERCxxQkFBT0EsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7UUFPcENBLG9CQUFDQTtJQUFEQSxDQUFDQSxJQUFBeEI7SUFSWUEsaUJBQWFBLGdCQVF6QkE7QUFDTEEsQ0FBQ0EsRUFaTSxHQUFHLEtBQUgsR0FBRyxRQVlUOzs7QUNkRCwrRUFBK0U7QUFDL0UsbUZBQW1GO0FBQ25GLHlGQUF5RjtBQUV6RiwrQkFBK0I7QUFDL0IscUNBQXFDO0FBQ3JDLDBEQUEwRDtBQUMxRCxrQ0FBa0M7QUFDbEMseUNBQXlDO0FBQ3pDLDREQUE0RDtBQUM1RCx5REFBeUQ7QUFDekQsZ0RBQWdEO0FBQ2hELG1EQUFtRDs7O0FDWm5ELGdDQUFnQztBQUVoQyxJQUFPLEdBQUcsQ0FRVDtBQVJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDQUEsV0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFNURBLFdBQU9BLENBQUNBLE1BQU1BLENBQUNBLFVBQU1BLENBQUNBLENBQUNBO0lBQ3BCQSxXQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxZQUFZQSxFQUFFQSxXQUFXQSxFQUFFQSxnQkFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDMURBLFdBQU9BLENBQUNBLFVBQVVBLENBQUNBLGVBQWVBLEVBQUVBLHVCQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDekRBLFdBQU9BLENBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsRUFBRUEsb0JBQWdCQSxDQUFDQSxDQUFDQTtJQUN6REEsV0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBVUEsQ0FBQ0EsQ0FBQ0E7QUFDM0NBLENBQUNBLEVBUk0sR0FBRyxLQUFILEdBQUcsUUFRVCIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcblx0XHRzdGF0aWMgZ2V0IERlZmF1bHQoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy8nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIGFwcENvbmZpZ0ludGVyZmFjZSB7XHJcblx0XHRzZXJ2ZXJVcmw6IHN0cmluZztcclxuXHRcdHRlbXBsYXRlVXJsOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgICAgICckcm91dGVQcm92aWRlcidcclxuICAgICAgICBdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCRyb3V0ZVByb3ZpZGVyOiBuZy5yb3V0ZS5JUm91dGVQcm92aWRlcikge1xyXG5cdFx0XHQkcm91dGVQcm92aWRlci53aGVuKFwiL3VzZXJzbGlzdFwiLCB7XHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICcvdXNlcnNMaXN0Lmh0bWwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICd1c2Vyc0xpc3RDdHJsJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJ1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC5vdGhlcndpc2UoeyByZWRpcmVjdFRvOiAnL3VzZXJzbGlzdCcgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFJvdXRlSGFuZGxlciB7XHJcblx0XHRzdGF0aWMgaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbiddO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBhbnksIC8vbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcblx0XHRcdCRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZVxyXG5cdFx0XHQvLyBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0Ly8gc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdGFydCcsIHtcclxuXHRcdFx0XHQvLyBcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0Ly8gXHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0Ly8gfSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0Ly8gc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdWNjZXNzJywge1xyXG5cdFx0XHRcdC8vIFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHQvLyBcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHQvLyB9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZUVycm9yXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0Ly8gc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VFcnJvcicsIHtcclxuXHRcdFx0XHQvLyBcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0Ly8gXHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0Ly8gfSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgdXNlcnNMaXN0Q29udHJvbGxlciB7XHJcblx0XHRwcml2YXRlIHVzZXJzTGlzdDogT2JqZWN0O1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0JyRsb2cnLFxyXG5cdFx0XHQnYXBpU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldFVzZXJzKCkge1xyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UuZ2V0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXHJcblx0XHRcdH0pXHJcblx0XHRcdFx0LnN1Y2Nlc3MoKGRhdGEsIHN0YXR1cykgPT4gdGhpcy5wcm9jZXNzU2VydmVyRGF0YShkYXRhKSlcclxuXHRcdFx0XHQuZXJyb3IoKGRhdGEsIHN0YXR1cykgPT4gdGhpcy4kbG9nLmxvZygnZXJyJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSkge1xyXG5cdFx0XHR0aGlzLiRsb2cubG9nKCdwcm9jZXNzU2VydmVyRGF0YTogJywgZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YSAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0ID0ge307XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0gXHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIGhlYWRlckNvbnRyb2xsZXIge1xyXG5cdFx0aGVhZGluZzogc3RyaW5nID0gJ1VzZXIgbWFuYWdlbWVudCc7XHJcblxyXG5cdFx0aGVhZGVyTGVmdEJ0bjogT2JqZWN0ID0ge1xyXG5cdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHQnY2xpY2tGdW5jJzogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdCd0ZXh0JzogJydcclxuXHRcdH07XHJcblxyXG5cdFx0aGVhZGVyUmlnaHRCdG46IE9iamVjdCA9IHtcclxuXHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHQndGV4dCc6ICcnXHJcblx0XHR9O1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJHdpbmRvdycsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0Ly8gJ3NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0Ly8gcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdWNjZXNzXCIsIHRoaXMub25Sb3V0ZUNoYW5nZVN1Y2Nlc3MpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCB0aGlzLm9uUm91dGVDaGFuZ2VFcnJvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0dGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0dGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XHJcblxyXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0Y2FzZSAndXNlcnNMaXN0Q29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvVG9BZGRVc2VyJyxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdOZXcgdXNlcidcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnYWRkVXNlckNvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29CYWNrJyxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdCYWNrJ1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnYWRkVXNlcicsXHJcblx0XHRcdFx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2FkZFVzZXInLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XHJcblx0XHRcdHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzW2NsaWNrRnVuY10pKSB7XHJcblx0XHRcdFx0dGhpc1tjbGlja0Z1bmNdKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnb1RvQWRkVXNlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJcIikpLnNjb3BlKClcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHRcdHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHQvLyB0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2FkZC11c2VyJywge30pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdvQmFjaygpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc29sZS5sb2coJ2FwcC5mb3JtQXBwOiAnLCBhcHApO1xyXG5cdC8vIGFwcC5mb3JtQXBwLmNvbnRyb2xsZXIoJ2hlYWRlckNvbnRyb2xsZXInLCBoZWFkZXJDb250cm9sbGVyKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3QgPSBbJyRodHRwJ107XHJcblx0XHRodHRwU2VydmljZTogbmcuSUh0dHBTZXJ2aWNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSkge1xyXG5cdFx0XHR0aGlzLmh0dHBTZXJ2aWNlID0gJGh0dHA7XHJcblx0XHR9XHJcblxyXG4gICAgICAgIGdldENhbGwocGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0bGV0IGNvbmZpZyA9IHBhcmFtcy5jb25maWcgfHwge307XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChwYXJhbXMudXJsLCBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9zdENhbGwocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChwYXJhbXMudXJsLCBwYXJhbXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IFxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2Uge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuICAgICAgICBicm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChldmVudE5hbWUsIGRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvanF1ZXJ5L2pxdWVyeS5kLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXIuZC50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXBwLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29uc3RhbnRzLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0naW50ZXJmYWNlcy9hcHBDb25maWcuaW50ZXJmYWNlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29uZmlnLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncm91dGUtaGFuZGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRyb2xsZXJzL3VzZXJzTGlzdC5jb250cm9sbGVyLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzZXJ2aWNlcy9hcGkuc2VydmljZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzJyAvPlxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdGV4cG9ydCB2YXIgZm9ybUFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmb3JtQXBwJywgWyduZ1JvdXRlJ10pO1xyXG5cclxuXHRmb3JtQXBwLmNvbmZpZyhDb25maWcpO1xyXG4gICAgZm9ybUFwcC5ydW4oWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsIFJvdXRlSGFuZGxlcl0pO1xyXG5cdGZvcm1BcHAuY29udHJvbGxlcigndXNlcnNMaXN0Q3RybCcsIHVzZXJzTGlzdENvbnRyb2xsZXIpO1xyXG5cdGZvcm1BcHAuY29udHJvbGxlcignaGVhZGVyQ29udHJvbGxlcicsIGhlYWRlckNvbnRyb2xsZXIpO1xyXG5cdGZvcm1BcHAuc2VydmljZSgnYXBpU2VydmljZScsIEFQSVNlcnZpY2UpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
