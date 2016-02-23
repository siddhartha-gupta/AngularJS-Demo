/// <reference path='../_all.ts' />
var services = angular.module('services', []);
var controllers = angular.module('controllers', []);
var directives = angular.module('directives', []);


/// <reference path='../_all.ts' />
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
                    templateUrl: '../templates/'
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


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var RouteHandler = (function () {
        function RouteHandler($rootScope, //ng.IRootScopeService,
            $location, sharedService) {
            $rootScope.Utils = {
                keys: Object.keys
            };
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


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UsersListInterface = (function () {
        function UsersListInterface() {
        }
        UsersListInterface.prototype.getUsers = function () { };
        UsersListInterface.prototype.processServerData = function (data) { };
        UsersListInterface.prototype.addUser = function () { };
        UsersListInterface.prototype.deleteUserClick = function (event, key) { };
        UsersListInterface.prototype.editUserClick = function (event, key) { };
        UsersListInterface.prototype.clone = function (obj) { };
        UsersListInterface.prototype.updateUserData = function (data, userId) { };
        UsersListInterface.prototype.hideEditPopup = function (event) { };
        UsersListInterface.prototype.dataAvailable = function () { };
        return UsersListInterface;
    })();
    app.UsersListInterface = UsersListInterface;
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var AddUserInterface = (function () {
        function AddUserInterface() {
        }
        AddUserInterface.prototype.validateEmail = function (val) { };
        AddUserInterface.prototype.addUser = function () { };
        return AddUserInterface;
    })();
    app.AddUserInterface = AddUserInterface;
})(app || (app = {}));
controllers.controller('AddUserController', app.AddUserController);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../_all.ts' />
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
                'clickFunc': '',
                'text': ''
            };
            this.headerRightBtn = {
                'showBtn': false,
                'clickFunc': '',
                'text': ''
            };
        }
        HeaderController.prototype.onRouteChangeStart = function (event, params) {
            this.$log.log('onRouteChangeStart: ', params);
        };
        HeaderController.prototype.onRouteChangeSuccess = function (event, params) {
            this.$log.log('onRouteChangeSuccess: ', params);
            if (params.next && params.next.$$route && params.next.$$route.controller) {
                switch (params.next.$$route.controller) {
                    case 'UsersListController':
                        this.setUserListHeader();
                        break;
                    case 'AddUserController':
                        this.setAddUserHeader();
                        break;
                }
            }
            else {
                this.setUserListHeader();
            }
        };
        HeaderController.prototype.onRouteChangeError = function (event, params) {
            this.$log.log('onRouteChangeError: ', params);
        };
        HeaderController.prototype.setUserListHeader = function () {
            this.headerLeftBtn = {
                'showBtn': false,
                'clickFunc': '',
                'text': ''
            };
            this.headerRightBtn = {
                'showBtn': true,
                'clickFunc': 'goToAddUser',
                'text': 'New user'
            };
        };
        HeaderController.prototype.setAddUserHeader = function () {
            this.headerLeftBtn = {
                'showBtn': true,
                'clickFunc': 'goBack',
                'text': 'Back'
            };
            this.headerRightBtn = {
                'showBtn': false,
                'clickFunc': '',
                'text': ''
            };
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


/// <reference path='../../_all.ts' />
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
            this.usersList = {};
            this.editUserDefault();
            this.modalDialogueDefault();
        }
        UsersListController.prototype.dataAvailable = function () {
            if (Object.keys(this.usersList).length > 0) {
                return true;
            }
            return false;
        };
        UsersListController.prototype.getUsers = function () {
            var _this = this;
            this.apiService.getCall({
                'url': this.appConfig.serverUrl + 'getuserslist'
            }).success(function (data, status) {
                _this.processServerData(data);
            }).error(function (data, status) {
                _this.$log.log('err');
            });
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
        /*
        * Edit user code flow
        */
        UsersListController.prototype.editUserClick = function (event, key) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            console.log('key: ', key);
            this.editUser = {
                isVisible: true,
                title: 'Edit details',
                user: this.clone(this.usersList[key]),
                userId: key
            };
            console.log(this.editUser);
        };
        UsersListController.prototype.clone = function (obj) {
            if (obj == null || typeof (obj) != 'object')
                return obj;
            var temp = new obj.constructor();
            for (var key in obj)
                temp[key] = this.clone(obj[key]);
            return temp;
        };
        UsersListController.prototype.updateUserData = function (data, userId) {
            var _this = this;
            console.log('updateUserData: ', data, userId);
            this.hideEditPopup();
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'updateuser',
                data: {
                    'key': userId,
                    'userData': data
                }
            }).success(function (response) {
                _this.$log.log('updateUserData success: ', response);
                _this.getUsers();
            }).error(function (response) {
                _this.$log.log('updateUserData error: ', response);
            });
        };
        UsersListController.prototype.hideEditPopup = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.editUserDefault();
        };
        UsersListController.prototype.editUserDefault = function () {
            this.editUser = {
                isVisible: false,
                title: '',
                user: {},
                userId: ''
            };
        };
        /*
        * Delete user codeflow
        */
        UsersListController.prototype.deleteUserClick = function (event, key) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            console.log('key: ', key);
            this.modalDialogue = {
                isVisible: true,
                title: 'Delete user?',
                body: 'Please confirm, you want to delete the user',
                btn1Txt: 'Ok',
                btn2Txt: 'Cancel',
                showBtn2: true,
                btn1Callback: this.deleteUserConfirm.bind(this, key),
                btn2Callback: this.hideModalDialogue.bind(this),
                closeBtnCallback: this.hideModalDialogue.bind(this),
            };
        };
        UsersListController.prototype.deleteUserConfirm = function (key) {
            var _this = this;
            console.log('deleteUserConfirm, key: ', key);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteuser',
                data: {
                    'key': key
                }
            }).success(function (response) {
                _this.$log.log('success: ', response);
                _this.modalDialogueDefault();
                _this.getUsers();
            }).error(function (response) {
                _this.$log.log('error: ', response);
            });
        };
        UsersListController.prototype.hideModalDialogue = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.modalDialogueDefault();
        };
        UsersListController.prototype.modalDialogueDefault = function () {
            this.modalDialogue = {
                isVisible: false,
                title: '',
                body: '',
                btn1Txt: '',
                btn2Txt: '',
                showBtn2: false,
                btn1Callback: function () { },
                btn2Callback: function () { },
                closeBtnCallback: function () { },
            };
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


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var AddUserController = (function () {
        function AddUserController($scope, $location, $log, apiService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.apiService = apiService;
            $scope.$on('add-user', function (event, args) {
                this.addUser();
            });
            this.appConfig = app.Constants.Default;
            this.validEmail = false;
            this.userdata = {
                'firstname': '',
                'lastname': '',
                'email': '',
                'phonenumber': '',
                'location': 'IN'
            };
        }
        AddUserController.prototype.validateEmail = function (val) {
            var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
            if (val && emailRegexp.test(val)) {
                this.validEmail = true;
            }
            else {
                this.validEmail = false;
            }
        };
        AddUserController.prototype.validateForm = function () {
        };
        AddUserController.prototype.addUser = function () {
            var _this = this;
            this.$log.log('add user: ', this.userdata);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'adduser',
                data: this.userdata
            }).success(function (response) {
                _this.$log.log('success: ', response);
                _this.$location.path('/userslist').replace();
            }).error(function (response) {
                _this.$log.log('error: ', response);
            });
        };
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


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var EditUserController = (function () {
        function EditUserController() {
        }
        return EditUserController;
    })();
    app.EditUserController = EditUserController;
})(app || (app = {}));
controllers.controller('EditUserController', app.EditUserController);


/// <reference path='../../../_all.ts' />
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


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var EditUserDirective = (function () {
        function EditUserDirective() {
            this.restrict = 'E';
            this.scope = {
                isVisible: '=',
                title: '=',
                user: '=',
                userId: '=',
                hidePopup: '&',
                updateData: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/edit-user.directive.html';
            this.controller = 'EditUserController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        EditUserDirective.factory = function () {
            return (function () { return new EditUserDirective(); });
        };
        return EditUserDirective;
    })();
    app.EditUserDirective = EditUserDirective;
})(app || (app = {}));
directives.directive('editUser', app.EditUserDirective.factory());


/// <reference path='../../_all.ts' />
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


/// <reference path='../../_all.ts' />
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
/// <reference path='ts/modules.ts' />
/// <reference path='ts/constants.ts' />
/// <reference path='ts/config.ts' />
/// <reference path='ts/route-handler.ts' />
/// <reference path='ts/interfaces/user-list.interface.ts' />
/// <reference path='ts/interfaces/add-user.interface.ts' />
/// <reference path='ts/interfaces/app-config.interface.ts' />
/// <reference path='ts/interfaces/user-data.interface.ts' />
/// <reference path='ts/interfaces/header.interface.ts' />
/// <reference path='ts/interfaces/edit-user.interface.ts' />
/// <reference path='ts/interfaces/modal-dialogue.interface.ts' />
/// <reference path='ts/controllers/header.controller.ts' />
/// <reference path='ts/controllers/users-list.controller.ts' />
/// <reference path='ts/controllers/add-user.controller.ts' />
/// <reference path='ts/controllers/directives/edit-user.controller.ts' />
/// <reference path='ts/controllers/directives/modal-dialogue.controller.ts' />
/// <reference path='ts/directives/edit-user.directive.ts' />
/// <reference path='ts/services/api.service.ts' />
/// <reference path='ts/services/shared.service.ts' />


/// <reference path='_all.ts' />
var app;
(function (app) {
    app.formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services', 'directives']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', 'SharedService', app.RouteHandler]);
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var ModalDialogueDirective = (function () {
        function ModalDialogueDirective() {
            this.restrict = 'E';
            this.scope = {
                isVisible: '=',
                title: '=',
                body: '=',
                btn1Txt: '=',
                btn2Txt: '=',
                showBtn2: '=',
                btn1Callback: '&',
                btn2Callback: '&',
                closeBtnCallback: '&',
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/modal-dialogue.directive.html';
            this.controller = 'ModalDialogueController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        ModalDialogueDirective.factory = function () {
            return (function () { return new ModalDialogueDirective(); });
        };
        return ModalDialogueDirective;
    })();
    app.ModalDialogueDirective = ModalDialogueDirective;
})(app || (app = {}));
directives.directive('modalDialogue', app.ModalDialogueDirective.factory());



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9hcHAtY29uZmlnLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvaGVhZGVyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZWRpdC11c2VyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvbW9kYWwtZGlhbG9ndWUuaW50ZXJmYWNlLnRzIiwidHMvY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy91c2Vycy1saXN0LmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuY29udHJvbGxlci50cyIsInRzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS50cyIsInRzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIiwidHMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOlsiYXBwIiwiYXBwLkNvbnN0YW50cyIsImFwcC5Db25zdGFudHMuY29uc3RydWN0b3IiLCJhcHAuQ29uc3RhbnRzLkRlZmF1bHQiLCJhcHAuQ29uZmlnIiwiYXBwLkNvbmZpZy5jb25zdHJ1Y3RvciIsImFwcC5Sb3V0ZUhhbmRsZXIiLCJhcHAuUm91dGVIYW5kbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJzTGlzdEludGVyZmFjZSIsImFwcC5Vc2Vyc0xpc3RJbnRlcmZhY2UuY29uc3RydWN0b3IiLCJhcHAuVXNlcnNMaXN0SW50ZXJmYWNlLmdldFVzZXJzIiwiYXBwLlVzZXJzTGlzdEludGVyZmFjZS5wcm9jZXNzU2VydmVyRGF0YSIsImFwcC5Vc2Vyc0xpc3RJbnRlcmZhY2UuYWRkVXNlciIsImFwcC5Vc2Vyc0xpc3RJbnRlcmZhY2UuZGVsZXRlVXNlckNsaWNrIiwiYXBwLlVzZXJzTGlzdEludGVyZmFjZS5lZGl0VXNlckNsaWNrIiwiYXBwLlVzZXJzTGlzdEludGVyZmFjZS5jbG9uZSIsImFwcC5Vc2Vyc0xpc3RJbnRlcmZhY2UudXBkYXRlVXNlckRhdGEiLCJhcHAuVXNlcnNMaXN0SW50ZXJmYWNlLmhpZGVFZGl0UG9wdXAiLCJhcHAuVXNlcnNMaXN0SW50ZXJmYWNlLmRhdGFBdmFpbGFibGUiLCJhcHAuQWRkVXNlckludGVyZmFjZSIsImFwcC5BZGRVc2VySW50ZXJmYWNlLmNvbnN0cnVjdG9yIiwiYXBwLkFkZFVzZXJJbnRlcmZhY2UudmFsaWRhdGVFbWFpbCIsImFwcC5BZGRVc2VySW50ZXJmYWNlLmFkZFVzZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZVN0YXJ0IiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZVN1Y2Nlc3MiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlRXJyb3IiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5zZXRVc2VyTGlzdEhlYWRlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLnNldEFkZFVzZXJIZWFkZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5jYWxsRnVuY3Rpb24iLCJhcHAuSGVhZGVyQ29udHJvbGxlci5hZGRVc2VyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuZ29CYWNrIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmRhdGFBdmFpbGFibGUiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5nZXRVc2VycyIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnByb2Nlc3NTZXJ2ZXJEYXRhIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmVkaXRVc2VyQ2xpY2siLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5jbG9uZSIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnVwZGF0ZVVzZXJEYXRhIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuaGlkZUVkaXRQb3B1cCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmVkaXRVc2VyRGVmYXVsdCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmRlbGV0ZVVzZXJDbGljayIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmRlbGV0ZVVzZXJDb25maXJtIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuaGlkZU1vZGFsRGlhbG9ndWUiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5tb2RhbERpYWxvZ3VlRGVmYXVsdCIsImFwcC5BZGRVc2VyQ29udHJvbGxlciIsImFwcC5BZGRVc2VyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5BZGRVc2VyQ29udHJvbGxlci52YWxpZGF0ZUVtYWlsIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLnZhbGlkYXRlRm9ybSIsImFwcC5BZGRVc2VyQ29udHJvbGxlci5hZGRVc2VyIiwiYXBwLkVkaXRVc2VyQ29udHJvbGxlciIsImFwcC5FZGl0VXNlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIiLCJhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5BUElTZXJ2aWNlIiwiYXBwLkFQSVNlcnZpY2UuY29uc3RydWN0b3IiLCJhcHAuQVBJU2VydmljZS5nZXRDYWxsIiwiYXBwLkFQSVNlcnZpY2UucG9zdENhbGwiLCJhcHAuU2hhcmVkU2VydmljZSIsImFwcC5TaGFyZWRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUiLCJhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5Nb2RhbERpYWxvZ3VlRGlyZWN0aXZlLmZhY3RvcnkiXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FDSmxELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FXVDtBQVhELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7SUFFWkE7UUFBQUM7UUFPQUMsQ0FBQ0E7UUFOQUQsc0JBQVdBLG9CQUFPQTtpQkFBbEJBO2dCQUNDRSxNQUFNQSxDQUFDQTtvQkFDTkEsU0FBU0EsRUFBRUEsd0JBQXdCQTtvQkFDbkNBLFdBQVdBLEVBQUVBLGVBQWVBO2lCQUM1QkE7WUFDRkEsQ0FBQ0E7OztXQUFBRjtRQUNGQSxnQkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQUQ7SUFQWUEsYUFBU0EsWUFPckJBO0FBQ0ZBLENBQUNBLEVBWE0sR0FB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QUFzQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxudmFyIHNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ3NlcnZpY2VzJywgW10pO1xyXG52YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnY29udHJvbGxlcnMnLCBbXSk7XHJcbnZhciBkaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2RpcmVjdGl2ZXMnLCBbXSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcblx0XHRzdGF0aWMgZ2V0IERlZmF1bHQoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy8nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgICAgICAgJyRyb3V0ZVByb3ZpZGVyJ1xyXG4gICAgICAgIF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoJHJvdXRlUHJvdmlkZXI6IG5nLnJvdXRlLklSb3V0ZVByb3ZpZGVyKSB7XHJcblx0XHRcdCRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvdXNlcnNsaXN0XCIsIHtcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ3VzZXJzTGlzdC5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnVXNlcnNMaXN0Q29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcidcclxuXHRcdFx0fSkud2hlbignL2FkZFVzZXInLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ0FkZFVzZXJDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2FkZFVzZXIuaHRtbCdcclxuXHRcdFx0fSkub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy91c2Vyc2xpc3QnIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBSb3V0ZUhhbmRsZXIge1xyXG5cdFx0c3RhdGljIGluamVjdCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnc2hhcmVkU2VydmljZSddO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBhbnksIC8vbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcblx0XHRcdCRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0c2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRyb290U2NvcGUuVXRpbHMgPSB7XHJcblx0XHRcdFx0a2V5czogT2JqZWN0LmtleXNcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN0YXJ0Jywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZUVycm9yJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblxyXG5cdFx0Z2V0VXNlcnMoKSB7IH1cclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSkgeyB9XHJcblx0XHRhZGRVc2VyKCkgeyB9XHJcblx0XHRkZWxldGVVc2VyQ2xpY2soZXZlbnQ6IEV2ZW50LCBrZXk6IHN0cmluZykgeyB9XHJcblx0XHRlZGl0VXNlckNsaWNrKGV2ZW50OiBFdmVudCwga2V5OiBzdHJpbmcpIHsgfVxyXG5cdFx0Y2xvbmUob2JqOiBhbnkpIHsgfVxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogYW55LCB1c2VySWQ6IHN0cmluZykgeyB9XHJcblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpIHsgfVxyXG5cdFx0ZGF0YUF2YWlsYWJsZSgpIHsgfVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQWRkVXNlckludGVyZmFjZSB7XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykgeyB9XHJcblxyXG5cdFx0YWRkVXNlcigpIHsgfVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdBZGRVc2VyQ29udHJvbGxlcicsIGFwcC5BZGRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBhcHBDb25maWdJbnRlcmZhY2Uge1xyXG5cdFx0c2VydmVyVXJsOiBzdHJpbmc7XHJcblx0XHR0ZW1wbGF0ZVVybDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckRhdGFJbnRlcmZhY2Uge1xyXG5cdFx0J2ZpcnN0bmFtZSc6IHN0cmluZztcclxuXHRcdCdsYXN0bmFtZSc6IHN0cmluZztcclxuXHRcdCdlbWFpbCc6IHN0cmluZztcclxuXHRcdCdwaG9uZW51bWJlcic6IHN0cmluZztcclxuXHRcdCdsb2NhdGlvbic6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEJ1dHRvbnNJbnRlcmZhY2Uge1xyXG5cdFx0J3Nob3dCdG4nOiBCb29sZWFuLFxyXG5cdFx0J2NsaWNrRnVuYyc6IHN0cmluZyxcclxuXHRcdCd0ZXh0Jzogc3RyaW5nXHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBFZGl0VXNlckludGVyZmFjZSB7XHJcblx0XHRpc1Zpc2libGU6IEJvb2xlYW47XHJcblx0XHR0aXRsZTogc3RyaW5nO1xyXG5cdFx0dXNlcjogYW55O1xyXG5cdFx0dXNlcklkOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbixcclxuXHRcdHRpdGxlOiBzdHJpbmcsXHJcblx0XHRib2R5OiBzdHJpbmcsXHJcblx0XHRidG4xVHh0OiBzdHJpbmcsXHJcblx0XHRidG4yVHh0Pzogc3RyaW5nLFxyXG5cdFx0c2hvd0J0bjI6IEJvb2xlYW4sXHJcblx0XHRidG4xQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHRcdGJ0bjJDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0Y2xvc2VCdG5DYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBIZWFkZXJDb250cm9sbGVyIHtcclxuXHRcdGhlYWRpbmc6IHN0cmluZztcclxuXHRcdGhlYWRlckxlZnRCdG46IEJ1dHRvbnNJbnRlcmZhY2U7XHJcblx0XHRoZWFkZXJSaWdodEJ0bjogQnV0dG9uc0ludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0JyR3aW5kb3cnLFxyXG5cdFx0XHQnJGxvZycsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN0YXJ0XCIsIHRoaXMub25Sb3V0ZUNoYW5nZVN0YXJ0LmJpbmQodGhpcykpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdWNjZXNzXCIsIHRoaXMub25Sb3V0ZUNoYW5nZVN1Y2Nlc3MuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIHRoaXMub25Sb3V0ZUNoYW5nZUVycm9yLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkaW5nID0gJ1VzZXIgbWFuYWdlbWVudCc7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdGFydChldmVudDogRXZlbnQsIHBhcmFtczogT2JqZWN0KSB7XHJcblx0XHRcdHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VTdGFydDogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlU3VjY2VzcyhldmVudDogRXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VTdWNjZXNzOiAnLCBwYXJhbXMpO1xyXG5cclxuXHRcdFx0aWYgKHBhcmFtcy5uZXh0ICYmIHBhcmFtcy5uZXh0LiQkcm91dGUgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZS5jb250cm9sbGVyKSB7XHJcblx0XHRcdFx0c3dpdGNoIChwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ1VzZXJzTGlzdENvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldFVzZXJMaXN0SGVhZGVyKCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdGNhc2UgJ0FkZFVzZXJDb250cm9sbGVyJzpcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRBZGRVc2VySGVhZGVyKCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldFVzZXJMaXN0SGVhZGVyKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlRXJyb3IoZXZlbnQsIHBhcmFtcykge1xyXG5cdFx0XHR0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlRXJyb3I6ICcsIHBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VXNlckxpc3RIZWFkZXIoKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvVG9BZGRVc2VyJyxcclxuXHRcdFx0XHQndGV4dCc6ICdOZXcgdXNlcidcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRBZGRVc2VySGVhZGVyKCkge1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29CYWNrJyxcclxuXHRcdFx0XHQndGV4dCc6ICdCYWNrJ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpc1tjbGlja0Z1bmNdKSkge1xyXG5cdFx0XHRcdHRoaXNbY2xpY2tGdW5jXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z29Ub0FkZFVzZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyXCIpKS5zY29wZSgpXHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnYWRkLXVzZXInLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z29CYWNrKCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgYXBwLkhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlcnNMaXN0Q29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHVzZXJzTGlzdDogT2JqZWN0O1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgZWRpdFVzZXI6IEVkaXRVc2VySW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJGxvZycsXHJcblx0XHRcdCdBUElTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblxyXG5cdFx0XHR0aGlzLnVzZXJzTGlzdCA9IHt9O1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0YUF2YWlsYWJsZSgpIHtcclxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMudXNlcnNMaXN0KS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0VXNlcnMoKSB7XHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5nZXRDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2dldHVzZXJzbGlzdCdcclxuXHRcdFx0fSkuc3VjY2VzcygoZGF0YSwgc3RhdHVzKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5wcm9jZXNzU2VydmVyRGF0YShkYXRhKVxyXG5cdFx0XHR9KS5lcnJvcigoZGF0YSwgc3RhdHVzKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygnZXJyJylcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KSB7XHJcblx0XHRcdHRoaXMuJGxvZy5sb2coJ3Byb2Nlc3NTZXJ2ZXJEYXRhOiAnLCBkYXRhKTtcclxuXHJcblx0XHRcdGlmIChkYXRhICYmIE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLnVzZXJzTGlzdCA9IGRhdGE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSB7fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEVkaXQgdXNlciBjb2RlIGZsb3dcclxuXHRcdCovXHJcblx0XHRlZGl0VXNlckNsaWNrKGV2ZW50OiBFdmVudCwga2V5OiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zb2xlLmxvZygna2V5OiAnLCBrZXkpO1xyXG5cclxuXHRcdFx0dGhpcy5lZGl0VXNlciA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdFZGl0IGRldGFpbHMnLFxyXG5cdFx0XHRcdHVzZXI6IHRoaXMuY2xvbmUodGhpcy51c2Vyc0xpc3Rba2V5XSksXHJcblx0XHRcdFx0dXNlcklkOiBrZXlcclxuXHRcdFx0fTtcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5lZGl0VXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xvbmUob2JqOiBhbnkpIHtcclxuXHRcdFx0aWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZiAob2JqKSAhPSAnb2JqZWN0JylcclxuXHRcdFx0XHRyZXR1cm4gb2JqO1xyXG5cclxuXHRcdFx0dmFyIHRlbXAgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XHJcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopXHJcblx0XHRcdFx0dGVtcFtrZXldID0gdGhpcy5jbG9uZShvYmpba2V5XSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGVtcDtcclxuXHRcdH1cclxuXHJcblx0XHR1cGRhdGVVc2VyRGF0YShkYXRhOiBhbnksIHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd1cGRhdGVVc2VyRGF0YTogJywgZGF0YSwgdXNlcklkKTtcclxuXHRcdFx0dGhpcy5oaWRlRWRpdFBvcHVwKCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAndXBkYXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J2tleSc6IHVzZXJJZCxcclxuXHRcdFx0XHRcdCd1c2VyRGF0YSc6IGRhdGFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygndXBkYXRlVXNlckRhdGEgc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygndXBkYXRlVXNlckRhdGEgZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZUVkaXRQb3B1cChldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0VXNlckRlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0dXNlcjoge30sXHJcblx0XHRcdFx0dXNlcklkOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIERlbGV0ZSB1c2VyIGNvZGVmbG93XHJcblx0XHQqL1xyXG5cdFx0ZGVsZXRlVXNlckNsaWNrKGV2ZW50OiBFdmVudCwga2V5OiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zb2xlLmxvZygna2V5OiAnLCBrZXkpO1xyXG5cclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSB1c2VyPycsXHJcblx0XHRcdFx0Ym9keTogJ1BsZWFzZSBjb25maXJtLCB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHVzZXInLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0c2hvd0J0bjI6IHRydWUsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZVVzZXJDb25maXJtLmJpbmQodGhpcywga2V5KSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVsZXRlVXNlckNvbmZpcm0oa2V5OiBzdHJpbmcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2RlbGV0ZVVzZXJDb25maXJtLCBrZXk6ICcsIGtleSk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZGVsZXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J2tleSc6IGtleVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLiRsb2cubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICcnLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJzTGlzdENvbnRyb2xsZXInLCBhcHAuVXNlcnNMaXN0Q29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBZGRVc2VyQ29udHJvbGxlciBpbXBsZW1lbnRzIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xyXG5cdFx0cHJpdmF0ZSB1c2VyZGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJGxvZycsXHJcblx0XHRcdCdBUElTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRzY29wZS4kb24oJ2FkZC11c2VyJywgZnVuY3Rpb24oZXZlbnQsIGFyZ3MpIHtcclxuXHRcdFx0XHR0aGlzLmFkZFVzZXIoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudXNlcmRhdGEgPSB7XHJcblx0XHRcdFx0J2ZpcnN0bmFtZSc6ICcnLFxyXG5cdFx0XHRcdCdsYXN0bmFtZSc6ICcnLFxyXG5cdFx0XHRcdCdlbWFpbCc6ICcnLFxyXG5cdFx0XHRcdCdwaG9uZW51bWJlcic6ICcnLFxyXG5cdFx0XHRcdCdsb2NhdGlvbic6ICdJTidcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHZhciBlbWFpbFJlZ2V4cCA9IC9eW2EtejAtOSEjJCUmJyorXFwvPT9eX2B7fH1+Li1dK0BbYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPyhcXC5bYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPykqJC9pO1xyXG5cdFx0XHRpZiAodmFsICYmIGVtYWlsUmVnZXhwLnRlc3QodmFsKSkge1xyXG5cdFx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUZvcm0oKSB7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuJGxvZy5sb2coJ2FkZCB1c2VyOiAnLCB0aGlzLnVzZXJkYXRhKTtcclxuXHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdhZGR1c2VyJyxcclxuXHRcdFx0XHRkYXRhOiB0aGlzLnVzZXJkYXRhXHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kbG9nLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuJGxvZy5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdBZGRVc2VyQ29udHJvbGxlcicsIGFwcC5BZGRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBFZGl0VXNlckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0VkaXRVc2VyQ29udHJvbGxlcicsIGFwcC5FZGl0VXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJywgYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0VXNlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdHVzZXI6ICc9JyxcclxuXHRcdFx0dXNlcklkOiAnPScsXHJcblx0XHRcdGhpZGVQb3B1cDogJyYnLFxyXG5cdFx0XHR1cGRhdGVEYXRhOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdFZGl0VXNlckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4oICgpID0+IG5ldyBFZGl0VXNlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2VkaXRVc2VyJywgYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQVBJU2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHRcdGh0dHBTZXJ2aWNlOiBuZy5JSHR0cFNlcnZpY2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKSB7XHJcblx0XHRcdHRoaXMuaHR0cFNlcnZpY2UgPSAkaHR0cDtcclxuXHRcdH1cclxuXHJcbiAgICAgICAgZ2V0Q2FsbChwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRsZXQgY29uZmlnID0gcGFyYW1zLmNvbmZpZyB8fCB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KHBhcmFtcy51cmwsIHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3N0Q2FsbChwYXJhbXM6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KHBhcmFtcy51cmwsIHBhcmFtcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gXHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0FQSVNlcnZpY2UnLCBhcHAuQVBJU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG4gICAgICAgIGJyb2FkY2FzdEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGV2ZW50TmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdTaGFyZWRTZXJ2aWNlJywgYXBwLlNoYXJlZFNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9qcXVlcnkvanF1ZXJ5LmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FwcC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvbW9kdWxlcy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29uc3RhbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25maWcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3JvdXRlLWhhbmRsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3VzZXItbGlzdC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9hcHAtY29uZmlnLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy91c2VyLWRhdGEuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2hlYWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZWRpdC11c2VyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9tb2RhbC1kaWFsb2d1ZS5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvdXNlcnMtbGlzdC5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZS50cycgLz5cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdGV4cG9ydCB2YXIgZm9ybUFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmb3JtQXBwJywgWyduZ1JvdXRlJywgJ2NvbnRyb2xsZXJzJywgJ3NlcnZpY2VzJywgJ2RpcmVjdGl2ZXMnXSk7XHJcblxyXG5cdGZvcm1BcHAuY29uZmlnKENvbmZpZyk7XHJcbiAgICBmb3JtQXBwLnJ1bihbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ1NoYXJlZFNlcnZpY2UnLCBSb3V0ZUhhbmRsZXJdKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdGlzVmlzaWJsZTogJz0nLFxyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRib2R5OiAnPScsXHJcblx0XHRcdGJ0bjFUeHQ6ICc9JyxcclxuXHRcdFx0YnRuMlR4dDogJz0nLFxyXG5cdFx0XHRzaG93QnRuMjogJz0nLFxyXG5cdFx0XHRidG4xQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0YnRuMkNhbGxiYWNrOiAnJicsXHJcblx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6ICcmJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ21vZGFsRGlhbG9ndWUnLCBhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
