/// <reference path='_all.ts' />
var services = angular.module('services', []);
var controllers = angular.module('controllers', []);


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
                controller: 'UsersListController',
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
            $location, sharedService) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                sharedService.broadcastEvent('routeChangeStart', {
                    next: next,
                    current: current
                });
            });
            $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                sharedService.broadcastEvent('routeChangeSuccess', {
                    next: next,
                    current: current
                });
            });
            $rootScope.$on("$routeChangeError", function (event, next, current) {
                sharedService.broadcastEvent('routeChangeError', {
                    next: next,
                    current: current
                });
            });
        }
        RouteHandler.inject = ['$rootScope', '$location', 'sharedService'];
        return RouteHandler;
    })();
    app.RouteHandler = RouteHandler;
})(app || (app = {}));


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UsersListController = (function () {
        function UsersListController($scope, $location, $log, apiService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.apiService = apiService;
            this.appConfig = app.Constants.Default;
            this.getUsers();
        }
        UsersListController.prototype.getUsers = function () {
            var _this = this;
            this.apiService.getCall({
                'url': this.appConfig.serverUrl + 'getuserslist'
            })
                .success(function (data, status) { return _this.processServerData(data); })
                .error(function (data, status) { return _this.$log.log('err'); });
        };
        UsersListController.prototype.processServerData = function (data) {
            this.$log.log('processServerData: ', data);
            if (data && Object.keys(data).length > 0) {
                this.usersList = data;
            }
            else {
                this.usersList = {};
            }
        };
        UsersListController.$inject = [
            '$scope',
            '$location',
            '$log',
            'APIService'
        ];
        return UsersListController;
    })();
    app.UsersListController = UsersListController;
})(app || (app = {}));
controllers.controller('UsersListController', app.UsersListController);


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var HeaderController = (function () {
        function HeaderController($scope, $location, $window, $log, sharedService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$window = $window;
            this.$log = $log;
            this.sharedService = sharedService;
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
            console.log(this);
            $scope.$on("routeChangeStart", this.onRouteChangeStart.bind(this));
            $scope.$on("routeChangeSuccess", this.onRouteChangeSuccess.bind(this));
            $scope.$on("routeChangeError", this.onRouteChangeError.bind(this));
        }
        HeaderController.prototype.onRouteChangeStart = function (event, params) {
            this.$log.log('onRouteChangeStart: ', params);
        };
        HeaderController.prototype.onRouteChangeSuccess = function (event, params) {
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
        HeaderController.prototype.onRouteChangeError = function (event, params) {
            this.$log.log('onRouteChangeError: ', params);
        };
        HeaderController.prototype.callFunction = function (event, clickFunc) {
            event.preventDefault();
            if (angular.isFunction(this[clickFunc])) {
                this[clickFunc]();
            }
        };
        HeaderController.prototype.addUser = function () {
            // this.sharedService.broadcastEvent('add-user', {});
        };
        HeaderController.prototype.goBack = function () {
            event.preventDefault();
            this.$location.path('/userslist').replace();
        };
        HeaderController.$inject = [
            '$scope',
            '$location',
            '$window',
            '$log',
            'SharedService'
        ];
        return HeaderController;
    })();
    app.HeaderController = HeaderController;
})(app || (app = {}));
controllers.controller('HeaderController', app.HeaderController);


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
services.service('APIService', app.APIService);


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
services.service('SharedService', app.SharedService);


/// <reference path='../bower_components/DefinitelyTyped/jquery/jquery.d.ts' />
/// <reference path='../bower_components/DefinitelyTyped/angularjs/angular.d.ts' />
/// <reference path="../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts" />
/// <reference path='app.ts' />
/// <reference path='modules.ts' />
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
    app.formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', 'SharedService', app.RouteHandler]);
})(app || (app = {}));



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJtb2R1bGVzLnRzIiwiY29uc3RhbnRzLnRzIiwiaW50ZXJmYWNlcy9hcHBDb25maWcuaW50ZXJmYWNlLnRzIiwiY29uZmlnLnRzIiwicm91dGUtaGFuZGxlci50cyIsImNvbnRyb2xsZXJzL3VzZXJzTGlzdC5jb250cm9sbGVyLnRzIiwiY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJzZXJ2aWNlcy9hcGkuc2VydmljZS50cyIsInNlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzIiwiX2FsbC50cyIsImFwcC50cyJdLCJuYW1lcyI6WyJhcHAiLCJhcHAuQ29uc3RhbnRzIiwiYXBwLkNvbnN0YW50cy5jb25zdHJ1Y3RvciIsImFwcC5Db25zdGFudHMuRGVmYXVsdCIsImFwcC5Db25maWciLCJhcHAuQ29uZmlnLmNvbnN0cnVjdG9yIiwiYXBwLlJvdXRlSGFuZGxlciIsImFwcC5Sb3V0ZUhhbmRsZXIuY29uc3RydWN0b3IiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZ2V0VXNlcnMiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5wcm9jZXNzU2VydmVyRGF0YSIsImFwcC5IZWFkZXJDb250cm9sbGVyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlU3RhcnQiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlU3VjY2VzcyIsImFwcC5IZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VFcnJvciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmNhbGxGdW5jdGlvbiIsImFwcC5IZWFkZXJDb250cm9sbGVyLmFkZFVzZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5nb0JhY2siLCJhcHAuQVBJU2VydmljZSIsImFwcC5BUElTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLkFQSVNlcnZpY2UuZ2V0Q2FsbCIsImFwcC5BUElTZXJ2aWNlLnBvc3RDYWxsIiwiYXBwLlNoYXJlZFNlcnZpY2UiLCJhcHAuU2hhcmVkU2VydmljZS5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsZ0NBQWdDO0FBRWhDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7QUNIcEQsZ0NBQWdDO0FBRWhDLElBQU8sR0FBRyxDQVdUO0FBWEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQUFBQztRQU9BQyxDQUFDQTtRQU5BRCxzQkFBV0Esb0JBQU9BO2lCQUFsQkE7Z0JBQ0NFLE1BQU1BLENBQUNBO29CQUNOQSxTQUFTQSxFQUFFQSx3QkFBd0JBO29CQUNuQ0EsV0FBV0EsRUFBRUEsWUFBWUE7aUJBQ3pCQTtZQUNGQSxDQUFDQTs7O1dBQUFGO1FBQ0ZBLGdCQUFDQTtJQUFEQSxDQUFDQSxJQUFBRDtJQVBZQSxhQUFTQSxZQU9yQkE7QUFDRkEsQ0FBQ0EsRUFYTSxHQUFHLEtBQUgsR0FBRyxRQVdUOzs7QUNiRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBT1Q7QUFQRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0FBTWJBLENBQUNBLEVBUE0sR0FBRyxLQUFILEdBQUcsUUFPVDs7O0FDVEQsZ0NBQWdDO0FBRWhDLElBQU8sR0FBRyxDQWlCVDtBQWpCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBS0NJLGdCQUFZQSxjQUF1Q0E7WUFDbERDLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBO2dCQUNqQ0EsV0FBV0EsRUFBRUEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FB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L0UsbUZBQW1GO0FBQ25GLHlGQUF5RjtBQUV6RiwrQkFBK0I7QUFDL0IsbUNBQW1DO0FBQ25DLHFDQUFxQztBQUNyQywwREFBMEQ7QUFDMUQsa0NBQWtDO0FBQ2xDLHlDQUF5QztBQUN6Qyw0REFBNEQ7QUFDNUQseURBQXlEO0FBQ3pELGdEQUFnRDtBQUNoRCxtREFBbUQ7OztBQ2JuRCxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBS1Q7QUFMRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ0FBLFdBQU9BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLFNBQVNBLEVBQUVBLGFBQWFBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO0lBRXZGQSxXQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFNQSxDQUFDQSxDQUFDQTtJQUNwQkEsV0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsRUFBRUEsV0FBV0EsRUFBRUEsZUFBZUEsRUFBRUEsZ0JBQVlBLENBQUNBLENBQUNBLENBQUNBO0FBQzVFQSxDQUFDQSxFQUxNLEdBQUcsS0FBSCxHQUFHLFFBS1QiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxudmFyIHNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ3NlcnZpY2VzJywgW10pO1xyXG52YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnY29udHJvbGxlcnMnLCBbXSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcblx0XHRzdGF0aWMgZ2V0IERlZmF1bHQoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy8nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIGFwcENvbmZpZ0ludGVyZmFjZSB7XHJcblx0XHRzZXJ2ZXJVcmw6IHN0cmluZztcclxuXHRcdHRlbXBsYXRlVXJsOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgICAgICckcm91dGVQcm92aWRlcidcclxuICAgICAgICBdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCRyb3V0ZVByb3ZpZGVyOiBuZy5yb3V0ZS5JUm91dGVQcm92aWRlcikge1xyXG5cdFx0XHQkcm91dGVQcm92aWRlci53aGVuKFwiL3VzZXJzbGlzdFwiLCB7XHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICcvdXNlcnNMaXN0Lmh0bWwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdVc2Vyc0xpc3RDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJ1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC5vdGhlcndpc2UoeyByZWRpcmVjdFRvOiAnL3VzZXJzbGlzdCcgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFJvdXRlSGFuZGxlciB7XHJcblx0XHRzdGF0aWMgaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdzaGFyZWRTZXJ2aWNlJ107XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgICRyb290U2NvcGU6IGFueSwgLy9uZy5JUm9vdFNjb3BlU2VydmljZSxcclxuXHRcdFx0JGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3VjY2VzcycsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlRXJyb3InLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJzTGlzdENvbnRyb2xsZXIge1xyXG5cdFx0cHJpdmF0ZSB1c2Vyc0xpc3Q6IE9iamVjdDtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0J0FQSVNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5hcHBDb25maWcgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQ7XHJcblx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRVc2VycygpIHtcclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLmdldENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZ2V0dXNlcnNsaXN0J1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC5zdWNjZXNzKChkYXRhLCBzdGF0dXMpID0+IHRoaXMucHJvY2Vzc1NlcnZlckRhdGEoZGF0YSkpXHJcblx0XHRcdFx0LmVycm9yKChkYXRhLCBzdGF0dXMpID0+IHRoaXMuJGxvZy5sb2coJ2VycicpKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9jZXNzU2VydmVyRGF0YShkYXRhOiBhbnkpIHtcclxuXHRcdFx0dGhpcy4kbG9nLmxvZygncHJvY2Vzc1NlcnZlckRhdGE6ICcsIGRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEgJiYgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0ID0gZGF0YTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnVzZXJzTGlzdCA9IHt9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59IFxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2Vyc0xpc3RDb250cm9sbGVyJywgYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBIZWFkZXJDb250cm9sbGVyIHtcclxuXHRcdGhlYWRpbmc6IHN0cmluZyA9ICdVc2VyIG1hbmFnZW1lbnQnO1xyXG5cclxuXHRcdGhlYWRlckxlZnRCdG46IE9iamVjdCA9IHtcclxuXHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHQndGV4dCc6ICcnXHJcblx0XHR9O1xyXG5cclxuXHRcdGhlYWRlclJpZ2h0QnRuOiBPYmplY3QgPSB7XHJcblx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdCdjbGlja0Z1bmMnOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0fTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0JyR3aW5kb3cnLFxyXG5cdFx0XHQnJGxvZycsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdGFydFwiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdWNjZXNzLmJpbmQodGhpcykpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCB0aGlzLm9uUm91dGVDaGFuZ2VFcnJvci5iaW5kKHRoaXMpKTtcclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlU3RhcnQoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdCkge1xyXG5cdFx0XHR0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3RhcnQ6ICcsIHBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdCkge1xyXG5cdFx0XHR0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3VjY2VzczogJywgcGFyYW1zKTtcclxuXHJcblx0XHRcdGlmIChwYXJhbXMubmV4dCAmJiBwYXJhbXMubmV4dC4kJHJvdXRlICYmIHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdHN3aXRjaCAocGFyYW1zLm5leHQuJCRyb3V0ZS5jb250cm9sbGVyKSB7XHJcblx0XHRcdFx0XHRjYXNlICd1c2Vyc0xpc3RDb250cm9sbGVyJzpcclxuXHRcdFx0XHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29Ub0FkZFVzZXInLFxyXG5cdFx0XHRcdFx0XHRcdCd0ZXh0JzogJ05ldyB1c2VyJ1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRjYXNlICdhZGRVc2VyQ29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb0JhY2snLFxyXG5cdFx0XHRcdFx0XHRcdCd0ZXh0JzogJ0JhY2snXHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0J2NsaWNrRnVuYyc6ICdhZGRVc2VyJyxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdBZGQgdXNlcidcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0XHQnY2xpY2tGdW5jJzogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnYWRkVXNlcicsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdBZGQgdXNlcidcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZUVycm9yKGV2ZW50LCBwYXJhbXMpIHtcclxuXHRcdFx0dGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZUVycm9yOiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNhbGxGdW5jdGlvbihldmVudDogRXZlbnQsIGNsaWNrRnVuYzogc3RyaW5nKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXNbY2xpY2tGdW5jXSkpIHtcclxuXHRcdFx0XHR0aGlzW2NsaWNrRnVuY10oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdvVG9BZGRVc2VyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlclwiKSkuc2NvcGUoKVxyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdFx0dGhpcy4kd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdC8vIHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnYWRkLXVzZXInLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z29CYWNrKCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgYXBwLkhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3QgPSBbJyRodHRwJ107XHJcblx0XHRodHRwU2VydmljZTogbmcuSUh0dHBTZXJ2aWNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSkge1xyXG5cdFx0XHR0aGlzLmh0dHBTZXJ2aWNlID0gJGh0dHA7XHJcblx0XHR9XHJcblxyXG4gICAgICAgIGdldENhbGwocGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0bGV0IGNvbmZpZyA9IHBhcmFtcy5jb25maWcgfHwge307XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChwYXJhbXMudXJsLCBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9zdENhbGwocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChwYXJhbXMudXJsLCBwYXJhbXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IFxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdBUElTZXJ2aWNlJywgYXBwLkFQSVNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2Uge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuICAgICAgICBicm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChldmVudE5hbWUsIGRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnU2hhcmVkU2VydmljZScsIGFwcC5TaGFyZWRTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvanF1ZXJ5L2pxdWVyeS5kLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXIuZC50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXBwLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbW9kdWxlcy50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnN0YW50cy50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ludGVyZmFjZXMvYXBwQ29uZmlnLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbmZpZy50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3JvdXRlLWhhbmRsZXIudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250cm9sbGVycy91c2Vyc0xpc3QuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRyb2xsZXJzL2hlYWRlci5jb250cm9sbGVyLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nc2VydmljZXMvYXBpLnNlcnZpY2UudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzZXJ2aWNlcy9zaGFyZWQuc2VydmljZS50cycgLz5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHRleHBvcnQgdmFyIGZvcm1BcHAgPSBhbmd1bGFyLm1vZHVsZSgnZm9ybUFwcCcsIFsnbmdSb3V0ZScsICdjb250cm9sbGVycycsICdzZXJ2aWNlcyddKTtcclxuXHJcblx0Zm9ybUFwcC5jb25maWcoQ29uZmlnKTtcclxuICAgIGZvcm1BcHAucnVuKFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnU2hhcmVkU2VydmljZScsIFJvdXRlSGFuZGxlcl0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
