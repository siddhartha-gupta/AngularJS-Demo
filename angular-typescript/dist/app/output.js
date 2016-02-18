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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJjb25zdGFudHMudHMiLCJpbnRlcmZhY2VzL2FwcENvbmZpZy5pbnRlcmZhY2UudHMiLCJjb25maWcudHMiLCJyb3V0ZS1oYW5kbGVyLnRzIiwiY29udHJvbGxlcnMvdXNlcnNMaXN0LmNvbnRyb2xsZXIudHMiLCJjb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInNlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwic2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIl0sIm5hbWVzIjpbImFwcCIsImFwcC5Db25zdGFudHMiLCJhcHAuQ29uc3RhbnRzLmNvbnN0cnVjdG9yIiwiYXBwLkNvbnN0YW50cy5EZWZhdWx0IiwiYXBwLkNvbmZpZyIsImFwcC5Db25maWcuY29uc3RydWN0b3IiLCJhcHAuUm91dGVIYW5kbGVyIiwiYXBwLlJvdXRlSGFuZGxlci5jb25zdHJ1Y3RvciIsImFwcC51c2Vyc0xpc3RDb250cm9sbGVyIiwiYXBwLnVzZXJzTGlzdENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAudXNlcnNMaXN0Q29udHJvbGxlci5nZXRVc2VycyIsImFwcC51c2Vyc0xpc3RDb250cm9sbGVyLnByb2Nlc3NTZXJ2ZXJEYXRhIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIiLCJhcHAuaGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5oZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdGFydCIsImFwcC5oZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdWNjZXNzIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZUVycm9yIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIuY2FsbEZ1bmN0aW9uIiwiYXBwLmhlYWRlckNvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5oZWFkZXJDb250cm9sbGVyLmdvQmFjayIsImFwcC5BUElTZXJ2aWNlIiwiYXBwLkFQSVNlcnZpY2UuY29uc3RydWN0b3IiLCJhcHAuQVBJU2VydmljZS5nZXRDYWxsIiwiYXBwLkFQSVNlcnZpY2UucG9zdENhbGwiLCJhcHAuU2hhcmVkU2VydmljZSIsImFwcC5TaGFyZWRTZXJ2aWNlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBV1Q7QUFYRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBQUFDO1FBT0FDLENBQUNBO1FBTkFELHNCQUFXQSxvQkFBT0E7aUJBQWxCQTtnQkFDQ0UsTUFBTUEsQ0FBQ0E7b0JBQ05BLFNBQVNBLEVBQUVBLHdCQUF3QkE7b0JBQ25DQSxXQUFXQSxFQUFFQSxZQUFZQTtpQkFDekJBO1lBQ0ZBLENBQUNBOzs7V0FBQUY7UUFDRkEsZ0JBQUNBO0lBQURBLENBQUNBLElBQUFEO0lBUFlBLGFBQVNBLFlBT3JCQTtBQUNGQSxDQUFDQSxFQVhNLEdBQUcsS0FBSCxHQUFHLFFBV1Q7OztBQ2JELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FPVDtBQVBELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7QUFNYkEsQ0FBQ0EsRUFQTSxHQUFHLEtBQUgsR0FBRyxRQU9UOzs7QUNURCxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBaUJUO0FBakJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7SUFFWkE7UUFLQ0ksZ0JBQVlBLGNBQXVDQTtZQUNsREMsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUE7Z0JBQ2pDQSxXQUFXQSxFQUFFQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxHQUFHQSxpQkFBaUJBO2dCQUNsRUEsVUFBVUEsRUFBRUEsZUFBZUE7Z0JBQzNCQSxZQUFZQSxFQUFFQSxrQkFBa0JBO2FBQ2hDQSxDQUFDQTtpQkFDQUEsU0FBU0EsQ0FBQ0EsRUFBRUEsVUFBVUEsRUFBRUEsWUFBWUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLENBQUNBO1FBWGFELGNBQU9BLEdBQUdBO1lBQ2RBLGdCQUFnQkE7U0FDbkJBLENBQUNBO1FBVVRBLGFBQUNBO0lBQURBLENBQUNBLElBQUFKO0lBYllBLFVBQU1BLFNBYWxCQTtBQUNGQSxDQUFDQSxFQWpCTSxHQUFHLEtBQUgsR0FBRyxRQWlCVDs7O0FDbkJELGdDQUFnQztBQUVoQyxJQUFPLEdBQUcsQ0F5Q1Q7QUF6Q0QsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQU9DTSxzQkFDUUEsVUFBZ0NBLEVBQUVBLEtBQUtBO1lBQ3RDQSxTQUE4QkE7WUFHdENDOztnQkFFSUE7WUFOR0EsZUFBVUEsR0FBVkEsVUFBVUEsQ0FBc0JBO1lBQy9CQSxjQUFTQSxHQUFUQSxTQUFTQSxDQUFxQkE7WUFPdENBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLG1CQUFtQkEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0E7Z0JBQ3JFLDBEQUEwRDtnQkFDMUQsZUFBZTtnQkFDZixvQkFBb0I7Z0JBQ3BCLE1BQU07WUFDUCxDQUFDLENBQUNBLENBQUNBO1lBRUhBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLHFCQUFxQkEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0E7Z0JBQ3ZFLDREQUE0RDtnQkFDNUQsZUFBZTtnQkFDZixvQkFBb0I7Z0JBQ3BCLE1BQU07WUFDUCxDQUFDLENBQUNBLENBQUNBO1lBRUhBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLG1CQUFtQkEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0E7Z0JBQ3JFLDBEQUEwRDtnQkFDMUQsZUFBZTtnQkFDZixvQkFBb0I7Z0JBQ3BCLE1BQU07WUFDUCxDQUFDLENBQUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBbkNNRCxvQkFBT0EsR0FBR0E7WUFDUEEsWUFBWUE7WUFDWkEsV0FBV0E7U0FFZEEsQ0FBQ0E7UUFnQ1RBLG1CQUFDQTtJQUFEQSxDQUFDQSxJQUFBTjtJQXJDWUEsZ0JBQVlBLGVBcUN4QkE7QUFDRkEsQ0FBQ0EsRUF6Q00sR0FBRyxLQUFILEdBQUcsUUF5Q1Q7OztBQzNDRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBMENUO0FBMUNELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFXQ1EsNkJBQ1NBLE1BQWlCQSxFQUNqQkEsU0FBOEJBLEVBQzlCQSxJQUFvQkEsRUFDcEJBLFVBQXNCQTtZQUh0QkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7WUFDakJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQXFCQTtZQUM5QkEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBZ0JBO1lBQ3BCQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFZQTtZQUU5QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDdkNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1FBQ2pCQSxDQUFDQTtRQUVERCxzQ0FBUUEsR0FBUkE7WUFBQUUsaUJBTUNBO1lBTEFBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBO2dCQUN2QkEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsR0FBR0EsY0FBY0E7YUFDaERBLENBQUNBO2lCQUNBQSxPQUFPQSxDQUFDQSxVQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxJQUFLQSxZQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLEVBQTVCQSxDQUE0QkEsQ0FBQ0E7aUJBQ3ZEQSxLQUFLQSxDQUFDQSxVQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxJQUFLQSxZQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFwQkEsQ0FBb0JBLENBQUNBLENBQUNBO1FBQ2pEQSxDQUFDQTtRQUVERiwrQ0FBaUJBLEdBQWpCQSxVQUFrQkEsSUFBU0E7WUFDMUJHLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLHFCQUFxQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFM0NBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDdkJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNyQkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFqQ2FILDJCQUFPQSxHQUFHQTtZQUN2QkEsUUFBUUE7WUFDUkEsV0FBV0E7WUFDWEEsTUFBTUE7WUFDTkEsWUFBWUE7U0FDWkEsQ0FBQ0E7UUE2QkhBLDBCQUFDQTtJQUFEQSxDQUFDQSxJQUFBUjtJQXRDWUEsdUJBQW1CQSxzQkFzQy9CQTtBQUNGQSxDQUFDQSxFQTFDTSxHQUFHLEtBQUgsR0FBRyxRQTBDVDs7O0FDNUNELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0F1SFQ7QUF2SEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQXVCQ1ksMEJBQ1NBLE1BQWlCQSxFQUNqQkEsU0FBOEJBLEVBQzlCQSxPQUEwQkEsRUFDMUJBLElBQW9CQTtZQUhwQkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7WUFDakJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQXFCQTtZQUM5QkEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBbUJBO1lBQzFCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUExQjdCQSxZQUFPQSxHQUFXQSxpQkFBaUJBLENBQUNBO1lBRXBDQSxrQkFBYUEsR0FBV0E7Z0JBQ3ZCQSxTQUFTQSxFQUFFQSxLQUFLQTtnQkFDaEJBLFdBQVdBLEVBQUVBLGNBQWEsQ0FBQztnQkFDM0JBLE1BQU1BLEVBQUVBLEVBQUVBO2FBQ1ZBLENBQUNBO1lBRUZBLG1CQUFjQSxHQUFXQTtnQkFDeEJBLFNBQVNBLEVBQUVBLEtBQUtBO2dCQUNoQkEsV0FBV0EsRUFBRUEsY0FBYSxDQUFDO2dCQUMzQkEsTUFBTUEsRUFBRUEsRUFBRUE7YUFDVkEsQ0FBQ0E7WUFzRkZBLGdCQUFXQSxHQUFHQTtnQkFDYiw2REFBNkQ7Z0JBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUFBO1lBekVBQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLEVBQUVBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDeERBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLG9CQUFvQkEsRUFBRUEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQTtZQUM1REEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO1FBQ3pEQSxDQUFDQTtRQUVERCw2Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBWUEsRUFBRUEsTUFBY0E7WUFDOUNFLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLHNCQUFzQkEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDL0NBLENBQUNBO1FBRURGLCtDQUFvQkEsR0FBcEJBLFVBQXFCQSxLQUFZQSxFQUFFQSxNQUFjQTtZQUNoREcsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0Esd0JBQXdCQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUVoREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFFQSxNQUFNQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeENBLEtBQUtBLHFCQUFxQkE7d0JBQ3pCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQTs0QkFDcEJBLFNBQVNBLEVBQUVBLEtBQUtBOzRCQUNoQkEsV0FBV0EsRUFBRUEsY0FBYSxDQUFDOzRCQUMzQkEsTUFBTUEsRUFBRUEsRUFBRUE7eUJBQ1ZBLENBQUNBO3dCQUVGQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQTs0QkFDckJBLFNBQVNBLEVBQUVBLElBQUlBOzRCQUNmQSxXQUFXQSxFQUFFQSxhQUFhQTs0QkFDMUJBLE1BQU1BLEVBQUVBLFVBQVVBO3lCQUNsQkEsQ0FBQ0E7d0JBQ0ZBLEtBQUtBLENBQUNBO29CQUVQQSxLQUFLQSxtQkFBbUJBO3dCQUN2QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7NEJBQ3BCQSxTQUFTQSxFQUFFQSxJQUFJQTs0QkFDZkEsV0FBV0EsRUFBRUEsUUFBUUE7NEJBQ3JCQSxNQUFNQSxFQUFFQSxNQUFNQTt5QkFDZEEsQ0FBQ0E7d0JBRUZBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBOzRCQUNyQkEsU0FBU0EsRUFBRUEsS0FBS0E7NEJBQ2hCQSxXQUFXQSxFQUFFQSxTQUFTQTs0QkFDdEJBLE1BQU1BLEVBQUVBLFVBQVVBO3lCQUNsQkEsQ0FBQ0E7d0JBQ0ZBLEtBQUtBLENBQUNBO2dCQUNSQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7b0JBQ3BCQSxTQUFTQSxFQUFFQSxLQUFLQTtvQkFDaEJBLFdBQVdBLEVBQUVBLGNBQWEsQ0FBQztvQkFDM0JBLE1BQU1BLEVBQUVBLEVBQUVBO2lCQUNWQSxDQUFDQTtnQkFFRkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0E7b0JBQ3JCQSxTQUFTQSxFQUFFQSxJQUFJQTtvQkFDZkEsV0FBV0EsRUFBRUEsU0FBU0E7b0JBQ3RCQSxNQUFNQSxFQUFFQSxVQUFVQTtpQkFDbEJBLENBQUNBO1lBQ0hBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRURILDZDQUFrQkEsR0FBbEJBLFVBQW1CQSxLQUFLQSxFQUFFQSxNQUFNQTtZQUMvQkksSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0Esc0JBQXNCQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUMvQ0EsQ0FBQ0E7UUFFREosdUNBQVlBLEdBQVpBLFVBQWFBLEtBQVlBLEVBQUVBLFNBQWlCQTtZQUMzQ0ssS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFFdkJBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN6Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDbkJBLENBQUNBO1FBQ0ZBLENBQUNBO1FBUURMLGtDQUFPQSxHQUFQQTtZQUNDTSxxREFBcURBO1FBQ3REQSxDQUFDQTtRQUVETixpQ0FBTUEsR0FBTkE7WUFDQ08sS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQzdDQSxDQUFDQTtRQWpHYVAsd0JBQU9BLEdBQUdBO1lBQ3ZCQSxRQUFRQTtZQUNSQSxXQUFXQTtZQUNYQSxTQUFTQTtZQUNUQSxNQUFNQTtTQUVOQSxDQUFDQTtRQTRGSEEsdUJBQUNBO0lBQURBLENBQUNBLElBQUFaO0lBakhZQSxvQkFBZ0JBLG1CQWlINUJBO0lBQ0RBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO0FBRW5DQSxDQUFDQSxFQXZITSxHQUFHLEtBQUgsR0FBRyxRQXVIVDs7O0FDekhELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQUlGb0Isb0JBQW9CQSxLQUFzQkE7WUFBdEJDLFVBQUtBLEdBQUxBLEtBQUtBLENBQWlCQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRUtELDRCQUFPQSxHQUFQQSxVQUFRQSxNQUFXQTtZQUN4QkUsSUFBSUEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDeEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1FBQ3BEQSxDQUFDQTtRQUVERiw2QkFBUUEsR0FBUkEsVUFBU0EsTUFBV0E7WUFDaEJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzFEQSxDQUFDQTtRQWRBSCxrQkFBT0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFlekJBLGlCQUFDQTtJQUFEQSxDQUFDQSxJQUFBcEI7SUFoQllBLGNBQVVBLGFBZ0J0QkE7QUFDTEEsQ0FBQ0EsRUFwQk0sR0FBRyxLQUFILEdBQUcsUUFvQlQ7OztBQ3RCRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBWVQ7QUFaRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1JBLFlBQVlBLENBQUNBO0lBRWJBO1FBR0l3Qix1QkFBb0JBLFVBQWdDQTtZQUFoQ0MsZUFBVUEsR0FBVkEsVUFBVUEsQ0FBc0JBO1lBRXBEQSxtQkFBY0EsR0FBR0EsVUFBU0EsU0FBU0EsRUFBRUEsSUFBSUE7Z0JBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUNBO1FBSnNEQSxDQUFDQTtRQUZsREQscUJBQU9BLEdBQUdBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO1FBT3BDQSxvQkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQXhCO0lBUllBLGlCQUFhQSxnQkFRekJBO0FBQ0xBLENBQUNBLEVBWk0sR0FBRyxLQUFILEdBQUcsUUFZVDs7O0FDZEQsK0VBQStFO0FBQy9FLG1GQUFtRjtBQUNuRix5RkFBeUY7QUFFekYsK0JBQStCO0FBQy9CLHFDQUFxQztBQUNyQywwREFBMEQ7QUFDMUQsa0NBQWtDO0FBQ2xDLHlDQUF5QztBQUN6Qyw0REFBNEQ7QUFDNUQseURBQXlEO0FBQ3pELGdEQUFnRDtBQUNoRCxtREFBbUQ7OztBQ1puRCxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBUVQ7QUFSRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ0FBLFdBQU9BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO0lBRTVEQSxXQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFNQSxDQUFDQSxDQUFDQTtJQUN2QkEsV0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsRUFBRUEsV0FBV0EsRUFBRUEsZ0JBQVlBLENBQUNBLENBQUNBLENBQUNBO0lBQ3ZEQSxXQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxlQUFlQSxFQUFFQSx1QkFBbUJBLENBQUNBLENBQUNBO0lBQ3pEQSxXQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLEVBQUVBLG9CQUFnQkEsQ0FBQ0EsQ0FBQ0E7SUFDekRBLFdBQU9BLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLEVBQUVBLGNBQVVBLENBQUNBLENBQUNBO0FBQzNDQSxDQUFDQSxFQVJNLEdBQUcsS0FBSCxHQUFHLFFBUVQiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG5cdFx0c3RhdGljIGdldCBEZWZhdWx0KCk6IGFueSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBhcHBDb25maWdJbnRlcmZhY2Uge1xyXG5cdFx0c2VydmVyVXJsOiBzdHJpbmc7XHJcblx0XHR0ZW1wbGF0ZVVybDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25maWcge1xyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG4gICAgICAgICAgICAnJHJvdXRlUHJvdmlkZXInXHJcbiAgICAgICAgXTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcigkcm91dGVQcm92aWRlcjogbmcucm91dGUuSVJvdXRlUHJvdmlkZXIpIHtcclxuXHRcdFx0JHJvdXRlUHJvdmlkZXIud2hlbihcIi91c2Vyc2xpc3RcIiwge1xyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnL3VzZXJzTGlzdC5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAndXNlcnNMaXN0Q3RybCcsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcidcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy91c2Vyc2xpc3QnIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBSb3V0ZUhhbmRsZXIge1xyXG5cdFx0c3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgICAgICckcm9vdFNjb3BlJyxcclxuICAgICAgICAgICAgJyRsb2NhdGlvbidcclxuICAgICAgICAgICAgLy8gJ3NoYXJlZFNlcnZpY2UnXHJcbiAgICAgICAgXTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHVibGljICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCAvL2FueVxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZVxyXG5cdFx0XHQvLyBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQvKnRoaXMuJHJvb3RTY29wZS5VdGlscyA9IHtcclxuXHRcdFx0XHRrZXlzOiBPYmplY3Qua2V5c1xyXG5cdFx0XHR9OyovXHJcblxyXG5cdFx0XHR0aGlzLiRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHQvLyB0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCB7XHJcblx0XHRcdFx0Ly8gXHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdC8vIFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdC8vIH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuJHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0Ly8gdGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0Ly8gXHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdC8vIFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdC8vIH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuJHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdC8vIHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VFcnJvcicsIHtcclxuXHRcdFx0XHQvLyBcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0Ly8gXHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0Ly8gfSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgdXNlcnNMaXN0Q29udHJvbGxlciB7XHJcblx0XHRwcml2YXRlIHVzZXJzTGlzdDogT2JqZWN0O1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0JyRsb2cnLFxyXG5cdFx0XHQnYXBpU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldFVzZXJzKCkge1xyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UuZ2V0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXHJcblx0XHRcdH0pXHJcblx0XHRcdFx0LnN1Y2Nlc3MoKGRhdGEsIHN0YXR1cykgPT4gdGhpcy5wcm9jZXNzU2VydmVyRGF0YShkYXRhKSlcclxuXHRcdFx0XHQuZXJyb3IoKGRhdGEsIHN0YXR1cykgPT4gdGhpcy4kbG9nLmxvZygnZXJyJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSkge1xyXG5cdFx0XHR0aGlzLiRsb2cubG9nKCdwcm9jZXNzU2VydmVyRGF0YTogJywgZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YSAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0ID0ge307XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0gXHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIGhlYWRlckNvbnRyb2xsZXIge1xyXG5cdFx0aGVhZGluZzogc3RyaW5nID0gJ1VzZXIgbWFuYWdlbWVudCc7XHJcblxyXG5cdFx0aGVhZGVyTGVmdEJ0bjogT2JqZWN0ID0ge1xyXG5cdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHQnY2xpY2tGdW5jJzogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdCd0ZXh0JzogJydcclxuXHRcdH07XHJcblxyXG5cdFx0aGVhZGVyUmlnaHRCdG46IE9iamVjdCA9IHtcclxuXHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHQndGV4dCc6ICcnXHJcblx0XHR9O1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJHdpbmRvdycsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0Ly8gJ3NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0Ly8gcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdWNjZXNzXCIsIHRoaXMub25Sb3V0ZUNoYW5nZVN1Y2Nlc3MpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCB0aGlzLm9uUm91dGVDaGFuZ2VFcnJvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0dGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0dGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XHJcblxyXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0Y2FzZSAndXNlcnNMaXN0Q29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvVG9BZGRVc2VyJyxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdOZXcgdXNlcidcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnYWRkVXNlckNvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29CYWNrJyxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdCYWNrJ1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnYWRkVXNlcicsXHJcblx0XHRcdFx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2FkZFVzZXInLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XHJcblx0XHRcdHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzW2NsaWNrRnVuY10pKSB7XHJcblx0XHRcdFx0dGhpc1tjbGlja0Z1bmNdKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnb1RvQWRkVXNlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJcIikpLnNjb3BlKClcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHRcdHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHQvLyB0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2FkZC11c2VyJywge30pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdvQmFjaygpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc29sZS5sb2coJ2FwcC5mb3JtQXBwOiAnLCBhcHApO1xyXG5cdC8vIGFwcC5mb3JtQXBwLmNvbnRyb2xsZXIoJ2hlYWRlckNvbnRyb2xsZXInLCBoZWFkZXJDb250cm9sbGVyKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3QgPSBbJyRodHRwJ107XHJcblx0XHRodHRwU2VydmljZTogbmcuSUh0dHBTZXJ2aWNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSkge1xyXG5cdFx0XHR0aGlzLmh0dHBTZXJ2aWNlID0gJGh0dHA7XHJcblx0XHR9XHJcblxyXG4gICAgICAgIGdldENhbGwocGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0bGV0IGNvbmZpZyA9IHBhcmFtcy5jb25maWcgfHwge307XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChwYXJhbXMudXJsLCBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9zdENhbGwocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChwYXJhbXMudXJsLCBwYXJhbXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IFxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2Uge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuICAgICAgICBicm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChldmVudE5hbWUsIGRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvanF1ZXJ5L2pxdWVyeS5kLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXIuZC50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXBwLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29uc3RhbnRzLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0naW50ZXJmYWNlcy9hcHBDb25maWcuaW50ZXJmYWNlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29uZmlnLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncm91dGUtaGFuZGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRyb2xsZXJzL3VzZXJzTGlzdC5jb250cm9sbGVyLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzZXJ2aWNlcy9hcGkuc2VydmljZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzJyAvPlxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdGV4cG9ydCB2YXIgZm9ybUFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmb3JtQXBwJywgWyduZ1JvdXRlJ10pO1xyXG5cclxuXHRmb3JtQXBwLmNvbmZpZyhDb25maWcpO1xyXG5cdGZvcm1BcHAucnVuKFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCBSb3V0ZUhhbmRsZXJdKTtcclxuXHRmb3JtQXBwLmNvbnRyb2xsZXIoJ3VzZXJzTGlzdEN0cmwnLCB1c2Vyc0xpc3RDb250cm9sbGVyKTtcclxuXHRmb3JtQXBwLmNvbnRyb2xsZXIoJ2hlYWRlckNvbnRyb2xsZXInLCBoZWFkZXJDb250cm9sbGVyKTtcclxuXHRmb3JtQXBwLnNlcnZpY2UoJ2FwaVNlcnZpY2UnLCBBUElTZXJ2aWNlKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
