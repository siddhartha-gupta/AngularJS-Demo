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
                    serverUrl: 'http://localhost:5000',
                    // serverUrl: 'https://user-management-881512.herokuapp.com/',
                    templateUrl: 'templates/',
                    locationOption: {
                        'IN': 'India',
                        'US': 'United States',
                        'UK': 'United Kingdom'
                    }
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
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
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
        function UsersListController($scope, $location, socketService, utilsService, sharedService, checkboxHandlerService) {
            this.$scope = $scope;
            this.$location = $location;
            this.socketService = socketService;
            this.utilsService = utilsService;
            this.sharedService = sharedService;
            this.checkboxHandlerService = checkboxHandlerService;
            this.appConfig = app.Constants.Default;
            this.sortOrder = '-id_member';
            this.usersList = [];
            this.showLoader = false;
            this.socketService.initSocket();
            this.addSocketListeners();
            this.getUsers();
            this.editUserDefault();
            this.modalDialogueDefault();
            this.infoSliderDefault();
            this.createtableHeading();
        }
        UsersListController.prototype.addSocketListeners = function () {
            var _this = this;
            this.$scope.$on('users-list-resp', function (event, data) {
                _this.processServerData(data);
            });
        };
        UsersListController.prototype.getUsers = function () {
            this.showLoader = true;
            this.socketService.msgSender('get-users-list');
        };
        UsersListController.prototype.processServerData = function (data) {
            this.utilsService.log('processServerData: ', data);
            if (data && data.length > 0) {
                this.usersList = data;
            }
            else {
                this.usersList.length = 0;
            }
            this.showLoader = false;
            this.$scope.$applyAsync();
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
            this.utilsService.log('updateUserData: ', data);
            this.utilsService.log('userId: ', userId);
            this.socketService.msgSender('update-user', {
                'userId': userId,
                'userData': {
                    email: data.email,
                    firstname: data.firstname,
                    id_member: data.id_member,
                    lastname: data.lastname,
                    location: data.location,
                    phonenumber: data.phonenumber,
                    timestamp: data.timestamp
                }
            });
            /*this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'updateuser',
                'data': {
                    'userId': userId,
                    'userData': {
                        email: data.email,
                        firstname: data.firstname,
                        id_member: data.id_member,
                        lastname: data.lastname,
                        location: data.location,
                        phonenumber: data.phonenumber,
                        timestamp: data.timestamp
                    }
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success((response: any) => {
                this.utilsService.log('updateUserData success: ', response);
                this.onUserUpdateResp(response.resp);
            }).error((response) => {
                this.utilsService.log('updateUserData error: ', response);
            });*/
        };
        UsersListController.prototype.onUserUpdateResp = function (resp) {
            var showModal = false, modalTitle = 'Error!', modalText = '';
            this.hideEditPopup();
            console.log('onUserUpdateResp: ', resp);
            switch (resp) {
                case true:
                    this.showInfoSlider({
                        title: 'User updated',
                        body: 'User info has been updated successfully',
                        startTimer: 500,
                        endTimer: 4000
                    });
                    break;
                case 'alreadyUpdated':
                    showModal = true;
                    modalText = 'It seems user has been updated from another source. Please try again';
                    break;
                case 'alreadyDeleted':
                    showModal = true;
                    modalText = 'It seems user has been deleted.';
                    break;
                default:
                    showModal = true;
                    modalText = 'We have encountered error while updating user information. Please try again';
                    break;
            }
            if (showModal) {
                this.modalDialogue = {
                    isVisible: true,
                    title: modalTitle,
                    body: modalText,
                    btn1Txt: 'Ok',
                    btn2Txt: '',
                    showBtn2: false,
                    btn1Callback: this.hideModalDialogue.bind(this),
                    btn2Callback: function () { },
                    closeBtnCallback: this.hideModalDialogue.bind(this),
                };
                this.sharedService.broadcastEvent('show-modal', {});
            }
            this.getUsers();
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
            this.utilsService.log('deleteUserConfirm, userId: ', userId);
            /*this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteuser',
                data: {
                    'userId': userId
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success((response: any) => {
                this.utilsService.log('success: ', response);
                this.onUserDeleted(response.resp);
            }).error((response) => {
                this.utilsService.log('error: ', response);
            });*/
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
            this.utilsService.log('deleteUserConfirm, userId: ', userId);
            var userIds = [];
            for (var i = 0, len = this.usersList.length; i < len; i++) {
                userIds.push(this.usersList[i].id_member);
            }
            /*this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteallusers',
                data: {
                    'userIds': userIds
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success((response: any) => {
                this.utilsService.log('success: ', response);
                this.onAllUsersDeleted(response.resp);
            }).error((response) => {
                this.utilsService.log('error: ', response);
            });*/
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
            'SocketService',
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
        function AddUserController($scope, $location, socketService, utilsService, sharedService) {
            this.$scope = $scope;
            this.$location = $location;
            this.socketService = socketService;
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
            this.utilsService.log('add user: ', this.userData);
            if (this.validateForm()) {
                this.socketService.msgSender('add-user', this.userData);
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
            'SocketService',
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
            this.locationOption = app.Constants.Default.locationOption;
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
            this.locationOption = app.Constants.Default.locationOption;
            this.userEditDataDefault();
            this.$scope.$on('check-all', function (event, params) {
                _this.onCheckboxClicked(null, params);
            });
        }
        UserInfoController.prototype.startEditMode = function (event) {
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
                        location: this.userEditData.location,
                        timestamp: this.userData.timestamp
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


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var SpinnerController = (function () {
        function SpinnerController() {
        }
        return SpinnerController;
    }());
    app.SpinnerController = SpinnerController;
})(app || (app = {}));
controllers.controller('SpinnerController', app.SpinnerController);


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
    var SpinnerDirective = (function () {
        function SpinnerDirective() {
            this.restrict = 'E';
            this.scope = {
                showLoader: '='
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/spinner.directive.html';
            this.controller = 'SpinnerController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        SpinnerDirective.factory = function () {
            return (function () { return new SpinnerDirective(); });
        };
        return SpinnerDirective;
    }());
    app.SpinnerDirective = SpinnerDirective;
})(app || (app = {}));
directives.directive('spinner', app.SpinnerDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var SocketService = (function () {
        function SocketService(utilsService, sharedService) {
            this.utilsService = utilsService;
            this.sharedService = sharedService;
        }
        SocketService.prototype.initSocket = function (callback) {
            console.log('initSocket');
            // this.socket = io.connect('https://tic-tac-toe-881512.herokuapp.com');
            this.socket = io.connect('http://localhost:5000');
            this.msgReceiver();
            if (callback) {
                callback();
            }
        };
        SocketService.prototype.msgSender = function (identifier, data) {
            // add-user
            // update-user
            // delete-user
            // delete-all-user
            var _this = this;
            if (!this.socket) {
                this.initSocket(function () {
                    _this.msgSender(identifier, data);
                });
            }
            else {
                console.log('emit socket identifier: ', identifier);
                this.socket.emit(identifier, data);
            }
        };
        SocketService.prototype.msgReceiver = function () {
            var _this = this;
            this.socket.on('users-list-resp', function (data) {
                _this.sharedService.broadcastEvent('users-list-resp', data);
            });
            this.socket.on('add-user-resp', function (data) {
                _this.utilsService.log('add-user-resp:', data);
                // this.customEventService.registerEmail(data);
            });
            this.socket.on('update-user-resp', function (data) {
                _this.utilsService.log('update-user-resp:', data);
                // this.customEventService.playersListReceived(data);
            });
            this.socket.on('delete-user-received', function (data) {
                _this.utilsService.log('delete-user-resp:', data);
                // this.customEventService.inviteRequest(data);
            });
            this.socket.on('delete-all-user-resp', function (data) {
                _this.utilsService.log('delete-all-user-resp:', data);
                // this.customEventService.inviteAction(data);
            });
        };
        SocketService.$inject = [
            'UtilsService',
            'SharedService'
        ];
        return SocketService;
    }());
    app.SocketService = SocketService;
})(app || (app = {}));
services.service('SocketService', app.SocketService);


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
/// <reference path='ts/interfaces/services/socket.interface.ts' />
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
/// <reference path='ts/controllers/directives/spinner.controller.ts' />
/// <reference path='ts/directives/edit-user.directive.ts' />
/// <reference path='ts/directives/modal-dialogue.directive.ts' />
/// <reference path='ts/directives/user-form.directive.ts' />
/// <reference path='ts/directives/table-header.directive.ts' />
/// <reference path='ts/directives/info-slider.directive.ts' />
/// <reference path='ts/directives/user-info.directive.ts' />
/// <reference path='ts/directives/spinner.directive.ts' />
/// <reference path='ts/services/socket.service.ts' />
/// <reference path='ts/services/shared.service.ts' />
/// <reference path='ts/services/utils.service.ts' />
/// <reference path='ts/services/doc-event.service.ts' />
/// <reference path='ts/services/checkbox-handler.service.ts' />


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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWluZm8uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kaXJlY3RpdmVzL3VzZXItaW5mby5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvYXBwLWNvbmZpZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdGFibGUtaGVhZGluZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvaGVhZGVyLWJ1dHRvbnMuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zb2NrZXQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9kb2MtZXZlbnQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zaGFyZWQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy91dGlscy5pbnRlcmZhY2UudHMiLCJ0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9zcGlubmVyLmNvbnRyb2xsZXIudHMiLCJ0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9zcGlubmVyLmRpcmVjdGl2ZS50cyIsInRzL3NlcnZpY2VzL3NvY2tldC5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy9jaGVja2JveC1oYW5kbGVyLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIiwidHMvY29udHJvbGxlcnMvdGVzdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FDSmxELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FpQlQ7QUFqQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVk7SUFFWjtRQUFBO1FBYUEsQ0FBQztRQVpBLHNCQUFXLG9CQUFPO2lCQUFsQjtnQkFDQyxNQUFNLENBQUM7b0JBQ04sU0FBUyxFQUFFLHVCQUF1QjtvQkFDbEMsOERBQThEO29CQUM5RCxXQUFXLEVBQUUsWUFBWTtvQkFDekIsY0FBYyxFQUFFO3dCQUNmLElBQUksRUFBRSxPQUFPO3dCQUNiLElBQUksRUFBRSxlQUFlO3dCQUNyQixJQUFJLEVBQUUsZ0JBQWdCO3FCQUN0QjtpQkFDRDtZQUNGLENBQUM7OztXQUFBO1FBQ0YsZ0JBQUM7SUFBRCxDQUFDO0lBYlksYUFBUyxZQWFyQjtBQUNGLENBQUMsRUFqQk0sR0FBRyxLQUFILEdBQUcsUUFpQlQ7OztBQ25CRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBb0JUO0FBcEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0lBRVo7UUFLQyxnQkFBWSxjQUF1QztZQUNsRCxjQUFjLENBQUMsSUFB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dmFyIHNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ3NlcnZpY2VzJywgW10pO1xyXG52YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnY29udHJvbGxlcnMnLCBbXSk7XHJcbnZhciBkaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2RpcmVjdGl2ZXMnLCBbXSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcblx0XHRzdGF0aWMgZ2V0IERlZmF1bHQoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnLFxyXG5cdFx0XHRcdC8vIHNlcnZlclVybDogJ2h0dHBzOi8vdXNlci1tYW5hZ2VtZW50LTg4MTUxMi5oZXJva3VhcHAuY29tLycsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvJyxcclxuXHRcdFx0XHRsb2NhdGlvbk9wdGlvbjoge1xyXG5cdFx0XHRcdFx0J0lOJzogJ0luZGlhJyxcclxuXHRcdFx0XHRcdCdVUyc6ICdVbml0ZWQgU3RhdGVzJyxcclxuXHRcdFx0XHRcdCdVSyc6ICdVbml0ZWQgS2luZ2RvbSdcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgICAgICAgJyRyb3V0ZVByb3ZpZGVyJ1xyXG4gICAgICAgIF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoJHJvdXRlUHJvdmlkZXI6IG5nLnJvdXRlLklSb3V0ZVByb3ZpZGVyKSB7XHJcblx0XHRcdCRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvdXNlcnNsaXN0XCIsIHtcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ3VzZXJzTGlzdC5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnVXNlcnNMaXN0Q29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcidcclxuXHRcdFx0fSkud2hlbignL2FkZFVzZXInLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ0FkZFVzZXJDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2FkZFVzZXIuaHRtbCdcclxuXHRcdFx0fSkub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy91c2Vyc2xpc3QnIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBSb3V0ZUhhbmRsZXIge1xyXG5cdFx0c3RhdGljIGluamVjdCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnc2hhcmVkU2VydmljZSddO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBhbnksIC8vbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcblx0XHRcdCRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0c2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRyb290U2NvcGUuVXRpbHMgPSB7XHJcblx0XHRcdFx0a2V5czogT2JqZWN0LmtleXNcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN0YXJ0Jywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZUVycm9yJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2Vyc0xpc3RJbnRlcmZhY2Uge1xyXG5cdFx0Z2V0VXNlcnMoKTogdm9pZDtcclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSk6IHZvaWQ7XHJcblx0XHRhZGRVc2VyKCk6IHZvaWQ7XHJcblx0XHRhY3Rpb25IYW5kbGVyKHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIHVzZXJEYXRhPzogVXNlckRhdGFJbnRlcmZhY2UpOiB2b2lkO1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRlZGl0VXNlckNsaWNrKHVzZXJJZDogc3RyaW5nKTogdm9pZDtcclxuXHRcdHVwZGF0ZVVzZXJEYXRhKGRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlLCB1c2VySWQ6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRvblVzZXJVcGRhdGVSZXNwKHJlc3A6IEJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0ZGVsZXRlVXNlckNsaWNrKGtleTogc3RyaW5nKTogdm9pZDtcclxuXHRcdGRlbGV0ZVVzZXJDb25maXJtKGtleTogc3RyaW5nKTogdm9pZDtcclxuXHRcdG9uVXNlckRlbGV0ZWQocmVzcDogQm9vbGVhbik6IHZvaWQ7XHJcblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpOiB2b2lkO1xyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRtYW5hZ2VTb3J0T3JkZXIob3JkZXJCeTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogSW5mb1NsaWRlckludGVyZmFjZSk6IHZvaWQ7XHJcblx0XHRoaWRlSW5mb1NsaWRlcigpOiB2b2lkO1xyXG5cdFx0Y3JlYXRldGFibGVIZWFkaW5nKCk6IHZvaWQ7XHJcblx0XHRlZGl0VXNlckRlZmF1bHQoKTogdm9pZDtcclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCk6IHZvaWQ7XHJcblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHR2YWxpZGF0ZUZvcm0oKTogQm9vbGVhbjtcclxuXHRcdGdvdG9Vc2VyTGlzdCgpOiB2b2lkO1xyXG5cdFx0YWRkVXNlcigpOiB2b2lkO1xyXG5cdFx0dXNlckRhdGFEZWZhdWx0KCk6IHZvaWQ7XHJcblx0XHRzaG93TW9kYWxEaWFsb2d1ZShlcnJvclR5cGU6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KTogdm9pZDtcclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpOiB2b2lkO1xyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSk6IHZvaWQ7XHJcblx0XHRvblJvdXRlQ2hhbmdlRXJyb3IoZXZlbnQsIHBhcmFtcyk6IHZvaWQ7XHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpOiB2b2lkO1xyXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpOiB2b2lkO1xyXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0Z29Ub0FkZFVzZXIoKTogdm9pZDtcclxuXHRcdGFkZFVzZXIoKTogdm9pZDtcclxuXHRcdGdvQmFjaygpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFRhYmxlSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VyRm9ybUludGVyZmFjZSB7XHJcblx0XHRvbkZvcm1TdWJtaXQoZXZlbnQ6IEV2ZW50KTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb0ludGVyZmFjZSB7XHJcblx0XHRzdGFydEVkaXRNb2RlKGV2ZW50OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRjYW5jZWxFZGl0TW9kZShldmVudD86IEV2ZW50LCBub3Jlc2V0PzogQm9vbGVhbik6IHZvaWQ7XHJcblx0XHRvbk1vdXNlQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZDtcclxuXHRcdGFjdGlvbkNhbGxiYWNrKGV2ZW50OiBFdmVudCwgdHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHR2YWxpZGF0ZUZvcm0oKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0Ly8gZXhwb3J0IGludGVyZmFjZSBJTWVudURpcmVjdGl2ZSBleHRlbmRzIG5nLklTY29wZVxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9TY29wZUludGVyZmFjZSBleHRlbmRzIG5nLklTY29wZSB7XHJcblx0XHRjdXN0b21Db250cm9sbGVyOiBhbnk7XHJcblx0XHR1c2VyRGF0YTogYW55O1xyXG5cdFx0YWN0aW9uSGFuZGxlcjogYW55O1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgYXBwQ29uZmlnSW50ZXJmYWNlIHtcclxuXHRcdHNlcnZlclVybDogc3RyaW5nO1xyXG5cdFx0dGVtcGxhdGVVcmw6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJEYXRhSW50ZXJmYWNlIHtcclxuXHRcdGlkX21lbWJlcj86IHN0cmluZztcclxuXHRcdGZpcnN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bGFzdG5hbWU6IHN0cmluZztcclxuXHRcdGVtYWlsOiBzdHJpbmc7XHJcblx0XHRwaG9uZW51bWJlcjogc3RyaW5nO1xyXG5cdFx0bG9jYXRpb246IHN0cmluZztcclxuXHRcdHRpbWVzdGFtcD86IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgdXNlckVkaXREYXRhSW50ZXJmYWNlIHtcclxuXHRcdGZpcnN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bGFzdG5hbWU6IHN0cmluZztcclxuXHRcdGxvY2F0aW9uOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBFZGl0VXNlckludGVyZmFjZSB7XHJcblx0XHRpc1Zpc2libGU6IEJvb2xlYW47XHJcblx0XHR0aXRsZTogc3RyaW5nO1xyXG5cdFx0Ly9UT0RPOiBuZWVkIHRvIGxvb2sgaW50byB0aGlzXHJcblx0XHR1c2VyRGF0YTogYW55O1xyXG5cdFx0dXNlcklkOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbixcclxuXHRcdHRpdGxlOiBzdHJpbmcsXHJcblx0XHRib2R5OiBzdHJpbmcsXHJcblx0XHRidG4xVHh0OiBzdHJpbmcsXHJcblx0XHRidG4yVHh0Pzogc3RyaW5nLFxyXG5cdFx0c2hvd0J0bjI6IEJvb2xlYW4sXHJcblx0XHRidG4xQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHRcdGJ0bjJDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0Y2xvc2VCdG5DYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSW5mb1NsaWRlckludGVyZmFjZSB7XHJcblx0XHR0aXRsZTogc3RyaW5nO1xyXG5cdFx0Ym9keTogc3RyaW5nO1xyXG5cdFx0c3RhcnRUaW1lcj86IG51bWJlcjtcclxuXHRcdGVuZFRpbWVyPzogbnVtYmVyO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVGFibGVIZWFkaW5nSW50ZXJmYWNlIHtcclxuXHRcdGNsYXNzTmFtZTogc3RyaW5nO1xyXG5cdFx0c29ydE9yZGVyOiBzdHJpbmc7XHJcblx0XHR0ZXh0OiBzdHJpbmc7XHJcblx0XHRjdXN0b21GdW5jPzogRnVuY3Rpb247XHJcblx0XHRjdXN0b21IVE1MPzogQm9vbGVhbjtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEhlYWRlckJ1dHRvbnNJbnRlcmZhY2Uge1xyXG5cdFx0c2hvd0J0bjogQm9vbGVhbjtcclxuXHRcdGNsaWNrRnVuYzogc3RyaW5nO1xyXG5cdFx0dGV4dDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFNvY2tldFNlcnZpY2VJbnRlcmZhY2Uge1xyXG5cdFx0aW5pdFNvY2tldChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0bXNnU2VuZGVyKGlkZW50aWZpZXI6IHN0cmluZywgZGF0YT86IE9iamVjdCk6IHZvaWQ7XHJcblx0XHRtc2dSZWNlaXZlcigpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIERvY0V2ZW50U2VydmljZUludGVyZmFjZSB7XHJcblx0XHRiaW5kTW91c2VFdmVudChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0YmluZEtleWJvYXJkRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdHVuYmluZE1vdXNlRXZlbnQoKTogdm9pZDtcclxuXHRcdHVuYmluZEtleWJvYXJkRXZlbnQoKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBTaGFyZWRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdGJyb2FkY2FzdEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFV0aWxzU2VydmljZUludGVyZmFjZSB7XHJcblx0XHRnZXREYXRhVHlwZShvYmo6IE9iamVjdCk6IHN0cmluZztcclxuXHRcdGlzTnVsbFVuZGVmaW5lZCh2YWw6IGFueSwgdmFsaWRhdGVaZXJvTmFOPzogQm9vbGVhbik6IEJvb2xlYW47XHJcblx0XHRjbG9uZShvYmo6IGFueSk6IGFueTtcclxuXHRcdHZhbGlkYXRlRW1haWwoZW1haWw6IHN0cmluZyk6IEJvb2xlYW47XHJcblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpOiBhbnk7XHJcblx0XHRsb2coLi4ubXNnOiBhbnlbXSk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0aGVhZGluZzogc3RyaW5nO1xyXG5cdFx0aGVhZGVyTGVmdEJ0bjogSGVhZGVyQnV0dG9uc0ludGVyZmFjZTtcclxuXHRcdGhlYWRlclJpZ2h0QnRuOiBIZWFkZXJCdXR0b25zSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJHdpbmRvdycsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3VjY2Vzcy5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgdGhpcy5vblJvdXRlQ2hhbmdlRXJyb3IuYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRpbmcgPSAnVXNlciBtYW5hZ2VtZW50JztcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XHJcblxyXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0Y2FzZSAnVXNlcnNMaXN0Q29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnQWRkVXNlckNvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEFkZFVzZXJIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29Ub0FkZFVzZXInLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0FkZCB1c2VyJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldEFkZFVzZXJIZWFkZXIoKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb0JhY2snLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0JhY2snXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZykge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1x0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpc1tjbGlja0Z1bmNdKSkge1xyXG5cdFx0XHRcdHRoaXNbY2xpY2tGdW5jXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z29Ub0FkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnYWRkLXVzZXInLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z29CYWNrKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgYXBwLkhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlcnNMaXN0Q29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHVzZXJzTGlzdDogQXJyYXk8YW55PjtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGVkaXRVc2VyOiBFZGl0VXNlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgbW9kYWxEaWFsb2d1ZTogTW9kYWxEaWFsb2d1ZUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgaW5mb1NsaWRlcjogSW5mb1NsaWRlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgc29ydE9yZGVyOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIHRhYmxlSGVhZGluZzogVGFibGVIZWFkaW5nSW50ZXJmYWNlW107XHJcblx0XHRwcml2YXRlIHNob3dMb2FkZXI6IEJvb2xlYW47XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCdTb2NrZXRTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJyxcclxuXHRcdFx0J0NoZWNrYm94SGFuZGxlclNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzb2NrZXRTZXJ2aWNlOiBTb2NrZXRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgY2hlY2tib3hIYW5kbGVyU2VydmljZTogQ2hlY2tib3hIYW5kbGVyU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLnNvcnRPcmRlciA9ICctaWRfbWVtYmVyJztcclxuXHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBbXTtcclxuXHRcdFx0dGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLnNvY2tldFNlcnZpY2UuaW5pdFNvY2tldCgpO1xyXG5cdFx0XHR0aGlzLmFkZFNvY2tldExpc3RlbmVycygpO1xyXG5cdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdHRoaXMuZWRpdFVzZXJEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZXRhYmxlSGVhZGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFNvY2tldExpc3RlbmVycygpIHtcclxuXHRcdFx0dGhpcy4kc2NvcGUuJG9uKCd1c2Vycy1saXN0LXJlc3AnLCAoZXZlbnQsIGRhdGEpID0+IHtcclxuXHRcdFx0XHR0aGlzLnByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRVc2VycygpIHtcclxuXHRcdFx0dGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5zb2NrZXRTZXJ2aWNlLm1zZ1NlbmRlcignZ2V0LXVzZXJzLWxpc3QnKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9jZXNzU2VydmVyRGF0YShkYXRhOiBhbnkpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdwcm9jZXNzU2VydmVyRGF0YTogJywgZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLnVzZXJzTGlzdCA9IGRhdGE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QubGVuZ3RoID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy4kc2NvcGUuJGFwcGx5QXN5bmMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBBY3Rpb24gYnV0dG9ucyBoYW5kbGluZ1xyXG5cdFx0Ki9cclxuXHRcdGFjdGlvbkhhbmRsZXIodHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgdXNlckRhdGE/OiBVc2VyRGF0YUludGVyZmFjZSkge1xyXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdlZGl0JzpcclxuXHRcdFx0XHRcdHRoaXMuZWRpdFVzZXJDbGljayh1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2RlbGV0ZSc6XHJcblx0XHRcdFx0XHR0aGlzLmRlbGV0ZVVzZXJDbGljayh1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ3NhdmUnOlxyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGVVc2VyRGF0YSh1c2VyRGF0YSwgdXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRWRpdCB1c2VyIGNvZGUgZmxvd1xyXG5cdFx0Ki9cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd2YWxpZGF0ZUVtYWlsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRWRpdCBkZXRhaWxzJyxcclxuXHRcdFx0XHR1c2VyRGF0YTogdGhpcy51dGlsc1NlcnZpY2UuY2xvbmUodGhpcy51dGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFycih0aGlzLnVzZXJzTGlzdCwgJ2lkX21lbWJlcicsIHVzZXJJZCkpLFxyXG5cdFx0XHRcdHVzZXJJZDogdXNlcklkXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1lZGl0LW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2codGhpcy5lZGl0VXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogVXNlckRhdGFJbnRlcmZhY2UsIHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGE6ICcsIGRhdGEpO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHRcdFx0dGhpcy5zb2NrZXRTZXJ2aWNlLm1zZ1NlbmRlcigndXBkYXRlLXVzZXInLCB7XHJcblx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZCxcclxuXHRcdFx0XHQndXNlckRhdGEnOiB7XHJcblx0XHRcdFx0XHRlbWFpbDogZGF0YS5lbWFpbCxcclxuXHRcdFx0XHRcdGZpcnN0bmFtZTogZGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0XHRpZF9tZW1iZXI6IGRhdGEuaWRfbWVtYmVyLFxyXG5cdFx0XHRcdFx0bGFzdG5hbWU6IGRhdGEubGFzdG5hbWUsXHJcblx0XHRcdFx0XHRsb2NhdGlvbjogZGF0YS5sb2NhdGlvbixcclxuXHRcdFx0XHRcdHBob25lbnVtYmVyOiBkYXRhLnBob25lbnVtYmVyLFxyXG5cdFx0XHRcdFx0dGltZXN0YW1wOiBkYXRhLnRpbWVzdGFtcFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvKnRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICd1cGRhdGV1c2VyJyxcclxuXHRcdFx0XHQnZGF0YSc6IHtcclxuXHRcdFx0XHRcdCd1c2VySWQnOiB1c2VySWQsXHJcblx0XHRcdFx0XHQndXNlckRhdGEnOiB7XHJcblx0XHRcdFx0XHRcdGVtYWlsOiBkYXRhLmVtYWlsLFxyXG5cdFx0XHRcdFx0XHRmaXJzdG5hbWU6IGRhdGEuZmlyc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRpZF9tZW1iZXI6IGRhdGEuaWRfbWVtYmVyLFxyXG5cdFx0XHRcdFx0XHRsYXN0bmFtZTogZGF0YS5sYXN0bmFtZSxcclxuXHRcdFx0XHRcdFx0bG9jYXRpb246IGRhdGEubG9jYXRpb24sXHJcblx0XHRcdFx0XHRcdHBob25lbnVtYmVyOiBkYXRhLnBob25lbnVtYmVyLFxyXG5cdFx0XHRcdFx0XHR0aW1lc3RhbXA6IGRhdGEudGltZXN0YW1wXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhIHN1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR0aGlzLm9uVXNlclVwZGF0ZVJlc3AocmVzcG9uc2UucmVzcCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7Ki9cclxuXHRcdH1cclxuXHJcblx0XHRvblVzZXJVcGRhdGVSZXNwKHJlc3A6IGFueSkge1xyXG5cdFx0XHRsZXQgc2hvd01vZGFsOiBCb29sZWFuID0gZmFsc2UsXHJcblx0XHRcdFx0bW9kYWxUaXRsZTogc3RyaW5nID0gJ0Vycm9yIScsXHJcblx0XHRcdFx0bW9kYWxUZXh0OiBzdHJpbmcgPSAnJztcclxuXHJcblx0XHRcdHRoaXMuaGlkZUVkaXRQb3B1cCgpO1xyXG5cdFx0XHRjb25zb2xlLmxvZygnb25Vc2VyVXBkYXRlUmVzcDogJywgcmVzcCk7XHJcblx0XHRcdHN3aXRjaCAocmVzcCkge1xyXG5cdFx0XHRcdGNhc2UgdHJ1ZTpcclxuXHRcdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xyXG5cdFx0XHRcdFx0XHR0aXRsZTogJ1VzZXIgdXBkYXRlZCcsXHJcblx0XHRcdFx0XHRcdGJvZHk6ICdVc2VyIGluZm8gaGFzIGJlZW4gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdFx0XHRzdGFydFRpbWVyOiA1MDAsXHJcblx0XHRcdFx0XHRcdGVuZFRpbWVyOiA0MDAwXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdhbHJlYWR5VXBkYXRlZCc6XHJcblx0XHRcdFx0XHRzaG93TW9kYWwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0bW9kYWxUZXh0ID0gJ0l0IHNlZW1zIHVzZXIgaGFzIGJlZW4gdXBkYXRlZCBmcm9tIGFub3RoZXIgc291cmNlLiBQbGVhc2UgdHJ5IGFnYWluJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdhbHJlYWR5RGVsZXRlZCc6XHJcblx0XHRcdFx0XHRzaG93TW9kYWwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0bW9kYWxUZXh0ID0gJ0l0IHNlZW1zIHVzZXIgaGFzIGJlZW4gZGVsZXRlZC4nO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRzaG93TW9kYWwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0bW9kYWxUZXh0ID0gJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgdXBkYXRpbmcgdXNlciBpbmZvcm1hdGlvbi4gUGxlYXNlIHRyeSBhZ2Fpbic7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNob3dNb2RhbCkge1xyXG5cdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiBtb2RhbFRpdGxlLFxyXG5cdFx0XHRcdFx0Ym9keTogbW9kYWxUZXh0LFxyXG5cdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywge30pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBEZWxldGUgdXNlciBjb2RlZmxvd1xyXG5cdFx0Ki9cclxuXHRcdGRlbGV0ZVVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdEZWxldGUgdXNlcj8nLFxyXG5cdFx0XHRcdGJvZHk6ICdQbGVhc2UgY29uZmlybSwgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSB1c2VyJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICdDYW5jZWwnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiB0cnVlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5kZWxldGVVc2VyQ29uZmlybS5iaW5kKHRoaXMsIHVzZXJJZCksXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVsZXRlVXNlckNvbmZpcm0odXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdkZWxldGVVc2VyQ29uZmlybSwgdXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0Lyp0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZGVsZXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5vblVzZXJEZWxldGVkKHJlc3BvbnNlLnJlc3ApO1xyXG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdH0pOyovXHJcblx0XHR9XHJcblxyXG5cdFx0b25Vc2VyRGVsZXRlZChyZXNwOiBCb29sZWFuKSB7XHJcblx0XHRcdGlmIChyZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5oaWRlTW9kYWxEaWFsb2d1ZSgpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdVc2VyIGRlbGV0ZWQnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1VzZXIgaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxyXG5cdFx0XHRcdFx0ZW5kVGltZXI6IDQwMDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdFcnJvciEnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgZGVsZXRpbmcgdXNlci4gUGxlYXNlIHRyeSBhZ2FpbicsXHJcblx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIERlbGV0ZSBhbGwgdXNlcnMgY29kZWZsb3dcclxuXHRcdCovXHJcblx0XHRkZWxldGVBbGwoJGV2ZW50KSB7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdEZWxldGUgYWxsIHVzZXJzPycsXHJcblx0XHRcdFx0Ym9keTogJ1BsZWFzZSBjb25maXJtLCB5b3Ugd2FudCB0byBkZWxldGUgYWxsIHVzZXJzJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICdDYW5jZWwnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiB0cnVlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5kZWxldGVBbGxVc2Vyc0NvbmZpcm0uYmluZCh0aGlzKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGVBbGxVc2Vyc0NvbmZpcm0odXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdkZWxldGVVc2VyQ29uZmlybSwgdXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dmFyIHVzZXJJZHMgPSBbXTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLnVzZXJzTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdHVzZXJJZHMucHVzaCh0aGlzLnVzZXJzTGlzdFtpXS5pZF9tZW1iZXIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8qdGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2RlbGV0ZWFsbHVzZXJzJyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHQndXNlcklkcyc6IHVzZXJJZHNcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMub25BbGxVc2Vyc0RlbGV0ZWQocmVzcG9uc2UucmVzcCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7Ki9cclxuXHRcdH1cclxuXHJcblx0XHRvbkFsbFVzZXJzRGVsZXRlZChyZXNwOiBCb29sZWFuKSB7XHJcblx0XHRcdGlmIChyZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5oaWRlTW9kYWxEaWFsb2d1ZSgpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdBbGwgdXNlcnMgZGVsZXRlZCcsXHJcblx0XHRcdFx0XHRib2R5OiAnQWxsIFVzZXJzIGFyZSBkZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcblx0XHRcdFx0XHRzdGFydFRpbWVyOiA1MDAsXHJcblx0XHRcdFx0XHRlbmRUaW1lcjogNDAwMFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRib2R5OiAnV2UgaGF2ZSBlbmNvdW50ZXJlZCBlcnJvciB3aGlsZSBkZWxldGluZyB1c2Vycy4gUGxlYXNlIHRyeSBhZ2FpbicsXHJcblx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEdlbmVyaWMgZnVuY3Rpb25zIHRvIGhpZGUgcG9wIHVwc1xyXG5cdFx0KiB0byBzaG93IGluZm8gc2xpZGVyIGV0Y1xyXG5cdFx0Ki9cclxuXHRcdGhpZGVFZGl0UG9wdXAoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1lZGl0LW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKG9yZGVyQnk6IHN0cmluZykge1xyXG5cdFx0XHRpZiAob3JkZXJCeSA9PT0gdGhpcy5zb3J0T3JkZXIpIHtcclxuXHRcdFx0XHR0aGlzLnNvcnRPcmRlciA9ICctJyArIG9yZGVyQnk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSBvcmRlckJ5O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd0luZm9TbGlkZXIocGFyYW1zOiBJbmZvU2xpZGVySW50ZXJmYWNlKSB7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlciA9IHtcclxuXHRcdFx0XHR0aXRsZTogcGFyYW1zLnRpdGxlLFxyXG5cdFx0XHRcdGJvZHk6IHBhcmFtcy5ib2R5XHJcblx0XHRcdH07XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1pbmZvLXNsaWRlcicsIHt9KTtcclxuXHRcdFx0fSwgcGFyYW1zLnN0YXJ0VGltZXIpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5oaWRlSW5mb1NsaWRlcigpO1xyXG5cdFx0XHR9LCBwYXJhbXMuZW5kVGltZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVJbmZvU2xpZGVyKCkge1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtaW5mby1zbGlkZXInLCB7fSk7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlckRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBGdW5jdGlvbnMgdG8gc2V0IGRlYWZ1bHQgdmFsdWVzIGZvciBkaWZmZXJlbnQgY29uZmlnc1xyXG5cdFx0Ki9cclxuXHRcdGNyZWF0ZXRhYmxlSGVhZGluZygpIHtcclxuXHRcdFx0dGhpcy50YWJsZUhlYWRpbmcgPSBbe1xyXG5cdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEnLFxyXG5cdFx0XHRcdCdzb3J0T3JkZXInOiAnaWRfbWVtYmVyJyxcclxuXHRcdFx0XHQndGV4dCc6ICdTLk5vJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZmlyc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0ZpcnN0IG5hbWUnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xhc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0xhc3QgbmFtZSdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0zJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZW1haWwnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnRW1haWwnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ3Bob25lbnVtYmVyJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ1Bob25lIE51bWJlcidcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnbG9jYXRpb24nLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnTG9jYXRpb24nXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8qLCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xIHRleHQtcmlnaHQnLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICcnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLWNoZWNrZWQ9XCJjdXN0b21Db250cm9sbGVyLmNoZWNrYm94SGFuZGxlclNlcnZpY2UuY2hlY2tib3hDb3VudGVyXCIgLz4nLFxyXG5cdFx0XHRcdFx0J2N1c3RvbUZ1bmMnOiB0aGlzLmNoZWNrYm94SGFuZGxlclNlcnZpY2UuY2hlY2tBbGwuYmluZCh0aGlzLmNoZWNrYm94SGFuZGxlclNlcnZpY2UpLFxyXG5cdFx0XHRcdFx0J2N1c3RvbUhUTUwnOiB0cnVlXHJcblx0XHRcdFx0fSovXHJcblx0XHRcdF07XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdHVzZXJEYXRhOiB7fSxcclxuXHRcdFx0XHR1c2VySWQ6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGluZm9TbGlkZXJEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXIgPSB7XHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlcnNMaXN0Q29udHJvbGxlcicsIGFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEFkZFVzZXJDb250cm9sbGVyIGltcGxlbWVudHMgQWRkVXNlckludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHZhbGlkRW1haWw6IEJvb2xlYW47XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIG1vZGFsRGlhbG9ndWU6IE1vZGFsRGlhbG9ndWVJbnRlcmZhY2U7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCdTb2NrZXRTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc29ja2V0U2VydmljZTogU29ja2V0U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbignYWRkLXVzZXInLCBmdW5jdGlvbihldmVudCwgYXJncykge1xyXG5cdFx0XHRcdHRoaXMuYWRkVXNlcigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy51c2VyRGF0YURlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gdGhpcy51dGlsc1NlcnZpY2UudmFsaWRhdGVFbWFpbCh2YWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRm9ybSgpIHtcclxuXHRcdFx0Ly8gbWFrZSBudWxsIHVuZGVmaW5lZCBjaGVja3MgaGVyZVxyXG5cdFx0XHRpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEuZmlyc3RuYW1lKSB8fCB0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5sYXN0bmFtZSkpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1uYW1lJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmVtYWlsKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLWVtYWlsJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLnBob25lbnVtYmVyKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLXBob25lbnVtYmVyJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmxvY2F0aW9uKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLWxvY2F0aW9uJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdvdG9Vc2VyTGlzdCgpIHtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2FkZCB1c2VyOiAnLCB0aGlzLnVzZXJEYXRhKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XHJcblx0XHRcdFx0dGhpcy5zb2NrZXRTZXJ2aWNlLm1zZ1NlbmRlcignYWRkLXVzZXInLCB0aGlzLnVzZXJEYXRhKTtcclxuXHRcdFx0XHQvKnRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2FkZHVzZXInLFxyXG5cdFx0XHRcdFx0ZGF0YTogdGhpcy51c2VyRGF0YSxcclxuXHRcdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3N1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcCAmJiByZXNwb25zZS5yZXNwID09PSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2VtYWlsSW5Vc2UnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZ290b1VzZXJMaXN0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR9KTsqL1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dXNlckRhdGFEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLnVzZXJEYXRhID0ge1xyXG5cdFx0XHRcdCdmaXJzdG5hbWUnOiAnJyxcclxuXHRcdFx0XHQnbGFzdG5hbWUnOiAnJyxcclxuXHRcdFx0XHQnZW1haWwnOiAnJyxcclxuXHRcdFx0XHQncGhvbmVudW1iZXInOiAnJyxcclxuXHRcdFx0XHQnbG9jYXRpb24nOiAnSU4nXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd01vZGFsRGlhbG9ndWUoZXJyb3JUeXBlOiBzdHJpbmcpIHtcclxuXHRcdFx0bGV0IHRpdGxlOiBzdHJpbmcgPSAnJyxcclxuXHRcdFx0XHRib2R5OiBzdHJpbmcgPSAnJztcclxuXHJcblx0XHRcdHN3aXRjaCAoZXJyb3JUeXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnZW1haWxJblVzZSc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdFbWFpbCBhbHJlYWR5IGluIHVzZSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ0VtYWlsIElEIGlzIGFscmVhZHkgaW4gdXNlLCBwbGVhc2UgZW50ZXIgYSB1bmlxdWUgRW1haWwgYWRkcmVzcyc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tbmFtZSc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCBGaXJzdCBuYW1lL0xhc3QgbmFtZSc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tZW1haWwnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgdGhlIGVtYWlsIGFkZHJlc3MnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLXBob25lbnVtYmVyJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHBob25lIG51bWJlcic7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tbG9jYXRpb24nOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIHNlbGVjdCBsb2NhdGlvbic7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiB0aXRsZSxcclxuXHRcdFx0XHRib2R5OiBib2R5LFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtbW9kYWwnLCB7fSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICcnLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0FkZFVzZXJDb250cm9sbGVyJywgYXBwLkFkZFVzZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEVkaXRVc2VyQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignRWRpdFVzZXJDb250cm9sbGVyJywgYXBwLkVkaXRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBNb2RhbERpYWxvZ3VlQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInLCBhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlckZvcm1Db250cm9sbGVyIGltcGxlbWVudHMgVXNlckZvcm1JbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSBmb3JtU3VibWl0OiBGdW5jdGlvbjtcclxuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YUlkOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIGxvY2F0aW9uT3B0aW9uOiBPYmplY3Q7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRcdHRoaXMubG9jYXRpb25PcHRpb24gPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQubG9jYXRpb25PcHRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0b25Gb3JtU3VibWl0KGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZm9ybVN1Ym1pdCh7IGRhdGE6IHRoaXMudXNlckRhdGEsIHVzZXJEYXRhSWQ6IHRoaXMudXNlckRhdGFJZCB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlckZvcm1Db250cm9sbGVyJywgYXBwLlVzZXJGb3JtQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBUYWJsZUhlYWRlckludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHNvcnRGdW5jOiBGdW5jdGlvbjtcclxuXHRcdHByaXZhdGUgZGVmYXVsdENsYXNzOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIGxhc3RTb3J0T3JkZXI6IHN0cmluZztcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckZWxlbWVudCcsXHJcblx0XHRcdCckc2NlJyxcclxuXHRcdFx0J0NoZWNrYm94SGFuZGxlclNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRzY2U6IG5nLklTQ0VTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGNoZWNrYm94SGFuZGxlclNlcnZpY2U6IENoZWNrYm94SGFuZGxlclNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmRlZmF1bHRDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKGV2ZW50OiBFdmVudCwgc29ydE9yZGVyOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG5ld0NsYXNzID0gJ2Fycm93IGFycm93LXVwJyxcclxuXHRcdFx0XHR0YXJnZXQgPSA8SFRNTEVsZW1lbnQ+IGV2ZW50LnRhcmdldDtcclxuXHJcblx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmZpbmQodGFyZ2V0KS5maW5kKCdzcGFuJykuaGFzQ2xhc3MoJ2Fycm93LXVwJykpIHtcclxuXHRcdFx0XHRuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMubGFzdFNvcnRPcmRlciAhPT0gc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjaGVhZGluZ18nICsgdGhpcy5sYXN0U29ydE9yZGVyKS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyh0aGlzLmRlZmF1bHRDbGFzcyk7XHJcblx0XHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gc29ydE9yZGVyO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCh0YXJnZXQpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKG5ld0NsYXNzKTtcclxuXHJcblx0XHRcdHRoaXMuc29ydEZ1bmMoe1xyXG5cdFx0XHRcdCdvcmRlckJ5Jzogc29ydE9yZGVyXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0Lyp0b1RydXN0ZWRIVE1MKGh0bWw6IHN0cmluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4kc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xyXG5cdFx0fSovXHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1RhYmxlSGVhZGVyQ29udHJvbGxlcicsIGFwcC5UYWJsZUhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgSW5mb1NsaWRlckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0luZm9TbGlkZXJDb250cm9sbGVyJywgYXBwLkluZm9TbGlkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJJbmZvQ29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJJbmZvSW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgcmVhZE9ubHlNb2RlOiBCb29sZWFuO1xyXG5cdFx0cHJpdmF0ZSBhY3Rpb25IYW5kbGVyOiBGdW5jdGlvbjtcclxuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRWRpdERhdGE6IHVzZXJFZGl0RGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgY2hlY2tib3hTZWxlY3RlZDogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgbG9jYXRpb25PcHRpb246IE9iamVjdDtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJHRpbWVvdXQnLFxyXG5cdFx0XHQnJGVsZW1lbnQnLFxyXG5cdFx0XHQnRG9jRXZlbnRTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGRvY0V2ZW50U2VydmljZTogRG9jRXZlbnRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGNoZWNrYm94SGFuZGxlclNlcnZpY2U6IENoZWNrYm94SGFuZGxlclNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLnJlYWRPbmx5TW9kZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmxvY2F0aW9uT3B0aW9uID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LmxvY2F0aW9uT3B0aW9uO1xyXG5cclxuXHRcdFx0dGhpcy51c2VyRWRpdERhdGFEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuJHNjb3BlLiRvbignY2hlY2stYWxsJywgKGV2ZW50LCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMub25DaGVja2JveENsaWNrZWQobnVsbCwgcGFyYW1zKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhcnRFZGl0TW9kZShldmVudDogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMucmVhZE9ubHlNb2RlKSB7XHJcblx0XHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSBmYWxzZTtcclxuXHRcdFx0XHR0aGlzLmRvY0V2ZW50U2VydmljZS5iaW5kS2V5Ym9hcmRFdmVudCh0aGlzLmNhbmNlbEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG5cdFx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLmJpbmRNb3VzZUV2ZW50KHRoaXMub25Nb3VzZUNsaWNrLmJpbmQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FuY2VsRWRpdE1vZGUoZXZlbnQ/OiBFdmVudCwgbm9yZXNldD86IEJvb2xlYW4pIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmRvY0V2ZW50U2VydmljZS51bmJpbmRLZXlib2FyZEV2ZW50KCk7XHJcblx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLnVuYmluZE1vdXNlRXZlbnQoKTtcclxuXHJcblx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gdHJ1ZTtcclxuXHRcdFx0LyppZiAodGhpcy4kc2NvcGUuJHJvb3QuJCRwaGFzZSAhPSAnJGFwcGx5JyAmJiB0aGlzLiRzY29wZS4kcm9vdC4kJHBoYXNlICE9ICckZGlnZXN0Jykge1xyXG5cdFx0XHRcdHRoaXMuJHNjb3BlLiRhcHBseSgpO1xyXG5cdFx0XHR9Ki9cclxuXHJcblx0XHRcdGlmICghbm9yZXNldCkge1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2ZpcnN0bmFtZScpLnZhbCh0aGlzLnVzZXJEYXRhLmZpcnN0bmFtZSk7XHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjbGFzdG5hbWUnKS52YWwodGhpcy51c2VyRGF0YS5sYXN0bmFtZSk7XHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjbG9jYXRpb24nKS52YWwodGhpcy51c2VyRGF0YS5sb2NhdGlvbik7XHJcblxyXG5cdFx0XHRcdHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy4kc2NvcGUuJGFwcGx5KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvbk1vdXNlQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XHJcblx0XHRcdGxldCB0YXJnZXQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRsZXQgdGFnTmFtZSA9IHRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRpZiAoKHRhZ05hbWUgIT09ICdpbnB1dCcgJiYgdGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHx8ICh0aGlzLiRlbGVtZW50LmZpbmQodGFyZ2V0KS5sZW5ndGggPT09IDApKSB7XHJcblx0XHRcdFx0dGhpcy5jYW5jZWxFZGl0TW9kZShldmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhY3Rpb25DYWxsYmFjayhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGUgPT09ICdzYXZlJykge1xyXG5cdFx0XHRcdGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XHJcblx0XHRcdFx0XHR2YXIgdXNlckRhdGEgPSB7XHJcblx0XHRcdFx0XHRcdGlkX21lbWJlcjogdGhpcy51c2VyRGF0YS5pZF9tZW1iZXIsXHJcblx0XHRcdFx0XHRcdGZpcnN0bmFtZTogdGhpcy51c2VyRWRpdERhdGEuZmlyc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRsYXN0bmFtZTogdGhpcy51c2VyRWRpdERhdGEubGFzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGVtYWlsOiB0aGlzLnVzZXJEYXRhLmVtYWlsLFxyXG5cdFx0XHRcdFx0XHRwaG9uZW51bWJlcjogdGhpcy51c2VyRGF0YS5waG9uZW51bWJlcixcclxuXHRcdFx0XHRcdFx0bG9jYXRpb246IHRoaXMudXNlckVkaXREYXRhLmxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0XHR0aW1lc3RhbXA6IHRoaXMudXNlckRhdGEudGltZXN0YW1wXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0dGhpcy5jYW5jZWxFZGl0TW9kZShudWxsLCB0cnVlKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy51c2VyRWRpdERhdGFEZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuYWN0aW9uSGFuZGxlcih7IHR5cGU6IHR5cGUsIHVzZXJJZDogdXNlcklkLCB1c2VyRGF0YTogdXNlckRhdGEgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVGb3JtKCkge1xyXG5cdFx0XHRsZXQgZmlyc3RuYW1lID0gdGhpcy51c2VyRWRpdERhdGEuZmlyc3RuYW1lLFxyXG5cdFx0XHRcdGxhc3RuYW1lID0gdGhpcy51c2VyRWRpdERhdGEubGFzdG5hbWUsXHJcblx0XHRcdFx0bG9jYXRpb24gPSB0aGlzLnVzZXJFZGl0RGF0YS5sb2NhdGlvbjtcclxuXHJcblx0XHRcdGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQoZmlyc3RuYW1lKSB8fFxyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZChsYXN0bmFtZSkgfHxcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQobG9jYXRpb24pKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0dXNlckVkaXREYXRhRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy51c2VyRWRpdERhdGEgPSB7XHJcblx0XHRcdFx0Zmlyc3RuYW1lOiB0aGlzLnVzZXJEYXRhLmZpcnN0bmFtZSxcclxuXHRcdFx0XHRsYXN0bmFtZTogdGhpcy51c2VyRGF0YS5sYXN0bmFtZSxcclxuXHRcdFx0XHRsb2NhdGlvbjogdGhpcy51c2VyRGF0YS5sb2NhdGlvblxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uQ2hlY2tib3hDbGlja2VkKGV2ZW50PzogRXZlbnQsIHBhcmFtcz86IGFueSkge1xyXG5cdFx0XHRsZXQgY2hhbmdlZCA9IGZhbHNlO1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmICgocGFyYW1zICYmIHBhcmFtcy5zdGF0ZSAhPT0gdGhpcy5jaGVja2JveFNlbGVjdGVkKSkge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hTZWxlY3RlZCA9IHBhcmFtcy5zdGF0ZTtcclxuXHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNoYW5nZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94SGFuZGxlclNlcnZpY2UubWFuYWdlQ2hlY2tib3hDb3VudGVyKHRoaXMuY2hlY2tib3hTZWxlY3RlZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlckluZm9Db250cm9sbGVyJywgYXBwLlVzZXJJbmZvQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBTcGlubmVyQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignU3Bpbm5lckNvbnRyb2xsZXInLCBhcHAuU3Bpbm5lckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEVkaXRVc2VyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBpc1Zpc2libGU6ICc9JyxcclxuXHRcdFx0dGl0bGU6ICc9JyxcclxuXHRcdFx0dXNlckRhdGE6ICc9JyxcclxuXHRcdFx0dXNlcklkOiAnPScsXHJcblx0XHRcdGhpZGVQb3B1cDogJyYnLFxyXG5cdFx0XHR1cGRhdGVEYXRhOiAnJicsXHJcblx0XHRcdGRpc2NhcmRGb3JtOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdFZGl0VXNlckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0bGluayhzY29wZTogbmcuSVNjb3BlLCBlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1lZGl0LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNlZGl0VXNlck1vZGFsJykpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI2VkaXRVc2VyTW9kYWwnKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4oICgpID0+IG5ldyBFZGl0VXNlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2VkaXRVc2VyJywgYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0aXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdGJvZHk6ICc9JyxcclxuXHRcdFx0YnRuMVR4dDogJz0nLFxyXG5cdFx0XHRidG4yVHh0OiAnPScsXHJcblx0XHRcdHNob3dCdG4yOiAnPScsXHJcblx0XHRcdGJ0bjFDYWxsYmFjazogJyYnLFxyXG5cdFx0XHRidG4yQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogJyYnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlLCBlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjbW9kYWxEaWFsb2d1ZScpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI21vZGFsRGlhbG9ndWUnKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBNb2RhbERpYWxvZ3VlRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdtb2RhbERpYWxvZ3VlJywgYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVc2VyRm9ybURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0dXNlckRhdGE6ICc9JyxcclxuXHRcdFx0dXNlcklkOiAnPScsXHJcblx0XHRcdGVkaXRNb2RlOiAnPScsXHJcblx0XHRcdHZhbGlkYXRlRW1haWw6ICcmJyxcclxuXHRcdFx0Zm9ybVN1Ym1pdDogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVXNlckZvcm1Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVXNlckZvcm1EaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VyRm9ybScsIGFwcC5Vc2VyRm9ybURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0YWJsZUhlYWRpbmc6ICc9JyxcclxuXHRcdFx0c29ydEZ1bmM6ICcmJyxcclxuXHRcdFx0Y2hlY2tBbGw6ICcmJyxcclxuXHRcdFx0ZGVsZXRlQWxsOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdUYWJsZUhlYWRlckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICRjb21waWxlOiBuZy5JQ29tcGlsZVNlcnZpY2UsIHByaXZhdGUgJHBhcnNlOiBuZy5JUGFyc2VTZXJ2aWNlKSB7IH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHZhciBkaXJlY3RpdmUgPSAoJGNvbXBpbGU6IG5nLklDb21waWxlU2VydmljZSwgJHBhcnNlOiBuZy5JUGFyc2VTZXJ2aWNlKSA9PiBuZXcgVGFibGVIZWFkZXJEaXJlY3RpdmUoJGNvbXBpbGUsICRwYXJzZSk7XHJcblx0XHRcdGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckY29tcGlsZScsICckcGFyc2UnXTtcclxuXHRcdFx0cmV0dXJuIGRpcmVjdGl2ZTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgndGFibGVIZWFkZXInLCBhcHAuVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbmZvU2xpZGVyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHQvLyBwcml2YXRlIHRpbWVyOiBudW1iZXI7XHJcblxyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0dGl0bGU6ICc9JyxcclxuXHRcdFx0Ym9keTogJz0nXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdJbmZvU2xpZGVyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0bGluayhzY29wZTogbmcuSVNjb3BlLCBlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1pbmZvLXNsaWRlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjaW5mb1NsaWRlcicpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1pbmZvLXNsaWRlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjaW5mb1NsaWRlcicpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IEluZm9TbGlkZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2luZm9TbGlkZXInLCBhcHAuSW5mb1NsaWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlckluZm9EaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdC8vIHByaXZhdGUgdGltZXI6IG51bWJlcjtcclxuXHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcblx0XHRwdWJsaWMgc2NvcGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdGFjdGlvbkhhbmRsZXI6ICcmJ1xyXG5cdFx0fTtcclxuXHRcdHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3VzZXItaW5mby5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VySW5mb0NvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6IFVzZXJJbmZvU2NvcGVJbnRlcmZhY2UsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHsgfVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVXNlckluZm9EaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VySW5mbycsIGFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNwaW5uZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNob3dMb2FkZXI6ICc9J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvc3Bpbm5lci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdTcGlubmVyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IFNwaW5uZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdzcGlubmVyJywgYXBwLlNwaW5uZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZGVjbGFyZSB2YXIgaW86IGFueTtcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFNvY2tldFNlcnZpY2UgaW1wbGVtZW50cyBTb2NrZXRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgc29ja2V0OiBhbnk7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkgeyB9XHJcblxyXG5cdFx0aW5pdFNvY2tldChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdpbml0U29ja2V0Jyk7XHJcblx0XHRcdC8vIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cHM6Ly90aWMtdGFjLXRvZS04ODE1MTIuaGVyb2t1YXBwLmNvbScpO1xyXG5cdFx0XHR0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCcpO1xyXG5cdFx0XHR0aGlzLm1zZ1JlY2VpdmVyKCk7XHJcblxyXG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bXNnU2VuZGVyKGlkZW50aWZpZXI6IHN0cmluZywgZGF0YT86IE9iamVjdCkge1xyXG5cdFx0XHQvLyBhZGQtdXNlclxyXG5cdFx0XHQvLyB1cGRhdGUtdXNlclxyXG5cdFx0XHQvLyBkZWxldGUtdXNlclxyXG5cdFx0XHQvLyBkZWxldGUtYWxsLXVzZXJcclxuXHJcblx0XHRcdGlmICghdGhpcy5zb2NrZXQpIHtcclxuXHRcdFx0XHR0aGlzLmluaXRTb2NrZXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5tc2dTZW5kZXIoaWRlbnRpZmllciwgZGF0YSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2VtaXQgc29ja2V0IGlkZW50aWZpZXI6ICcsIGlkZW50aWZpZXIpO1xyXG5cdFx0XHRcdHRoaXMuc29ja2V0LmVtaXQoaWRlbnRpZmllciwgZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRtc2dSZWNlaXZlcigpIHtcclxuXHRcdFx0dGhpcy5zb2NrZXQub24oJ3VzZXJzLWxpc3QtcmVzcCcsIChkYXRhOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3VzZXJzLWxpc3QtcmVzcCcsIGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuc29ja2V0Lm9uKCdhZGQtdXNlci1yZXNwJywgKGRhdGE6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnYWRkLXVzZXItcmVzcDonLCBkYXRhKTtcclxuXHRcdFx0XHQvLyB0aGlzLmN1c3RvbUV2ZW50U2VydmljZS5yZWdpc3RlckVtYWlsKGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuc29ja2V0Lm9uKCd1cGRhdGUtdXNlci1yZXNwJywgKGRhdGE6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlLXVzZXItcmVzcDonLCBkYXRhKTtcclxuXHRcdFx0XHQvLyB0aGlzLmN1c3RvbUV2ZW50U2VydmljZS5wbGF5ZXJzTGlzdFJlY2VpdmVkKGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuc29ja2V0Lm9uKCdkZWxldGUtdXNlci1yZWNlaXZlZCcsIChkYXRhOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2RlbGV0ZS11c2VyLXJlc3A6JywgZGF0YSk7XHJcblx0XHRcdFx0Ly8gdGhpcy5jdXN0b21FdmVudFNlcnZpY2UuaW52aXRlUmVxdWVzdChkYXRhKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLnNvY2tldC5vbignZGVsZXRlLWFsbC11c2VyLXJlc3AnLCAoZGF0YTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdkZWxldGUtYWxsLXVzZXItcmVzcDonLCBkYXRhKTtcclxuXHRcdFx0XHQvLyB0aGlzLmN1c3RvbUV2ZW50U2VydmljZS5pbnZpdGVBY3Rpb24oZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdTb2NrZXRTZXJ2aWNlJywgYXBwLlNvY2tldFNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2UgaW1wbGVtZW50cyBTaGFyZWRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAgICAgYnJvYWRjYXN0RXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoZXZlbnROYW1lLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ1NoYXJlZFNlcnZpY2UnLCBhcHAuU2hhcmVkU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVXRpbHNTZXJ2aWNlIGltcGxlbWVudHMgVXRpbHNTZXJ2aWNlSW50ZXJmYWNlIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgICAgICBnZXREYXRhVHlwZShvYmo6IGFueSkge1xyXG5cdFx0XHRyZXR1cm4gKHt9KS50b1N0cmluZy5jYWxsKG9iaikudG9Mb3dlckNhc2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpc051bGxVbmRlZmluZWQodmFsOiBhbnksIHZhbGlkYXRlWmVyb05hTj86IEJvb2xlYW4pIHtcclxuXHRcdFx0bGV0IGlzTnVsbDogQm9vbGVhbiA9IGZhbHNlLFxyXG5cdFx0XHRcdHR5cGUgPSB0aGlzLmdldERhdGFUeXBlKHZhbCk7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdbb2JqZWN0IGFycmF5XSc6XHJcblx0XHRcdFx0XHRpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ1tvYmplY3Qgb2JqZWN0XSc6XHJcblx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAodmFsKSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSBcIlwiIHx8IHZhbCA9PT0gXCJudWxsXCIgfHwgdmFsID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHZhbGlkYXRlWmVyb05hTiAmJiAodmFsID09PSAwIHx8IGlzTmFOKHZhbCkpKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlzTnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRjbG9uZShvYmo6IGFueSkge1xyXG5cdFx0XHRpZiAob2JqID09IG51bGwgfHwgdHlwZW9mIChvYmopICE9ICdvYmplY3QnKVxyXG5cdFx0XHRcdHJldHVybiBvYmo7XHJcblxyXG5cdFx0XHR2YXIgdGVtcCA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcclxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iailcclxuXHRcdFx0XHR0ZW1wW2tleV0gPSB0aGlzLmNsb25lKG9ialtrZXldKTtcclxuXHJcblx0XHRcdHJldHVybiB0ZW1wO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRW1haWwoZW1haWw6IHN0cmluZyk6IEJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgZW1haWxSZWdleHAgPSAvXlthLXowLTkhIyQlJicqK1xcLz0/Xl9ge3x9fi4tXStAW2EtejAtOV0oW2EtejAtOS1dKlthLXowLTldKT8oXFwuW2EtejAtOV0oW2EtejAtOS1dKlthLXowLTldKT8pKiQvaTtcclxuXHJcblx0XHRcdGlmIChlbWFpbCAmJiBlbWFpbFJlZ2V4cC50ZXN0KGVtYWlsKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldE9iamVjdEZyb21BcnIoYXJyOiBBcnJheTxhbnk+LCBwcm9wTmFtZTogc3RyaW5nLCBwcm9wVmFsdWU6IGFueSkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChhcnJbaV1bcHJvcE5hbWVdID09IHByb3BWYWx1ZSkgcmV0dXJuIGFycltpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGxvZyguLi5tc2c6IGFueVtdKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnVXRpbHNTZXJ2aWNlJywgYXBwLlV0aWxzU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBEb2NFdmVudFNlcnZpY2UgaW1wbGVtZW50cyBEb2NFdmVudFNlcnZpY2VJbnRlcmZhY2Uge1xyXG4gICAgcHJpdmF0ZSBkb2NSZWY6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgJyRkb2N1bWVudCdcclxuICAgIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkZG9jdW1lbnQ6IG5nLklEb2N1bWVudFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIGJpbmRNb3VzZUV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICB0aGlzLiRkb2N1bWVudC5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjYWxsYmFjayhldmVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRLZXlib2FyZEV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICB0aGlzLiRkb2N1bWVudC5vbigna2V5ZG93biBrZXlwcmVzcycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMjcpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZE1vdXNlRXZlbnQoKSB7XHJcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9mZignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRLZXlib2FyZEV2ZW50KCkge1xyXG4gICAgICB0aGlzLiRkb2N1bWVudC5vZmYoJ2tleWRvd24ga2V5cHJlc3MnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnRG9jRXZlbnRTZXJ2aWNlJywgYXBwLkRvY0V2ZW50U2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDaGVja2JveEhhbmRsZXJTZXJ2aWNlIHtcclxuXHRcdHB1YmxpYyBjaGVja2JveENvdW50ZXI6IG51bWJlcjtcclxuXHRcdHByaXZhdGUgc2VsZWN0ZWRBbGw6IEJvb2xlYW47XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hDb3VudGVyID0gMDtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEFsbCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNoZWNrQWxsKCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQWxsID0gIXRoaXMuc2VsZWN0ZWRBbGw7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnY2hlY2stYWxsJywgeyBzdGF0ZTogdGhpcy5zZWxlY3RlZEFsbCB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRtYW5hZ2VDaGVja2JveENvdW50ZXIoaXNDaGVja2VkOiBCb29sZWFuKSB7XHJcblx0XHRcdGlmKGlzQ2hlY2tlZCkge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hDb3VudGVyKys7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXItLTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuY2hlY2tib3hDb3VudGVyIDwgMCkge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hDb3VudGVyID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJywgYXBwLkNoZWNrYm94SGFuZGxlclNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9qcXVlcnkvanF1ZXJ5LmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FwcC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvbW9kdWxlcy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29uc3RhbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25maWcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3JvdXRlLWhhbmRsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItbGlzdC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL2hlYWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdGFibGUtaGVhZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItaW5mby5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9hcHAtY29uZmlnLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL3VzZXItZGF0YS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvbW9kYWwtZGlhbG9ndWUuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvaW5mby1zbGlkZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvdGFibGUtaGVhZGluZy5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9oZWFkZXItYnV0dG9ucy5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3NlcnZpY2VzL3NvY2tldC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvZG9jLWV2ZW50LmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zaGFyZWQuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3NlcnZpY2VzL3V0aWxzLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2hlYWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy91c2Vycy1saXN0LmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWluZm8uY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9zcGlubmVyLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9zcGlubmVyLmRpcmVjdGl2ZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL3NvY2tldC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvdXRpbHMuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL2NoZWNrYm94LWhhbmRsZXIuc2VydmljZS50cycgLz5cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdGV4cG9ydCB2YXIgZm9ybUFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmb3JtQXBwJywgWyduZ1JvdXRlJywgJ2NvbnRyb2xsZXJzJywgJ3NlcnZpY2VzJywgJ2RpcmVjdGl2ZXMnXSk7XHJcblxyXG5cdGZvcm1BcHAuY29uZmlnKENvbmZpZyk7XHJcbiAgICBmb3JtQXBwLnJ1bihbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ1NoYXJlZFNlcnZpY2UnLCBSb3V0ZUhhbmRsZXJdKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVGVzdENvbnRyb2xsZXIge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSB0aGlzLnV0aWxzU2VydmljZS52YWxpZGF0ZUVtYWlsKHZhbCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1Rlc3RDb250cm9sbGVyJywgYXBwLlRlc3RDb250cm9sbGVyKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
