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
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
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
            // this.$log.log('onRouteChangeStart: ', params);
        };
        HeaderController.prototype.onRouteChangeSuccess = function (event, params) {
            // this.$log.log('onRouteChangeSuccess: ', params);
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
            // this.$log.log('onRouteChangeError: ', params);
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
                'text': 'Add user'
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
        HeaderController.prototype.goToAddUser = function () {
            // angular.element(document.getElementById("header")).scope()
            this.$location.path('/addUser').replace();
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
        function UsersListController($scope, $location, apiService, utilsService, sharedService) {
            this.$scope = $scope;
            this.$location = $location;
            this.apiService = apiService;
            this.utilsService = utilsService;
            this.sharedService = sharedService;
            this.appConfig = app.Constants.Default;
            this.sortOrder = 'firstname';
            this.getUsers();
            this.usersList = [];
            this.editUserDefault();
            this.modalDialogueDefault();
            this.createtableHeading();
        }
        UsersListController.prototype.createtableHeading = function () {
            this.tableHeading = [{
                    'className': 'col-xs-1',
                    'sortOrder': 'id_member',
                    'text': 'S.No'
                }, {
                    'className': 'col-xs-2',
                    'sortOrder': 'firstname',
                    'text': 'First name'
                }, {
                    'className': 'col-xs-2',
                    'sortOrder': 'lastname',
                    'text': 'Last name'
                }, {
                    'className': 'col-xs-3',
                    'sortOrder': 'email',
                    'text': 'Email'
                }, {
                    'className': 'col-xs-2',
                    'sortOrder': 'phonenumber',
                    'text': 'Phone Number'
                }, {
                    'className': 'col-xs-1',
                    'sortOrder': 'location',
                    'text': 'Location'
                }];
        };
        UsersListController.prototype.dataAvailable = function () {
            if (this.usersList.length > 0) {
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
                _this.utilsService.log('err');
            });
        };
        UsersListController.prototype.processServerData = function (data) {
            this.utilsService.log('processServerData: ', data);
            if (data && data.length > 0) {
                this.usersList = data;
            }
            else {
                this.usersList.length = 0;
            }
        };
        UsersListController.prototype.addUser = function () {
            this.$location.path('/addUser').replace();
        };
        /*
        * Edit user code flow
        */
        UsersListController.prototype.validateEmail = function (val) {
            console.log('validateEmail');
        };
        UsersListController.prototype.editUserClick = function (event, userId) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.utilsService.log('userId: ', userId);
            this.editUser = {
                isVisible: true,
                title: 'Edit details',
                userData: this.utilsService.clone(this.utilsService.getObjectFromArr(this.usersList, 'id_member', userId)),
                userId: userId
            };
            this.sharedService.broadcastEvent('show-edit-modal', { id: 'editUserModal' });
            this.utilsService.log(this.editUser);
        };
        UsersListController.prototype.updateUserData = function (data, userId) {
            var _this = this;
            this.utilsService.log('updateUserData: ', data, userId);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'updateuser',
                data: {
                    'userId': userId,
                    'userData': data
                }
            }).success(function (response) {
                _this.utilsService.log('updateUserData success: ', response);
                _this.hideEditPopup();
                if (response.resp === true) {
                    _this.getUsers();
                }
                else {
                    _this.modalDialogue = {
                        isVisible: true,
                        title: 'Error!',
                        body: 'We have encountered error while updating user information. Please try again',
                        btn1Txt: 'Ok',
                        btn2Txt: '',
                        showBtn2: false,
                        btn1Callback: _this.hideModalDialogue.bind(_this),
                        btn2Callback: function () { },
                        closeBtnCallback: _this.hideModalDialogue.bind(_this),
                    };
                    _this.sharedService.broadcastEvent('show-modal', { id: 'modalDialogue' });
                }
            }).error(function (response) {
                _this.utilsService.log('updateUserData error: ', response);
            });
        };
        UsersListController.prototype.hideEditPopup = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-edit-modal', { id: 'editUserModal' });
            this.editUserDefault();
        };
        UsersListController.prototype.editUserDefault = function () {
            this.editUser = {
                isVisible: false,
                title: '',
                userData: {},
                userId: ''
            };
        };
        /*
        * Delete user codeflow
        */
        UsersListController.prototype.deleteUserClick = function (event, userId) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.utilsService.log('userId: ', userId);
            this.modalDialogue = {
                isVisible: true,
                title: 'Delete user?',
                body: 'Please confirm, you want to delete the user',
                btn1Txt: 'Ok',
                btn2Txt: 'Cancel',
                showBtn2: true,
                btn1Callback: this.deleteUserConfirm.bind(this, userId),
                btn2Callback: this.hideModalDialogue.bind(this),
                closeBtnCallback: this.hideModalDialogue.bind(this),
            };
            this.sharedService.broadcastEvent('show-modal', { id: 'modalDialogue' });
        };
        UsersListController.prototype.deleteUserConfirm = function (userId) {
            var _this = this;
            this.utilsService.log('deleteUserConfirm, userId: ', userId);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteuser',
                data: {
                    'userId': userId
                }
            }).success(function (response) {
                _this.utilsService.log('success: ', response);
                if (response.resp === true) {
                    _this.hideModalDialogue();
                    _this.getUsers();
                }
                else {
                    _this.modalDialogue = {
                        isVisible: true,
                        title: 'Error!',
                        body: 'We have encountered error while deleting user. Please try again',
                        btn1Txt: 'Ok',
                        btn2Txt: '',
                        showBtn2: false,
                        btn1Callback: _this.hideModalDialogue.bind(_this),
                        btn2Callback: function () { },
                        closeBtnCallback: _this.hideModalDialogue.bind(_this),
                    };
                }
            }).error(function (response) {
                _this.utilsService.log('error: ', response);
            });
        };
        UsersListController.prototype.hideModalDialogue = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-modal', { id: 'modalDialogue' });
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
        UsersListController.prototype.manageSortOrder = function (orderBy) {
            if (orderBy === this.sortOrder) {
                this.sortOrder = '-' + orderBy;
            }
            else {
                this.sortOrder = orderBy;
            }
        };
        UsersListController.$inject = [
            '$scope',
            '$location',
            'APIService',
            'UtilsService',
            'SharedService'
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
        function AddUserController($scope, $location, apiService, utilsService, sharedService) {
            this.$scope = $scope;
            this.$location = $location;
            this.apiService = apiService;
            this.utilsService = utilsService;
            this.sharedService = sharedService;
            $scope.$on('add-user', function (event, args) {
                this.addUser();
            });
            this.appConfig = app.Constants.Default;
            this.validEmail = false;
            this.userDataDefault();
            this.modalDialogueDefault();
        }
        AddUserController.prototype.validateEmail = function (val) {
            this.validEmail = this.utilsService.validateEmail(val);
        };
        AddUserController.prototype.validateForm = function () {
            // make null undefined checks here
            if (this.utilsService.isNullUndefined(this.userData.firstname) || this.utilsService.isNullUndefined(this.userData.lastname)) {
                this.showModalDialogue('inValidForm-name');
                return false;
            }
            else if (this.utilsService.isNullUndefined(this.userData.email)) {
                this.showModalDialogue('inValidForm-email');
                return false;
            }
            else if (this.utilsService.isNullUndefined(this.userData.phonenumber)) {
                this.showModalDialogue('inValidForm-phonenumber');
                return false;
            }
            else if (this.utilsService.isNullUndefined(this.userData.location)) {
                this.showModalDialogue('inValidForm-location');
                return false;
            }
            return true;
        };
        AddUserController.prototype.gotoUserList = function () {
            this.$location.path('/userslist').replace();
        };
        AddUserController.prototype.addUser = function () {
            var _this = this;
            this.utilsService.log('add user: ', this.userData);
            if (this.validateForm()) {
                this.apiService.postCall({
                    'url': this.appConfig.serverUrl + 'adduser',
                    data: this.userData
                }).success(function (response) {
                    _this.utilsService.log('success: ', response);
                    if (response && response.resp && response.resp === 'Email already in use') {
                        _this.showModalDialogue('emailInUse');
                    }
                    else {
                        _this.gotoUserList();
                    }
                }).error(function (response) {
                    _this.utilsService.log('error: ', response);
                });
            }
        };
        AddUserController.prototype.userDataDefault = function () {
            this.userData = {
                'firstname': '',
                'lastname': '',
                'email': '',
                'phonenumber': '',
                'location': 'IN'
            };
        };
        AddUserController.prototype.showModalDialogue = function (errorType) {
            var title = '', body = '';
            switch (errorType) {
                case 'emailInUse':
                    title = 'Email already in use';
                    body = 'Email ID is already in use, please enter a unique Email address';
                    break;
                case 'inValidForm-name':
                    title = 'Incomplete form';
                    body = 'Please fill First name/Last name';
                    break;
                case 'inValidForm-email':
                    title = 'Incomplete form';
                    body = 'Please fill the email address';
                    break;
                case 'inValidForm-phonenumber':
                    title = 'Incomplete form';
                    body = 'Please fill phone number';
                    break;
                case 'inValidForm-location':
                    title = 'Incomplete form';
                    body = 'Please select location';
                    break;
            }
            this.sharedService.broadcastEvent('show-modal', { id: 'modalDialogue' });
            this.modalDialogue = {
                isVisible: true,
                title: title,
                body: body,
                btn1Txt: 'Ok',
                btn2Txt: '',
                showBtn2: false,
                btn1Callback: this.hideModalDialogue.bind(this),
                btn2Callback: function () { },
                closeBtnCallback: this.hideModalDialogue.bind(this),
            };
        };
        AddUserController.prototype.hideModalDialogue = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-modal', { id: 'modalDialogue' });
            this.modalDialogueDefault();
        };
        AddUserController.prototype.modalDialogueDefault = function () {
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
        AddUserController.$inject = [
            '$scope',
            '$location',
            'APIService',
            'UtilsService',
            'SharedService'
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


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserFormController = (function () {
        function UserFormController() {
        }
        return UserFormController;
    })();
    app.UserFormController = UserFormController;
})(app || (app = {}));
controllers.controller('UserFormController', app.UserFormController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var TableHeaderController = (function () {
        function TableHeaderController($element) {
            this.$element = $element;
            this.defaultClass = 'arrow arrow-down';
            this.lastSortOrder = '';
        }
        TableHeaderController.prototype.manageSortOrder = function (event, sortOrder) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            var newClass = 'arrow arrow-up';
            if (angular.element(event.target).find('span').hasClass('arrow-up')) {
                newClass = 'arrow arrow-down';
            }
            if (this.lastSortOrder !== sortOrder) {
                angular.element('#heading_' + this.lastSortOrder).find('span').removeClass().addClass(this.defaultClass);
                this.lastSortOrder = sortOrder;
            }
            angular.element(event.target).find('span').removeClass().addClass(newClass);
            this.sortFunc({
                'orderBy': sortOrder
            });
        };
        TableHeaderController.$inject = [
            '$element'
        ];
        return TableHeaderController;
    })();
    app.TableHeaderController = TableHeaderController;
})(app || (app = {}));
controllers.controller('TableHeaderController', app.TableHeaderController);


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
                userData: '=',
                userId: '=',
                hidePopup: '&',
                updateData: '&',
                discardForm: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/edit-user.directive.html';
            this.controller = 'EditUserController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        EditUserDirective.prototype.link = function (scope) {
            scope.$on('show-edit-modal', function (event, params) {
                angular.element(document.getElementById(params.id)).modal('show');
            });
            scope.$on('hide-edit-modal', function (event, params) {
                angular.element(document.getElementById(params.id)).modal('hide');
            });
        };
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
        ModalDialogueDirective.prototype.link = function (scope) {
            scope.$on('show-modal', function (event, params) {
                angular.element(document.getElementById(params.id)).modal('show');
            });
            scope.$on('hide-modal', function (event, params) {
                angular.element(document.getElementById(params.id)).modal('hide');
            });
        };
        ModalDialogueDirective.factory = function () {
            return (function () { return new ModalDialogueDirective(); });
        };
        return ModalDialogueDirective;
    })();
    app.ModalDialogueDirective = ModalDialogueDirective;
})(app || (app = {}));
directives.directive('modalDialogue', app.ModalDialogueDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserFormDirective = (function () {
        function UserFormDirective() {
            this.restrict = 'E';
            this.scope = {
                userData: '=',
                userId: '=',
                editMode: '=',
                validateEmail: '&',
                formSubmit: '&',
                discardForm: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/user-form.directive.html';
            this.controller = 'UserFormController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        UserFormDirective.factory = function () {
            return (function () { return new UserFormDirective(); });
        };
        return UserFormDirective;
    })();
    app.UserFormDirective = UserFormDirective;
})(app || (app = {}));
directives.directive('userForm', app.UserFormDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var TableHeaderDirective = (function () {
        function TableHeaderDirective() {
            this.restrict = 'E';
            this.scope = {
                tableHeading: '=',
                sortFunc: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/table-header.directive.html';
            this.controller = 'TableHeaderController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        TableHeaderDirective.factory = function () {
            return (function () { return new TableHeaderDirective(); });
        };
        return TableHeaderDirective;
    })();
    app.TableHeaderDirective = TableHeaderDirective;
})(app || (app = {}));
directives.directive('tableHeader', app.TableHeaderDirective.factory());


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


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UtilsService = (function () {
        function UtilsService() {
        }
        UtilsService.prototype.getDataType = function (obj) {
            return ({}).toString.call(obj).toLowerCase();
        };
        UtilsService.prototype.isNullUndefined = function (val, validateZeroNaN) {
            var isNull = false, type = this.getDataType(val);
            switch (type) {
                case '[object array]':
                    if (val.length === 0) {
                        isNull = true;
                    }
                    break;
                case '[object object]':
                    if (Object.keys(val).length === 0) {
                        isNull = true;
                    }
                    break;
                default:
                    if (typeof (val) === "undefined" || val === null || val === "" || val === "null" || val === "undefined") {
                        isNull = true;
                    }
                    else if (validateZeroNaN && (val === 0 || isNaN(val))) {
                        isNull = true;
                    }
            }
            return isNull;
        };
        UtilsService.prototype.clone = function (obj) {
            if (obj == null || typeof (obj) != 'object')
                return obj;
            var temp = new obj.constructor();
            for (var key in obj)
                temp[key] = this.clone(obj[key]);
            return temp;
        };
        UtilsService.prototype.validateEmail = function (email) {
            var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
            if (email && emailRegexp.test(email)) {
                return true;
            }
            else {
                return false;
            }
        };
        UtilsService.prototype.getObjectFromArr = function (arr, propName, propValue) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][propName] == propValue)
                    return arr[i];
            }
        };
        UtilsService.prototype.log = function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i - 0] = arguments[_i];
            }
            console.log.apply(console, arguments);
        };
        return UtilsService;
    })();
    app.UtilsService = UtilsService;
})(app || (app = {}));
services.service('UtilsService', app.UtilsService);


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
/// <reference path='ts/controllers/directives/user-form.controller.ts' />
/// <reference path='ts/controllers/directives/table-header.controller.ts' />
/// <reference path='ts/directives/edit-user.directive.ts' />
/// <reference path='ts/directives/modal-dialogue.directive.ts' />
/// <reference path='ts/directives/user-form.directive.ts' />
/// <reference path='ts/directives/table-header.directive.ts' />
/// <reference path='ts/services/api.service.ts' />
/// <reference path='ts/services/shared.service.ts' />
/// <reference path='ts/services/utils.service.ts' />


/// <reference path='_all.ts' />
var app;
(function (app) {
    app.formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services', 'directives']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', 'SharedService', app.RouteHandler]);
})(app || (app = {}));



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9hcHAtY29uZmlnLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvaGVhZGVyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZWRpdC11c2VyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvbW9kYWwtZGlhbG9ndWUuaW50ZXJmYWNlLnRzIiwidHMvY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy91c2Vycy1saXN0LmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5jb250cm9sbGVyLnRzIiwidHMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUudHMiLCJ0cy9zZXJ2aWNlcy9hcGkuc2VydmljZS50cyIsInRzL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvdXRpbHMuc2VydmljZS50cyIsIl9hbGwudHMiLCJhcHAudHMiXSwibmFtZXMiOlsiYXBwIiwiYXBwLkNvbnN0YW50cyIsImFwcC5Db25zdGFudHMuY29uc3RydWN0b3IiLCJhcHAuQ29uc3RhbnRzLkRlZmF1bHQiLCJhcHAuQ29uZmlnIiwiYXBwLkNvbmZpZy5jb25zdHJ1Y3RvciIsImFwcC5Sb3V0ZUhhbmRsZXIiLCJhcHAuUm91dGVIYW5kbGVyLmNvbnN0cnVjdG9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5IZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdGFydCIsImFwcC5IZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdWNjZXNzIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZUVycm9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuc2V0VXNlckxpc3RIZWFkZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5zZXRBZGRVc2VySGVhZGVyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuY2FsbEZ1bmN0aW9uIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuZ29Ub0FkZFVzZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5hZGRVc2VyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuZ29CYWNrIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmNyZWF0ZXRhYmxlSGVhZGluZyIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmRhdGFBdmFpbGFibGUiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5nZXRVc2VycyIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnByb2Nlc3NTZXJ2ZXJEYXRhIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnZhbGlkYXRlRW1haWwiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5lZGl0VXNlckNsaWNrIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIudXBkYXRlVXNlckRhdGEiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5oaWRlRWRpdFBvcHVwIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZWRpdFVzZXJEZWZhdWx0IiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZGVsZXRlVXNlckNsaWNrIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZGVsZXRlVXNlckNvbmZpcm0iLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5oaWRlTW9kYWxEaWFsb2d1ZSIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLm1vZGFsRGlhbG9ndWVEZWZhdWx0IiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIubWFuYWdlU29ydE9yZGVyIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLnZhbGlkYXRlRW1haWwiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIudmFsaWRhdGVGb3JtIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmdvdG9Vc2VyTGlzdCIsImFwcC5BZGRVc2VyQ29udHJvbGxlci5hZGRVc2VyIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLnVzZXJEYXRhRGVmYXVsdCIsImFwcC5BZGRVc2VyQ29udHJvbGxlci5zaG93TW9kYWxEaWFsb2d1ZSIsImFwcC5BZGRVc2VyQ29udHJvbGxlci5oaWRlTW9kYWxEaWFsb2d1ZSIsImFwcC5BZGRVc2VyQ29udHJvbGxlci5tb2RhbERpYWxvZ3VlRGVmYXVsdCIsImFwcC5FZGl0VXNlckNvbnRyb2xsZXIiLCJhcHAuRWRpdFVzZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyIiwiYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJGb3JtQ29udHJvbGxlciIsImFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyIiwiYXBwLlRhYmxlSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5UYWJsZUhlYWRlckNvbnRyb2xsZXIubWFuYWdlU29ydE9yZGVyIiwiYXBwLkVkaXRVc2VyRGlyZWN0aXZlIiwiYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmxpbmsiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5Nb2RhbERpYWxvZ3VlRGlyZWN0aXZlIiwiYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5saW5rIiwiYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5Vc2VyRm9ybURpcmVjdGl2ZSIsImFwcC5Vc2VyRm9ybURpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5Vc2VyRm9ybURpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlIiwiYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuQVBJU2VydmljZSIsImFwcC5BUElTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLkFQSVNlcnZpY2UuZ2V0Q2FsbCIsImFwcC5BUElTZXJ2aWNlLnBvc3RDYWxsIiwiYXBwLlNoYXJlZFNlcnZpY2UiLCJhcHAuU2hhcmVkU2VydmljZS5jb25zdHJ1Y3RvciIsImFwcC5VdGlsc1NlcnZpY2UiLCJhcHAuVXRpbHNTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLlV0aWxzU2VydmljZS5nZXREYXRhVHlwZSIsImFwcC5VdGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkIiwiYXBwLlV0aWxzU2VydmljZS5jbG9uZSIsImFwcC5VdGlsc1NlcnZpY2UudmFsaWRhdGVFbWFpbCIsImFwcC5VdGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFyciIsImFwcC5VdGlsc1NlcnZpY2UubG9nIl0sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7QUFFbkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDOUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7OztBQ0psRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBV1Q7QUFYRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBQUFDO1FBT0FDLENBQUNBO1FBTkFELHNCQUFXQSxvQkFBT0E7aUJBQWxCQTtnQkFDQ0UsTUFBTUEsQ0FBQ0E7b0JBQ05BLFNBQVNBLEVBQUVBLHdCQUF3QkE7b0JBQ25DQSxXQUFXQSxFQUFFQSxlQUFlQTtpQkFDNUJBO1lBQ0ZBLENBQUNBOzs7V0FBQUY7UUFDRkEsZ0JBQUNBO0lBQURBLENBQUNBLElBQUFEO0lBUFlBLGFBQVNBLFlBT3JCQTtBQUNGQSxDQUFDQSxFQVhNLEdBQUcsS0FBSCxHQUFHLFFBV1Q7OztBQ2JELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQUtDSSxnQkFBWUEsY0FBdUNBO1lBQ2xEQyxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQTtnQkFDakNBLFdBQVdBLEVBQUVBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLGdCQUFnQkE7Z0JBQ2pFQSxVQUFVQSxFQUFFQSxxQkFBcUJBO2dCQUNqQ0EsWUFBWUEsRUFBRUEsa0JBQWtCQTthQUNoQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUE7Z0JBQ25CQSxVQUFVQSxFQUFFQSxtQkFBbUJBO2dCQUMvQkEsWUFBWUEsRUFBRUEsa0JBQWtCQTtnQkFDaENBLFdBQVdBLEVBQUVBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLGNBQWNBO2FBQy9EQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxFQUFFQSxVQUFVQSxFQUFFQSxZQUFZQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUM1Q0EsQ0FBQ0E7UUFkYUQsY0FBT0EsR0FBR0E7WUFDZEEsZ0JBQWdCQTtTQUNuQkEsQ0FBQ0E7UUFhVEEsYUFBQ0E7SUFBREEsQ0FBQ0EsSUFBQUo7SUFoQllBLFVBQU1BLFNBZ0JsQkE7QUFDRkEsQ0FBQ0EsRUFwQk0sR0FBRyxLQUFILEdBQUcsUUFvQlQ7OztBQ3RCRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBcUNUO0FBckNELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7SUFFWkE7UUFHQ00sc0JBQ1VBLFVBQWVBLEVBQUVBLHVCQUF1QkE7WUFDakRBLFNBQThCQSxFQUM5QkEsYUFBNEJBO1lBRTVCQyxVQUFVQSxDQUFDQSxLQUFLQSxHQUFHQTtnQkFDbEJBLElBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBO2FBQ2pCQSxDQUFDQTtZQUVGQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxtQkFBbUJBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BO2dCQUNoRSxhQUFhLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO29CQUNoRCxJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsT0FBTztpQkFDaEIsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxxQkFBcUJBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BO2dCQUNsRSxhQUFhLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFO29CQUNsRCxJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsT0FBTztpQkFDaEIsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxtQkFBbUJBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BO2dCQUNoRSxhQUFhLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO29CQUNoRCxJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsT0FBTztpQkFDaEIsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQS9CTUQsbUJBQU1BLEdBQUdBLENBQUNBLFlBQVlBLEVBQUVBLFdBQVdBLEVBQUVBLGVBQWVBLENBQUNBLENBQUNBO1FBZ0M5REEsbUJBQUNBO0lBQURBLENBQUNBLElBQUFOO0lBakNZQSxnQkFBWUEsZUFpQ3hCQTtBQUNGQSxDQUFDQSxFQXJDTSxHQUFHLEtBQUgsR0FBRyxRQXFDVDs7O0FDdkNELHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FnQlQ7QUFoQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQSxDQUFDQTtBQWVkQSxDQUFDQSxFQWhCTSxHQUFHLEtBQUgsR0FBRyxRQWdCVDs7O0FDbEJELHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FZVDtBQVpELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7QUFXZEEsQ0FBQ0EsRUFaTSxHQUFHLEtBQUgsR0FBRyxRQVlUO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7O0FDZm5FLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FPVDtBQVBELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7QUFNYkEsQ0FBQ0EsRUFQTSxHQUFHLEtBQUgsR0FBRyxRQU9UOzs7QUNURCxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBVVQ7QUFWRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0FBU2JBLENBQUNBLEVBVk0sR0FBRyxLQUFILEdBQUcsUUFVVDs7O0FDWkQsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQW9CVDtBQXBCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0FBbUJiQSxDQUFDQSxFQXBCTSxHQUFHLEtBQUgsR0FBRyxRQW9CVDs7O0FDdEJELHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FTVDtBQVRELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7QUFRYkEsQ0FBQ0EsRUFUTSxHQUFHLEtBQUgsR0FBRyxRQVNUOzs7QUNYRCxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBY1Q7QUFkRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0FBYWJBLENBQUNBLEVBZE0sR0FBRyxLQUFILEdBQUcsUUFjVDs7O0FDaEJELHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FvSFQ7QUFwSEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQWFDUSwwQkFDU0EsTUFBaUJBLEVBQ2pCQSxTQUE4QkEsRUFDOUJBLE9BQTBCQSxFQUMxQkEsSUFBb0JBLEVBQ3BCQSxhQUE0QkE7WUFKNUJDLFdBQU1BLEdBQU5BLE1BQU1BLENBQVdBO1lBQ2pCQSxjQUFTQSxHQUFUQSxTQUFTQSxDQUFxQkE7WUFDOUJBLFlBQU9BLEdBQVBBLE9BQU9BLENBQW1CQTtZQUMxQkEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBZ0JBO1lBQ3BCQSxrQkFBYUEsR0FBYkEsYUFBYUEsQ0FBZUE7WUFFcENBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLGtCQUFrQkEsRUFBRUEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuRUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3ZFQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLEVBQUVBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbkVBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLGlCQUFpQkEsQ0FBQ0E7WUFDakNBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBO2dCQUNwQkEsU0FBU0EsRUFBRUEsS0FBS0E7Z0JBQ2hCQSxXQUFXQSxFQUFFQSxFQUFFQTtnQkFDZkEsTUFBTUEsRUFBRUEsRUFBRUE7YUFDVkEsQ0FBQ0E7WUFDRkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0E7Z0JBQ3JCQSxTQUFTQSxFQUFFQSxLQUFLQTtnQkFDaEJBLFdBQVdBLEVBQUVBLEVBQUVBO2dCQUNmQSxNQUFNQSxFQUFFQSxFQUFFQTthQUNWQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVERCw2Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBWUEsRUFBRUEsTUFBY0E7WUFDOUNFLGlEQUFpREE7UUFDbERBLENBQUNBO1FBRURGLCtDQUFvQkEsR0FBcEJBLFVBQXFCQSxLQUFZQSxFQUFFQSxNQUFXQTtZQUM3Q0csbURBQW1EQTtZQUVuREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFFQSxNQUFNQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeENBLEtBQUtBLHFCQUFxQkE7d0JBQ3pCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO3dCQUN6QkEsS0FBS0EsQ0FBQ0E7b0JBRVBBLEtBQUtBLG1CQUFtQkE7d0JBQ3ZCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBO3dCQUN4QkEsS0FBS0EsQ0FBQ0E7Z0JBQ1JBLENBQUNBO1lBQ0ZBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1lBQzFCQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVESCw2Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBS0EsRUFBRUEsTUFBTUE7WUFDL0JJLGlEQUFpREE7UUFDbERBLENBQUNBO1FBRURKLDRDQUFpQkEsR0FBakJBO1lBQ0NLLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBO2dCQUNwQkEsU0FBU0EsRUFBRUEsS0FBS0E7Z0JBQ2hCQSxXQUFXQSxFQUFFQSxFQUFFQTtnQkFDZkEsTUFBTUEsRUFBRUEsRUFBRUE7YUFDVkEsQ0FBQ0E7WUFFRkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0E7Z0JBQ3JCQSxTQUFTQSxFQUFFQSxJQUFJQTtnQkFDZkEsV0FBV0EsRUFBRUEsYUFBYUE7Z0JBQzFCQSxNQUFNQSxFQUFFQSxVQUFVQTthQUNsQkEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFFREwsMkNBQWdCQSxHQUFoQkE7WUFDQ00sSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7Z0JBQ3BCQSxTQUFTQSxFQUFFQSxJQUFJQTtnQkFDZkEsV0FBV0EsRUFBRUEsUUFBUUE7Z0JBQ3JCQSxNQUFNQSxFQUFFQSxNQUFNQTthQUNkQSxDQUFDQTtZQUVGQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQTtnQkFDckJBLFNBQVNBLEVBQUVBLEtBQUtBO2dCQUNoQkEsV0FBV0EsRUFBRUEsRUFBRUE7Z0JBQ2ZBLE1BQU1BLEVBQUVBLEVBQUVBO2FBQ1ZBLENBQUNBO1FBQ0hBLENBQUNBO1FBRUROLHVDQUFZQSxHQUFaQSxVQUFhQSxLQUFZQSxFQUFFQSxTQUFpQkE7WUFDM0NPLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBRXZCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLENBQUNBO1lBQ25CQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEUCxzQ0FBV0EsR0FBWEE7WUFDQ1EsNkRBQTZEQTtZQUM3REEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDM0NBLENBQUNBO1FBRURSLGtDQUFPQSxHQUFQQTtZQUNDUyxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNuREEsQ0FBQ0E7UUFFRFQsaUNBQU1BLEdBQU5BO1lBQ0NVLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUM3Q0EsQ0FBQ0E7UUExR2FWLHdCQUFPQSxHQUFHQTtZQUN2QkEsUUFBUUE7WUFDUkEsV0FBV0E7WUFDWEEsU0FBU0E7WUFDVEEsTUFBTUE7WUFDTkEsZUFBZUE7U0FDZkEsQ0FBQ0E7UUFxR0hBLHVCQUFDQTtJQUFEQSxDQUFDQSxJQUFBUjtJQWhIWUEsb0JBQWdCQSxtQkFnSDVCQTtBQUNGQSxDQUFDQSxFQXBITSxHQUFHLEtBQUgsR0FBRyxRQW9IVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7OztBQ3ZIakUsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQW9RVDtBQXBRRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBLENBQUNBO0lBRWJBO1FBaUJDbUIsNkJBQ1NBLE1BQWlCQSxFQUNqQkEsU0FBOEJBLEVBQzlCQSxVQUFzQkEsRUFDdEJBLFlBQTBCQSxFQUMxQkEsYUFBNEJBO1lBSjVCQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFXQTtZQUNqQkEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBcUJBO1lBQzlCQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFZQTtZQUN0QkEsaUJBQVlBLEdBQVpBLFlBQVlBLENBQWNBO1lBQzFCQSxrQkFBYUEsR0FBYkEsYUFBYUEsQ0FBZUE7WUFFcENBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBO1lBQ3ZDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxXQUFXQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7WUFFaEJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ3BCQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7UUFFREQsZ0RBQWtCQSxHQUFsQkE7WUFDQ0UsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0E7b0JBQ3BCQSxXQUFXQSxFQUFFQSxVQUFVQTtvQkFDdkJBLFdBQVdBLEVBQUVBLFdBQVdBO29CQUN4QkEsTUFBTUEsRUFBRUEsTUFBTUE7aUJBQ2RBLEVBQUVBO29CQUNEQSxXQUFXQSxFQUFFQSxVQUFVQTtvQkFDdkJBLFdBQVdBLEVBQUVBLFdBQVdBO29CQUN4QkEsTUFBTUEsRUFBRUEsWUFBWUE7aUJBQ3BCQSxFQUFFQTtvQkFDRkEsV0FBV0EsRUFBRUEsVUFBVUE7b0JBQ3ZCQSxXQUFXQSxFQUFFQSxVQUFVQTtvQkFDdkJBLE1BQU1BLEVBQUVBLFdBQVdBO2lCQUNuQkEsRUFBRUE7b0JBQ0ZBLFdBQVdBLEVBQUVBLFVBQVVBO29CQUN2QkEsV0FBV0EsRUFBRUEsT0FBT0E7b0JBQ3BCQSxNQUFNQSxFQUFFQSxPQUFPQTtpQkFDZkEsRUFBRUE7b0JBQ0ZBLFdBQVdBLEVBQUVBLFVBQVVBO29CQUN2QkEsV0FBV0EsRUFBRUEsYUFBYUE7b0JBQzFCQSxNQUFNQSxFQUFFQSxjQUFjQTtpQkFDdEJBLEVBQUVBO29CQUNGQSxXQUFXQSxFQUFFQSxVQUFVQTtvQkFDdkJBLFdBQVdBLEVBQUVBLFVBQVVBO29CQUN2QkEsTUFBTUEsRUFBRUEsVUFBVUE7aUJBQ2xCQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVERiwyQ0FBYUEsR0FBYkE7WUFDQ0csRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNiQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxLQUFLQTtRQUNiQSxDQUFDQTtRQUVESCxzQ0FBUUEsR0FBUkE7WUFBQUksaUJBUUNBO1lBUEFBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBO2dCQUN2QkEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsR0FBR0EsY0FBY0E7YUFDaERBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLE1BQU1BO2dCQUN2QkEsS0FBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUM3QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBQ0EsSUFBSUEsRUFBRUEsTUFBTUE7Z0JBQ3JCQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUM3QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDSkEsQ0FBQ0E7UUFFREosK0NBQWlCQSxHQUFqQkEsVUFBa0JBLElBQVNBO1lBQzFCSyxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxxQkFBcUJBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBRW5EQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3ZCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRURMLHFDQUFPQSxHQUFQQTtZQUNDTSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUMzQ0EsQ0FBQ0E7UUFFRE47O1VBRUVBO1FBQ0ZBLDJDQUFhQSxHQUFiQSxVQUFjQSxHQUFXQTtZQUN4Qk8sT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBO1FBRURQLDJDQUFhQSxHQUFiQSxVQUFjQSxLQUFZQSxFQUFFQSxNQUFjQTtZQUN6Q1EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEtBQUtBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO2dCQUN4QkEsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFDeEJBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBRTFDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQTtnQkFDZkEsU0FBU0EsRUFBRUEsSUFBSUE7Z0JBQ2ZBLEtBQUtBLEVBQUVBLGNBQWNBO2dCQUNyQkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxXQUFXQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDMUdBLE1BQU1BLEVBQUVBLE1BQU1BO2FBQ2RBLENBQUNBO1lBQ0ZBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLGlCQUFpQkEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsZUFBZUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDOUVBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQ3RDQSxDQUFDQTtRQUVEUiw0Q0FBY0EsR0FBZEEsVUFBZUEsSUFBU0EsRUFBRUEsTUFBY0E7WUFBeENTLGlCQWdDQ0E7WUEvQkFBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLGtCQUFrQkEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFFeERBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBO2dCQUN4QkEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsR0FBR0EsWUFBWUE7Z0JBQzlDQSxJQUFJQSxFQUFFQTtvQkFDTEEsUUFBUUEsRUFBRUEsTUFBTUE7b0JBQ2hCQSxVQUFVQSxFQUFFQSxJQUFJQTtpQkFDaEJBO2FBQ0RBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLFFBQWFBO2dCQUN4QkEsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsMEJBQTBCQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDNURBLEtBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO2dCQUVyQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzVCQSxLQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtnQkFDakJBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDUEEsS0FBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7d0JBQ3BCQSxTQUFTQSxFQUFFQSxJQUFJQTt3QkFDZkEsS0FBS0EsRUFBRUEsUUFBUUE7d0JBQ2ZBLElBQUlBLEVBQUVBLDZFQUE2RUE7d0JBQ25GQSxPQUFPQSxFQUFFQSxJQUFJQTt3QkFDYkEsT0FBT0EsRUFBRUEsRUFBRUE7d0JBQ1hBLFFBQVFBLEVBQUVBLEtBQUtBO3dCQUNmQSxZQUFZQSxFQUFFQSxLQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLEtBQUlBLENBQUNBO3dCQUMvQ0EsWUFBWUEsRUFBRUEsY0FBYSxDQUFDO3dCQUM1QkEsZ0JBQWdCQSxFQUFFQSxLQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLEtBQUlBLENBQUNBO3FCQUNuREEsQ0FBQ0E7b0JBQ0ZBLEtBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLFlBQVlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO2dCQUMxRUEsQ0FBQ0E7WUFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBQ0EsUUFBUUE7Z0JBQ2pCQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSx3QkFBd0JBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQzNEQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQUVEVCwyQ0FBYUEsR0FBYkEsVUFBY0EsS0FBYUE7WUFDMUJVLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtnQkFDeEJBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxpQkFBaUJBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1lBQzlFQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7UUFFRFYsNkNBQWVBLEdBQWZBO1lBQ0NXLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBO2dCQUNmQSxTQUFTQSxFQUFFQSxLQUFLQTtnQkFDaEJBLEtBQUtBLEVBQUVBLEVBQUVBO2dCQUNUQSxRQUFRQSxFQUFFQSxFQUFFQTtnQkFDWkEsTUFBTUEsRUFBRUEsRUFBRUE7YUFDVkEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFFRFg7O1VBRUVBO1FBQ0ZBLDZDQUFlQSxHQUFmQSxVQUFnQkEsS0FBWUEsRUFBRUEsTUFBY0E7WUFDM0NZLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtnQkFDeEJBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUUxQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7Z0JBQ3BCQSxTQUFTQSxFQUFFQSxJQUFJQTtnQkFDZkEsS0FBS0EsRUFBRUEsY0FBY0E7Z0JBQ3JCQSxJQUFJQSxFQUFFQSw2Q0FBNkNBO2dCQUNuREEsT0FBT0EsRUFBRUEsSUFBSUE7Z0JBQ2JBLE9BQU9BLEVBQUVBLFFBQVFBO2dCQUNqQkEsUUFBUUEsRUFBRUEsSUFBSUE7Z0JBQ2RBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsTUFBTUEsQ0FBQ0E7Z0JBQ3ZEQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUMvQ0EsZ0JBQWdCQSxFQUFFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2FBQ25EQSxDQUFDQTtZQUNGQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUMxRUEsQ0FBQ0E7UUFFRFosK0NBQWlCQSxHQUFqQkEsVUFBa0JBLE1BQWNBO1lBQWhDYSxpQkE2QkNBO1lBNUJBQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSw2QkFBNkJBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBRTdEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQTtnQkFDeEJBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLEdBQUdBLFlBQVlBO2dCQUM5Q0EsSUFBSUEsRUFBRUE7b0JBQ0xBLFFBQVFBLEVBQUVBLE1BQU1BO2lCQUNoQkE7YUFDREEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsUUFBYUE7Z0JBQ3hCQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDN0NBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO29CQUM1QkEsS0FBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtvQkFDekJBLEtBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNQQSxLQUFJQSxDQUFDQSxhQUFhQSxHQUFHQTt3QkFDcEJBLFNBQVNBLEVBQUVBLElBQUlBO3dCQUNmQSxLQUFLQSxFQUFFQSxRQUFRQTt3QkFDZkEsSUFBSUEsRUFBRUEsaUVBQWlFQTt3QkFDdkVBLE9BQU9BLEVBQUVBLElBQUlBO3dCQUNiQSxPQUFPQSxFQUFFQSxFQUFFQTt3QkFDWEEsUUFBUUEsRUFBRUEsS0FBS0E7d0JBQ2ZBLFlBQVlBLEVBQUVBLEtBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBSUEsQ0FBQ0E7d0JBQy9DQSxZQUFZQSxFQUFFQSxjQUFhLENBQUM7d0JBQzVCQSxnQkFBZ0JBLEVBQUVBLEtBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBSUEsQ0FBQ0E7cUJBQ25EQSxDQUFDQTtnQkFDSEEsQ0FBQ0E7WUFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBQ0EsUUFBUUE7Z0JBQ2pCQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxTQUFTQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDSkEsQ0FBQ0E7UUFFRGIsK0NBQWlCQSxHQUFqQkEsVUFBa0JBLEtBQWFBO1lBQzlCYyxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsS0FBS0EsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7Z0JBQ3hCQSxLQUFLQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7WUFFREEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsWUFBWUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsZUFBZUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDekVBLElBQUlBLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRURkLGtEQUFvQkEsR0FBcEJBO1lBQ0NlLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBO2dCQUNwQkEsU0FBU0EsRUFBRUEsS0FBS0E7Z0JBQ2hCQSxLQUFLQSxFQUFFQSxFQUFFQTtnQkFDVEEsSUFBSUEsRUFBRUEsRUFBRUE7Z0JBQ1JBLE9BQU9BLEVBQUVBLEVBQUVBO2dCQUNYQSxPQUFPQSxFQUFFQSxFQUFFQTtnQkFDWEEsUUFBUUEsRUFBRUEsS0FBS0E7Z0JBQ2ZBLFlBQVlBLEVBQUVBLGNBQWEsQ0FBQztnQkFDNUJBLFlBQVlBLEVBQUVBLGNBQWEsQ0FBQztnQkFDNUJBLGdCQUFnQkEsRUFBRUEsY0FBYSxDQUFDO2FBQ2hDQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVEZiw2Q0FBZUEsR0FBZkEsVUFBZ0JBLE9BQVlBO1lBQzNCZ0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsS0FBS0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxHQUFHQSxHQUFHQSxPQUFPQSxDQUFDQTtZQUNoQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLE9BQU9BLENBQUNBO1lBQzFCQSxDQUFDQTtRQUVGQSxDQUFDQTtRQXRQYWhCLDJCQUFPQSxHQUFHQTtZQUN2QkEsUUFBUUE7WUFDUkEsV0FBV0E7WUFDWEEsWUFBWUE7WUFDWkEsY0FBY0E7WUFDZEEsZUFBZUE7U0FDZkEsQ0FBQ0E7UUFpUEhBLDBCQUFDQTtJQUFEQSxDQUFDQSxJQUFBbkI7SUFoUVlBLHVCQUFtQkEsc0JBZ1EvQkE7QUFDRkEsQ0FBQ0EsRUFwUU0sR0FBRyxLQUFILEdBQUcsUUFvUVQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7QUN2UXZFLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0ErSlQ7QUEvSkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQSxDQUFDQTtJQUViQTtRQWNDb0MsMkJBQ1NBLE1BQWlCQSxFQUNqQkEsU0FBOEJBLEVBQzlCQSxVQUFzQkEsRUFDdEJBLFlBQTBCQSxFQUMxQkEsYUFBNEJBO1lBSjVCQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFXQTtZQUNqQkEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBcUJBO1lBQzlCQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFZQTtZQUN0QkEsaUJBQVlBLEdBQVpBLFlBQVlBLENBQWNBO1lBQzFCQSxrQkFBYUEsR0FBYkEsYUFBYUEsQ0FBZUE7WUFFcENBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUN2Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDeEJBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO1FBQzdCQSxDQUFDQTtRQUVERCx5Q0FBYUEsR0FBYkEsVUFBY0EsR0FBV0E7WUFDeEJFLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3hEQSxDQUFDQTtRQUVERix3Q0FBWUEsR0FBWkE7WUFDQ0csa0NBQWtDQTtZQUNsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzdIQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQzNDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkVBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQTtnQkFDNUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1lBQ2RBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN6RUEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSx5QkFBeUJBLENBQUNBLENBQUNBO2dCQUNsREEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9DQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNiQSxDQUFDQTtRQUVESCx3Q0FBWUEsR0FBWkE7WUFDQ0ksSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDN0NBLENBQUNBO1FBRURKLG1DQUFPQSxHQUFQQTtZQUFBSyxpQkFtQkNBO1lBbEJBQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUVuREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQTtvQkFDeEJBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLEdBQUdBLFNBQVNBO29CQUMzQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUE7aUJBQ25CQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFDQSxRQUFhQTtvQkFDeEJBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO29CQUU3Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsUUFBUUEsQ0FBQ0EsSUFBSUEsSUFBSUEsUUFBUUEsQ0FBQ0EsSUFBSUEsS0FBS0Esc0JBQXNCQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDM0VBLEtBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3RDQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ1BBLEtBQUlBLENBQUNBLFlBQVlBLEVBQUVBLENBQUNBO29CQUNyQkEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLFVBQUNBLFFBQWFBO29CQUN0QkEsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNKQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVETCwyQ0FBZUEsR0FBZkE7WUFDQ00sSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0E7Z0JBQ2ZBLFdBQVdBLEVBQUVBLEVBQUVBO2dCQUNmQSxVQUFVQSxFQUFFQSxFQUFFQTtnQkFDZEEsT0FBT0EsRUFBRUEsRUFBRUE7Z0JBQ1hBLGFBQWFBLEVBQUVBLEVBQUVBO2dCQUNqQkEsVUFBVUEsRUFBRUEsSUFBSUE7YUFDaEJBLENBQUNBO1FBQ0hBLENBQUNBO1FBRUROLDZDQUFpQkEsR0FBakJBLFVBQWtCQSxTQUFpQkE7WUFDbENPLElBQUlBLEtBQUtBLEdBQVdBLEVBQUVBLEVBQ3JCQSxJQUFJQSxHQUFXQSxFQUFFQSxDQUFDQTtZQUVuQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxLQUFLQSxZQUFZQTtvQkFDaEJBLEtBQUtBLEdBQUdBLHNCQUFzQkEsQ0FBQ0E7b0JBQy9CQSxJQUFJQSxHQUFHQSxpRUFBaUVBLENBQUNBO29CQUN6RUEsS0FBS0EsQ0FBQ0E7Z0JBRVBBLEtBQUtBLGtCQUFrQkE7b0JBQ3RCQSxLQUFLQSxHQUFHQSxpQkFBaUJBLENBQUNBO29CQUMxQkEsSUFBSUEsR0FBR0Esa0NBQWtDQSxDQUFDQTtvQkFDMUNBLEtBQUtBLENBQUNBO2dCQUVQQSxLQUFLQSxtQkFBbUJBO29CQUN2QkEsS0FBS0EsR0FBR0EsaUJBQWlCQSxDQUFDQTtvQkFDMUJBLElBQUlBLEdBQUdBLCtCQUErQkEsQ0FBQ0E7b0JBQ3ZDQSxLQUFLQSxDQUFDQTtnQkFFUEEsS0FBS0EseUJBQXlCQTtvQkFDN0JBLEtBQUtBLEdBQUdBLGlCQUFpQkEsQ0FBQ0E7b0JBQzFCQSxJQUFJQSxHQUFHQSwwQkFBMEJBLENBQUNBO29CQUNsQ0EsS0FBS0EsQ0FBQ0E7Z0JBRVBBLEtBQUtBLHNCQUFzQkE7b0JBQzFCQSxLQUFLQSxHQUFHQSxpQkFBaUJBLENBQUNBO29CQUMxQkEsSUFBSUEsR0FBR0Esd0JBQXdCQSxDQUFDQTtvQkFDaENBLEtBQUtBLENBQUNBO1lBQ1JBLENBQUNBO1lBRURBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLFlBQVlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1lBQ3pFQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQTtnQkFDcEJBLFNBQVNBLEVBQUVBLElBQUlBO2dCQUNmQSxLQUFLQSxFQUFFQSxLQUFLQTtnQkFDWkEsSUFBSUEsRUFBRUEsSUFBSUE7Z0JBQ1ZBLE9BQU9BLEVBQUVBLElBQUlBO2dCQUNiQSxPQUFPQSxFQUFFQSxFQUFFQTtnQkFDWEEsUUFBUUEsRUFBRUEsS0FBS0E7Z0JBQ2ZBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQy9DQSxZQUFZQSxFQUFFQSxjQUFhLENBQUM7Z0JBQzVCQSxnQkFBZ0JBLEVBQUVBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7YUFDbkRBLENBQUNBO1FBQ0hBLENBQUNBO1FBRURQLDZDQUFpQkEsR0FBakJBLFVBQWtCQSxLQUFhQTtZQUM5QlEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEtBQUtBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO2dCQUN4QkEsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFDeEJBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLFlBQVlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1lBQ3pFQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO1FBQzdCQSxDQUFDQTtRQUVEUixnREFBb0JBLEdBQXBCQTtZQUNDUyxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQTtnQkFDcEJBLFNBQVNBLEVBQUVBLEtBQUtBO2dCQUNoQkEsS0FBS0EsRUFBRUEsRUFBRUE7Z0JBQ1RBLElBQUlBLEVBQUVBLEVBQUVBO2dCQUNSQSxPQUFPQSxFQUFFQSxFQUFFQTtnQkFDWEEsT0FBT0EsRUFBRUEsRUFBRUE7Z0JBQ1hBLFFBQVFBLEVBQUVBLEtBQUtBO2dCQUNmQSxZQUFZQSxFQUFFQSxjQUFhLENBQUM7Z0JBQzVCQSxZQUFZQSxFQUFFQSxjQUFhLENBQUM7Z0JBQzVCQSxnQkFBZ0JBLEVBQUVBLGNBQWEsQ0FBQzthQUNoQ0EsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFwSmFULHlCQUFPQSxHQUFHQTtZQUN2QkEsUUFBUUE7WUFDUkEsV0FBV0E7WUFDWEEsWUFBWUE7WUFDWkEsY0FBY0E7WUFDZEEsZUFBZUE7U0FDZkEsQ0FBQ0E7UUErSUhBLHdCQUFDQTtJQUFEQSxDQUFDQSxJQUFBcEM7SUEzSllBLHFCQUFpQkEsb0JBMko3QkE7QUFDRkEsQ0FBQ0EsRUEvSk0sR0FBRyxLQUFILEdBQUcsUUErSlQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzs7QUNsS25FLHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FNVDtBQU5ELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFDQzhDO1FBQWdCQyxDQUFDQTtRQUNsQkQseUJBQUNBO0lBQURBLENBQUNBLElBQUE5QztJQUZZQSxzQkFBa0JBLHFCQUU5QkE7QUFDRkEsQ0FBQ0EsRUFOTSxHQUFHLEtBQUgsR0FBRyxRQU1UO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7O0FDVHJFLHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FNVDtBQU5ELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFDQ2dEO1FBQWdCQyxDQUFDQTtRQUNsQkQsOEJBQUNBO0lBQURBLENBQUNBLElBQUFoRDtJQUZZQSwyQkFBdUJBLDBCQUVuQ0E7QUFDRkEsQ0FBQ0EsRUFOTSxHQUFHLEtBQUgsR0FBRyxRQU1UO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7O0FDVC9FLHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FNVDtBQU5ELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFDQ2tEO1FBQWdCQyxDQUFDQTtRQUNsQkQseUJBQUNBO0lBQURBLENBQUNBLElBQUFsRDtJQUZZQSxzQkFBa0JBLHFCQUU5QkE7QUFDRkEsQ0FBQ0EsRUFOTSxHQUFHLEtBQUgsR0FBRyxRQU1UO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7O0FDVHJFLHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0F1Q1Q7QUF2Q0QsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQSxDQUFDQTtJQUViQTtRQVNDb0QsK0JBQW9CQSxRQUFnQ0E7WUFBaENDLGFBQVFBLEdBQVJBLFFBQVFBLENBQXdCQTtZQUNuREEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0Esa0JBQWtCQSxDQUFDQTtZQUN2Q0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDekJBLENBQUNBO1FBRURELCtDQUFlQSxHQUFmQSxVQUFnQkEsS0FBWUEsRUFBRUEsU0FBaUJBO1lBQzlDRSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7Z0JBQ3ZCQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFFREEsSUFBSUEsUUFBUUEsR0FBR0EsZ0JBQWdCQSxDQUFDQTtZQUNoQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JFQSxRQUFRQSxHQUFHQSxrQkFBa0JBLENBQUNBO1lBQy9CQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxLQUFLQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdENBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2dCQUN6R0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsU0FBU0EsQ0FBQ0E7WUFDaENBLENBQUNBO1lBQ0RBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBRTVFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtnQkFDYkEsU0FBU0EsRUFBRUEsU0FBU0E7YUFDcEJBLENBQUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBN0JhRiw2QkFBT0EsR0FBR0E7WUFDdkJBLFVBQVVBO1NBQ1ZBLENBQUNBO1FBNEJIQSw0QkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQXBEO0lBbkNZQSx5QkFBcUJBLHdCQW1DakNBO0FBQ0ZBLENBQUNBLEVBdkNNLEdBQUcsS0FBSCxHQUFHLFFBdUNUO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7O0FDMUMzRSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBbUNUO0FBbkNELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUkEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFnQkZ1RDtZQWZPQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNUQSxVQUFLQSxHQUFHQTtnQkFDWEEsU0FBU0EsRUFBRUEsR0FBR0E7Z0JBQ3ZCQSxLQUFLQSxFQUFFQSxHQUFHQTtnQkFDVkEsUUFBUUEsRUFBRUEsR0FBR0E7Z0JBQ2JBLE1BQU1BLEVBQUVBLEdBQUdBO2dCQUNYQSxTQUFTQSxFQUFFQSxHQUFHQTtnQkFDZEEsVUFBVUEsRUFBRUEsR0FBR0E7Z0JBQ2ZBLFdBQVdBLEVBQUVBLEdBQUdBO2FBQ1ZBLENBQUNBO1lBQ0tBLGdCQUFXQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxHQUFHQSxxQ0FBcUNBLENBQUNBO1lBQzlGQSxlQUFVQSxHQUFHQSxvQkFBb0JBLENBQUNBO1lBQ2xDQSxpQkFBWUEsR0FBR0Esa0JBQWtCQSxDQUFDQTtZQUNsQ0EscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUVoQkEsQ0FBQ0E7UUFFaEJELGdDQUFJQSxHQUFKQSxVQUFLQSxLQUFlQTtZQUNuQkUsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxVQUFTQSxLQUFLQSxFQUFFQSxNQUFXQTtnQkFDdkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUNBLENBQUNBO1lBRUhBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLGlCQUFpQkEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsTUFBV0E7Z0JBQ3ZELE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQUVNRix5QkFBT0EsR0FBZEE7WUFDQ0csTUFBTUEsRUFBRUEsY0FBTUEsV0FBSUEsaUJBQWlCQSxFQUFFQSxFQUF2QkEsQ0FBdUJBLENBQUNBLENBQUNBO1FBQ3hDQSxDQUFDQTtRQUNDSCx3QkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQXZEO0lBL0JZQSxxQkFBaUJBLG9CQStCN0JBO0FBQ0xBLENBQUNBLEVBbkNNLEdBQUcsS0FBSCxHQUFHLFFBbUNUO0FBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7OztBQ3RDbEUsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQXFDVDtBQXJDRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1JBLFlBQVlBLENBQUNBO0lBRWJBO1FBa0JGMkQ7WUFqQk9DLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ1RBLFVBQUtBLEdBQUdBO2dCQUNwQkEsU0FBU0EsRUFBRUEsR0FBR0E7Z0JBQ2RBLEtBQUtBLEVBQUVBLEdBQUdBO2dCQUNWQSxJQUFJQSxFQUFFQSxHQUFHQTtnQkFDVEEsT0FBT0EsRUFBRUEsR0FBR0E7Z0JBQ1pBLE9BQU9BLEVBQUVBLEdBQUdBO2dCQUNaQSxRQUFRQSxFQUFFQSxHQUFHQTtnQkFDYkEsWUFBWUEsRUFBRUEsR0FBR0E7Z0JBQ2pCQSxZQUFZQSxFQUFFQSxHQUFHQTtnQkFDakJBLGdCQUFnQkEsRUFBRUEsR0FBR0E7YUFDZkEsQ0FBQ0E7WUFDS0EsZ0JBQVdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLDBDQUEwQ0EsQ0FBQ0E7WUFDbkdBLGVBQVVBLEdBQUdBLHlCQUF5QkEsQ0FBQ0E7WUFDdkNBLGlCQUFZQSxHQUFHQSxrQkFBa0JBLENBQUNBO1lBQ2xDQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1FBRWZBLENBQUNBO1FBRWpCRCxxQ0FBSUEsR0FBSkEsVUFBS0EsS0FBZUE7WUFDbkJFLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLFlBQVlBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLE1BQVdBO2dCQUNsRCxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQ0EsQ0FBQ0E7WUFFSEEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsTUFBV0E7Z0JBQ2xELE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQUVNRiw4QkFBT0EsR0FBZEE7WUFDQ0csTUFBTUEsQ0FBQ0EsQ0FBQ0EsY0FBTUEsV0FBSUEsc0JBQXNCQSxFQUFFQSxFQUE1QkEsQ0FBNEJBLENBQUNBLENBQUNBO1FBQzdDQSxDQUFDQTtRQUNDSCw2QkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQTNEO0lBakNZQSwwQkFBc0JBLHlCQWlDbENBO0FBQ0xBLENBQUNBLEVBckNNLEdBQUcsS0FBSCxHQUFHLFFBcUNUO0FBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7OztBQ3hDNUUsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQXdCVDtBQXhCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1JBLFlBQVlBLENBQUNBO0lBRWJBO1FBZUYrRDtZQWRPQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNUQSxVQUFLQSxHQUFHQTtnQkFDcEJBLFFBQVFBLEVBQUVBLEdBQUdBO2dCQUNiQSxNQUFNQSxFQUFFQSxHQUFHQTtnQkFDWEEsUUFBUUEsRUFBRUEsR0FBR0E7Z0JBQ2JBLGFBQWFBLEVBQUVBLEdBQUdBO2dCQUNsQkEsVUFBVUEsRUFBRUEsR0FBR0E7Z0JBQ2ZBLFdBQVdBLEVBQUVBLEdBQUdBO2FBQ1ZBLENBQUNBO1lBQ0tBLGdCQUFXQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxHQUFHQSxxQ0FBcUNBLENBQUNBO1lBQzlGQSxlQUFVQSxHQUFHQSxvQkFBb0JBLENBQUNBO1lBQ2xDQSxpQkFBWUEsR0FBR0Esa0JBQWtCQSxDQUFDQTtZQUNsQ0EscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUVoQkEsQ0FBQ0E7UUFFVEQseUJBQU9BLEdBQWRBO1lBQ0NFLE1BQU1BLENBQUNBLENBQUNBLGNBQU1BLFdBQUlBLGlCQUFpQkEsRUFBRUEsRUFBdkJBLENBQXVCQSxDQUFDQSxDQUFDQTtRQUN4Q0EsQ0FBQ0E7UUFDQ0Ysd0JBQUNBO0lBQURBLENBQUNBLElBQUEvRDtJQXBCWUEscUJBQWlCQSxvQkFvQjdCQTtBQUNMQSxDQUFDQSxFQXhCTSxHQUFHLEtBQUgsR0FBRyxRQXdCVDtBQUNELFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOzs7QUMzQmxFLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FrQlQ7QUFsQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQUFBa0U7WUFDS0MsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDVEEsVUFBS0EsR0FBR0E7Z0JBQ1hBLFlBQVlBLEVBQUVBLEdBQUdBO2dCQUMxQkEsUUFBUUEsRUFBRUEsR0FBR0E7YUFDUEEsQ0FBQ0E7WUFDS0EsZ0JBQVdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLHdDQUF3Q0EsQ0FBQ0E7WUFDakdBLGVBQVVBLEdBQUdBLHVCQUF1QkEsQ0FBQ0E7WUFDckNBLGlCQUFZQSxHQUFHQSxrQkFBa0JBLENBQUNBO1lBQ2xDQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1FBSzdCQSxDQUFDQTtRQUhJRCw0QkFBT0EsR0FBZEE7WUFDQ0UsTUFBTUEsQ0FBQ0EsQ0FBQ0EsY0FBTUEsV0FBSUEsb0JBQW9CQSxFQUFFQSxFQUExQkEsQ0FBMEJBLENBQUNBLENBQUNBO1FBQzNDQSxDQUFDQTtRQUNDRiwyQkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQWxFO0lBZFlBLHdCQUFvQkEsdUJBY2hDQTtBQUNMQSxDQUFDQSxFQWxCTSxHQUFHLEtBQUgsR0FBRyxRQWtCVDtBQUNELFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOzs7QUNyQnhFLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQUlGcUUsb0JBQW9CQSxLQUFzQkE7WUFBdEJDLFVBQUtBLEdBQUxBLEtBQUtBLENBQWlCQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRUtELDRCQUFPQSxHQUFQQSxVQUFRQSxNQUFXQTtZQUN4QkUsSUFBSUEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDeEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1FBQ3BEQSxDQUFDQTtRQUVERiw2QkFBUUEsR0FBUkEsVUFBU0EsTUFBV0E7WUFDaEJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzFEQSxDQUFDQTtRQWRBSCxrQkFBT0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFlekJBLGlCQUFDQTtJQUFEQSxDQUFDQSxJQUFBckU7SUFoQllBLGNBQVVBLGFBZ0J0QkE7QUFDTEEsQ0FBQ0EsRUFwQk0sR0FBRyxLQUFILEdBQUcsUUFvQlQ7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7OztBQ3ZCL0Msc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQVlUO0FBWkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQUdJeUUsdUJBQW9CQSxVQUFnQ0E7WUFBaENDLGVBQVVBLEdBQVZBLFVBQVVBLENBQXNCQTtZQUVwREEsbUJBQWNBLEdBQUdBLFVBQVNBLFNBQVNBLEVBQUVBLElBQUlBO2dCQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDQTtRQUpzREEsQ0FBQ0E7UUFGbERELHFCQUFPQSxHQUFHQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQU9wQ0Esb0JBQUNBO0lBQURBLENBQUNBLElBQUF6RTtJQVJZQSxpQkFBYUEsZ0JBUXpCQTtBQUNMQSxDQUFDQSxFQVpNLEdBQUcsS0FBSCxHQUFHLFFBWVQ7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7OztBQ2ZyRCxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBb0VUO0FBcEVELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUkEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFDSTJFO1FBQWdCQyxDQUFDQTtRQUVqQkQsa0NBQVdBLEdBQVhBLFVBQVlBLEdBQVFBO1lBQ3pCRSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtRQUM5Q0EsQ0FBQ0E7UUFFREYsc0NBQWVBLEdBQWZBLFVBQWdCQSxHQUFRQSxFQUFFQSxlQUF5QkE7WUFDbERHLElBQUlBLE1BQU1BLEdBQVlBLEtBQUtBLEVBQzFCQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUU5QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2RBLEtBQUtBLGdCQUFnQkE7b0JBQ3BCQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdEJBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO29CQUNmQSxDQUFDQTtvQkFDREEsS0FBS0EsQ0FBQ0E7Z0JBRVBBLEtBQUtBLGlCQUFpQkE7b0JBQ3JCQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbkNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO29CQUNmQSxDQUFDQTtvQkFDREEsS0FBS0EsQ0FBQ0E7Z0JBRVBBO29CQUNDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxXQUFXQSxJQUFJQSxHQUFHQSxLQUFLQSxJQUFJQSxJQUFJQSxHQUFHQSxLQUFLQSxFQUFFQSxJQUFJQSxHQUFHQSxLQUFLQSxNQUFNQSxJQUFJQSxHQUFHQSxLQUFLQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDekdBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO29CQUNmQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZUFBZUEsSUFBSUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pEQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDZkEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7WUFDREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUFFREgsNEJBQUtBLEdBQUxBLFVBQU1BLEdBQVFBO1lBQ2JJLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLElBQUlBLElBQUlBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLFFBQVFBLENBQUNBO2dCQUMzQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFFWkEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsR0FBR0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFDakNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLEdBQUdBLENBQUNBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2JBLENBQUNBO1FBRURKLG9DQUFhQSxHQUFiQSxVQUFjQSxLQUFhQTtZQUMxQkssSUFBSUEsV0FBV0EsR0FBR0EsbUdBQW1HQSxDQUFDQTtZQUV0SEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNiQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDZEEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREwsdUNBQWdCQSxHQUFoQkEsVUFBaUJBLEdBQWVBLEVBQUVBLFFBQWdCQSxFQUFFQSxTQUFjQTtZQUNqRU0sR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQTtvQkFBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRUROLDBCQUFHQSxHQUFIQTtZQUFJTyxhQUFhQTtpQkFBYkEsV0FBYUEsQ0FBYkEsc0JBQWFBLENBQWJBLElBQWFBO2dCQUFiQSw0QkFBYUE7O1lBQ2hCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUN2Q0EsQ0FBQ0E7UUFDQ1AsbUJBQUNBO0lBQURBLENBQUNBLElBQUEzRTtJQWhFWUEsZ0JBQVlBLGVBZ0V4QkE7QUFDTEEsQ0FBQ0EsRUFwRU0sR0FBRyxLQUFILEdBQUcsUUFvRVQ7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7OztBQ3ZFbkQsK0VBQStFO0FBQy9FLG1GQUFtRjtBQUNuRix5RkFBeUY7QUFFekYsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMscUNBQXFDO0FBQ3JDLDRDQUE0QztBQUU1Qyw2REFBNkQ7QUFDN0QsNERBQTREO0FBRTVELDhEQUE4RDtBQUM5RCw2REFBNkQ7QUFDN0QsMERBQTBEO0FBQzFELDZEQUE2RDtBQUM3RCxrRUFBa0U7QUFFbEUsNERBQTREO0FBQzVELGdFQUFnRTtBQUNoRSw4REFBOEQ7QUFFOUQsMEVBQTBFO0FBQzFFLCtFQUErRTtBQUMvRSwwRUFBMEU7QUFDMUUsNkVBQTZFO0FBRTdFLDZEQUE2RDtBQUM3RCxrRUFBa0U7QUFDbEUsNkRBQTZEO0FBQzdELGdFQUFnRTtBQUVoRSxtREFBbUQ7QUFDbkQsc0RBQXNEO0FBQ3RELHFEQUFxRDs7O0FDbkNyRCxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBS1Q7QUFMRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ0FBLFdBQU9BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLFNBQVNBLEVBQUVBLGFBQWFBLEVBQUVBLFVBQVVBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO0lBRXJHQSxXQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFNQSxDQUFDQSxDQUFDQTtJQUNwQkEsV0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsRUFBRUEsV0FBV0EsRUFBRUEsZUFBZUEsRUFBRUEsZ0JBQVlBLENBQUNBLENBQUNBLENBQUNBO0FBQzVFQSxDQUFDQSxFQUxNLEdBQUcsS0FBSCxHQUFHLFFBS1QiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxudmFyIHNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ3NlcnZpY2VzJywgW10pO1xyXG52YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnY29udHJvbGxlcnMnLCBbXSk7XHJcbnZhciBkaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2RpcmVjdGl2ZXMnLCBbXSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcblx0XHRzdGF0aWMgZ2V0IERlZmF1bHQoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy8nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgICAgICAgJyRyb3V0ZVByb3ZpZGVyJ1xyXG4gICAgICAgIF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoJHJvdXRlUHJvdmlkZXI6IG5nLnJvdXRlLklSb3V0ZVByb3ZpZGVyKSB7XHJcblx0XHRcdCRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvdXNlcnNsaXN0XCIsIHtcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ3VzZXJzTGlzdC5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnVXNlcnNMaXN0Q29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcidcclxuXHRcdFx0fSkud2hlbignL2FkZFVzZXInLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ0FkZFVzZXJDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2FkZFVzZXIuaHRtbCdcclxuXHRcdFx0fSkub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy91c2Vyc2xpc3QnIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBSb3V0ZUhhbmRsZXIge1xyXG5cdFx0c3RhdGljIGluamVjdCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnc2hhcmVkU2VydmljZSddO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBhbnksIC8vbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcblx0XHRcdCRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0c2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRyb290U2NvcGUuVXRpbHMgPSB7XHJcblx0XHRcdFx0a2V5czogT2JqZWN0LmtleXNcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN0YXJ0Jywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZUVycm9yJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2Vyc0xpc3RJbnRlcmZhY2Uge1xyXG5cdFx0ZGF0YUF2YWlsYWJsZSgpXHJcblx0XHRnZXRVc2VycygpXHJcblx0XHRwcm9jZXNzU2VydmVyRGF0YShkYXRhOiBhbnkpXHJcblx0XHRhZGRVc2VyKClcclxuXHRcdGVkaXRVc2VyQ2xpY2soZXZlbnQ6IEV2ZW50LCBrZXk6IHN0cmluZylcclxuXHRcdHVwZGF0ZVVzZXJEYXRhKGRhdGE6IGFueSwgdXNlcklkOiBzdHJpbmcpXHJcblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpXHJcblx0XHRlZGl0VXNlckRlZmF1bHQoKVxyXG5cdFx0ZGVsZXRlVXNlckNsaWNrKGV2ZW50OiBFdmVudCwga2V5OiBzdHJpbmcpXHJcblx0XHRkZWxldGVVc2VyQ29uZmlybShrZXk6IHN0cmluZylcclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpXHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgQWRkVXNlckludGVyZmFjZSB7XHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKVxyXG5cdFx0dmFsaWRhdGVGb3JtKClcclxuXHRcdGFkZFVzZXIoKVxyXG5cdFx0dXNlckRhdGFEZWZhdWx0KClcclxuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKVxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OkV2ZW50KVxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdBZGRVc2VyQ29udHJvbGxlcicsIGFwcC5BZGRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBhcHBDb25maWdJbnRlcmZhY2Uge1xyXG5cdFx0c2VydmVyVXJsOiBzdHJpbmc7XHJcblx0XHR0ZW1wbGF0ZVVybDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckRhdGFJbnRlcmZhY2Uge1xyXG5cdFx0Zmlyc3RuYW1lOiBzdHJpbmc7XHJcblx0XHRsYXN0bmFtZTogc3RyaW5nO1xyXG5cdFx0ZW1haWw6IHN0cmluZztcclxuXHRcdHBob25lbnVtYmVyOiBzdHJpbmc7XHJcblx0XHRsb2NhdGlvbjogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uc0ludGVyZmFjZSB7XHJcblx0XHQnc2hvd0J0bic6IEJvb2xlYW4sXHJcblx0XHQnY2xpY2tGdW5jJzogc3RyaW5nLFxyXG5cdFx0J3RleHQnOiBzdHJpbmdcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdG9uUm91dGVDaGFuZ2VTdGFydChldmVudDogRXZlbnQsIHBhcmFtczogT2JqZWN0KVxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSlcclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKVxyXG5cdFx0c2V0VXNlckxpc3RIZWFkZXIoKVxyXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZylcclxuXHRcdGdvVG9BZGRVc2VyKClcclxuXHRcdGFkZFVzZXIoKVxyXG5cdFx0Z29CYWNrKClcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEVkaXRVc2VySW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbjtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHR1c2VyRGF0YTogYW55O1xyXG5cdFx0dXNlcklkOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbixcclxuXHRcdHRpdGxlOiBzdHJpbmcsXHJcblx0XHRib2R5OiBzdHJpbmcsXHJcblx0XHRidG4xVHh0OiBzdHJpbmcsXHJcblx0XHRidG4yVHh0Pzogc3RyaW5nLFxyXG5cdFx0c2hvd0J0bjI6IEJvb2xlYW4sXHJcblx0XHRidG4xQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHRcdGJ0bjJDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0Y2xvc2VCdG5DYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBIZWFkZXJDb250cm9sbGVyIGltcGxlbWVudHMgSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdGhlYWRpbmc6IHN0cmluZztcclxuXHRcdGhlYWRlckxlZnRCdG46IEJ1dHRvbnNJbnRlcmZhY2U7XHJcblx0XHRoZWFkZXJSaWdodEJ0bjogQnV0dG9uc0ludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0JyR3aW5kb3cnLFxyXG5cdFx0XHQnJGxvZycsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN0YXJ0XCIsIHRoaXMub25Sb3V0ZUNoYW5nZVN0YXJ0LmJpbmQodGhpcykpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdWNjZXNzXCIsIHRoaXMub25Sb3V0ZUNoYW5nZVN1Y2Nlc3MuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIHRoaXMub25Sb3V0ZUNoYW5nZUVycm9yLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkaW5nID0gJ1VzZXIgbWFuYWdlbWVudCc7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdGFydChldmVudDogRXZlbnQsIHBhcmFtczogT2JqZWN0KSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VTdGFydDogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlU3VjY2VzcyhldmVudDogRXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VTdWNjZXNzOiAnLCBwYXJhbXMpO1xyXG5cclxuXHRcdFx0aWYgKHBhcmFtcy5uZXh0ICYmIHBhcmFtcy5uZXh0LiQkcm91dGUgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZS5jb250cm9sbGVyKSB7XHJcblx0XHRcdFx0c3dpdGNoIChwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ1VzZXJzTGlzdENvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldFVzZXJMaXN0SGVhZGVyKCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdGNhc2UgJ0FkZFVzZXJDb250cm9sbGVyJzpcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRBZGRVc2VySGVhZGVyKCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldFVzZXJMaXN0SGVhZGVyKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlRXJyb3IoZXZlbnQsIHBhcmFtcykge1xyXG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlRXJyb3I6ICcsIHBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VXNlckxpc3RIZWFkZXIoKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvVG9BZGRVc2VyJyxcclxuXHRcdFx0XHQndGV4dCc6ICdBZGQgdXNlcidcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRBZGRVc2VySGVhZGVyKCkge1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29CYWNrJyxcclxuXHRcdFx0XHQndGV4dCc6ICdCYWNrJ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpc1tjbGlja0Z1bmNdKSkge1xyXG5cdFx0XHRcdHRoaXNbY2xpY2tGdW5jXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z29Ub0FkZFVzZXIoKSB7XHJcblx0XHRcdC8vIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlclwiKSkuc2NvcGUoKVxyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2FkZC11c2VyJywge30pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdvQmFjaygpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignSGVhZGVyQ29udHJvbGxlcicsIGFwcC5IZWFkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJzTGlzdENvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2Vyc0xpc3RJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSB1c2Vyc0xpc3Q6IEFycmF5PGFueT47XHJcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBlZGl0VXNlcjogRWRpdFVzZXJJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIG1vZGFsRGlhbG9ndWU6IE1vZGFsRGlhbG9ndWVJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIHNvcnRPcmRlcjogc3RyaW5nO1xyXG5cdFx0Ly9UT0RPOiBjcmVhdGUgaW50ZXJmYWNlXHJcblx0XHRwcml2YXRlIHRhYmxlSGVhZGluZzogQXJyYXk8YW55PjtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0J0FQSVNlcnZpY2UnLFxyXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy5zb3J0T3JkZXIgPSAnZmlyc3RuYW1lJztcclxuXHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cclxuXHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBbXTtcclxuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZXRhYmxlSGVhZGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNyZWF0ZXRhYmxlSGVhZGluZygpIHtcclxuXHRcdFx0dGhpcy50YWJsZUhlYWRpbmcgPSBbe1xyXG5cdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEnLFxyXG5cdFx0XHRcdCdzb3J0T3JkZXInOiAnaWRfbWVtYmVyJyxcclxuXHRcdFx0XHQndGV4dCc6ICdTLk5vJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZmlyc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0ZpcnN0IG5hbWUnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xhc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0xhc3QgbmFtZSdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0zJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZW1haWwnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnRW1haWwnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ3Bob25lbnVtYmVyJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ1Bob25lIE51bWJlcidcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnbG9jYXRpb24nLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnTG9jYXRpb24nXHJcblx0XHRcdFx0fV07XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0YUF2YWlsYWJsZSgpIHtcclxuXHRcdFx0aWYgKHRoaXMudXNlcnNMaXN0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1cclxuXHJcblx0XHRnZXRVc2VycygpIHtcclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLmdldENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZ2V0dXNlcnNsaXN0J1xyXG5cdFx0XHR9KS5zdWNjZXNzKChkYXRhLCBzdGF0dXMpID0+IHtcclxuXHRcdFx0XHR0aGlzLnByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGEpXHJcblx0XHRcdH0pLmVycm9yKChkYXRhLCBzdGF0dXMpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2VycicpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSkge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3Byb2Nlc3NTZXJ2ZXJEYXRhOiAnLCBkYXRhKTtcclxuXHJcblx0XHRcdGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0ID0gZGF0YTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnVzZXJzTGlzdC5sZW5ndGggPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRWRpdCB1c2VyIGNvZGUgZmxvd1xyXG5cdFx0Ki9cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3ZhbGlkYXRlRW1haWwnKTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0VXNlckNsaWNrKGV2ZW50OiBFdmVudCwgdXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRWRpdCBkZXRhaWxzJyxcclxuXHRcdFx0XHR1c2VyRGF0YTogdGhpcy51dGlsc1NlcnZpY2UuY2xvbmUodGhpcy51dGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFycih0aGlzLnVzZXJzTGlzdCwgJ2lkX21lbWJlcicsIHVzZXJJZCkpLFxyXG5cdFx0XHRcdHVzZXJJZDogdXNlcklkXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1lZGl0LW1vZGFsJywgeyBpZDogJ2VkaXRVc2VyTW9kYWwnIH0pO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2codGhpcy5lZGl0VXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogYW55LCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhOiAnLCBkYXRhLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ3VwZGF0ZXVzZXInLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdCd1c2VySWQnOiB1c2VySWQsXHJcblx0XHRcdFx0XHQndXNlckRhdGEnOiBkYXRhXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YSBzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5oaWRlRWRpdFBvcHVwKCk7XHJcblxyXG5cdFx0XHRcdGlmIChyZXNwb25zZS5yZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIHVwZGF0aW5nIHVzZXIgaW5mb3JtYXRpb24uIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZUVkaXRQb3B1cChldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLWVkaXQtbW9kYWwnLCB7IGlkOiAnZWRpdFVzZXJNb2RhbCcgfSk7XHJcblx0XHRcdHRoaXMuZWRpdFVzZXJEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdHVzZXJEYXRhOiB7fSxcclxuXHRcdFx0XHR1c2VySWQ6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRGVsZXRlIHVzZXIgY29kZWZsb3dcclxuXHRcdCovXHJcblx0XHRkZWxldGVVc2VyQ2xpY2soZXZlbnQ6IEV2ZW50LCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSB1c2VyPycsXHJcblx0XHRcdFx0Ym9keTogJ1BsZWFzZSBjb25maXJtLCB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHVzZXInLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0c2hvd0J0bjI6IHRydWUsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZVVzZXJDb25maXJtLmJpbmQodGhpcywgdXNlcklkKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGVVc2VyQ29uZmlybSh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2RlbGV0ZVVzZXJDb25maXJtLCB1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZGVsZXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdGlmIChyZXNwb25zZS5yZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmhpZGVNb2RhbERpYWxvZ3VlKCk7XHJcblx0XHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIGRlbGV0aW5nIHVzZXIuIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtbW9kYWwnLCB7IGlkOiAnbW9kYWxEaWFsb2d1ZScgfSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICcnLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKG9yZGVyQnk6IGFueSkge1xyXG5cdFx0XHRpZiAob3JkZXJCeSA9PT0gdGhpcy5zb3J0T3JkZXIpIHtcclxuXHRcdFx0XHR0aGlzLnNvcnRPcmRlciA9ICctJyArIG9yZGVyQnk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSBvcmRlckJ5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2Vyc0xpc3RDb250cm9sbGVyJywgYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQWRkVXNlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBBZGRVc2VySW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgdmFsaWRFbWFpbDogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgbW9kYWxEaWFsb2d1ZTogTW9kYWxEaWFsb2d1ZUludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0J0FQSVNlcnZpY2UnLFxyXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkc2NvcGUuJG9uKCdhZGQtdXNlcicsIGZ1bmN0aW9uKGV2ZW50LCBhcmdzKSB7XHJcblx0XHRcdFx0dGhpcy5hZGRVc2VyKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5hcHBDb25maWcgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQ7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnVzZXJEYXRhRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSB0aGlzLnV0aWxzU2VydmljZS52YWxpZGF0ZUVtYWlsKHZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVGb3JtKCkge1xyXG5cdFx0XHQvLyBtYWtlIG51bGwgdW5kZWZpbmVkIGNoZWNrcyBoZXJlXHJcblx0XHRcdGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5maXJzdG5hbWUpIHx8IHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmxhc3RuYW1lKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLW5hbWUnKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEuZW1haWwpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tZW1haWwnKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEucGhvbmVudW1iZXIpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tcGhvbmVudW1iZXInKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEubG9jYXRpb24pKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tbG9jYXRpb24nKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z290b1VzZXJMaXN0KCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnYWRkIHVzZXI6ICcsIHRoaXMudXNlckRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcclxuXHRcdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdhZGR1c2VyJyxcclxuXHRcdFx0XHRcdGRhdGE6IHRoaXMudXNlckRhdGFcclxuXHRcdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3N1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcCAmJiByZXNwb25zZS5yZXNwID09PSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2VtYWlsSW5Vc2UnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZ290b1VzZXJMaXN0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHVzZXJEYXRhRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy51c2VyRGF0YSA9IHtcclxuXHRcdFx0XHQnZmlyc3RuYW1lJzogJycsXHJcblx0XHRcdFx0J2xhc3RuYW1lJzogJycsXHJcblx0XHRcdFx0J2VtYWlsJzogJycsXHJcblx0XHRcdFx0J3Bob25lbnVtYmVyJzogJycsXHJcblx0XHRcdFx0J2xvY2F0aW9uJzogJ0lOJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKSB7XHJcblx0XHRcdGxldCB0aXRsZTogc3RyaW5nID0gJycsXHJcblx0XHRcdFx0Ym9keTogc3RyaW5nID0gJyc7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGVycm9yVHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2VtYWlsSW5Vc2UnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdFbWFpbCBJRCBpcyBhbHJlYWR5IGluIHVzZSwgcGxlYXNlIGVudGVyIGEgdW5pcXVlIEVtYWlsIGFkZHJlc3MnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLW5hbWUnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgRmlyc3QgbmFtZS9MYXN0IG5hbWUnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLWVtYWlsJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHRoZSBlbWFpbCBhZGRyZXNzJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1waG9uZW51bWJlcic6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCBwaG9uZSBudW1iZXInO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLWxvY2F0aW9uJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBzZWxlY3QgbG9jYXRpb24nO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogdGl0bGUsXHJcblx0XHRcdFx0Ym9keTogYm9keSxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLW1vZGFsJywgeyBpZDogJ21vZGFsRGlhbG9ndWUnIH0pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdBZGRVc2VyQ29udHJvbGxlcicsIGFwcC5BZGRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBFZGl0VXNlckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0VkaXRVc2VyQ29udHJvbGxlcicsIGFwcC5FZGl0VXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJywgYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJGb3JtQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlckZvcm1Db250cm9sbGVyJywgYXBwLlVzZXJGb3JtQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckNvbnRyb2xsZXIge1xyXG5cdFx0c29ydEZ1bmM6IEZ1bmN0aW9uO1xyXG5cdFx0ZGVmYXVsdENsYXNzOiBzdHJpbmc7XHJcblx0XHRsYXN0U29ydE9yZGVyOiBzdHJpbmc7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJGVsZW1lbnQnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0dGhpcy5kZWZhdWx0Q2xhc3MgPSAnYXJyb3cgYXJyb3ctZG93bic7XHJcblx0XHRcdHRoaXMubGFzdFNvcnRPcmRlciA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy11cCc7XHJcblx0XHRcdGlmIChhbmd1bGFyLmVsZW1lbnQoZXZlbnQudGFyZ2V0KS5maW5kKCdzcGFuJykuaGFzQ2xhc3MoJ2Fycm93LXVwJykpIHtcclxuXHRcdFx0XHRuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMubGFzdFNvcnRPcmRlciAhPT0gc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KCcjaGVhZGluZ18nICsgdGhpcy5sYXN0U29ydE9yZGVyKS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyh0aGlzLmRlZmF1bHRDbGFzcyk7XHJcblx0XHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gc29ydE9yZGVyO1xyXG5cdFx0XHR9XHJcblx0XHRcdGFuZ3VsYXIuZWxlbWVudChldmVudC50YXJnZXQpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKG5ld0NsYXNzKTtcclxuXHJcblx0XHRcdHRoaXMuc29ydEZ1bmMoe1xyXG5cdFx0XHRcdCdvcmRlckJ5Jzogc29ydE9yZGVyXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdUYWJsZUhlYWRlckNvbnRyb2xsZXInLCBhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0VXNlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdHVzZXJJZDogJz0nLFxyXG5cdFx0XHRoaWRlUG9wdXA6ICcmJyxcclxuXHRcdFx0dXBkYXRlRGF0YTogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnRWRpdFVzZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1lZGl0LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4oICgpID0+IG5ldyBFZGl0VXNlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2VkaXRVc2VyJywgYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0aXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdGJvZHk6ICc9JyxcclxuXHRcdFx0YnRuMVR4dDogJz0nLFxyXG5cdFx0XHRidG4yVHh0OiAnPScsXHJcblx0XHRcdHNob3dCdG4yOiAnPScsXHJcblx0XHRcdGJ0bjFDYWxsYmFjazogJyYnLFxyXG5cdFx0XHRidG4yQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogJyYnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuaWQpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuaWQpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ21vZGFsRGlhbG9ndWUnLCBhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFVzZXJGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHR1c2VySWQ6ICc9JyxcclxuXHRcdFx0ZWRpdE1vZGU6ICc9JyxcclxuXHRcdFx0dmFsaWRhdGVFbWFpbDogJyYnLFxyXG5cdFx0XHRmb3JtU3VibWl0OiAnJicsXHJcblx0XHRcdGRpc2NhcmRGb3JtOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VyRm9ybUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VyRm9ybURpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3VzZXJGb3JtJywgYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYmxlSGVhZGluZzogJz0nLFxyXG5cdFx0XHRzb3J0RnVuYzogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVGFibGVIZWFkZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3RhYmxlSGVhZGVyJywgYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQVBJU2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHRcdGh0dHBTZXJ2aWNlOiBuZy5JSHR0cFNlcnZpY2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKSB7XHJcblx0XHRcdHRoaXMuaHR0cFNlcnZpY2UgPSAkaHR0cDtcclxuXHRcdH1cclxuXHJcbiAgICAgICAgZ2V0Q2FsbChwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRsZXQgY29uZmlnID0gcGFyYW1zLmNvbmZpZyB8fCB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KHBhcmFtcy51cmwsIHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3N0Q2FsbChwYXJhbXM6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KHBhcmFtcy51cmwsIHBhcmFtcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gXHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0FQSVNlcnZpY2UnLCBhcHAuQVBJU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG4gICAgICAgIGJyb2FkY2FzdEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGV2ZW50TmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdTaGFyZWRTZXJ2aWNlJywgYXBwLlNoYXJlZFNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFV0aWxzU2VydmljZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAgICAgZ2V0RGF0YVR5cGUob2JqOiBhbnkpIHtcclxuXHRcdFx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChvYmopLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aXNOdWxsVW5kZWZpbmVkKHZhbDogYW55LCB2YWxpZGF0ZVplcm9OYU4/OiBCb29sZWFuKSB7XHJcblx0XHRcdGxldCBpc051bGw6IEJvb2xlYW4gPSBmYWxzZSxcclxuXHRcdFx0XHR0eXBlID0gdGhpcy5nZXREYXRhVHlwZSh2YWwpO1xyXG5cclxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnW29iamVjdCBhcnJheV0nOlxyXG5cdFx0XHRcdFx0aWYgKHZhbC5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdbb2JqZWN0IG9iamVjdF0nOlxyXG5cdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHZhbCkgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gXCJcIiB8fCB2YWwgPT09IFwibnVsbFwiIHx8IHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2YWxpZGF0ZVplcm9OYU4gJiYgKHZhbCA9PT0gMCB8fCBpc05hTih2YWwpKSkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpc051bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xvbmUob2JqOiBhbnkpIHtcclxuXHRcdFx0aWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZiAob2JqKSAhPSAnb2JqZWN0JylcclxuXHRcdFx0XHRyZXR1cm4gb2JqO1xyXG5cclxuXHRcdFx0dmFyIHRlbXAgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XHJcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopXHJcblx0XHRcdFx0dGVtcFtrZXldID0gdGhpcy5jbG9uZShvYmpba2V5XSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGVtcDtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBCb29sZWFuIHtcclxuXHRcdFx0dmFyIGVtYWlsUmVnZXhwID0gL15bYS16MC05ISMkJSYnKitcXC89P15fYHt8fX4uLV0rQFthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KFxcLlthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KSokL2k7XHJcblxyXG5cdFx0XHRpZiAoZW1haWwgJiYgZW1haWxSZWdleHAudGVzdChlbWFpbCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoYXJyW2ldW3Byb3BOYW1lXSA9PSBwcm9wVmFsdWUpIHJldHVybiBhcnJbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRsb2coLi4ubXNnOiBhbnlbXSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ1V0aWxzU2VydmljZScsIGFwcC5VdGlsc1NlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9qcXVlcnkvanF1ZXJ5LmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FwcC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvbW9kdWxlcy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29uc3RhbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25maWcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3JvdXRlLWhhbmRsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3VzZXItbGlzdC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9hcHAtY29uZmlnLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy91c2VyLWRhdGEuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2hlYWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZWRpdC11c2VyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9tb2RhbC1kaWFsb2d1ZS5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvdXNlcnMtbGlzdC5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItZm9ybS5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9hcGkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL3V0aWxzLnNlcnZpY2UudHMnIC8+XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHRleHBvcnQgdmFyIGZvcm1BcHAgPSBhbmd1bGFyLm1vZHVsZSgnZm9ybUFwcCcsIFsnbmdSb3V0ZScsICdjb250cm9sbGVycycsICdzZXJ2aWNlcycsICdkaXJlY3RpdmVzJ10pO1xyXG5cclxuXHRmb3JtQXBwLmNvbmZpZyhDb25maWcpO1xyXG4gICAgZm9ybUFwcC5ydW4oWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdTaGFyZWRTZXJ2aWNlJywgUm91dGVIYW5kbGVyXSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
