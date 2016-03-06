/// <reference path='_all.ts' />
var app;
(function (app) {
    app.formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services', 'directives']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', 'SharedService', app.RouteHandler]);
})(app || (app = {}));


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
                    // serverUrl: 'http://localhost:8080/',
                    serverUrl: 'https://user-management-881512.herokuapp.com',
                    templateUrl: '../templates/'
                };
            },
            enumerable: true,
            configurable: true
        });
        return Constants;
    }());
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
    }());
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
    }());
    app.RouteHandler = RouteHandler;
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
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
    }());
    app.HeaderController = HeaderController;
})(app || (app = {}));
controllers.controller('HeaderController', app.HeaderController);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UsersListController = (function () {
        function UsersListController($scope, $location, apiService, utilsService, sharedService, checkboxHandlerService) {
            this.$scope = $scope;
            this.$location = $location;
            this.apiService = apiService;
            this.utilsService = utilsService;
            this.sharedService = sharedService;
            this.checkboxHandlerService = checkboxHandlerService;
            console.log('usersList constructor');
            this.appConfig = app.Constants.Default;
            this.sortOrder = '-id_member';
            this.usersList = [];
            this.getUsers();
            this.editUserDefault();
            this.modalDialogueDefault();
            this.infoSliderDefault();
            this.createtableHeading();
        }
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
        * Action buttons handling
        */
        UsersListController.prototype.actionHandler = function (type, userId, userData) {
            switch (type) {
                case 'edit':
                    this.editUserClick(userId);
                    break;
                case 'delete':
                    this.deleteUserClick(userId);
                    break;
                case 'save':
                    this.updateUserData(userData, userId);
                    break;
            }
        };
        /*
        * Edit user code flow
        */
        UsersListController.prototype.validateEmail = function (val) {
            this.utilsService.log('validateEmail');
        };
        UsersListController.prototype.editUserClick = function (userId) {
            this.utilsService.log('userId: ', userId);
            this.editUser = {
                isVisible: true,
                title: 'Edit details',
                userData: this.utilsService.clone(this.utilsService.getObjectFromArr(this.usersList, 'id_member', userId)),
                userId: userId
            };
            this.sharedService.broadcastEvent('show-edit-modal', {});
            this.utilsService.log(this.editUser);
        };
        UsersListController.prototype.updateUserData = function (data, userId) {
            var _this = this;
            this.utilsService.log('updateUserData: ', data);
            this.utilsService.log('userId: ', userId);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'updateuser',
                'data': {
                    'userId': userId,
                    'userData': {
                        email: data.email,
                        firstname: data.firstname,
                        id_member: data.id_member,
                        lastname: data.lastname,
                        location: data.location,
                        phonenumber: data.phonenumber
                    }
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (response) {
                _this.utilsService.log('updateUserData success: ', response);
                _this.onUserUpdateResp(response.resp);
            }).error(function (response) {
                _this.utilsService.log('updateUserData error: ', response);
            });
        };
        UsersListController.prototype.onUserUpdateResp = function (resp) {
            this.hideEditPopup();
            if (resp === true) {
                this.showInfoSlider({
                    title: 'User updated',
                    body: 'User info has been updated successfully',
                    startTimer: 500,
                    endTimer: 4000
                });
                this.getUsers();
            }
            else {
                this.modalDialogue = {
                    isVisible: true,
                    title: 'Error!',
                    body: 'We have encountered error while updating user information. Please try again',
                    btn1Txt: 'Ok',
                    btn2Txt: '',
                    showBtn2: false,
                    btn1Callback: this.hideModalDialogue.bind(this),
                    btn2Callback: function () { },
                    closeBtnCallback: this.hideModalDialogue.bind(this),
                };
                this.sharedService.broadcastEvent('show-modal', {});
            }
        };
        /*
        * Delete user codeflow
        */
        UsersListController.prototype.deleteUserClick = function (userId) {
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
            this.sharedService.broadcastEvent('show-modal', {});
        };
        UsersListController.prototype.deleteUserConfirm = function (userId) {
            var _this = this;
            this.utilsService.log('deleteUserConfirm, userId: ', userId);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteuser',
                data: {
                    'userId': userId
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (response) {
                _this.utilsService.log('success: ', response);
                _this.onUserDeleted(response.resp);
            }).error(function (response) {
                _this.utilsService.log('error: ', response);
            });
        };
        UsersListController.prototype.onUserDeleted = function (resp) {
            if (resp === true) {
                this.hideModalDialogue();
                this.showInfoSlider({
                    title: 'User deleted',
                    body: 'User has been deleted successfully',
                    startTimer: 500,
                    endTimer: 4000
                });
                this.getUsers();
            }
            else {
                this.modalDialogue = {
                    isVisible: true,
                    title: 'Error!',
                    body: 'We have encountered error while deleting user. Please try again',
                    btn1Txt: 'Ok',
                    btn2Txt: '',
                    showBtn2: false,
                    btn1Callback: this.hideModalDialogue.bind(this),
                    btn2Callback: function () { },
                    closeBtnCallback: this.hideModalDialogue.bind(this),
                };
            }
        };
        /*
        * Delete all users codeflow
        */
        UsersListController.prototype.deleteAll = function ($event) {
            console.log('deleteAll');
            this.modalDialogue = {
                isVisible: true,
                title: 'Delete all users?',
                body: 'Please confirm, you want to delete all users',
                btn1Txt: 'Ok',
                btn2Txt: 'Cancel',
                showBtn2: true,
                btn1Callback: this.deleteAllUsersConfirm.bind(this),
                btn2Callback: this.hideModalDialogue.bind(this),
                closeBtnCallback: this.hideModalDialogue.bind(this),
            };
            this.sharedService.broadcastEvent('show-modal', {});
        };
        UsersListController.prototype.deleteAllUsersConfirm = function (userId) {
            var _this = this;
            this.utilsService.log('deleteUserConfirm, userId: ', userId);
            var userIds = [];
            for (var i = 0, len = this.usersList.length; i < len; i++) {
                userIds.push(this.usersList[i].id_member);
            }
            console.log(userIds);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteallusers',
                data: {
                    'userIds': userIds
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (response) {
                _this.utilsService.log('success: ', response);
                _this.onAllUsersDeleted(response.resp);
            }).error(function (response) {
                _this.utilsService.log('error: ', response);
            });
        };
        UsersListController.prototype.onAllUsersDeleted = function (resp) {
            if (resp === true) {
                this.hideModalDialogue();
                this.showInfoSlider({
                    title: 'All users deleted',
                    body: 'All Users are deleted successfully',
                    startTimer: 500,
                    endTimer: 4000
                });
                this.getUsers();
            }
            else {
                this.modalDialogue = {
                    isVisible: true,
                    title: 'Error!',
                    body: 'We have encountered error while deleting users. Please try again',
                    btn1Txt: 'Ok',
                    btn2Txt: '',
                    showBtn2: false,
                    btn1Callback: this.hideModalDialogue.bind(this),
                    btn2Callback: function () { },
                    closeBtnCallback: this.hideModalDialogue.bind(this),
                };
            }
        };
        /*
        * Generic functions to hide pop ups
        * to show info slider etc
        */
        UsersListController.prototype.hideEditPopup = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-edit-modal', {});
            this.editUserDefault();
        };
        UsersListController.prototype.hideModalDialogue = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-modal', {});
            this.modalDialogueDefault();
        };
        UsersListController.prototype.manageSortOrder = function (orderBy) {
            if (orderBy === this.sortOrder) {
                this.sortOrder = '-' + orderBy;
            }
            else {
                this.sortOrder = orderBy;
            }
        };
        UsersListController.prototype.showInfoSlider = function (params) {
            var _this = this;
            this.infoSlider = {
                title: params.title,
                body: params.body
            };
            setTimeout(function () {
                _this.sharedService.broadcastEvent('show-info-slider', {});
            }, params.startTimer);
            setTimeout(function () {
                _this.hideInfoSlider();
            }, params.endTimer);
        };
        UsersListController.prototype.hideInfoSlider = function () {
            this.sharedService.broadcastEvent('hide-info-slider', {});
            this.infoSliderDefault();
        };
        /*
        * Functions to set deafult values for different configs
        */
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
                }
            ];
        };
        UsersListController.prototype.editUserDefault = function () {
            this.editUser = {
                isVisible: false,
                title: '',
                userData: {},
                userId: ''
            };
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
        UsersListController.prototype.infoSliderDefault = function () {
            this.infoSlider = {
                title: '',
                body: ''
            };
        };
        UsersListController.$inject = [
            '$scope',
            '$location',
            'APIService',
            'UtilsService',
            'SharedService',
            'CheckboxHandlerService'
        ];
        return UsersListController;
    }());
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
                    data: this.userData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
            this.sharedService.broadcastEvent('show-modal', {});
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
            this.sharedService.broadcastEvent('hide-modal', {});
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
    }());
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
    }());
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
    }());
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
        UserFormController.prototype.onFormSubmit = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.formSubmit({ data: this.userData, userDataId: this.userDataId });
        };
        return UserFormController;
    }());
    app.UserFormController = UserFormController;
})(app || (app = {}));
controllers.controller('UserFormController', app.UserFormController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var TableHeaderController = (function () {
        function TableHeaderController($element, $sce, checkboxHandlerService) {
            this.$element = $element;
            this.$sce = $sce;
            this.checkboxHandlerService = checkboxHandlerService;
            this.defaultClass = 'arrow arrow-down';
            this.lastSortOrder = '';
        }
        TableHeaderController.prototype.manageSortOrder = function (event, sortOrder) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            var newClass = 'arrow arrow-up', target = event.target;
            if (this.$element.find(target).find('span').hasClass('arrow-up')) {
                newClass = 'arrow arrow-down';
            }
            if (this.lastSortOrder !== sortOrder) {
                this.$element.find('#heading_' + this.lastSortOrder).find('span').removeClass().addClass(this.defaultClass);
                this.lastSortOrder = sortOrder;
            }
            this.$element.find(target).find('span').removeClass().addClass(newClass);
            this.sortFunc({
                'orderBy': sortOrder
            });
        };
        TableHeaderController.$inject = [
            '$element',
            '$sce',
            'CheckboxHandlerService'
        ];
        return TableHeaderController;
    }());
    app.TableHeaderController = TableHeaderController;
})(app || (app = {}));
controllers.controller('TableHeaderController', app.TableHeaderController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var InfoSliderController = (function () {
        function InfoSliderController() {
        }
        return InfoSliderController;
    }());
    app.InfoSliderController = InfoSliderController;
})(app || (app = {}));
controllers.controller('InfoSliderController', app.InfoSliderController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserInfoController = (function () {
        function UserInfoController($scope, $timeout, $element, docEventService, utilsService, checkboxHandlerService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$element = $element;
            this.docEventService = docEventService;
            this.utilsService = utilsService;
            this.checkboxHandlerService = checkboxHandlerService;
            this.readOnlyMode = true;
            this.checkboxSelected = false;
            this.userEditDataDefault();
            this.$scope.$on('check-all', function (event, params) {
                _this.onCheckboxClicked(null, params);
            });
            /*this.$scope.$on('checkbox-counter-changed', (event, params: any) => {
                this.onCheckboxCounterChanged(event, params);
            });*/
        }
        UserInfoController.prototype.startEditMode = function ($event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.readOnlyMode) {
                this.readOnlyMode = false;
                this.docEventService.bindKeyboardEvent(this.cancelEditMode.bind(this));
                this.docEventService.bindMouseEvent(this.onMouseClick.bind(this));
            }
        };
        UserInfoController.prototype.cancelEditMode = function (event, noreset) {
            var _this = this;
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.docEventService.unbindKeyboardEvent();
            this.docEventService.unbindMouseEvent();
            this.readOnlyMode = true;
            /*if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                this.$scope.$apply();
            }*/
            if (!noreset) {
                this.$element.find('#firstname').val(this.userData.firstname);
                this.$element.find('#lastname').val(this.userData.lastname);
                this.$element.find('#location').val(this.userData.location);
                this.$timeout(function () {
                    _this.$scope.$apply();
                });
            }
        };
        UserInfoController.prototype.onMouseClick = function (event) {
            var target = event.target;
            var tagName = target.tagName.toLowerCase();
            if ((tagName !== 'input' && tagName !== 'select') || (this.$element.find(target).length === 0)) {
                this.cancelEditMode(event);
            }
        };
        UserInfoController.prototype.actionCallback = function (event, type, userId) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (type === 'save') {
                if (this.validateForm()) {
                    var userData = {
                        id_member: this.userData.id_member,
                        firstname: this.userEditData.firstname,
                        lastname: this.userEditData.lastname,
                        email: this.userData.email,
                        phonenumber: this.userData.phonenumber,
                        location: this.userEditData.location
                    };
                    this.cancelEditMode(null, true);
                }
                else {
                    this.userEditDataDefault();
                    return false;
                }
            }
            this.actionHandler({ type: type, userId: userId, userData: userData });
        };
        UserInfoController.prototype.validateForm = function () {
            var firstname = this.userEditData.firstname, lastname = this.userEditData.lastname, location = this.userEditData.location;
            if (this.utilsService.isNullUndefined(firstname) ||
                this.utilsService.isNullUndefined(lastname) ||
                this.utilsService.isNullUndefined(location)) {
                return false;
            }
            return true;
        };
        UserInfoController.prototype.userEditDataDefault = function () {
            this.userEditData = {
                firstname: this.userData.firstname,
                lastname: this.userData.lastname,
                location: this.userData.location
            };
        };
        UserInfoController.prototype.onCheckboxClicked = function (event, params) {
            var changed = false;
            if (event) {
                changed = true;
            }
            else if ((params && params.state !== this.checkboxSelected)) {
                this.checkboxSelected = params.state;
                changed = true;
            }
            if (changed) {
                this.checkboxHandlerService.manageCheckboxCounter(this.checkboxSelected);
            }
        };
        UserInfoController.$inject = [
            '$scope',
            '$timeout',
            '$element',
            'DocEventService',
            'UtilsService',
            'CheckboxHandlerService'
        ];
        return UserInfoController;
    }());
    app.UserInfoController = UserInfoController;
})(app || (app = {}));
controllers.controller('UserInfoController', app.UserInfoController);


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
        EditUserDirective.prototype.link = function (scope, element) {
            scope.$on('show-edit-modal', function (event) {
                element.find('#editUserModal').modal('show');
            });
            scope.$on('hide-edit-modal', function (event) {
                element.find('#editUserModal').modal('hide');
            });
        };
        EditUserDirective.factory = function () {
            return (function () { return new EditUserDirective(); });
        };
        return EditUserDirective;
    }());
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
        ModalDialogueDirective.prototype.link = function (scope, element) {
            scope.$on('show-modal', function (event) {
                element.find('#modalDialogue').modal('show');
            });
            scope.$on('hide-modal', function (event, params) {
                element.find('#modalDialogue').modal('hide');
            });
        };
        ModalDialogueDirective.factory = function () {
            return (function () { return new ModalDialogueDirective(); });
        };
        return ModalDialogueDirective;
    }());
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
    }());
    app.UserFormDirective = UserFormDirective;
})(app || (app = {}));
directives.directive('userForm', app.UserFormDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var TableHeaderDirective = (function () {
        function TableHeaderDirective($compile, $parse) {
            this.$compile = $compile;
            this.$parse = $parse;
            this.restrict = 'E';
            this.scope = {
                tableHeading: '=',
                sortFunc: '&',
                checkAll: '&',
                deleteAll: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/table-header.directive.html';
            this.controller = 'TableHeaderController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        TableHeaderDirective.factory = function () {
            var directive = function ($compile, $parse) { return new TableHeaderDirective($compile, $parse); };
            directive.$inject = ['$compile', '$parse'];
            return directive;
        };
        return TableHeaderDirective;
    }());
    app.TableHeaderDirective = TableHeaderDirective;
})(app || (app = {}));
directives.directive('tableHeader', app.TableHeaderDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var InfoSliderDirective = (function () {
        function InfoSliderDirective() {
            // private timer: number;
            this.restrict = 'E';
            this.scope = {
                title: '=',
                body: '='
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/info-slider.directive.html';
            this.controller = 'InfoSliderController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        InfoSliderDirective.prototype.link = function (scope, element) {
            scope.$on('show-info-slider', function (event) {
                element.find('#infoSlider').modal('show');
            });
            scope.$on('hide-info-slider', function (event) {
                element.find('#infoSlider').modal('hide');
            });
        };
        InfoSliderDirective.factory = function () {
            return (function () { return new InfoSliderDirective(); });
        };
        return InfoSliderDirective;
    }());
    app.InfoSliderDirective = InfoSliderDirective;
})(app || (app = {}));
directives.directive('infoSlider', app.InfoSliderDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserInfoDirective = (function () {
        function UserInfoDirective() {
            // private timer: number;
            this.restrict = 'E';
            this.scope = {
                userData: '=',
                actionHandler: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/user-info.directive.html';
            this.controller = 'UserInfoController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        UserInfoDirective.prototype.link = function (scope, element) { };
        UserInfoDirective.factory = function () {
            return (function () { return new UserInfoDirective(); });
        };
        return UserInfoDirective;
    }());
    app.UserInfoDirective = UserInfoDirective;
})(app || (app = {}));
directives.directive('userInfo', app.UserInfoDirective.factory());


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
            return this.httpService.post(params.url, params.data, {
                headers: params.headers
            });
        };
        APIService.$inject = ['$http'];
        return APIService;
    }());
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
    }());
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
    }());
    app.UtilsService = UtilsService;
})(app || (app = {}));
services.service('UtilsService', app.UtilsService);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var DocEventService = (function () {
        function DocEventService($document) {
            this.$document = $document;
        }
        DocEventService.prototype.bindMouseEvent = function (callback) {
            this.$document.on('click', function (event) {
                callback(event);
            });
        };
        DocEventService.prototype.bindKeyboardEvent = function (callback) {
            this.$document.on('keydown keypress', function (event) {
                if (event.which === 27) {
                    callback(event);
                }
            });
        };
        DocEventService.prototype.unbindMouseEvent = function () {
            this.$document.off('click');
        };
        DocEventService.prototype.unbindKeyboardEvent = function () {
            this.$document.off('keydown keypress');
        };
        DocEventService.$inject = [
            '$document'
        ];
        return DocEventService;
    }());
    app.DocEventService = DocEventService;
})(app || (app = {}));
services.service('DocEventService', app.DocEventService);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var CheckboxHandlerService = (function () {
        function CheckboxHandlerService(sharedService) {
            this.sharedService = sharedService;
            this.checkboxCounter = 0;
            this.selectedAll = false;
        }
        CheckboxHandlerService.prototype.checkAll = function () {
            // console.log('checkAll');
            // console.log(this);
            this.selectedAll = !this.selectedAll;
            this.sharedService.broadcastEvent('check-all', { state: this.selectedAll });
        };
        CheckboxHandlerService.prototype.manageCheckboxCounter = function (isChecked) {
            if (isChecked) {
                this.checkboxCounter++;
            }
            else {
                this.checkboxCounter--;
            }
            if (this.checkboxCounter < 0) {
                this.checkboxCounter = 0;
            }
            // console.log('checkboxCounter: ', this.checkboxCounter); 
        };
        CheckboxHandlerService.$inject = [
            'SharedService'
        ];
        return CheckboxHandlerService;
    }());
    app.CheckboxHandlerService = CheckboxHandlerService;
})(app || (app = {}));
services.service('CheckboxHandlerService', app.CheckboxHandlerService);


/// <reference path='../bower_components/DefinitelyTyped/jquery/jquery.d.ts' />
/// <reference path='../bower_components/DefinitelyTyped/angularjs/angular.d.ts' />
/// <reference path="../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts" />
/// <reference path='app.ts' />
/// <reference path='ts/modules.ts' />
/// <reference path='ts/constants.ts' />
/// <reference path='ts/config.ts' />
/// <reference path='ts/route-handler.ts' />
/// <reference path='ts/interfaces/controllers/user-list.interface.ts' />
/// <reference path='ts/interfaces/controllers/add-user.interface.ts' />
/// <reference path='ts/interfaces/controllers/header.interface.ts' />
/// <reference path='ts/interfaces/controllers/table-header.interface.ts' />
/// <reference path='ts/interfaces/controllers/user-form.interface.ts' />
/// <reference path='ts/interfaces/controllers/user-info.interface.ts' />
/// <reference path='ts/interfaces/directives/user-info.interface.ts' />
/// <reference path='ts/interfaces/data/app-config.interface.ts' />
/// <reference path='ts/interfaces/data/user-data.interface.ts' />
/// <reference path='ts/interfaces/data/edit-user.interface.ts' />
/// <reference path='ts/interfaces/data/modal-dialogue.interface.ts' />
/// <reference path='ts/interfaces/data/info-slider.interface.ts' />
/// <reference path='ts/interfaces/data/table-heading.interface.ts' />
/// <reference path='ts/interfaces/data/header-buttons.interface.ts' />
/// <reference path='ts/interfaces/services/api.interface.ts' />
/// <reference path='ts/interfaces/services/doc-event.interface.ts' />
/// <reference path='ts/interfaces/services/shared.interface.ts' />
/// <reference path='ts/interfaces/services/utils.interface.ts' />
/// <reference path='ts/controllers/header.controller.ts' />
/// <reference path='ts/controllers/users-list.controller.ts' />
/// <reference path='ts/controllers/add-user.controller.ts' />
/// <reference path='ts/controllers/directives/edit-user.controller.ts' />
/// <reference path='ts/controllers/directives/modal-dialogue.controller.ts' />
/// <reference path='ts/controllers/directives/user-form.controller.ts' />
/// <reference path='ts/controllers/directives/table-header.controller.ts' />
/// <reference path='ts/controllers/directives/info-slider.controller.ts' />
/// <reference path='ts/controllers/directives/user-info.controller.ts' />
/// <reference path='ts/directives/edit-user.directive.ts' />
/// <reference path='ts/directives/modal-dialogue.directive.ts' />
/// <reference path='ts/directives/user-form.directive.ts' />
/// <reference path='ts/directives/table-header.directive.ts' />
/// <reference path='ts/directives/info-slider.directive.ts' />
/// <reference path='ts/directives/user-info.directive.ts' />
/// <reference path='ts/services/api.service.ts' />
/// <reference path='ts/services/shared.service.ts' />
/// <reference path='ts/services/utils.service.ts' />
/// <reference path='ts/services/doc-event.service.ts' />
/// <reference path='ts/services/checkbox-handler.service.ts' />


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var TestController = (function () {
        function TestController($scope, utilsService) {
            this.$scope = $scope;
            this.utilsService = utilsService;
            this.validEmail = false;
        }
        TestController.prototype.validateEmail = function (val) {
            this.validEmail = this.utilsService.validateEmail(val);
        };
        TestController.$inject = [
            '$scope',
            'UtilsService'
        ];
        return TestController;
    }());
    app.TestController = TestController;
})(app || (app = {}));
controllers.controller('TestController', app.TestController);



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJhcHAudHMiLCJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWluZm8uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kaXJlY3RpdmVzL3VzZXItaW5mby5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvYXBwLWNvbmZpZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdGFibGUtaGVhZGluZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvaGVhZGVyLWJ1dHRvbnMuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9hcGkuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9kb2MtZXZlbnQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zaGFyZWQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy91dGlscy5pbnRlcmZhY2UudHMiLCJ0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzIiwidHMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS50cyIsInRzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy9jaGVja2JveC1oYW5kbGVyLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwidHMvY29udHJvbGxlcnMvdGVzdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdDQUFnQztBQUVoQyxJQUFPLEdBQUcsQ0FLVDtBQUxELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDQSxXQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBRXJHLFdBQU8sQ0FBQyxNQUFNLENBQUMsVUFBTSxDQUFDLENBQUM7SUFDcEIsV0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGdCQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzVFLENBQUMsRUFMTSxHQUFHLEtBQUgsR0FBRyxRQUtUOzs7QUNQRCxtQ0FBbUM7QUFFbkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDOUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7OztBQ0psRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBWVQ7QUFaRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWTtJQUVaO1FBQUE7UUFRQSxDQUFDO1FBUEEsc0JBQVcsb0JBQU87aUJBQWxCO2dCQUNDLE1BQU0sQ0FBQztvQkFDTix1Q0FBdUM7b0JBQ3ZDLFNBQVMsRUFBRSw4Q0FBOEM7b0JBQ3pELFdBQVcsRUFBRSxlQUFlO2lCQUM1QjtZQUNGLENBQUM7OztXQUFBO1FBQ0YsZ0JBQUM7SUFBRCxDQUFDO0lBUlksYUFBUyxZQVFyQjtBQUNGLENBQUMsRUFaTSxH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RSw2RUFBNkU7QUFDN0UsNEVBQTRFO0FBQzVFLDBFQUEwRTtBQUUxRSw2REFBNkQ7QUFDN0Qsa0VBQWtFO0FBQ2xFLDZEQUE2RDtBQUM3RCxnRUFBZ0U7QUFDaEUsK0RBQStEO0FBQy9ELDZEQUE2RDtBQUU3RCxtREFBbUQ7QUFDbkQsc0RBQXNEO0FBQ3RELHFEQUFxRDtBQUNyRCx5REFBeUQ7QUFDekQsZ0VBQWdFOzs7QUN0RGhFLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FzQlQ7QUF0QkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVksQ0FBQztJQUViO1FBUUMsd0JBQ1MsTUFBaUIsRUFDakIsWUFBMEI7WUFEMUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUVsQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO1FBRUQsc0NBQWEsR0FBYixVQUFjLEdBQVc7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBZGEsc0JBQU8sR0FBRztZQUN2QixRQUFRO1lBQ1IsY0FBYztTQUNkLENBQUM7UUFZSCxxQkFBQztJQUFELENBQUM7SUFsQlksa0JBQWMsaUJBa0IxQjtBQUNGLENBQUMsRUF0Qk0sR0FBRyxLQUFILEdBQUcsUUFzQlQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHRleHBvcnQgdmFyIGZvcm1BcHAgPSBhbmd1bGFyLm1vZHVsZSgnZm9ybUFwcCcsIFsnbmdSb3V0ZScsICdjb250cm9sbGVycycsICdzZXJ2aWNlcycsICdkaXJlY3RpdmVzJ10pO1xuXG5cdGZvcm1BcHAuY29uZmlnKENvbmZpZyk7XG4gICAgZm9ybUFwcC5ydW4oWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdTaGFyZWRTZXJ2aWNlJywgUm91dGVIYW5kbGVyXSk7XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxuXG52YXIgc2VydmljZXMgPSBhbmd1bGFyLm1vZHVsZSgnc2VydmljZXMnLCBbXSk7XG52YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnY29udHJvbGxlcnMnLCBbXSk7XG52YXIgZGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzJywgW10pO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0J1xuXG5cdGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xuXHRcdHN0YXRpYyBnZXQgRGVmYXVsdCgpOiBhbnkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Ly8gc2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXG5cdFx0XHRcdHNlcnZlclVybDogJ2h0dHBzOi8vdXNlci1tYW5hZ2VtZW50LTg4MTUxMi5oZXJva3VhcHAuY29tJyxcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICcuLi90ZW1wbGF0ZXMvJ1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0J1xuXG5cdGV4cG9ydCBjbGFzcyBDb25maWcge1xuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcbiAgICAgICAgICAgICckcm91dGVQcm92aWRlcidcbiAgICAgICAgXTtcblxuXHRcdGNvbnN0cnVjdG9yKCRyb3V0ZVByb3ZpZGVyOiBuZy5yb3V0ZS5JUm91dGVQcm92aWRlcikge1xuXHRcdFx0JHJvdXRlUHJvdmlkZXIud2hlbihcIi91c2Vyc2xpc3RcIiwge1xuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ3VzZXJzTGlzdC5odG1sJyxcblx0XHRcdFx0Y29udHJvbGxlcjogJ1VzZXJzTGlzdENvbnRyb2xsZXInLFxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJ1xuXHRcdFx0fSkud2hlbignL2FkZFVzZXInLCB7XG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdBZGRVc2VyQ29udHJvbGxlcicsXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2N1c3RvbUNvbnRyb2xsZXInLFxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2FkZFVzZXIuaHRtbCdcblx0XHRcdH0pLm90aGVyd2lzZSh7IHJlZGlyZWN0VG86ICcvdXNlcnNsaXN0JyB9KTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCdcblxuXHRleHBvcnQgY2xhc3MgUm91dGVIYW5kbGVyIHtcblx0XHRzdGF0aWMgaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdzaGFyZWRTZXJ2aWNlJ107XG5cblx0XHRjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgICRyb290U2NvcGU6IGFueSwgLy9uZy5JUm9vdFNjb3BlU2VydmljZSxcblx0XHRcdCRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcblx0XHRcdHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2Vcblx0XHQpIHtcblx0XHRcdCRyb290U2NvcGUuVXRpbHMgPSB7XG5cdFx0XHRcdGtleXM6IE9iamVjdC5rZXlzXG5cdFx0XHR9O1xuXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCB7XG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB7XG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VFcnJvcicsIHtcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlcnNMaXN0SW50ZXJmYWNlIHtcblx0XHRnZXRVc2VycygpOiB2b2lkO1xuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSk6IHZvaWQ7XG5cdFx0YWRkVXNlcigpOiB2b2lkO1xuXHRcdGFjdGlvbkhhbmRsZXIodHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgdXNlckRhdGE/OiBVc2VyRGF0YUludGVyZmFjZSk6IHZvaWQ7XG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZyk6IHZvaWQ7XG5cdFx0ZWRpdFVzZXJDbGljayh1c2VySWQ6IHN0cmluZyk6IHZvaWQ7XG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogVXNlckRhdGFJbnRlcmZhY2UsIHVzZXJJZDogc3RyaW5nKTogdm9pZDtcblx0XHRvblVzZXJVcGRhdGVSZXNwKHJlc3A6IEJvb2xlYW4pOiB2b2lkO1xuXHRcdGRlbGV0ZVVzZXJDbGljayhrZXk6IHN0cmluZyk6IHZvaWQ7XG5cdFx0ZGVsZXRlVXNlckNvbmZpcm0oa2V5OiBzdHJpbmcpOiB2b2lkO1xuXHRcdG9uVXNlckRlbGV0ZWQocmVzcDogQm9vbGVhbik6IHZvaWQ7XG5cdFx0aGlkZUVkaXRQb3B1cChldmVudD86IEV2ZW50KTogdm9pZDtcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KTogdm9pZDtcblx0XHRtYW5hZ2VTb3J0T3JkZXIob3JkZXJCeTogc3RyaW5nKTogdm9pZDtcblx0XHRzaG93SW5mb1NsaWRlcihwYXJhbXM6IEluZm9TbGlkZXJJbnRlcmZhY2UpOiB2b2lkO1xuXHRcdGhpZGVJbmZvU2xpZGVyKCk6IHZvaWQ7XG5cdFx0Y3JlYXRldGFibGVIZWFkaW5nKCk6IHZvaWQ7XG5cdFx0ZWRpdFVzZXJEZWZhdWx0KCk6IHZvaWQ7XG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKTogdm9pZDtcblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpOiB2b2lkO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydCBpbnRlcmZhY2UgQWRkVXNlckludGVyZmFjZSB7XG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZyk6IHZvaWQ7XG5cdFx0dmFsaWRhdGVGb3JtKCk6IEJvb2xlYW47XG5cdFx0Z290b1VzZXJMaXN0KCk6IHZvaWQ7XG5cdFx0YWRkVXNlcigpOiB2b2lkO1xuXHRcdHVzZXJEYXRhRGVmYXVsdCgpOiB2b2lkO1xuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKTogdm9pZDtcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KTogdm9pZDtcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpOiB2b2lkO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0ZXhwb3J0IGludGVyZmFjZSBIZWFkZXJJbnRlcmZhY2Uge1xuXHRcdG9uUm91dGVDaGFuZ2VTdGFydChldmVudDogRXZlbnQsIHBhcmFtczogT2JqZWN0KTogdm9pZDtcblx0XHRvblJvdXRlQ2hhbmdlU3VjY2VzcyhldmVudDogRXZlbnQsIHBhcmFtczogYW55KTogdm9pZDtcblx0XHRvblJvdXRlQ2hhbmdlRXJyb3IoZXZlbnQsIHBhcmFtcyk6IHZvaWQ7XG5cdFx0c2V0VXNlckxpc3RIZWFkZXIoKTogdm9pZDtcblx0XHRzZXRBZGRVc2VySGVhZGVyKCk6IHZvaWQ7XG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpOiB2b2lkO1xuXHRcdGdvVG9BZGRVc2VyKCk6IHZvaWQ7XG5cdFx0YWRkVXNlcigpOiB2b2lkO1xuXHRcdGdvQmFjaygpOiB2b2lkO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydCBpbnRlcmZhY2UgVGFibGVIZWFkZXJJbnRlcmZhY2Uge1xuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKTogdm9pZDtcblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJGb3JtSW50ZXJmYWNlIHtcblx0XHRvbkZvcm1TdWJtaXQoZXZlbnQ6IEV2ZW50KTogdm9pZDtcblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvSW50ZXJmYWNlIHtcblx0XHRzdGFydEVkaXRNb2RlKGV2ZW50OiBFdmVudCk6IHZvaWQ7XG5cdFx0Y2FuY2VsRWRpdE1vZGUoZXZlbnQ/OiBFdmVudCwgbm9yZXNldD86IEJvb2xlYW4pOiB2b2lkO1xuXHRcdG9uTW91c2VDbGljayhldmVudDogRXZlbnQpOiB2b2lkO1xuXHRcdGFjdGlvbkNhbGxiYWNrKGV2ZW50OiBFdmVudCwgdHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IHZvaWQ7XG5cdFx0dmFsaWRhdGVGb3JtKCk6IHZvaWQ7XG5cdH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gZXhwb3J0IGludGVyZmFjZSBJTWVudURpcmVjdGl2ZSBleHRlbmRzIG5nLklTY29wZVxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvU2NvcGVJbnRlcmZhY2UgZXh0ZW5kcyBuZy5JU2NvcGUge1xuXHRcdGN1c3RvbUNvbnRyb2xsZXI6IGFueTtcblx0XHR1c2VyRGF0YTogYW55O1xuXHRcdGFjdGlvbkhhbmRsZXI6IGFueTtcblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0J1xuXG5cdGV4cG9ydCBpbnRlcmZhY2UgYXBwQ29uZmlnSW50ZXJmYWNlIHtcblx0XHRzZXJ2ZXJVcmw6IHN0cmluZztcblx0XHR0ZW1wbGF0ZVVybDogc3RyaW5nO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0ZXhwb3J0IGludGVyZmFjZSBVc2VyRGF0YUludGVyZmFjZSB7XG5cdFx0aWRfbWVtYmVyPzogc3RyaW5nO1xuXHRcdGZpcnN0bmFtZTogc3RyaW5nO1xuXHRcdGxhc3RuYW1lOiBzdHJpbmc7XG5cdFx0ZW1haWw6IHN0cmluZztcblx0XHRwaG9uZW51bWJlcjogc3RyaW5nO1xuXHRcdGxvY2F0aW9uOiBzdHJpbmc7XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIHVzZXJFZGl0RGF0YUludGVyZmFjZSB7XG5cdFx0Zmlyc3RuYW1lOiBzdHJpbmc7XG5cdFx0bGFzdG5hbWU6IHN0cmluZztcblx0XHRsb2NhdGlvbjogc3RyaW5nO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0ZXhwb3J0IGludGVyZmFjZSBFZGl0VXNlckludGVyZmFjZSB7XG5cdFx0aXNWaXNpYmxlOiBCb29sZWFuO1xuXHRcdHRpdGxlOiBzdHJpbmc7XG5cdFx0Ly9UT0RPOiBuZWVkIHRvIGxvb2sgaW50byB0aGlzXG5cdFx0dXNlckRhdGE6IGFueTtcblx0XHR1c2VySWQ6IHN0cmluZztcblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0J1xuXG5cdGV4cG9ydCBpbnRlcmZhY2UgTW9kYWxEaWFsb2d1ZUludGVyZmFjZSB7XG5cdFx0aXNWaXNpYmxlOiBCb29sZWFuLFxuXHRcdHRpdGxlOiBzdHJpbmcsXG5cdFx0Ym9keTogc3RyaW5nLFxuXHRcdGJ0bjFUeHQ6IHN0cmluZyxcblx0XHRidG4yVHh0Pzogc3RyaW5nLFxuXHRcdHNob3dCdG4yOiBCb29sZWFuLFxuXHRcdGJ0bjFDYWxsYmFjaz86IEZ1bmN0aW9uLFxuXHRcdGJ0bjJDYWxsYmFjaz86IEZ1bmN0aW9uLFxuXHRcdGNsb3NlQnRuQ2FsbGJhY2s/OiBGdW5jdGlvbixcblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0J1xuXG5cdGV4cG9ydCBpbnRlcmZhY2UgSW5mb1NsaWRlckludGVyZmFjZSB7XG5cdFx0dGl0bGU6IHN0cmluZztcblx0XHRib2R5OiBzdHJpbmc7XG5cdFx0c3RhcnRUaW1lcj86IG51bWJlcjtcblx0XHRlbmRUaW1lcj86IG51bWJlcjtcblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0J1xuXG5cdGV4cG9ydCBpbnRlcmZhY2UgVGFibGVIZWFkaW5nSW50ZXJmYWNlIHtcblx0XHRjbGFzc05hbWU6IHN0cmluZztcblx0XHRzb3J0T3JkZXI6IHN0cmluZztcblx0XHR0ZXh0OiBzdHJpbmc7XG5cdFx0Y3VzdG9tRnVuYz86IEZ1bmN0aW9uO1xuXHRcdGN1c3RvbUhUTUw/OiBCb29sZWFuO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0ZXhwb3J0IGludGVyZmFjZSBIZWFkZXJCdXR0b25zSW50ZXJmYWNlIHtcblx0XHRzaG93QnRuOiBCb29sZWFuO1xuXHRcdGNsaWNrRnVuYzogc3RyaW5nO1xuXHRcdHRleHQ6IHN0cmluZztcblx0fVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnQgaW50ZXJmYWNlIEFQSVNlcnZpY2VJbnRlcmZhY2Uge1xuXHRcdGdldENhbGwocGFyYW1zOiBhbnkpOiBhbnk7XG5cdFx0cG9zdENhbGwocGFyYW1zOiBhbnkpOiBhbnk7XG5cdH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0IGludGVyZmFjZSBEb2NFdmVudFNlcnZpY2VJbnRlcmZhY2Uge1xuXHRcdGJpbmRNb3VzZUV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XG5cdFx0YmluZEtleWJvYXJkRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDtcblx0XHR1bmJpbmRNb3VzZUV2ZW50KCk6IHZvaWQ7XG5cdFx0dW5iaW5kS2V5Ym9hcmRFdmVudCgpOiB2b2lkO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydCBpbnRlcmZhY2UgU2hhcmVkU2VydmljZUludGVyZmFjZSB7XG5cdFx0YnJvYWRjYXN0RXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQ7XG5cdH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0IGludGVyZmFjZSBVdGlsc1NlcnZpY2VJbnRlcmZhY2Uge1xuXHRcdGdldERhdGFUeXBlKG9iajogT2JqZWN0KTogc3RyaW5nO1xuXHRcdGlzTnVsbFVuZGVmaW5lZCh2YWw6IGFueSwgdmFsaWRhdGVaZXJvTmFOPzogQm9vbGVhbik6IEJvb2xlYW47XG5cdFx0Y2xvbmUob2JqOiBhbnkpOiBhbnk7XG5cdFx0dmFsaWRhdGVFbWFpbChlbWFpbDogc3RyaW5nKTogQm9vbGVhbjtcblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpOiBhbnk7XG5cdFx0bG9nKC4uLm1zZzogYW55W10pOiB2b2lkO1xuXHR9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0ZXhwb3J0IGNsYXNzIEhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBIZWFkZXJJbnRlcmZhY2Uge1xuXHRcdGhlYWRpbmc6IHN0cmluZztcblx0XHRoZWFkZXJMZWZ0QnRuOiBIZWFkZXJCdXR0b25zSW50ZXJmYWNlO1xuXHRcdGhlYWRlclJpZ2h0QnRuOiBIZWFkZXJCdXR0b25zSW50ZXJmYWNlO1xuXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xuXHRcdFx0JyRzY29wZScsXG5cdFx0XHQnJGxvY2F0aW9uJyxcblx0XHRcdCckd2luZG93Jyxcblx0XHRcdCckbG9nJyxcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xuXHRcdF07XG5cblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcblx0XHRcdHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2UsXG5cdFx0XHRwcml2YXRlICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXG5cdFx0KSB7XG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdGFydFwiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3VjY2Vzcy5iaW5kKHRoaXMpKTtcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIHRoaXMub25Sb3V0ZUNoYW5nZUVycm9yLmJpbmQodGhpcykpO1xuXG5cdFx0XHR0aGlzLmhlYWRpbmcgPSAnVXNlciBtYW5hZ2VtZW50Jztcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxuXHRcdFx0XHQndGV4dCc6ICcnXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxuXHRcdFx0XHQndGV4dCc6ICcnXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdG9uUm91dGVDaGFuZ2VTdGFydChldmVudDogRXZlbnQsIHBhcmFtczogT2JqZWN0KSB7XG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3RhcnQ6ICcsIHBhcmFtcyk7XG5cdFx0fVxuXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSkge1xuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XG5cblx0XHRcdGlmIChwYXJhbXMubmV4dCAmJiBwYXJhbXMubmV4dC4kJHJvdXRlICYmIHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xuXHRcdFx0XHRcdGNhc2UgJ1VzZXJzTGlzdENvbnRyb2xsZXInOlxuXHRcdFx0XHRcdFx0dGhpcy5zZXRVc2VyTGlzdEhlYWRlcigpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdBZGRVc2VyQ29udHJvbGxlcic6XG5cdFx0XHRcdFx0XHR0aGlzLnNldEFkZFVzZXJIZWFkZXIoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNldFVzZXJMaXN0SGVhZGVyKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b25Sb3V0ZUNoYW5nZUVycm9yKGV2ZW50LCBwYXJhbXMpIHtcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcblx0XHR9XG5cblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpIHtcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxuXHRcdFx0XHQndGV4dCc6ICcnXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29Ub0FkZFVzZXInLFxuXHRcdFx0XHQndGV4dCc6ICdBZGQgdXNlcidcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpIHtcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvQmFjaycsXG5cdFx0XHRcdCd0ZXh0JzogJ0JhY2snXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXG5cdFx0XHRcdCd0ZXh0JzogJydcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpc1tjbGlja0Z1bmNdKSkge1xuXHRcdFx0XHR0aGlzW2NsaWNrRnVuY10oKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRnb1RvQWRkVXNlcigpIHtcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xuXHRcdH1cblxuXHRcdGFkZFVzZXIoKSB7XG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2FkZC11c2VyJywge30pO1xuXHRcdH1cblxuXHRcdGdvQmFjaygpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xuXHRcdH1cblx0fVxufVxuY29udHJvbGxlcnMuY29udHJvbGxlcignSGVhZGVyQ29udHJvbGxlcicsIGFwcC5IZWFkZXJDb250cm9sbGVyKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0IGNsYXNzIFVzZXJzTGlzdENvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2Vyc0xpc3RJbnRlcmZhY2Uge1xuXHRcdHByaXZhdGUgdXNlcnNMaXN0OiBBcnJheTxhbnk+O1xuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XG5cdFx0cHJpdmF0ZSBlZGl0VXNlcjogRWRpdFVzZXJJbnRlcmZhY2U7XG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xuXHRcdHByaXZhdGUgaW5mb1NsaWRlcjogSW5mb1NsaWRlckludGVyZmFjZTtcblx0XHRwcml2YXRlIHNvcnRPcmRlcjogc3RyaW5nO1xuXHRcdHByaXZhdGUgdGFibGVIZWFkaW5nOiBUYWJsZUhlYWRpbmdJbnRlcmZhY2VbXTtcblxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcblx0XHRcdCckc2NvcGUnLFxuXHRcdFx0JyRsb2NhdGlvbicsXG5cdFx0XHQnQVBJU2VydmljZScsXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJyxcblx0XHRcdCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJ1xuXHRcdF07XG5cblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZSxcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXG5cdFx0XHRwcml2YXRlIGNoZWNrYm94SGFuZGxlclNlcnZpY2U6IENoZWNrYm94SGFuZGxlclNlcnZpY2Vcblx0XHQpIHtcblx0XHRcdGNvbnNvbGUubG9nKCd1c2Vyc0xpc3QgY29uc3RydWN0b3InKTtcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xuXHRcdFx0dGhpcy5zb3J0T3JkZXIgPSAnLWlkX21lbWJlcic7XG5cdFx0XHR0aGlzLnVzZXJzTGlzdCA9IFtdO1xuXG5cdFx0XHR0aGlzLmdldFVzZXJzKCk7XG5cdFx0XHR0aGlzLmVkaXRVc2VyRGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jcmVhdGV0YWJsZUhlYWRpbmcoKTtcblx0XHR9XG5cblx0XHRnZXRVc2VycygpIHtcblx0XHRcdHRoaXMuYXBpU2VydmljZS5nZXRDYWxsKHtcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXG5cdFx0XHR9KS5zdWNjZXNzKChkYXRhLCBzdGF0dXMpID0+IHtcblx0XHRcdFx0dGhpcy5wcm9jZXNzU2VydmVyRGF0YShkYXRhKVxuXHRcdFx0fSkuZXJyb3IoKGRhdGEsIHN0YXR1cykgPT4ge1xuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2VycicpXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRwcm9jZXNzU2VydmVyRGF0YShkYXRhOiBhbnkpIHtcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygncHJvY2Vzc1NlcnZlckRhdGE6ICcsIGRhdGEpO1xuXG5cdFx0XHRpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QubGVuZ3RoID0gMDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRhZGRVc2VyKCkge1xuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQqIEFjdGlvbiBidXR0b25zIGhhbmRsaW5nXG5cdFx0Ki9cblx0XHRhY3Rpb25IYW5kbGVyKHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIHVzZXJEYXRhPzogVXNlckRhdGFJbnRlcmZhY2UpIHtcblx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRjYXNlICdlZGl0Jzpcblx0XHRcdFx0XHR0aGlzLmVkaXRVc2VyQ2xpY2sodXNlcklkKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdkZWxldGUnOlxuXHRcdFx0XHRcdHRoaXMuZGVsZXRlVXNlckNsaWNrKHVzZXJJZCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnc2F2ZSc6XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVVc2VyRGF0YSh1c2VyRGF0YSwgdXNlcklkKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKlxuXHRcdCogRWRpdCB1c2VyIGNvZGUgZmxvd1xuXHRcdCovXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykge1xuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd2YWxpZGF0ZUVtYWlsJyk7XG5cdFx0fVxuXG5cdFx0ZWRpdFVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XG5cblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcblx0XHRcdFx0dGl0bGU6ICdFZGl0IGRldGFpbHMnLFxuXHRcdFx0XHR1c2VyRGF0YTogdGhpcy51dGlsc1NlcnZpY2UuY2xvbmUodGhpcy51dGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFycih0aGlzLnVzZXJzTGlzdCwgJ2lkX21lbWJlcicsIHVzZXJJZCkpLFxuXHRcdFx0XHR1c2VySWQ6IHVzZXJJZFxuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1lZGl0LW1vZGFsJywge30pO1xuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKHRoaXMuZWRpdFVzZXIpO1xuXHRcdH1cblxuXHRcdHVwZGF0ZVVzZXJEYXRhKGRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlLCB1c2VySWQ6IHN0cmluZykge1xuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YTogJywgZGF0YSk7XG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcblxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICd1cGRhdGV1c2VyJyxcblx0XHRcdFx0J2RhdGEnOiB7XG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZCxcblx0XHRcdFx0XHQndXNlckRhdGEnOiB7XG5cdFx0XHRcdFx0XHRlbWFpbDogZGF0YS5lbWFpbCxcblx0XHRcdFx0XHRcdGZpcnN0bmFtZTogZGF0YS5maXJzdG5hbWUsXG5cdFx0XHRcdFx0XHRpZF9tZW1iZXI6IGRhdGEuaWRfbWVtYmVyLFxuXHRcdFx0XHRcdFx0bGFzdG5hbWU6IGRhdGEubGFzdG5hbWUsXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjogZGF0YS5sb2NhdGlvbixcblx0XHRcdFx0XHRcdHBob25lbnVtYmVyOiBkYXRhLnBob25lbnVtYmVyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgc3VjY2VzczogJywgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLm9uVXNlclVwZGF0ZVJlc3AocmVzcG9uc2UucmVzcCk7XG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YSBlcnJvcjogJywgcmVzcG9uc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0b25Vc2VyVXBkYXRlUmVzcChyZXNwOiBCb29sZWFuKSB7XG5cdFx0XHR0aGlzLmhpZGVFZGl0UG9wdXAoKTtcblxuXHRcdFx0aWYgKHJlc3AgPT09IHRydWUpIHtcblx0XHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XG5cdFx0XHRcdFx0dGl0bGU6ICdVc2VyIHVwZGF0ZWQnLFxuXHRcdFx0XHRcdGJvZHk6ICdVc2VyIGluZm8gaGFzIGJlZW4gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxuXHRcdFx0XHRcdHN0YXJ0VGltZXI6IDUwMCxcblx0XHRcdFx0XHRlbmRUaW1lcjogNDAwMFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5nZXRVc2VycygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xuXHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgdXBkYXRpbmcgdXNlciBpbmZvcm1hdGlvbi4gUGxlYXNlIHRyeSBhZ2FpbicsXG5cdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcblx0XHRcdFx0XHRidG4yVHh0OiAnJyxcblx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXG5cdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXG5cdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcblx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXG5cdFx0XHRcdH07XG5cdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKlxuXHRcdCogRGVsZXRlIHVzZXIgY29kZWZsb3dcblx0XHQqL1xuXHRcdGRlbGV0ZVVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XG5cblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSB1c2VyPycsXG5cdFx0XHRcdGJvZHk6ICdQbGVhc2UgY29uZmlybSwgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSB1c2VyJyxcblx0XHRcdFx0YnRuMVR4dDogJ09rJyxcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXG5cdFx0XHRcdHNob3dCdG4yOiB0cnVlLFxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuZGVsZXRlVXNlckNvbmZpcm0uYmluZCh0aGlzLCB1c2VySWQpLFxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcblx0XHR9XG5cblx0XHRkZWxldGVVc2VyQ29uZmlybSh1c2VySWQ6IHN0cmluZykge1xuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdkZWxldGVVc2VyQ29uZmlybSwgdXNlcklkOiAnLCB1c2VySWQpO1xuXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2RlbGV0ZXVzZXInLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLm9uVXNlckRlbGV0ZWQocmVzcG9uc2UucmVzcCk7XG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdlcnJvcjogJywgcmVzcG9uc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0b25Vc2VyRGVsZXRlZChyZXNwOiBCb29sZWFuKSB7XG5cdFx0XHRpZiAocmVzcCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHR0aGlzLmhpZGVNb2RhbERpYWxvZ3VlKCk7XG5cdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xuXHRcdFx0XHRcdHRpdGxlOiAnVXNlciBkZWxldGVkJyxcblx0XHRcdFx0XHRib2R5OiAnVXNlciBoYXMgYmVlbiBkZWxldGVkIHN1Y2Nlc3NmdWxseScsXG5cdFx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxuXHRcdFx0XHRcdGVuZFRpbWVyOiA0MDAwXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XG5cdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHRpdGxlOiAnRXJyb3IhJyxcblx0XHRcdFx0XHRib2R5OiAnV2UgaGF2ZSBlbmNvdW50ZXJlZCBlcnJvciB3aGlsZSBkZWxldGluZyB1c2VyLiBQbGVhc2UgdHJ5IGFnYWluJyxcblx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxuXHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxuXHRcdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcblx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcblx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxuXHRcdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKlxuXHRcdCogRGVsZXRlIGFsbCB1c2VycyBjb2RlZmxvd1xuXHRcdCovXG5cdFx0ZGVsZXRlQWxsKCRldmVudCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ2RlbGV0ZUFsbCcpO1xuXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcblx0XHRcdFx0dGl0bGU6ICdEZWxldGUgYWxsIHVzZXJzPycsXG5cdFx0XHRcdGJvZHk6ICdQbGVhc2UgY29uZmlybSwgeW91IHdhbnQgdG8gZGVsZXRlIGFsbCB1c2VycycsXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXG5cdFx0XHRcdGJ0bjJUeHQ6ICdDYW5jZWwnLFxuXHRcdFx0XHRzaG93QnRuMjogdHJ1ZSxcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZUFsbFVzZXJzQ29uZmlybS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcblx0XHR9XG5cblx0XHRkZWxldGVBbGxVc2Vyc0NvbmZpcm0odXNlcklkOiBzdHJpbmcpIHtcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZGVsZXRlVXNlckNvbmZpcm0sIHVzZXJJZDogJywgdXNlcklkKTtcblxuXHRcdFx0dmFyIHVzZXJJZHMgPSBbXTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMudXNlcnNMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdHVzZXJJZHMucHVzaCh0aGlzLnVzZXJzTGlzdFtpXS5pZF9tZW1iZXIpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc29sZS5sb2codXNlcklkcyk7XG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2RlbGV0ZWFsbHVzZXJzJyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdCd1c2VySWRzJzogdXNlcklkc1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLm9uQWxsVXNlcnNEZWxldGVkKHJlc3BvbnNlLnJlc3ApO1xuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdG9uQWxsVXNlcnNEZWxldGVkKHJlc3A6IEJvb2xlYW4pIHtcblx0XHRcdGlmIChyZXNwID09PSB0cnVlKSB7XG5cdFx0XHRcdHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUoKTtcblx0XHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XG5cdFx0XHRcdFx0dGl0bGU6ICdBbGwgdXNlcnMgZGVsZXRlZCcsXG5cdFx0XHRcdFx0Ym9keTogJ0FsbCBVc2VycyBhcmUgZGVsZXRlZCBzdWNjZXNzZnVsbHknLFxuXHRcdFx0XHRcdHN0YXJ0VGltZXI6IDUwMCxcblx0XHRcdFx0XHRlbmRUaW1lcjogNDAwMFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5nZXRVc2VycygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xuXHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgZGVsZXRpbmcgdXNlcnMuIFBsZWFzZSB0cnkgYWdhaW4nLFxuXHRcdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXG5cdFx0XHRcdFx0YnRuMlR4dDogJycsXG5cdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxuXHRcdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXG5cdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qXG5cdFx0KiBHZW5lcmljIGZ1bmN0aW9ucyB0byBoaWRlIHBvcCB1cHNcblx0XHQqIHRvIHNob3cgaW5mbyBzbGlkZXIgZXRjXG5cdFx0Ki9cblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpIHtcblx0XHRcdGlmIChldmVudCkge1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1lZGl0LW1vZGFsJywge30pO1xuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcblx0XHR9XG5cblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XG5cdFx0XHRpZiAoZXZlbnQpIHtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1tb2RhbCcsIHt9KTtcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcblx0XHR9XG5cblx0XHRtYW5hZ2VTb3J0T3JkZXIob3JkZXJCeTogc3RyaW5nKSB7XG5cdFx0XHRpZiAob3JkZXJCeSA9PT0gdGhpcy5zb3J0T3JkZXIpIHtcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSAnLScgKyBvcmRlckJ5O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSBvcmRlckJ5O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogSW5mb1NsaWRlckludGVyZmFjZSkge1xuXHRcdFx0dGhpcy5pbmZvU2xpZGVyID0ge1xuXHRcdFx0XHR0aXRsZTogcGFyYW1zLnRpdGxlLFxuXHRcdFx0XHRib2R5OiBwYXJhbXMuYm9keVxuXHRcdFx0fTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctaW5mby1zbGlkZXInLCB7fSk7XG5cdFx0XHR9LCBwYXJhbXMuc3RhcnRUaW1lcik7XG5cblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmhpZGVJbmZvU2xpZGVyKCk7XG5cdFx0XHR9LCBwYXJhbXMuZW5kVGltZXIpO1xuXHRcdH1cblxuXHRcdGhpZGVJbmZvU2xpZGVyKCkge1xuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLWluZm8tc2xpZGVyJywge30pO1xuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0KiBGdW5jdGlvbnMgdG8gc2V0IGRlYWZ1bHQgdmFsdWVzIGZvciBkaWZmZXJlbnQgY29uZmlnc1xuXHRcdCovXG5cdFx0Y3JlYXRldGFibGVIZWFkaW5nKCkge1xuXHRcdFx0dGhpcy50YWJsZUhlYWRpbmcgPSBbe1xuXHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcblx0XHRcdFx0J3NvcnRPcmRlcic6ICdpZF9tZW1iZXInLFxuXHRcdFx0XHQndGV4dCc6ICdTLk5vJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZmlyc3RuYW1lJyxcblx0XHRcdFx0XHQndGV4dCc6ICdGaXJzdCBuYW1lJ1xuXHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdsYXN0bmFtZScsXG5cdFx0XHRcdFx0J3RleHQnOiAnTGFzdCBuYW1lJ1xuXHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMycsXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdlbWFpbCcsXG5cdFx0XHRcdFx0J3RleHQnOiAnRW1haWwnXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ3Bob25lbnVtYmVyJyxcblx0XHRcdFx0XHQndGV4dCc6ICdQaG9uZSBOdW1iZXInXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xvY2F0aW9uJyxcblx0XHRcdFx0XHQndGV4dCc6ICdMb2NhdGlvbidcblx0XHRcdFx0fVxuXHRcdFx0XHQvKiwge1xuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEgdGV4dC1yaWdodCcsXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICcnLFxuXHRcdFx0XHRcdCd0ZXh0JzogJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1jaGVja2VkPVwiY3VzdG9tQ29udHJvbGxlci5jaGVja2JveEhhbmRsZXJTZXJ2aWNlLmNoZWNrYm94Q291bnRlclwiIC8+Jyxcblx0XHRcdFx0XHQnY3VzdG9tRnVuYyc6IHRoaXMuY2hlY2tib3hIYW5kbGVyU2VydmljZS5jaGVja0FsbC5iaW5kKHRoaXMuY2hlY2tib3hIYW5kbGVyU2VydmljZSksXG5cdFx0XHRcdFx0J2N1c3RvbUhUTUwnOiB0cnVlXG5cdFx0XHRcdH0qL1xuXHRcdFx0XTtcblx0XHR9XG5cblx0XHRlZGl0VXNlckRlZmF1bHQoKSB7XG5cdFx0XHR0aGlzLmVkaXRVc2VyID0ge1xuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxuXHRcdFx0XHR0aXRsZTogJycsXG5cdFx0XHRcdHVzZXJEYXRhOiB7fSxcblx0XHRcdFx0dXNlcklkOiAnJ1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcblx0XHRcdFx0dGl0bGU6ICcnLFxuXHRcdFx0XHRib2R5OiAnJyxcblx0XHRcdFx0YnRuMVR4dDogJycsXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpIHtcblx0XHRcdHRoaXMuaW5mb1NsaWRlciA9IHtcblx0XHRcdFx0dGl0bGU6ICcnLFxuXHRcdFx0XHRib2R5OiAnJ1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlcnNMaXN0Q29udHJvbGxlcicsIGFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0IGNsYXNzIEFkZFVzZXJDb250cm9sbGVyIGltcGxlbWVudHMgQWRkVXNlckludGVyZmFjZSB7XG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xuXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xuXHRcdFx0JyRzY29wZScsXG5cdFx0XHQnJGxvY2F0aW9uJyxcblx0XHRcdCdBUElTZXJ2aWNlJyxcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXG5cdFx0XTtcblxuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlLFxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxuXHRcdCkge1xuXHRcdFx0JHNjb3BlLiRvbignYWRkLXVzZXInLCBmdW5jdGlvbihldmVudCwgYXJncykge1xuXHRcdFx0XHR0aGlzLmFkZFVzZXIoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IGZhbHNlO1xuXHRcdFx0dGhpcy51c2VyRGF0YURlZmF1bHQoKTtcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSB0aGlzLnV0aWxzU2VydmljZS52YWxpZGF0ZUVtYWlsKHZhbCk7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVGb3JtKCkge1xuXHRcdFx0Ly8gbWFrZSBudWxsIHVuZGVmaW5lZCBjaGVja3MgaGVyZVxuXHRcdFx0aWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmZpcnN0bmFtZSkgfHwgdGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEubGFzdG5hbWUpKSB7XG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLW5hbWUnKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5lbWFpbCkpIHtcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tZW1haWwnKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5waG9uZW51bWJlcikpIHtcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tcGhvbmVudW1iZXInKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5sb2NhdGlvbikpIHtcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tbG9jYXRpb24nKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Z290b1VzZXJMaXN0KCkge1xuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcblx0XHR9XG5cblx0XHRhZGRVc2VyKCkge1xuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdhZGQgdXNlcjogJywgdGhpcy51c2VyRGF0YSk7XG5cblx0XHRcdGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XG5cdFx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XG5cdFx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdhZGR1c2VyJyxcblx0XHRcdFx0XHRkYXRhOiB0aGlzLnVzZXJEYXRhLFxuXHRcdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cblx0XHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xuXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3AgJiYgcmVzcG9uc2UucmVzcCA9PT0gJ0VtYWlsIGFscmVhZHkgaW4gdXNlJykge1xuXHRcdFx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnZW1haWxJblVzZScpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmdvdG9Vc2VyTGlzdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlOiBhbnkpID0+IHtcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZXJEYXRhRGVmYXVsdCgpIHtcblx0XHRcdHRoaXMudXNlckRhdGEgPSB7XG5cdFx0XHRcdCdmaXJzdG5hbWUnOiAnJyxcblx0XHRcdFx0J2xhc3RuYW1lJzogJycsXG5cdFx0XHRcdCdlbWFpbCc6ICcnLFxuXHRcdFx0XHQncGhvbmVudW1iZXInOiAnJyxcblx0XHRcdFx0J2xvY2F0aW9uJzogJ0lOJ1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRzaG93TW9kYWxEaWFsb2d1ZShlcnJvclR5cGU6IHN0cmluZykge1xuXHRcdFx0bGV0IHRpdGxlOiBzdHJpbmcgPSAnJyxcblx0XHRcdFx0Ym9keTogc3RyaW5nID0gJyc7XG5cblx0XHRcdHN3aXRjaCAoZXJyb3JUeXBlKSB7XG5cdFx0XHRcdGNhc2UgJ2VtYWlsSW5Vc2UnOlxuXHRcdFx0XHRcdHRpdGxlID0gJ0VtYWlsIGFscmVhZHkgaW4gdXNlJztcblx0XHRcdFx0XHRib2R5ID0gJ0VtYWlsIElEIGlzIGFscmVhZHkgaW4gdXNlLCBwbGVhc2UgZW50ZXIgYSB1bmlxdWUgRW1haWwgYWRkcmVzcyc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tbmFtZSc6XG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIEZpcnN0IG5hbWUvTGFzdCBuYW1lJztcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1lbWFpbCc6XG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHRoZSBlbWFpbCBhZGRyZXNzJztcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1waG9uZW51bWJlcic6XG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHBob25lIG51bWJlcic7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tbG9jYXRpb24nOlxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2Ugc2VsZWN0IGxvY2F0aW9uJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywge30pO1xuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXG5cdFx0XHRcdHRpdGxlOiB0aXRsZSxcblx0XHRcdFx0Ym9keTogYm9keSxcblx0XHRcdFx0YnRuMVR4dDogJ09rJyxcblx0XHRcdFx0YnRuMlR4dDogJycsXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCkge1xuXHRcdFx0aWYgKGV2ZW50KSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLW1vZGFsJywge30pO1xuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xuXHRcdH1cblxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCkge1xuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxuXHRcdFx0XHR0aXRsZTogJycsXG5cdFx0XHRcdGJvZHk6ICcnLFxuXHRcdFx0XHRidG4xVHh0OiAnJyxcblx0XHRcdFx0YnRuMlR4dDogJycsXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxufVxuY29udHJvbGxlcnMuY29udHJvbGxlcignQWRkVXNlckNvbnRyb2xsZXInLCBhcHAuQWRkVXNlckNvbnRyb2xsZXIpO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnQgY2xhc3MgRWRpdFVzZXJDb250cm9sbGVyIHtcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cblx0fVxufVxuY29udHJvbGxlcnMuY29udHJvbGxlcignRWRpdFVzZXJDb250cm9sbGVyJywgYXBwLkVkaXRVc2VyQ29udHJvbGxlcik7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydCBjbGFzcyBNb2RhbERpYWxvZ3VlQ29udHJvbGxlciB7XG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XG5cdH1cbn1cbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJywgYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0IGNsYXNzIFVzZXJGb3JtQ29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJGb3JtSW50ZXJmYWNlIHtcblx0XHRwcml2YXRlIGZvcm1TdWJtaXQ6IEZ1bmN0aW9uO1xuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xuXHRcdHByaXZhdGUgdXNlckRhdGFJZDogc3RyaW5nO1xuXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cblxuXHRcdG9uRm9ybVN1Ym1pdChldmVudDogRXZlbnQpIHtcblx0XHRcdGlmIChldmVudCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZm9ybVN1Ym1pdCh7IGRhdGE6IHRoaXMudXNlckRhdGEsIHVzZXJEYXRhSWQ6IHRoaXMudXNlckRhdGFJZCB9KTtcblx0XHR9XG5cdH1cbn1cbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJGb3JtQ29udHJvbGxlcicsIGFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIpO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJDb250cm9sbGVyIGltcGxlbWVudHMgVGFibGVIZWFkZXJJbnRlcmZhY2Uge1xuXHRcdHByaXZhdGUgc29ydEZ1bmM6IEZ1bmN0aW9uO1xuXHRcdHByaXZhdGUgZGVmYXVsdENsYXNzOiBzdHJpbmc7XG5cdFx0cHJpdmF0ZSBsYXN0U29ydE9yZGVyOiBzdHJpbmc7XG5cblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXG5cdFx0XHQnJGVsZW1lbnQnLFxuXHRcdFx0JyRzY2UnLFxuXHRcdFx0J0NoZWNrYm94SGFuZGxlclNlcnZpY2UnXG5cdFx0XTtcblxuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0cHJpdmF0ZSAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSxcblx0XHRcdHByaXZhdGUgJHNjZTogbmcuSVNDRVNlcnZpY2UsXG5cdFx0XHRwcml2YXRlIGNoZWNrYm94SGFuZGxlclNlcnZpY2U6IENoZWNrYm94SGFuZGxlclNlcnZpY2Vcblx0XHQpIHtcblx0XHRcdHRoaXMuZGVmYXVsdENsYXNzID0gJ2Fycm93IGFycm93LWRvd24nO1xuXHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gJyc7XG5cdFx0fVxuXG5cdFx0bWFuYWdlU29ydE9yZGVyKGV2ZW50OiBFdmVudCwgc29ydE9yZGVyOiBzdHJpbmcpIHtcblx0XHRcdGlmIChldmVudCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IG5ld0NsYXNzID0gJ2Fycm93IGFycm93LXVwJyxcblx0XHRcdFx0dGFyZ2V0ID0gPEhUTUxFbGVtZW50PiBldmVudC50YXJnZXQ7XG5cblx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmZpbmQodGFyZ2V0KS5maW5kKCdzcGFuJykuaGFzQ2xhc3MoJ2Fycm93LXVwJykpIHtcblx0XHRcdFx0bmV3Q2xhc3MgPSAnYXJyb3cgYXJyb3ctZG93bic7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLmxhc3RTb3J0T3JkZXIgIT09IHNvcnRPcmRlcikge1xuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNoZWFkaW5nXycgKyB0aGlzLmxhc3RTb3J0T3JkZXIpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHRoaXMuZGVmYXVsdENsYXNzKTtcblx0XHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gc29ydE9yZGVyO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKHRhcmdldCkuZmluZCgnc3BhbicpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MobmV3Q2xhc3MpO1xuXG5cdFx0XHR0aGlzLnNvcnRGdW5jKHtcblx0XHRcdFx0J29yZGVyQnknOiBzb3J0T3JkZXJcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvKnRvVHJ1c3RlZEhUTUwoaHRtbDogc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy4kc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuXHRcdH0qL1xuXHR9XG59XG5jb250cm9sbGVycy5jb250cm9sbGVyKCdUYWJsZUhlYWRlckNvbnRyb2xsZXInLCBhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJDb250cm9sbGVyIHtcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cblx0fVxufVxuY29udHJvbGxlcnMuY29udHJvbGxlcignSW5mb1NsaWRlckNvbnRyb2xsZXInLCBhcHAuSW5mb1NsaWRlckNvbnRyb2xsZXIpO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnQgY2xhc3MgVXNlckluZm9Db250cm9sbGVyIGltcGxlbWVudHMgVXNlckluZm9JbnRlcmZhY2Uge1xuXHRcdHByaXZhdGUgcmVhZE9ubHlNb2RlOiBCb29sZWFuO1xuXHRcdHByaXZhdGUgYWN0aW9uSGFuZGxlcjogRnVuY3Rpb247XG5cdFx0cHJpdmF0ZSB1c2VyRGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XG5cdFx0cHJpdmF0ZSB1c2VyRWRpdERhdGE6IHVzZXJFZGl0RGF0YUludGVyZmFjZTtcblx0XHRwcml2YXRlIGNoZWNrYm94U2VsZWN0ZWQ6IEJvb2xlYW47XG5cblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXG5cdFx0XHQnJHNjb3BlJyxcblx0XHRcdCckdGltZW91dCcsXG5cdFx0XHQnJGVsZW1lbnQnLFxuXHRcdFx0J0RvY0V2ZW50U2VydmljZScsXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcblx0XHRcdCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJ1xuXHRcdF07XG5cblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXG5cdFx0XHRwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXG5cdFx0XHRwcml2YXRlICRlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlLFxuXHRcdFx0cHJpdmF0ZSBkb2NFdmVudFNlcnZpY2U6IERvY0V2ZW50U2VydmljZSxcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXG5cdFx0XHRwcml2YXRlIGNoZWNrYm94SGFuZGxlclNlcnZpY2U6IENoZWNrYm94SGFuZGxlclNlcnZpY2Vcblx0XHQpIHtcblx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gdHJ1ZTtcblx0XHRcdHRoaXMuY2hlY2tib3hTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy51c2VyRWRpdERhdGFEZWZhdWx0KCk7XG5cblx0XHRcdHRoaXMuJHNjb3BlLiRvbignY2hlY2stYWxsJywgKGV2ZW50LCBwYXJhbXM6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLm9uQ2hlY2tib3hDbGlja2VkKG51bGwsIHBhcmFtcyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Lyp0aGlzLiRzY29wZS4kb24oJ2NoZWNrYm94LWNvdW50ZXItY2hhbmdlZCcsIChldmVudCwgcGFyYW1zOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5vbkNoZWNrYm94Q291bnRlckNoYW5nZWQoZXZlbnQsIHBhcmFtcyk7XG5cdFx0XHR9KTsqL1xuXHRcdH1cblxuXHRcdHN0YXJ0RWRpdE1vZGUoJGV2ZW50OiBFdmVudCkge1xuXHRcdFx0aWYgKGV2ZW50KSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5yZWFkT25seU1vZGUpIHtcblx0XHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UuYmluZEtleWJvYXJkRXZlbnQodGhpcy5jYW5jZWxFZGl0TW9kZS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UuYmluZE1vdXNlRXZlbnQodGhpcy5vbk1vdXNlQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2FuY2VsRWRpdE1vZGUoZXZlbnQ/OiBFdmVudCwgbm9yZXNldD86IEJvb2xlYW4pIHtcblx0XHRcdGlmIChldmVudCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLnVuYmluZEtleWJvYXJkRXZlbnQoKTtcblx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLnVuYmluZE1vdXNlRXZlbnQoKTtcblxuXHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSB0cnVlO1xuXHRcdFx0LyppZiAodGhpcy4kc2NvcGUuJHJvb3QuJCRwaGFzZSAhPSAnJGFwcGx5JyAmJiB0aGlzLiRzY29wZS4kcm9vdC4kJHBoYXNlICE9ICckZGlnZXN0Jykge1xuXHRcdFx0XHR0aGlzLiRzY29wZS4kYXBwbHkoKTtcblx0XHRcdH0qL1xuXG5cdFx0XHRpZiAoIW5vcmVzZXQpIHtcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjZmlyc3RuYW1lJykudmFsKHRoaXMudXNlckRhdGEuZmlyc3RuYW1lKTtcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjbGFzdG5hbWUnKS52YWwodGhpcy51c2VyRGF0YS5sYXN0bmFtZSk7XG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2xvY2F0aW9uJykudmFsKHRoaXMudXNlckRhdGEubG9jYXRpb24pO1xuXG5cdFx0XHRcdHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuJHNjb3BlLiRhcHBseSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRvbk1vdXNlQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcblx0XHRcdGxldCB0YWdOYW1lID0gdGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0aWYgKCh0YWdOYW1lICE9PSAnaW5wdXQnICYmIHRhZ05hbWUgIT09ICdzZWxlY3QnKSB8fCAodGhpcy4kZWxlbWVudC5maW5kKHRhcmdldCkubGVuZ3RoID09PSAwKSkge1xuXHRcdFx0XHR0aGlzLmNhbmNlbEVkaXRNb2RlKGV2ZW50KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRhY3Rpb25DYWxsYmFjayhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcblx0XHRcdGlmIChldmVudCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGUgPT09ICdzYXZlJykge1xuXHRcdFx0XHRpZiAodGhpcy52YWxpZGF0ZUZvcm0oKSkge1xuXHRcdFx0XHRcdHZhciB1c2VyRGF0YSA9IHtcblx0XHRcdFx0XHRcdGlkX21lbWJlcjogdGhpcy51c2VyRGF0YS5pZF9tZW1iZXIsXG5cdFx0XHRcdFx0XHRmaXJzdG5hbWU6IHRoaXMudXNlckVkaXREYXRhLmZpcnN0bmFtZSxcblx0XHRcdFx0XHRcdGxhc3RuYW1lOiB0aGlzLnVzZXJFZGl0RGF0YS5sYXN0bmFtZSxcblx0XHRcdFx0XHRcdGVtYWlsOiB0aGlzLnVzZXJEYXRhLmVtYWlsLFxuXHRcdFx0XHRcdFx0cGhvbmVudW1iZXI6IHRoaXMudXNlckRhdGEucGhvbmVudW1iZXIsXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjogdGhpcy51c2VyRWRpdERhdGEubG9jYXRpb25cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHRoaXMuY2FuY2VsRWRpdE1vZGUobnVsbCwgdHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy51c2VyRWRpdERhdGFEZWZhdWx0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmFjdGlvbkhhbmRsZXIoeyB0eXBlOiB0eXBlLCB1c2VySWQ6IHVzZXJJZCwgdXNlckRhdGE6IHVzZXJEYXRhIH0pO1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlRm9ybSgpIHtcblx0XHRcdGxldCBmaXJzdG5hbWUgPSB0aGlzLnVzZXJFZGl0RGF0YS5maXJzdG5hbWUsXG5cdFx0XHRcdGxhc3RuYW1lID0gdGhpcy51c2VyRWRpdERhdGEubGFzdG5hbWUsXG5cdFx0XHRcdGxvY2F0aW9uID0gdGhpcy51c2VyRWRpdERhdGEubG9jYXRpb247XG5cblx0XHRcdGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQoZmlyc3RuYW1lKSB8fFxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQobGFzdG5hbWUpIHx8XG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZChsb2NhdGlvbikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cblx0XHR1c2VyRWRpdERhdGFEZWZhdWx0KCkge1xuXHRcdFx0dGhpcy51c2VyRWRpdERhdGEgPSB7XG5cdFx0XHRcdGZpcnN0bmFtZTogdGhpcy51c2VyRGF0YS5maXJzdG5hbWUsXG5cdFx0XHRcdGxhc3RuYW1lOiB0aGlzLnVzZXJEYXRhLmxhc3RuYW1lLFxuXHRcdFx0XHRsb2NhdGlvbjogdGhpcy51c2VyRGF0YS5sb2NhdGlvblxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRvbkNoZWNrYm94Q2xpY2tlZChldmVudD86IEV2ZW50LCBwYXJhbXM/OiBhbnkpIHtcblx0XHRcdGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRpZihldmVudCkge1xuXHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoKHBhcmFtcyAmJiBwYXJhbXMuc3RhdGUgIT09IHRoaXMuY2hlY2tib3hTZWxlY3RlZCkpIHtcblx0XHRcdFx0dGhpcy5jaGVja2JveFNlbGVjdGVkID0gcGFyYW1zLnN0YXRlO1xuXHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYoY2hhbmdlZCkge1xuXHRcdFx0XHR0aGlzLmNoZWNrYm94SGFuZGxlclNlcnZpY2UubWFuYWdlQ2hlY2tib3hDb3VudGVyKHRoaXMuY2hlY2tib3hTZWxlY3RlZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2VySW5mb0NvbnRyb2xsZXInLCBhcHAuVXNlckluZm9Db250cm9sbGVyKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGV4cG9ydCBjbGFzcyBFZGl0VXNlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xuICAgICAgICAgICAgaXNWaXNpYmxlOiAnPScsXG5cdFx0XHR0aXRsZTogJz0nLFxuXHRcdFx0dXNlckRhdGE6ICc9Jyxcblx0XHRcdHVzZXJJZDogJz0nLFxuXHRcdFx0aGlkZVBvcHVwOiAnJicsXG5cdFx0XHR1cGRhdGVEYXRhOiAnJicsXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXG4gICAgICAgIH07XG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUuaHRtbCc7XG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnRWRpdFVzZXJDb250cm9sbGVyJztcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcblxuXHRcdGNvbnN0cnVjdG9yKCkge31cblxuXHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkge1xuXHRcdFx0c2NvcGUuJG9uKCdzaG93LWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNlZGl0VXNlck1vZGFsJykpLm1vZGFsKCdzaG93Jyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNlZGl0VXNlck1vZGFsJykpLm1vZGFsKCdoaWRlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XG5cdFx0XHRyZXR1cm4oICgpID0+IG5ldyBFZGl0VXNlckRpcmVjdGl2ZSgpKTtcblx0XHR9XG4gICAgfVxufSBcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdlZGl0VXNlcicsIGFwcC5FZGl0VXNlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcblx0XHRcdGlzVmlzaWJsZTogJz0nLFxuXHRcdFx0dGl0bGU6ICc9Jyxcblx0XHRcdGJvZHk6ICc9Jyxcblx0XHRcdGJ0bjFUeHQ6ICc9Jyxcblx0XHRcdGJ0bjJUeHQ6ICc9Jyxcblx0XHRcdHNob3dCdG4yOiAnPScsXG5cdFx0XHRidG4xQ2FsbGJhY2s6ICcmJyxcblx0XHRcdGJ0bjJDYWxsYmFjazogJyYnLFxuXHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogJyYnLFxuICAgICAgICB9O1xuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUuaHRtbCc7XG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInO1xuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xuXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cblxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlLCBlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlKSB7XG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctbW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNtb2RhbERpYWxvZ3VlJykpLm1vZGFsKCdzaG93Jyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLW1vZGFsJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI21vZGFsRGlhbG9ndWUnKSkubW9kYWwoJ2hpZGUnKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUoKSk7XG5cdFx0fVxuICAgIH1cbn1cbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdtb2RhbERpYWxvZ3VlJywgYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGV4cG9ydCBjbGFzcyBVc2VyRm9ybURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xuXHRcdFx0dXNlckRhdGE6ICc9Jyxcblx0XHRcdHVzZXJJZDogJz0nLFxuXHRcdFx0ZWRpdE1vZGU6ICc9Jyxcblx0XHRcdHZhbGlkYXRlRW1haWw6ICcmJyxcblx0XHRcdGZvcm1TdWJtaXQ6ICcmJyxcblx0XHRcdGRpc2NhcmRGb3JtOiAnJidcbiAgICAgICAgfTtcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS5odG1sJztcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VyRm9ybUNvbnRyb2xsZXInO1xuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xuXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxuXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVXNlckZvcm1EaXJlY3RpdmUoKSk7XG5cdFx0fVxuICAgIH1cbn0gXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgndXNlckZvcm0nLCBhcHAuVXNlckZvcm1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xuICAgICAgICAgICAgdGFibGVIZWFkaW5nOiAnPScsXG5cdFx0XHRzb3J0RnVuYzogJyYnLFxuXHRcdFx0Y2hlY2tBbGw6ICcmJyxcblx0XHRcdGRlbGV0ZUFsbDogJyYnXG4gICAgICAgIH07XG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUuaHRtbCc7XG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVGFibGVIZWFkZXJDb250cm9sbGVyJztcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcblxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGU6IG5nLklDb21waWxlU2VydmljZSwgcHJpdmF0ZSAkcGFyc2U6IG5nLklQYXJzZVNlcnZpY2UpIHsgfVxuXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xuXHRcdFx0dmFyIGRpcmVjdGl2ZSA9ICgkY29tcGlsZTogbmcuSUNvbXBpbGVTZXJ2aWNlLCAkcGFyc2U6IG5nLklQYXJzZVNlcnZpY2UpID0+IG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgkY29tcGlsZSwgJHBhcnNlKTtcblx0XHRcdGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckY29tcGlsZScsICckcGFyc2UnXTtcblx0XHRcdHJldHVybiBkaXJlY3RpdmU7XG5cdFx0fVxuICAgIH1cbn1cbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd0YWJsZUhlYWRlcicsIGFwcC5UYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcblx0XHQvLyBwcml2YXRlIHRpbWVyOiBudW1iZXI7XG5cblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcblx0XHRcdHRpdGxlOiAnPScsXG5cdFx0XHRib2R5OiAnPSdcbiAgICAgICAgfTtcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLmh0bWwnO1xuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ0luZm9TbGlkZXJDb250cm9sbGVyJztcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcblxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XG5cblx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGUsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcblx0XHRcdHNjb3BlLiRvbignc2hvdy1pbmZvLXNsaWRlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI2luZm9TbGlkZXInKSkubW9kYWwoJ3Nob3cnKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtaW5mby1zbGlkZXInLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNpbmZvU2xpZGVyJykpLm1vZGFsKCdoaWRlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBJbmZvU2xpZGVyRGlyZWN0aXZlKCkpO1xuXHRcdH1cbiAgICB9XG59XG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnaW5mb1NsaWRlcicsIGFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydCBjbGFzcyBVc2VySW5mb0RpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xuXHRcdC8vIHByaXZhdGUgdGltZXI6IG51bWJlcjtcblxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcblx0XHRwdWJsaWMgc2NvcGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG5cdFx0XHR1c2VyRGF0YTogJz0nLFxuXHRcdFx0YWN0aW9uSGFuZGxlcjogJyYnXG5cdFx0fTtcblx0XHRwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLmh0bWwnO1xuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1VzZXJJbmZvQ29udHJvbGxlcic7XG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XG5cblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxuXG5cdFx0bGluayhzY29wZTogVXNlckluZm9TY29wZUludGVyZmFjZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkgeyB9XG5cblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VySW5mb0RpcmVjdGl2ZSgpKTtcblx0XHR9XG5cdH1cbn1cbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VySW5mbycsIGFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cblxubW9kdWxlIGFwcCB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnQgY2xhc3MgQVBJU2VydmljZSBpbXBsZW1lbnRzIEFQSVNlcnZpY2VJbnRlcmZhY2Uge1xuXHRcdHN0YXRpYyAkaW5qZWN0ID0gWyckaHR0cCddO1xuXHRcdGh0dHBTZXJ2aWNlOiBuZy5JSHR0cFNlcnZpY2U7XG5cblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UpIHtcblx0XHRcdHRoaXMuaHR0cFNlcnZpY2UgPSAkaHR0cDtcblx0XHR9XG5cblx0XHRnZXRDYWxsKHBhcmFtczogYW55KSB7XG5cdFx0XHRsZXQgY29uZmlnID0gcGFyYW1zLmNvbmZpZyB8fCB7fTtcblx0XHRcdHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChwYXJhbXMudXJsLCBwYXJhbXMpO1xuXHRcdH1cblxuXHRcdHBvc3RDYWxsKHBhcmFtczogYW55KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KHBhcmFtcy51cmwsIHBhcmFtcy5kYXRhLCB7XG5cdFx0XHRcdGhlYWRlcnM6IHBhcmFtcy5oZWFkZXJzXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cbnNlcnZpY2VzLnNlcnZpY2UoJ0FQSVNlcnZpY2UnLCBhcHAuQVBJU2VydmljZSk7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBleHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSBpbXBsZW1lbnRzIFNoYXJlZFNlcnZpY2VJbnRlcmZhY2Uge1xuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxuXG4gICAgICAgIGJyb2FkY2FzdEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChldmVudE5hbWUsIGRhdGEpO1xuICAgICAgICB9O1xuICAgIH1cbn1cbnNlcnZpY2VzLnNlcnZpY2UoJ1NoYXJlZFNlcnZpY2UnLCBhcHAuU2hhcmVkU2VydmljZSk7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBleHBvcnQgY2xhc3MgVXRpbHNTZXJ2aWNlIGltcGxlbWVudHMgVXRpbHNTZXJ2aWNlSW50ZXJmYWNlIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgICAgICBnZXREYXRhVHlwZShvYmo6IGFueSkge1xuXHRcdFx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChvYmopLnRvTG93ZXJDYXNlKCk7XG5cdFx0fVxuXG5cdFx0aXNOdWxsVW5kZWZpbmVkKHZhbDogYW55LCB2YWxpZGF0ZVplcm9OYU4/OiBCb29sZWFuKSB7XG5cdFx0XHRsZXQgaXNOdWxsOiBCb29sZWFuID0gZmFsc2UsXG5cdFx0XHRcdHR5cGUgPSB0aGlzLmdldERhdGFUeXBlKHZhbCk7XG5cblx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRjYXNlICdbb2JqZWN0IGFycmF5XSc6XG5cdFx0XHRcdFx0aWYgKHZhbC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ1tvYmplY3Qgb2JqZWN0XSc6XG5cdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHZhbCkgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gXCJcIiB8fCB2YWwgPT09IFwibnVsbFwiIHx8IHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHZhbGlkYXRlWmVyb05hTiAmJiAodmFsID09PSAwIHx8IGlzTmFOKHZhbCkpKSB7XG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBpc051bGw7XG5cdFx0fVxuXG5cdFx0Y2xvbmUob2JqOiBhbnkpIHtcblx0XHRcdGlmIChvYmogPT0gbnVsbCB8fCB0eXBlb2YgKG9iaikgIT0gJ29iamVjdCcpXG5cdFx0XHRcdHJldHVybiBvYmo7XG5cblx0XHRcdHZhciB0ZW1wID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iailcblx0XHRcdFx0dGVtcFtrZXldID0gdGhpcy5jbG9uZShvYmpba2V5XSk7XG5cblx0XHRcdHJldHVybiB0ZW1wO1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlRW1haWwoZW1haWw6IHN0cmluZyk6IEJvb2xlYW4ge1xuXHRcdFx0dmFyIGVtYWlsUmVnZXhwID0gL15bYS16MC05ISMkJSYnKitcXC89P15fYHt8fX4uLV0rQFthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KFxcLlthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KSokL2k7XG5cblx0XHRcdGlmIChlbWFpbCAmJiBlbWFpbFJlZ2V4cC50ZXN0KGVtYWlsKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChhcnJbaV1bcHJvcE5hbWVdID09IHByb3BWYWx1ZSkgcmV0dXJuIGFycltpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsb2coLi4ubXNnOiBhbnlbXSkge1xuXHRcdFx0Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcblx0XHR9XG4gICAgfVxufVxuc2VydmljZXMuc2VydmljZSgnVXRpbHNTZXJ2aWNlJywgYXBwLlV0aWxzU2VydmljZSk7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGV4cG9ydCBjbGFzcyBEb2NFdmVudFNlcnZpY2UgaW1wbGVtZW50cyBEb2NFdmVudFNlcnZpY2VJbnRlcmZhY2Uge1xuICAgIHByaXZhdGUgZG9jUmVmOiBIVE1MRWxlbWVudDtcblxuICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcbiAgICAgICckZG9jdW1lbnQnXG4gICAgXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGRvY3VtZW50OiBuZy5JRG9jdW1lbnRTZXJ2aWNlKSB7IH1cblxuICAgIGJpbmRNb3VzZUV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRLZXlib2FyZEV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgdGhpcy4kZG9jdW1lbnQub24oJ2tleWRvd24ga2V5cHJlc3MnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kTW91c2VFdmVudCgpIHtcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9mZignY2xpY2snKTtcbiAgICB9XG5cbiAgICB1bmJpbmRLZXlib2FyZEV2ZW50KCkge1xuICAgICAgdGhpcy4kZG9jdW1lbnQub2ZmKCdrZXlkb3duIGtleXByZXNzJyk7XG4gICAgfVxuICB9XG59XG5zZXJ2aWNlcy5zZXJ2aWNlKCdEb2NFdmVudFNlcnZpY2UnLCBhcHAuRG9jRXZlbnRTZXJ2aWNlKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XG5cbm1vZHVsZSBhcHAge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0IGNsYXNzIENoZWNrYm94SGFuZGxlclNlcnZpY2Uge1xuXHRcdHB1YmxpYyBjaGVja2JveENvdW50ZXI6IG51bWJlcjtcblx0XHRwcml2YXRlIHNlbGVjdGVkQWxsOiBCb29sZWFuO1xuXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXG5cdFx0XTtcblxuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXG5cdFx0KSB7XG5cdFx0XHR0aGlzLmNoZWNrYm94Q291bnRlciA9IDA7XG5cdFx0XHR0aGlzLnNlbGVjdGVkQWxsID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y2hlY2tBbGwoKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnY2hlY2tBbGwnKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdFx0dGhpcy5zZWxlY3RlZEFsbCA9ICF0aGlzLnNlbGVjdGVkQWxsO1xuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdjaGVjay1hbGwnLCB7IHN0YXRlOiB0aGlzLnNlbGVjdGVkQWxsIH0pO1xuXHRcdH1cblxuXHRcdG1hbmFnZUNoZWNrYm94Q291bnRlcihpc0NoZWNrZWQ6IEJvb2xlYW4pIHtcblx0XHRcdGlmKGlzQ2hlY2tlZCkge1xuXHRcdFx0XHR0aGlzLmNoZWNrYm94Q291bnRlcisrO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXItLTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuY2hlY2tib3hDb3VudGVyIDwgMCkge1xuXHRcdFx0XHR0aGlzLmNoZWNrYm94Q291bnRlciA9IDA7XG5cdFx0XHR9XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnY2hlY2tib3hDb3VudGVyOiAnLCB0aGlzLmNoZWNrYm94Q291bnRlcik7IFxuXHRcdH1cblx0fVxufVxuc2VydmljZXMuc2VydmljZSgnQ2hlY2tib3hIYW5kbGVyU2VydmljZScsIGFwcC5DaGVja2JveEhhbmRsZXJTZXJ2aWNlKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2pxdWVyeS9qcXVlcnkuZC50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXItcm91dGUuZC50c1wiIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FwcC50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL21vZHVsZXMudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25zdGFudHMudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25maWcudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9yb3V0ZS1oYW5kbGVyLnRzJyAvPlxuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItbGlzdC5pbnRlcmZhY2UudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvaGVhZGVyLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdGFibGUtaGVhZGVyLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1mb3JtLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1pbmZvLmludGVyZmFjZS50cycgLz5cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kaXJlY3RpdmVzL3VzZXItaW5mby5pbnRlcmZhY2UudHMnIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9hcHAtY29uZmlnLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS91c2VyLWRhdGEuaW50ZXJmYWNlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2VkaXQtdXNlci5pbnRlcmZhY2UudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvbW9kYWwtZGlhbG9ndWUuaW50ZXJmYWNlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2luZm8tc2xpZGVyLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS90YWJsZS1oZWFkaW5nLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9oZWFkZXItYnV0dG9ucy5pbnRlcmZhY2UudHMnIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvYXBpLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvZG9jLWV2ZW50LmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvc2hhcmVkLmludGVyZmFjZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvdXRpbHMuaW50ZXJmYWNlLnRzJyAvPlxuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMnIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmNvbnRyb2xsZXIudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmNvbnRyb2xsZXIudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItZm9ybS5jb250cm9sbGVyLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuY29udHJvbGxlci50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmNvbnRyb2xsZXIudHMnIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS50cycgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3VzZXItaW5mby5kaXJlY3RpdmUudHMnIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzJyAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMnIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9jaGVja2JveC1oYW5kbGVyLnNlcnZpY2UudHMnIC8+XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxuXG5tb2R1bGUgYXBwIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydCBjbGFzcyBUZXN0Q29udHJvbGxlciB7XG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xuXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xuXHRcdFx0JyRzY29wZScsXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJ1xuXHRcdF07XG5cblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlXG5cdFx0KSB7XG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSBmYWxzZTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSB0aGlzLnV0aWxzU2VydmljZS52YWxpZGF0ZUVtYWlsKHZhbCk7XG5cdFx0fVxuXHR9XG59XG5jb250cm9sbGVycy5jb250cm9sbGVyKCdUZXN0Q29udHJvbGxlcicsIGFwcC5UZXN0Q29udHJvbGxlcik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
