/// <reference path='_all.ts' />
var services = angular.module('services', []);
var controllers = angular.module('controllers', []);
var directives = angular.module('directives', []);


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
                templateUrl: app.Constants.Default.templateUrl + 'usersList.html',
                controller: 'UsersListController',
                controllerAs: 'customController'
            }).when('/addUser', {
                controller: 'AddUserController',
                controllerAs: 'customController',
                templateUrl: app.Constants.Default.templateUrl + 'addUser.html'
            }).otherwise({ redirectTo: '/userslist' });
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
    var HeaderController = (function () {
        function HeaderController($scope, $location, $window, $log, sharedService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$window = $window;
            this.$log = $log;
            this.sharedService = sharedService;
            this.goToAddUser = function () {
                // angular.element(document.getElementById("header")).scope()
                this.$location.path('/addUser').replace();
            };
            $scope.$on("routeChangeStart", this.onRouteChangeStart.bind(this));
            $scope.$on("routeChangeSuccess", this.onRouteChangeSuccess.bind(this));
            $scope.$on("routeChangeError", this.onRouteChangeError.bind(this));
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
        }
        HeaderController.prototype.onRouteChangeStart = function (event, params) {
            this.$log.log('onRouteChangeStart: ', params);
        };
        HeaderController.prototype.onRouteChangeSuccess = function (event, params) {
            this.$log.log('onRouteChangeSuccess: ', params);
            // console.log(params.next.$$route.controller);
            if (params.next && params.next.$$route && params.next.$$route.controller) {
                switch (params.next.$$route.controller) {
                    case 'UsersListController':
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
                    case 'AddUserController':
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
            this.sharedService.broadcastEvent('add-user', {});
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
    var UsersListController = (function () {
        function UsersListController($scope, $location, $log, apiService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.apiService = apiService;
            this.modalDialogue = Object;
            this.clone = function (obj) {
                if (obj == null || typeof (obj) != 'object')
                    return obj;
                var temp = new obj.constructor();
                for (var key in obj)
                    temp[key] = this.clone(obj[key]);
                return temp;
            };
            this.updateUserData = function (data, userId) {
                var _this = this;
                console.log('updateUserData: ', data, userId);
                this.hideModal();
                this.apiService.postCall({
                    'url': this.appConfig.serverUrl + 'updateuser',
                    data: {
                        'key': userId,
                        'userData': data
                    }
                }).then(function (response) {
                    _this.$log.log('updateUserData success: ', response);
                    _this.getUsers();
                }).error(function (response) {
                    _this.$log.log('updateUserData error: ', response);
                });
            };
            this.hideModal = function (event) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                console.log(arguments);
                this.modalDialogue = {
                    isVisible: false,
                    title: '',
                    user: {},
                    userId: ''
                };
            };
            this.appConfig = app.Constants.Default;
            this.getUsers();
            this.modalDialogue = {
                isVisible: false,
                title: '',
                user: {},
                userId: ''
            };
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
        UsersListController.prototype.addUser = function () {
            this.$location.path('/addUser').replace();
        };
        UsersListController.prototype.deleteUser = function (event, key) {
            var _this = this;
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            console.log('key: ', key);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteuser',
                data: {
                    'key': key
                }
            }).success(function (response) {
                _this.$log.log('success: ', response);
                _this.getUsers();
            }).error(function (response) {
                _this.$log.log('error: ', response);
            });
        };
        UsersListController.prototype.editUserClick = function (event, key) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            console.log('key: ', key);
            this.modalDialogue = {
                isVisible: true,
                title: 'Edit details',
                user: this.clone(this.usersList[key]),
                userId: key
            };
            console.log(this.modalDialogue);
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
    var AddUserController = (function () {
        function AddUserController($scope, $location, $log, apiService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.apiService = apiService;
            this.validateEmail = function (val) {
                var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                if (val && emailRegexp.test(val)) {
                    this.validEmail = true;
                }
                else {
                    this.validEmail = false;
                }
            };
            this.addUser = function () {
                var _this = this;
                console.log('add user: ', this.user);
                this.apiService.postCall({
                    'url': this.appConfig.serverUrl + 'adduser',
                    data: this.user
                }).success(function (response) {
                    _this.$log.log('success: ', response);
                    _this.$location.path('/userslist').replace();
                }).error(function (response) {
                    _this.$log.log('error: ', response);
                });
            };
            $scope.$on('add-user', function (event, args) {
                this.addUser();
            });
            this.appConfig = app.Constants.Default;
            this.validEmail = false;
            this.user = {
                'firstname': '',
                'lastname': '',
                'email': '',
                'phonenumber': '',
                'location': 'IN'
            };
            console.log($log);
            console.log(this);
        }
        AddUserController.$inject = [
            '$scope',
            '$location',
            '$log',
            'APIService'
        ];
        return AddUserController;
    })();
    app.AddUserController = AddUserController;
})(app || (app = {}));
controllers.controller('AddUserController', app.AddUserController);


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var ModalDialogueController = (function () {
        function ModalDialogueController() {
        }
        return ModalDialogueController;
    })();
    app.ModalDialogueController = ModalDialogueController;
})(app || (app = {}));
controllers.controller('ModalDialogueController', app.ModalDialogueController);


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var ModalDialogue = (function () {
        function ModalDialogue(myFactory) {
            this.myFactory = myFactory;
            this.restrict = 'E';
            this.scope = {
                isVisible: '=',
                title: '=',
                user: '=',
                userId: '=',
                hideModal: '&',
                updateData: '&'
            };
            this.templateUrl = 'templates/directives/modal-dialogue.directive.html';
            this.controller = 'ModalDialogueController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        ModalDialogue.factory = function () {
            return (function () { return new ModalDialogue(); });
        };
        return ModalDialogue;
    })();
    app.ModalDialogue = ModalDialogue;
})(app || (app = {}));
directives.directive('modalDialogue', app.ModalDialogue.factory());


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
/// <reference path='controllers/header.controller.ts' />
/// <reference path='controllers/usersList.controller.ts' />
/// <reference path='controllers/addUser.controller.ts' />
/// <reference path='controllers/modalDialogue.controller.ts' />
/// <reference path='directives/modalDialogue.directive.ts' />
/// <reference path='services/api.service.ts' />
/// <reference path='services/shared.service.ts' />


/// <reference path='_all.ts' />
var app;
(function (app) {
    app.formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services', 'directives']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', 'SharedService', app.RouteHandler]);
})(app || (app = {}));



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJtb2R1bGVzLnRzIiwiY29uc3RhbnRzLnRzIiwiaW50ZXJmYWNlcy9hcHBDb25maWcuaW50ZXJmYWNlLnRzIiwiY29uZmlnLnRzIiwicm91dGUtaGFuZGxlci50cyIsImNvbnRyb2xsZXJzL2hlYWRlci5jb250cm9sbGVyLnRzIiwiY29udHJvbGxlcnMvdXNlcnNMaXN0LmNvbnRyb2xsZXIudHMiLCJjb250cm9sbGVycy9hZGRVc2VyLmNvbnRyb2xsZXIudHMiLCJjb250cm9sbGVycy9tb2RhbERpYWxvZ3VlLmNvbnRyb2xsZXIudHMiLCJkaXJlY3RpdmVzL21vZGFsRGlhbG9ndWUuZGlyZWN0aXZlLnRzIiwic2VydmljZXMvYXBpLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9zaGFyZWQuc2VydmljZS50cyIsIl9hbGwudHMiLCJhcHAudHMiXSwibmFtZXMiOlsiYXBwIiwiYXBwLkNvbnN0YW50cyIsImFwcC5Db25zdGFudHMuY29uc3RydWN0b3IiLCJhcHAuQ29uc3RhbnRzLkRlZmF1bHQiLCJhcHAuQ29uZmlnIiwiYXBwLkNvbmZpZy5jb25zdHJ1Y3RvciIsImFwcC5Sb3V0ZUhhbmRsZXIiLCJhcHAuUm91dGVIYW5kbGVyLmNvbnN0cnVjdG9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5IZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdGFydCIsImFwcC5IZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdWNjZXNzIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZUVycm9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuY2FsbEZ1bmN0aW9uIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmdvQmFjayIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5nZXRVc2VycyIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnByb2Nlc3NTZXJ2ZXJEYXRhIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmRlbGV0ZVVzZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5lZGl0VXNlckNsaWNrIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyIiwiYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLk1vZGFsRGlhbG9ndWUiLCJhcHAuTW9kYWxEaWFsb2d1ZS5jb25zdHJ1Y3RvciIsImFwcC5Nb2RhbERpYWxvZ3VlLmZhY3RvcnkiLCJhcHAuQVBJU2VydmljZSIsImFwcC5BUElTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLkFQSVNlcnZpY2UuZ2V0Q2FsbCIsImFwcC5BUElTZXJ2aWNlLnBvc3RDYWxsIiwiYXBwLlNoYXJlZFNlcnZpY2UiLCJhcHAuU2hhcmVkU2VydmljZS5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsZ0NBQWdDO0FBRWhDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7QUNKbEQsZ0NBQWdDO0FBRWhDLElBQU8sR0FBRyxDQVdUO0FBWEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQUFBQztRQU9BQyxDQUFDQTtRQU5BRCxzQkFBV0Esb0JBQU9BO2lCQUFsQkE7Z0JBQ0NFLE1BQU1BLENBQUNBO29CQUNOQSxTQUFTQSxFQUFFQSx3QkFBd0JBO29CQUNuQ0EsV0FBV0EsRUFBRUEsWUFBWUE7aUJBQ3pCQTtZQUNGQSxDQUFDQTs7O1dBQUFGO1FBQ0ZBLGdCQUFDQTtJQUFEQSxDQUFDQSxJQUFBRDtJQVBZQSxhQUFTQSxZQU9yQkE7QUFDRkEsQ0FBQ0EsRUFYTSxHQUFHLEtBQUgsR0FBRyxRQVdUOzs7QUNiRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBT1Q7QUFQRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0FBTWJBLENBQUNBLEVBUE0sR0FBRyxLQUFILEdBQUcsUUFPVDs7O0FDVEQsZ0NBQWdDO0FBRWhDLElBQU8sR0FBRyxDQW9CVDtBQXBCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBS0NJLGdCQUFZQSxjQUF1Q0E7WUFDbERDLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBO2dCQUNqQ0EsV0FBV0EsRUFBRUEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsR0FBR0EsZ0JBQWdCQTtnQkFDakVBLFVBQVVBLEVBQUVBLHFCQUFxQkE7Z0JBQ2pDQSxZQUFZQSxFQUFFQSxrQkFBa0JBO2FBQ2hDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQTtnQkFDbkJBLFVBQVVBLEVBQUVBLG1CQUFtQkE7Z0JBQy9CQSxZQUFZQSxFQUFFQSxrQkFBa0JBO2dCQUNoQ0EsV0FBV0EsRUFBRUEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsR0FBR0EsY0FBY0E7YUFDL0RBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLFVBQVVBLEVBQUVBLFlBQVlBLEVBQUVBLENBQUNBLENBQUNBO1FBQzVDQSxDQUFDQTtRQWRhRCxjQUFPQSxHQUFHQTtZQUNkQSxnQkFBZ0JBO1NBQ25CQSxDQUFDQTtRQWFUQSxhQUFDQTtJQUFEQSxDQUFDQSxJQUFBSjtJQWhCWUEsVUFBTUEsU0FnQmxCQTtBQUNGQSxDQUFDQSxFQXBCTSxHQUFHLEtBQUgsR0FBRyxRQW9CVDs7O0FDdEJELGdDQUFnQztBQUVoQyxJQUFPLEdBQUcsQ0FpQ1Q7QUFqQ0QsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQUdDTSxzQkFDVUEsVUFBZUEsRUFBRUEsdUJBQXVCQTtZQUNqREEsU0FBOEJBLEVBQzlCQSxhQUE0QkE7WUFFNUJDLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLG1CQUFtQkEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0E7Z0JBQ2hFLGFBQWEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUU7b0JBQ2hELElBQUksRUFBRSxJQUFJO29CQUNWLE9BQU8sRUFBRSxPQUFPO2lCQUNoQixDQUFDLENBQUM7WUFDSixDQUFDLENBQUNBLENBQUNBO1lBRUhBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLHFCQUFxQkEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0E7Z0JBQ2xFLGFBQWEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUU7b0JBQ2xELElBQUksRUFBRSxJQUFJO29CQUNWLE9BQU8sRUFBRSxPQUFPO2lCQUNoQixDQUFDLENBQUM7WUFDSixDQUFDLENBQUNBLENBQUNBO1lBRUhBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLG1CQUFtQkEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0E7Z0JBQ2hFLGFBQWEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUU7b0JBQ2hELElBQUksRUFBRSxJQUFJO29CQUNWLE9BQU8sRUFBRSxPQUFPO2lCQUNoQixDQUFDLENBQUM7WUFDSixDQUFDLENBQUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBM0JNRCxtQkFBTUEsR0FBR0EsQ0FBQ0EsWUFBWUEsRUFBRUEsV0FBV0EsRUFBRUEsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUE0QjlEQSxtQkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQU47SUE3QllBLGdCQUFZQSxlQTZCeEJBO0FBQ0ZBLENBQUNBLEVBakNNLEdBQUcsS0FBSCxHQUFHLFFBaUNUOzs7QUNuQ0QsbUNBQW1DO0FBRW5DLElBQU8sR0FBRyxDQXVIVDtBQXZIRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBYUNRLDBCQUNTQSxNQUFpQkEsRUFDakJBLFNBQThCQSxFQUM5QkEsT0FBMEJBLEVBQzFCQSxJQUFvQkEsRUFDcEJBLGFBQTRCQTtZQUo1QkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7WUFDakJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQXFCQTtZQUM5QkEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBbUJBO1lBQzFCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUFDcEJBLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFlQTtZQW9GckNBLGdCQUFXQSxHQUFHQTtnQkFDYiw2REFBNkQ7Z0JBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNDLENBQUMsQ0FBQUE7WUFyRkFBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLGtCQUFrQkEsRUFBRUEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuRUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3ZFQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLEVBQUVBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbkVBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLGlCQUFpQkEsQ0FBQ0E7WUFDakNBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBO2dCQUNwQkEsU0FBU0EsRUFBRUEsS0FBS0E7Z0JBQ2hCQSxXQUFXQSxFQUFFQSxjQUFhLENBQUM7Z0JBQzNCQSxNQUFNQSxFQUFFQSxFQUFFQTthQUNWQSxDQUFDQTtZQUNGQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQTtnQkFDckJBLFNBQVNBLEVBQUVBLEtBQUtBO2dCQUNoQkEsV0FBV0EsRUFBRUEsY0FBYSxDQUFDO2dCQUMzQkEsTUFBTUEsRUFBRUEsRUFBRUE7YUFDVkEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFFREQsNkNBQWtCQSxHQUFsQkEsVUFBbUJBLEtBQVlBLEVBQUVBLE1BQWNBO1lBQzlDRSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxzQkFBc0JBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1FBQy9DQSxDQUFDQTtRQUVERiwrQ0FBb0JBLEdBQXBCQSxVQUFxQkEsS0FBWUEsRUFBRUEsTUFBY0E7WUFDaERHLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLHdCQUF3QkEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFFaERBLCtDQUErQ0E7WUFDL0NBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hDQSxLQUFLQSxxQkFBcUJBO3dCQUN6QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7NEJBQ3BCQSxTQUFTQSxFQUFFQSxLQUFLQTs0QkFDaEJBLFdBQVdBLEVBQUVBLGNBQWEsQ0FBQzs0QkFDM0JBLE1BQU1BLEVBQUVBLEVBQUVBO3lCQUNWQSxDQUFDQTt3QkFFRkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0E7NEJBQ3JCQSxTQUFTQSxFQUFFQSxJQUFJQTs0QkFDZkEsV0FBV0EsRUFBRUEsYUFBYUE7NEJBQzFCQSxNQUFNQSxFQUFFQSxVQUFVQTt5QkFDbEJBLENBQUNBO3dCQUNGQSxLQUFLQSxDQUFDQTtvQkFFUEEsS0FBS0EsbUJBQW1CQTt3QkFDdkJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBOzRCQUNwQkEsU0FBU0EsRUFBRUEsSUFBSUE7NEJBQ2ZBLFdBQVdBLEVBQUVBLFFBQVFBOzRCQUNyQkEsTUFBTUEsRUFBRUEsTUFBTUE7eUJBQ2RBLENBQUNBO3dCQUVGQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQTs0QkFDckJBLFNBQVNBLEVBQUVBLEtBQUtBOzRCQUNoQkEsV0FBV0EsRUFBRUEsU0FBU0E7NEJBQ3RCQSxNQUFNQSxFQUFFQSxVQUFVQTt5QkFDbEJBLENBQUNBO3dCQUNGQSxLQUFLQSxDQUFDQTtnQkFDUkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBO29CQUNwQkEsU0FBU0EsRUFBRUEsS0FBS0E7b0JBQ2hCQSxXQUFXQSxFQUFFQSxjQUFhLENBQUM7b0JBQzNCQSxNQUFNQSxFQUFFQSxFQUFFQTtpQkFDVkEsQ0FBQ0E7Z0JBRUZBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBO29CQUNyQkEsU0FBU0EsRUFBRUEsSUFBSUE7b0JBQ2ZBLFdBQVdBLEVBQUVBLFNBQVNBO29CQUN0QkEsTUFBTUEsRUFBRUEsVUFBVUE7aUJBQ2xCQSxDQUFDQTtZQUNIQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVESCw2Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBS0EsRUFBRUEsTUFBTUE7WUFDL0JJLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLHNCQUFzQkEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDL0NBLENBQUNBO1FBRURKLHVDQUFZQSxHQUFaQSxVQUFhQSxLQUFZQSxFQUFFQSxTQUFpQkE7WUFDM0NLLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBRXZCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLENBQUNBO1lBQ25CQSxDQUFDQTtRQUNGQSxDQUFDQTtRQU9ETCxrQ0FBT0EsR0FBUEE7WUFDQ00sSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDbkRBLENBQUNBO1FBRUROLGlDQUFNQSxHQUFOQTtZQUNDTyxLQUFLQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDN0NBLENBQUNBO1FBN0dhUCx3QkFBT0EsR0FBR0E7WUFDdkJBLFFBQVFBO1lBQ1JBLFdBQVdBO1lBQ1hBLFNBQVNBO1lBQ1RBLE1BQU1BO1lBQ05BLGVBQWVBO1NBQ2ZBLENBQUNBO1FBd0dIQSx1QkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQVI7SUFuSFlBLG9CQUFnQkEsbUJBbUg1QkE7QUFDRkEsQ0FBQ0EsRUF2SE0sR0FBRyxLQUFILEdBQUcsUUF1SFQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzs7QUMxSGpFLG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FzSVQ7QUF0SUQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQSxDQUFDQTtJQUViQTtRQVlDZ0IsNkJBQ1NBLE1BQWlCQSxFQUNqQkEsU0FBOEJBLEVBQzlCQSxJQUFvQkEsRUFDcEJBLFVBQXNCQTtZQUh0QkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7WUFDakJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQXFCQTtZQUM5QkEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBZ0JBO1lBQ3BCQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFZQTtZQWJ2QkEsa0JBQWFBLEdBQUdBLE1BQU1BLENBQUNBO1lBb0YvQkEsVUFBS0EsR0FBR0EsVUFBU0EsR0FBR0E7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFFWixJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDakMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7b0JBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2IsQ0FBQyxDQUFBQTtZQUVEQSxtQkFBY0EsR0FBR0EsVUFBU0EsSUFBU0EsRUFBRUEsTUFBY0E7Z0JBQWxDLGlCQWdCaEI7Z0JBZkEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7b0JBQ3hCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxZQUFZO29CQUM5QyxJQUFJLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLE1BQU07d0JBQ2IsVUFBVSxFQUFFLElBQUk7cUJBQ2hCO2lCQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO29CQUNoQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDcEQsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxRQUFRO29CQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDLENBQUFBO1lBRURBLGNBQVNBLEdBQUdBLFVBQVNBLEtBQVlBO2dCQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNYLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN4QixDQUFDO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRXZCLElBQUksQ0FBQyxhQUFhLEdBQUc7b0JBQ3BCLFNBQVMsRUFBRSxLQUFLO29CQUNoQixLQUFLLEVBQUUsRUFBRTtvQkFDVCxJQUFJLEVBQUUsRUFBRTtvQkFDUixNQUFNLEVBQUUsRUFBRTtpQkFDVixDQUFDO1lBQ0gsQ0FBQyxDQUFBQTtZQS9HQUEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDdkNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBRWhCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQTtnQkFDcEJBLFNBQVNBLEVBQUVBLEtBQUtBO2dCQUNoQkEsS0FBS0EsRUFBRUEsRUFBRUE7Z0JBQ1RBLElBQUlBLEVBQUVBLEVBQUVBO2dCQUNSQSxNQUFNQSxFQUFFQSxFQUFFQTthQUNWQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVERCxzQ0FBUUEsR0FBUkE7WUFBQUUsaUJBTUNBO1lBTEFBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBO2dCQUN2QkEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsR0FBR0EsY0FBY0E7YUFDaERBLENBQUNBO2lCQUNBQSxPQUFPQSxDQUFDQSxVQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxJQUFLQSxZQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLEVBQTVCQSxDQUE0QkEsQ0FBQ0E7aUJBQ3ZEQSxLQUFLQSxDQUFDQSxVQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxJQUFLQSxZQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFwQkEsQ0FBb0JBLENBQUNBLENBQUNBO1FBQ2pEQSxDQUFDQTtRQUVERiwrQ0FBaUJBLEdBQWpCQSxVQUFrQkEsSUFBU0E7WUFDMUJHLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLHFCQUFxQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFM0NBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDdkJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNyQkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREgscUNBQU9BLEdBQVBBO1lBQ0NJLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQzNDQSxDQUFDQTtRQUVESix3Q0FBVUEsR0FBVkEsVUFBV0EsS0FBWUEsRUFBRUEsR0FBV0E7WUFBcENLLGlCQWtCQ0E7WUFqQkFBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtnQkFDeEJBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUNEQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUUxQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQ3hCQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxHQUFHQSxZQUFZQTtnQkFDOUNBLElBQUlBLEVBQUVBO29CQUNMQSxLQUFLQSxFQUFFQSxHQUFHQTtpQkFDVkE7YUFDREEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsUUFBUUE7Z0JBQ25CQSxLQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDckNBLEtBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBQ2pCQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFDQSxRQUFRQTtnQkFDakJBLEtBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQ3BDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQUVETCwyQ0FBYUEsR0FBYkEsVUFBY0EsS0FBWUEsRUFBRUEsR0FBV0E7WUFDdENNLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtnQkFDeEJBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUNEQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUUxQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7Z0JBQ3BCQSxTQUFTQSxFQUFFQSxJQUFJQTtnQkFDZkEsS0FBS0EsRUFBRUEsY0FBY0E7Z0JBQ3JCQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDckNBLE1BQU1BLEVBQUVBLEdBQUdBO2FBQ1hBLENBQUNBO1lBQ0ZBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1FBQ2pDQSxDQUFDQTtRQWhGYU4sMkJBQU9BLEdBQUdBO1lBQ3ZCQSxRQUFRQTtZQUNSQSxXQUFXQTtZQUNYQSxNQUFNQTtZQUNOQSxZQUFZQTtTQUNaQSxDQUFDQTtRQXdISEEsMEJBQUNBO0lBQURBLENBQUNBLElBQUFoQjtJQWxJWUEsdUJBQW1CQSxzQkFrSS9CQTtBQUNGQSxDQUFDQSxFQXRJTSxHQUFHLEtBQUgsR0FBRyxRQXNJVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7OztBQ3pJdkUsbUNBQW1DO0FBRW5DLElBQU8sR0FBRyxDQTZEVDtBQTdERCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBLENBQUNBO0lBRWJBO1FBWUN1QiwyQkFDU0EsTUFBaUJBLEVBQ2pCQSxTQUE4QkEsRUFDOUJBLElBQW9CQSxFQUNwQkEsVUFBc0JBO1lBSHRCQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFXQTtZQUNqQkEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBcUJBO1lBQzlCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUFDcEJBLGVBQVVBLEdBQVZBLFVBQVVBLENBQVlBO1lBbUIvQkEsa0JBQWFBLEdBQUdBLFVBQVNBLEdBQUdBO2dCQUMzQixJQUFJLFdBQVcsR0FBRyxtR0FBbUcsQ0FBQztnQkFDdEgsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDeEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDekIsQ0FBQztZQUNGLENBQUMsQ0FBQUE7WUFFREEsWUFBT0EsR0FBR0E7Z0JBQUEsaUJBWVQ7Z0JBWEEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztvQkFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVM7b0JBQzNDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDZixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtvQkFDbkIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNyQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsUUFBUTtvQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQ0E7WUF0Q0RBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUN2Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDeEJBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBO2dCQUNYQSxXQUFXQSxFQUFFQSxFQUFFQTtnQkFDZkEsVUFBVUEsRUFBRUEsRUFBRUE7Z0JBQ2RBLE9BQU9BLEVBQUVBLEVBQUVBO2dCQUNYQSxhQUFhQSxFQUFFQSxFQUFFQTtnQkFDakJBLFVBQVVBLEVBQUVBLElBQUlBO2FBQ2hCQSxDQUFDQTtZQUNGQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNsQkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBNUJhRCx5QkFBT0EsR0FBR0E7WUFDdkJBLFFBQVFBO1lBQ1JBLFdBQVdBO1lBQ1hBLE1BQU1BO1lBQ05BLFlBQVlBO1NBQ1pBLENBQUNBO1FBK0NIQSx3QkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQXZCO0lBekRZQSxxQkFBaUJBLG9CQXlEN0JBO0FBQ0ZBLENBQUNBLEVBN0RNLEdBQUcsS0FBSCxHQUFHLFFBNkRUO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7O0FDaEVuRSxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBTVQ7QUFORCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBLENBQUNBO0lBRWJBO1FBQ0N5QjtRQUFnQkMsQ0FBQ0E7UUFDbEJELDhCQUFDQTtJQUFEQSxDQUFDQSxJQUFBekI7SUFGWUEsMkJBQXVCQSwwQkFFbkNBO0FBQ0ZBLENBQUNBLEVBTk0sR0FBRyxLQUFILEdBQUcsUUFNVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7OztBQ1QvRSxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBd0JUO0FBeEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUkEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFlRjJCLHVCQUFvQkEsU0FBaUNBO1lBQWpDQyxjQUFTQSxHQUFUQSxTQUFTQSxDQUF3QkE7WUFkOUNBLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ1RBLFVBQUtBLEdBQUdBO2dCQUNYQSxTQUFTQSxFQUFFQSxHQUFHQTtnQkFDdkJBLEtBQUtBLEVBQUVBLEdBQUdBO2dCQUNWQSxJQUFJQSxFQUFFQSxHQUFHQTtnQkFDVEEsTUFBTUEsRUFBRUEsR0FBR0E7Z0JBQ1hBLFNBQVNBLEVBQUVBLEdBQUdBO2dCQUNkQSxVQUFVQSxFQUFFQSxHQUFHQTthQUNUQSxDQUFDQTtZQUNLQSxnQkFBV0EsR0FBR0Esb0RBQW9EQSxDQUFDQTtZQUN6RUEsZUFBVUEsR0FBR0EseUJBQXlCQSxDQUFDQTtZQUN2Q0EsaUJBQVlBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7WUFDbENBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFeUJBLENBQUNBO1FBRWxERCxxQkFBT0EsR0FBZEE7WUFDQ0UsTUFBTUEsRUFBRUEsY0FBTUEsV0FBSUEsYUFBYUEsRUFBRUEsRUFBbkJBLENBQW1CQSxDQUFDQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7UUFDQ0Ysb0JBQUNBO0lBQURBLENBQUNBLElBQUEzQjtJQXBCWUEsaUJBQWFBLGdCQW9CekJBO0FBQ0xBLENBQUNBLEVBeEJNLEdBQUcsS0FBSCxHQUFHLFFBd0JUO0FBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOzs7QUMzQm5FLG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQUlGOEIsb0JBQW9CQSxLQUFzQkE7WUFBdEJDLFVBQUtBLEdBQUxBLEtBQUtBLENBQWlCQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRUtELDRCQUFPQSxHQUFQQSxVQUFRQSxNQUFXQTtZQUN4QkUsSUFBSUEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDeEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1FBQ3BEQSxDQUFDQTtRQUVERiw2QkFBUUEsR0FBUkEsVUFBU0EsTUFBV0E7WUFDaEJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzFEQSxDQUFDQTtRQWRBSCxrQkFBT0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFlekJBLGlCQUFDQTtJQUFEQSxDQUFDQSxJQUFBOUI7SUFoQllBLGNBQVVBLGFBZ0J0QkE7QUFDTEEsQ0FBQ0EsRUFwQk0sR0FBRyxLQUFILEdBQUcsUUFvQlQ7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7OztBQ3ZCL0MsbUNBQW1DO0FBRW5DLElBQU8sR0FBRyxDQVlUO0FBWkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQUdJa0MsdUJBQW9CQSxVQUFnQ0E7WUFBaENDLGVBQVVBLEdBQVZBLFVBQVVBLENBQXNCQTtZQUVwREEsbUJBQWNBLEdBQUdBLFVBQVNBLFNBQVNBLEVBQUVBLElBQUlBO2dCQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDQTtRQUpzREEsQ0FBQ0E7UUFGbERELHFCQUFPQSxHQUFHQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQU9wQ0Esb0JBQUNBO0lBQURBLENBQUNBLElBQUFsQztJQVJZQSxpQkFBYUEsZ0JBUXpCQTtBQUNMQSxDQUFDQSxFQVpNLEdBQUcsS0FBSCxHQUFHLFFBWVQ7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7OztBQ2ZyRCwrRUFBK0U7QUFDL0UsbUZBQW1GO0FBQ25GLHlGQUF5RjtBQUV6RiwrQkFBK0I7QUFDL0IsbUNBQW1DO0FBQ25DLHFDQUFxQztBQUNyQywwREFBMEQ7QUFDMUQsa0NBQWtDO0FBQ2xDLHlDQUF5QztBQUN6Qyx5REFBeUQ7QUFDekQsNERBQTREO0FBQzVELDBEQUEwRDtBQUMxRCxnRUFBZ0U7QUFDaEUsOERBQThEO0FBQzlELGdEQUFnRDtBQUNoRCxtREFBbUQ7OztBQ2hCbkQsZ0NBQWdDO0FBRWhDLElBQU8sR0FBRyxDQUtUO0FBTEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNBQSxXQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxTQUFTQSxFQUFFQSxhQUFhQSxFQUFFQSxVQUFVQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVyR0EsV0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDcEJBLFdBQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLFlBQVlBLEVBQUVBLFdBQVdBLEVBQUVBLGVBQWVBLEVBQUVBLGdCQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUM1RUEsQ0FBQ0EsRUFMTSxHQUFHLEtBQUgsR0FBRyxRQUtUIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbnZhciBzZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCdzZXJ2aWNlcycsIFtdKTtcclxudmFyIGNvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2NvbnRyb2xsZXJzJywgW10pO1xyXG52YXIgZGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzJywgW10pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG5cdFx0c3RhdGljIGdldCBEZWZhdWx0KCk6IGFueSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBhcHBDb25maWdJbnRlcmZhY2Uge1xyXG5cdFx0c2VydmVyVXJsOiBzdHJpbmc7XHJcblx0XHR0ZW1wbGF0ZVVybDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25maWcge1xyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG4gICAgICAgICAgICAnJHJvdXRlUHJvdmlkZXInXHJcbiAgICAgICAgXTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcigkcm91dGVQcm92aWRlcjogbmcucm91dGUuSVJvdXRlUHJvdmlkZXIpIHtcclxuXHRcdFx0JHJvdXRlUHJvdmlkZXIud2hlbihcIi91c2Vyc2xpc3RcIiwge1xyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAndXNlcnNMaXN0Lmh0bWwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdVc2Vyc0xpc3RDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJ1xyXG5cdFx0XHR9KS53aGVuKCcvYWRkVXNlcicsIHtcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnQWRkVXNlckNvbnRyb2xsZXInLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2N1c3RvbUNvbnRyb2xsZXInLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnYWRkVXNlci5odG1sJ1xyXG5cdFx0XHR9KS5vdGhlcndpc2UoeyByZWRpcmVjdFRvOiAnL3VzZXJzbGlzdCcgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFJvdXRlSGFuZGxlciB7XHJcblx0XHRzdGF0aWMgaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdzaGFyZWRTZXJ2aWNlJ107XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgICRyb290U2NvcGU6IGFueSwgLy9uZy5JUm9vdFNjb3BlU2VydmljZSxcclxuXHRcdFx0JGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3VjY2VzcycsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlRXJyb3InLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgSGVhZGVyQ29udHJvbGxlciB7XHJcblx0XHRoZWFkaW5nOiBzdHJpbmc7XHJcblx0XHRoZWFkZXJMZWZ0QnRuOiBPYmplY3Q7XHJcblx0XHRoZWFkZXJSaWdodEJ0bjogT2JqZWN0O1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJHdpbmRvdycsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3VjY2Vzcy5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgdGhpcy5vblJvdXRlQ2hhbmdlRXJyb3IuYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRpbmcgPSAnVXNlciBtYW5hZ2VtZW50JztcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0dGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0dGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpO1xyXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0Y2FzZSAnVXNlcnNMaXN0Q29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvVG9BZGRVc2VyJyxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdOZXcgdXNlcidcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnQWRkVXNlckNvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29CYWNrJyxcclxuXHRcdFx0XHRcdFx0XHQndGV4dCc6ICdCYWNrJ1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdCdjbGlja0Z1bmMnOiAnYWRkVXNlcicsXHJcblx0XHRcdFx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdFx0J2NsaWNrRnVuYyc6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0XHQnY2xpY2tGdW5jJzogJ2FkZFVzZXInLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XHJcblx0XHRcdHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzW2NsaWNrRnVuY10pKSB7XHJcblx0XHRcdFx0dGhpc1tjbGlja0Z1bmNdKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnb1RvQWRkVXNlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJcIikpLnNjb3BlKClcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdhZGQtdXNlcicsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHRnb0JhY2soKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLCBhcHAuSGVhZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2Vyc0xpc3RDb250cm9sbGVyIHtcclxuXHRcdHByaXZhdGUgdXNlcnNMaXN0OiBPYmplY3Q7XHJcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlID0gT2JqZWN0O1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJGxvZycsXHJcblx0XHRcdCdBUElTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblxyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0dXNlcjoge30sXHJcblx0XHRcdFx0dXNlcklkOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldFVzZXJzKCkge1xyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UuZ2V0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXHJcblx0XHRcdH0pXHJcblx0XHRcdFx0LnN1Y2Nlc3MoKGRhdGEsIHN0YXR1cykgPT4gdGhpcy5wcm9jZXNzU2VydmVyRGF0YShkYXRhKSlcclxuXHRcdFx0XHQuZXJyb3IoKGRhdGEsIHN0YXR1cykgPT4gdGhpcy4kbG9nLmxvZygnZXJyJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSkge1xyXG5cdFx0XHR0aGlzLiRsb2cubG9nKCdwcm9jZXNzU2VydmVyRGF0YTogJywgZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YSAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0ID0ge307XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGVVc2VyKGV2ZW50OiBFdmVudCwga2V5OiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zb2xlLmxvZygna2V5OiAnLCBrZXkpO1xyXG5cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2RlbGV0ZXVzZXInLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdCdrZXknOiBrZXlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJDbGljayhldmVudDogRXZlbnQsIGtleTogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc29sZS5sb2coJ2tleTogJywga2V5KTtcclxuXHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdFZGl0IGRldGFpbHMnLFxyXG5cdFx0XHRcdHVzZXI6IHRoaXMuY2xvbmUodGhpcy51c2Vyc0xpc3Rba2V5XSksXHJcblx0XHRcdFx0dXNlcklkOiBrZXlcclxuXHRcdFx0fTtcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5tb2RhbERpYWxvZ3VlKTtcclxuXHRcdH1cclxuXHJcblx0XHRjbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xyXG5cdFx0XHRpZiAob2JqID09IG51bGwgfHwgdHlwZW9mIChvYmopICE9ICdvYmplY3QnKVxyXG5cdFx0XHRcdHJldHVybiBvYmo7XHJcblxyXG5cdFx0XHR2YXIgdGVtcCA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcclxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iailcclxuXHRcdFx0XHR0ZW1wW2tleV0gPSB0aGlzLmNsb25lKG9ialtrZXldKTtcclxuXHJcblx0XHRcdHJldHVybiB0ZW1wO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZVVzZXJEYXRhID0gZnVuY3Rpb24oZGF0YTogYW55LCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHRjb25zb2xlLmxvZygndXBkYXRlVXNlckRhdGE6ICcsIGRhdGEsIHVzZXJJZCk7XHJcblx0XHRcdHRoaXMuaGlkZU1vZGFsKCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAndXBkYXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J2tleSc6IHVzZXJJZCxcclxuXHRcdFx0XHRcdCd1c2VyRGF0YSc6IGRhdGFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygndXBkYXRlVXNlckRhdGEgc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygndXBkYXRlVXNlckRhdGEgZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZU1vZGFsID0gZnVuY3Rpb24oZXZlbnQ6IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc29sZS5sb2coYXJndW1lbnRzKTtcclxuXHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHR1c2VyOiB7fSxcclxuXHRcdFx0XHR1c2VySWQ6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJzTGlzdENvbnRyb2xsZXInLCBhcHAuVXNlcnNMaXN0Q29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBZGRVc2VyQ29udHJvbGxlciB7XHJcblx0XHRwcml2YXRlIHVzZXI6IE9iamVjdDtcclxuXHRcdHByaXZhdGUgdmFsaWRFbWFpbDogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0J0FQSVNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbignYWRkLXVzZXInLCBmdW5jdGlvbihldmVudCwgYXJncykge1xyXG5cdFx0XHRcdHRoaXMuYWRkVXNlcigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy51c2VyID0ge1xyXG5cdFx0XHRcdCdmaXJzdG5hbWUnOiAnJyxcclxuXHRcdFx0XHQnbGFzdG5hbWUnOiAnJyxcclxuXHRcdFx0XHQnZW1haWwnOiAnJyxcclxuXHRcdFx0XHQncGhvbmVudW1iZXInOiAnJyxcclxuXHRcdFx0XHQnbG9jYXRpb24nOiAnSU4nXHJcblx0XHRcdH07XHJcblx0XHRcdGNvbnNvbGUubG9nKCRsb2cpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsID0gZnVuY3Rpb24odmFsKSB7XHJcblx0XHRcdHZhciBlbWFpbFJlZ2V4cCA9IC9eW2EtejAtOSEjJCUmJyorXFwvPT9eX2B7fH1+Li1dK0BbYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPyhcXC5bYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPykqJC9pO1xyXG5cdFx0XHRpZiAodmFsICYmIGVtYWlsUmVnZXhwLnRlc3QodmFsKSkge1xyXG5cdFx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdhZGQgdXNlcjogJywgdGhpcy51c2VyKTtcclxuXHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdhZGR1c2VyJyxcclxuXHRcdFx0XHRkYXRhOiB0aGlzLnVzZXJcclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLiRsb2cubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdBZGRVc2VyQ29udHJvbGxlcicsIGFwcC5BZGRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBNb2RhbERpYWxvZ3VlQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInLCBhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGlzVmlzaWJsZTogJz0nLFxyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHR1c2VyOiAnPScsXHJcblx0XHRcdHVzZXJJZDogJz0nLFxyXG5cdFx0XHRoaWRlTW9kYWw6ICcmJyxcclxuXHRcdFx0dXBkYXRlRGF0YTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSAndGVtcGxhdGVzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIG15RmFjdG9yeTogYXBwLnNlcnZpY2VzLk15RmFjdG9yeSkge31cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiggKCkgPT4gbmV3IE1vZGFsRGlhbG9ndWUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdtb2RhbERpYWxvZ3VlJywgYXBwLk1vZGFsRGlhbG9ndWUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBUElTZXJ2aWNlIHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cdFx0aHR0cFNlcnZpY2U6IG5nLklIdHRwU2VydmljZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UpIHtcclxuXHRcdFx0dGhpcy5odHRwU2VydmljZSA9ICRodHRwO1xyXG5cdFx0fVxyXG5cclxuICAgICAgICBnZXRDYWxsKHBhcmFtczogYW55KSB7XHJcblx0XHRcdGxldCBjb25maWcgPSBwYXJhbXMuY29uZmlnIHx8IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQocGFyYW1zLnVybCwgcGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvc3RDYWxsKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QocGFyYW1zLnVybCwgcGFyYW1zLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSBcclxuc2VydmljZXMuc2VydmljZSgnQVBJU2VydmljZScsIGFwcC5BUElTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAgICAgYnJvYWRjYXN0RXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoZXZlbnROYW1lLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ1NoYXJlZFNlcnZpY2UnLCBhcHAuU2hhcmVkU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2pxdWVyeS9qcXVlcnkuZC50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXItcm91dGUuZC50c1wiIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FwcC50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J21vZHVsZXMudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb25zdGFudHMudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdpbnRlcmZhY2VzL2FwcENvbmZpZy5pbnRlcmZhY2UudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb25maWcudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdyb3V0ZS1oYW5kbGVyLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250cm9sbGVycy91c2Vyc0xpc3QuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRyb2xsZXJzL2FkZFVzZXIuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRyb2xsZXJzL21vZGFsRGlhbG9ndWUuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RpcmVjdGl2ZXMvbW9kYWxEaWFsb2d1ZS5kaXJlY3RpdmUudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzZXJ2aWNlcy9hcGkuc2VydmljZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzJyAvPlxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdGV4cG9ydCB2YXIgZm9ybUFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmb3JtQXBwJywgWyduZ1JvdXRlJywgJ2NvbnRyb2xsZXJzJywgJ3NlcnZpY2VzJywgJ2RpcmVjdGl2ZXMnXSk7XHJcblxyXG5cdGZvcm1BcHAuY29uZmlnKENvbmZpZyk7XHJcbiAgICBmb3JtQXBwLnJ1bihbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ1NoYXJlZFNlcnZpY2UnLCBSb3V0ZUhhbmRsZXJdKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
