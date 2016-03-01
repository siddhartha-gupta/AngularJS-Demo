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
            console.log('validateEmail');
        };
        UsersListController.prototype.editUserClick = function (userId) {
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
                this.sharedService.broadcastEvent('show-modal', { id: 'modalDialogue' });
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
            this.sharedService.broadcastEvent('show-modal', { id: 'modalDialogue' });
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
        * Generic functions to hide pop ups
        * to show info slider etc
        */
        UsersListController.prototype.hideEditPopup = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-edit-modal', { id: 'editUserModal' });
            this.editUserDefault();
        };
        UsersListController.prototype.hideModalDialogue = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-modal', { id: 'modalDialogue' });
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
                _this.sharedService.broadcastEvent('show-info-slider', { id: 'infoSlider' });
            }, params.startTimer);
            setTimeout(function () {
                _this.hideInfoSlider();
            }, params.endTimer);
        };
        UsersListController.prototype.hideInfoSlider = function () {
            this.sharedService.broadcastEvent('hide-info-slider', { id: 'infoSlider' });
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
                }];
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
        UserFormController.prototype.onFormSubmit = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.formSubmit({ data: this.userData, userDataId: this.userDataId });
        };
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


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var InfoSliderController = (function () {
        function InfoSliderController() {
        }
        return InfoSliderController;
    })();
    app.InfoSliderController = InfoSliderController;
})(app || (app = {}));
controllers.controller('InfoSliderController', app.InfoSliderController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserInfoController = (function () {
        function UserInfoController() {
            this.readOnlyMode = true;
        }
        UserInfoController.prototype.startEditMode = function ($event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.readOnlyMode) {
                this.readOnlyMode = false;
            }
        };
        UserInfoController.prototype.cancelEditMode = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.readOnlyMode = true;
        };
        UserInfoController.prototype.actionCallback = function (event, type, userId) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (type === 'save') {
                var userData = {
                    id_member: this.userData.id_member,
                    firstname: angular.element('#firstname').val(),
                    lastname: angular.element('#lastname').val(),
                    email: this.userData.email,
                    phonenumber: this.userData.phonenumber,
                    location: angular.element('#location').val()
                };
                this.cancelEditMode();
            }
            this.actionHandler({ type: type, userId: userId, userData: userData });
        };
        return UserInfoController;
    })();
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
        InfoSliderDirective.prototype.link = function (scope) {
            scope.$on('show-info-slider', function (event, params) {
                angular.element(document.getElementById(params.id)).modal('show');
            });
            scope.$on('hide-info-slider', function (event, params) {
                angular.element(document.getElementById(params.id)).modal('hide');
            });
        };
        InfoSliderDirective.factory = function () {
            return (function () { return new InfoSliderDirective(); });
        };
        return InfoSliderDirective;
    })();
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
        UserInfoDirective.prototype.link = function (scope) { };
        UserInfoDirective.factory = function () {
            return (function () { return new UserInfoDirective(); });
        };
        return UserInfoDirective;
    })();
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
            console.log('params: ', params);
            return this.httpService.post(params.url, params.data, {
                headers: params.headers
            });
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
/// <reference path='ts/interfaces/classes/user-list.interface.ts' />
/// <reference path='ts/interfaces/classes/add-user.interface.ts' />
/// <reference path='ts/interfaces/classes/header.interface.ts' />
/// <reference path='ts/interfaces/classes/table-header.interface.ts' />
/// <reference path='ts/interfaces/classes/user-form.interface.ts' />
/// <reference path='ts/interfaces/classes/user-info.interface.ts' />
/// <reference path='ts/interfaces/data/app-config.interface.ts' />
/// <reference path='ts/interfaces/data/user-data.interface.ts' />
/// <reference path='ts/interfaces/data/edit-user.interface.ts' />
/// <reference path='ts/interfaces/data/modal-dialogue.interface.ts' />
/// <reference path='ts/interfaces/data/info-slider.interface.ts' />
/// <reference path='ts/interfaces/data/table-heading.interface.ts' />
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


/// <reference path='_all.ts' />
var app;
(function (app) {
    app.formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services', 'directives']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', 'SharedService', app.RouteHandler]);
})(app || (app = {}));



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvY2xhc3Nlcy91c2VyLWxpc3QuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jbGFzc2VzL2FkZC11c2VyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY2xhc3Nlcy9oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jbGFzc2VzL3RhYmxlLWhlYWRlci5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2NsYXNzZXMvdXNlci1mb3JtLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY2xhc3Nlcy91c2VyLWluZm8uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL2FwcC1jb25maWcuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL3VzZXItZGF0YS5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvZWRpdC11c2VyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9tb2RhbC1kaWFsb2d1ZS5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvaW5mby1zbGlkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL3RhYmxlLWhlYWRpbmcuaW50ZXJmYWNlLnRzIiwidHMvY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy91c2Vycy1saXN0LmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWluZm8uY29udHJvbGxlci50cyIsInRzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3VzZXItaW5mby5kaXJlY3RpdmUudHMiLCJ0cy9zZXJ2aWNlcy9hcGkuc2VydmljZS50cyIsInRzL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvdXRpbHMuc2VydmljZS50cyIsIl9hbGwudHMiLCJhcHAudHMiXSwibmFtZXMiOlsiYXBwIiwiYXBwLkNvbnN0YW50cyIsImFwcC5Db25zdGFudHMuY29uc3RydWN0b3IiLCJhcHAuQ29uc3RhbnRzLkRlZmF1bHQiLCJhcHAuQ29uZmlnIiwiYXBwLkNvbmZpZy5jb25zdHJ1Y3RvciIsImFwcC5Sb3V0ZUhhbmRsZXIiLCJhcHAuUm91dGVIYW5kbGVyLmNvbnN0cnVjdG9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5IZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdGFydCIsImFwcC5IZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VTdWNjZXNzIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZUVycm9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuc2V0VXNlckxpc3RIZWFkZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5zZXRBZGRVc2VySGVhZGVyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuY2FsbEZ1bmN0aW9uIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuZ29Ub0FkZFVzZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5hZGRVc2VyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuZ29CYWNrIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmdldFVzZXJzIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIucHJvY2Vzc1NlcnZlckRhdGEiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5hZGRVc2VyIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuYWN0aW9uSGFuZGxlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnZhbGlkYXRlRW1haWwiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5lZGl0VXNlckNsaWNrIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIudXBkYXRlVXNlckRhdGEiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5vblVzZXJVcGRhdGVSZXNwIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZGVsZXRlVXNlckNsaWNrIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZGVsZXRlVXNlckNvbmZpcm0iLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5vblVzZXJEZWxldGVkIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuaGlkZUVkaXRQb3B1cCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmhpZGVNb2RhbERpYWxvZ3VlIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIubWFuYWdlU29ydE9yZGVyIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuc2hvd0luZm9TbGlkZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5oaWRlSW5mb1NsaWRlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmNyZWF0ZXRhYmxlSGVhZGluZyIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmVkaXRVc2VyRGVmYXVsdCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLm1vZGFsRGlhbG9ndWVEZWZhdWx0IiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuaW5mb1NsaWRlckRlZmF1bHQiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIudmFsaWRhdGVFbWFpbCIsImFwcC5BZGRVc2VyQ29udHJvbGxlci52YWxpZGF0ZUZvcm0iLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuZ290b1VzZXJMaXN0IiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmFkZFVzZXIiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIudXNlckRhdGFEZWZhdWx0IiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLnNob3dNb2RhbERpYWxvZ3VlIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmhpZGVNb2RhbERpYWxvZ3VlIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLm1vZGFsRGlhbG9ndWVEZWZhdWx0IiwiYXBwLkVkaXRVc2VyQ29udHJvbGxlciIsImFwcC5FZGl0VXNlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIiLCJhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVXNlckZvcm1Db250cm9sbGVyIiwiYXBwLlVzZXJGb3JtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIub25Gb3JtU3VibWl0IiwiYXBwLlRhYmxlSGVhZGVyQ29udHJvbGxlciIsImFwcC5UYWJsZUhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyLm1hbmFnZVNvcnRPcmRlciIsImFwcC5JbmZvU2xpZGVyQ29udHJvbGxlciIsImFwcC5JbmZvU2xpZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2VySW5mb0NvbnRyb2xsZXIiLCJhcHAuVXNlckluZm9Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJJbmZvQ29udHJvbGxlci5zdGFydEVkaXRNb2RlIiwiYXBwLlVzZXJJbmZvQ29udHJvbGxlci5jYW5jZWxFZGl0TW9kZSIsImFwcC5Vc2VySW5mb0NvbnRyb2xsZXIuYWN0aW9uQ2FsbGJhY2siLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUubGluayIsImFwcC5FZGl0VXNlckRpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUiLCJhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5Nb2RhbERpYWxvZ3VlRGlyZWN0aXZlLmxpbmsiLCJhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLlVzZXJGb3JtRGlyZWN0aXZlIiwiYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuVGFibGVIZWFkZXJEaXJlY3RpdmUiLCJhcHAuVGFibGVIZWFkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlIiwiYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuSW5mb1NsaWRlckRpcmVjdGl2ZS5saW5rIiwiYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5Vc2VySW5mb0RpcmVjdGl2ZSIsImFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5saW5rIiwiYXBwLlVzZXJJbmZvRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuQVBJU2VydmljZSIsImFwcC5BUElTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLkFQSVNlcnZpY2UuZ2V0Q2FsbCIsImFwcC5BUElTZXJ2aWNlLnBvc3RDYWxsIiwiYXBwLlNoYXJlZFNlcnZpY2UiLCJhcHAuU2hhcmVkU2VydmljZS5jb25zdHJ1Y3RvciIsImFwcC5VdGlsc1NlcnZpY2UiLCJhcHAuVXRpbHNTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLlV0aWxzU2VydmljZS5nZXREYXRhVHlwZSIsImFwcC5VdGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkIiwiYXBwLlV0aWxzU2VydmljZS5jbG9uZSIsImFwcC5VdGlsc1NlcnZpY2UudmFsaWRhdGVFbWFpbCIsImFwcC5VdGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFyciIsImFwcC5VdGlsc1NlcnZpY2UubG9nIl0sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7QUFFbkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDOUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7OztBQ0psRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBV1Q7QUFYRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBQUFDO1FBT0FDLENBQUNBO1FBTkFELHNCQUFXQSxvQkFBT0E7aUJBQWxCQTtnQkFDQ0UsTUFBTUEsQ0FBQ0E7b0JBQ05BLFNBQVNBLEVBQUVBLHdCQUF3QkE7b0JBQ25DQSxXQUFXQSxFQUFFQSxlQUFlQTtpQkFDNUJBO1lBQ0ZBLENBQUNBOzs7V0FBQUY7UUFDRkEsZ0JBQUNBO0lBQURBLENBQUNBLElBQUFEO0lBUFlBLGFBQVNBLFlBT3JCQTtBQUNGQSxDQUFDQSxFQVhNLEdBQUcsS0FBSCxHQUFHLFFBV1Q7OztBQ2JELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQUtDSSxnQkFBWUEsY0FBdUNBO1lBQ2xEQyxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQTtnQkFDakNBLFdBQVdBLEVBQUVBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLGdCQUFnQkE7Z0JBQ2pFQSxVQUFVQSxFQUFFQSxxQkFBcUJBO2dCQUNqQ0EsWUFBWUEsRUFBRUEsa0JBQWtCQTthQUNoQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUE7Z0JBQ25CQSxVQUFVQSxFQUFFQSxtQkFBbUJBO2dCQUMvQkEsWUFBWUEsRUFBRUEsa0JBQWtCQTtnQkFDaENBLFdBQVdBLEVBQUVBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLGNBQWNBO2FBQy9EQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxFQUFFQSxVQUFVQSxFQUFFQSxZQUFZQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUM1Q0EsQ0FBQ0E7UUFkYUQsY0FBT0EsR0FBR0E7WUFDZEEsZ0JBQWdCQTtTQUNuQkEsQ0FBQ0E7UUFhVEEsYUFBQ0E7SUFBREEsQ0FBQ0EsSUFBQUo7SUFoQllBLFVBQU1BLFNBZ0JsQkE7QUFDRkEsQ0FBQ0EsRUFwQk0sR0FBRyxLQUFILEdBQUcsUUFvQlQ7OztBQ3RCRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBcUNUO0FBckNELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7SUFFWkE7UUFHQ00sc0JBQ1VBLFVBQWVBLEVBQUVBLHVCQUF1QkE7WUFDakRBLFNBQThCQSxFQUM5QkEsYUFBNEJBO1lBRTVCQyxVQUFVQSxDQUFDQSxLQUFLQSxHQUFHQTtnQkFDbEJBLElBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBO2FBQ2pCQSxDQUFDQTtZQUVGQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxtQkFBbUJBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BO2dCQUNoRSxhQUFhLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO29CQUNoRCxJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsT0FBTztpQkFDaEIsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxxQkFBcUJBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BO2dCQUNsRSxhQUFhLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFO29CQUNsRCxJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsT0FBTztpQkFDaEIsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxtQkFBbUJBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BO2dCQUNoRSxhQUFhLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO29CQUNoRCxJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsT0FBTztpQkFDaEIsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQS9CTUQsbUJBQU1BLEdBQUdBLENBQUNBLFlBQVlBLEVBQUVBLFdBQVdBLEVBQUVBLGVBQWVBLENBQUNBLENBQUNBO1FBZ0M5REEsbUJBQUNBO0lBQURBLENBQUNBLElBQUFOO0lBakNZQSxnQkFBWUEsZUFpQ3hCQTtBQUNGQSxDQUFDQSxFQXJDTSxHQUFHLEtBQUgsR0FBRyxRQXFDVDs7O0FDdkNELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FlVDtBQWZELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7QUFjZEEsQ0FBQ0EsRUFmTSxHQUFHLEtBQUgsR0FBRyxRQWVUOzs7QUNqQkQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQVlUO0FBWkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQSxDQUFDQTtBQVdkQSxDQUFDQSxFQVpNLEdBQUcsS0FBSCxHQUFHLFFBWVQ7OztBQ2RELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtBQW1CYkEsQ0FBQ0EsRUFwQk0sR0FBRyxLQUFILEdBQUcsUUFvQlQ7OztBQ3RCRCx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBTVQ7QUFORCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBLENBQUNBO0FBS2RBLENBQUNBLEVBTk0sR0FBRyxLQUFILEdBQUcsUUFNVDs7O0FDUkQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQU1UO0FBTkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQSxDQUFDQTtBQUtkQSxDQUFDQSxFQU5NLEdBQUcsS0FBSCxHQUFHLFFBTVQ7OztBQ1JELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FRVDtBQVJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7QUFPZEEsQ0FBQ0EsRUFSTSxHQUFHLEtBQUgsR0FBRyxRQVFUOzs7QUNWRCx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBT1Q7QUFQRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0FBTWJBLENBQUNBLEVBUE0sR0FBRyxLQUFILEdBQUcsUUFPVDs7O0FDVEQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQVdUO0FBWEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtBQVViQSxDQUFDQSxFQVhNLEdBQUcsS0FBSCxHQUFHLFFBV1Q7OztBQ2JELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FTVDtBQVRELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7QUFRYkEsQ0FBQ0EsRUFUTSxHQUFHLEtBQUgsR0FBRyxRQVNUOzs7QUNYRCx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBY1Q7QUFkRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0FBYWJBLENBQUNBLEVBZE0sR0FBRyxLQUFILEdBQUcsUUFjVDs7O0FDaEJELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FPVDtBQVBELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7QUFNYkEsQ0FBQ0EsRUFQTSxHQUFHLEtBQUgsR0FBRyxRQU9UOzs7QUNURCx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBUVQ7QUFSRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0FBT2JBLENBQUNBLEVBUk0sR0FBRyxLQUFILEdBQUcsUUFRVDs7O0FDVkQsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQW9IVDtBQXBIRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBYUNRLDBCQUNTQSxNQUFpQkEsRUFDakJBLFNBQThCQSxFQUM5QkEsT0FBMEJBLEVBQzFCQSxJQUFvQkEsRUFDcEJBLGFBQTRCQTtZQUo1QkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7WUFDakJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQXFCQTtZQUM5QkEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBbUJBO1lBQzFCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUFDcEJBLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFlQTtZQUVwQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ25FQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxvQkFBb0JBLEVBQUVBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkVBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLGtCQUFrQkEsRUFBRUEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVuRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsaUJBQWlCQSxDQUFDQTtZQUNqQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7Z0JBQ3BCQSxTQUFTQSxFQUFFQSxLQUFLQTtnQkFDaEJBLFdBQVdBLEVBQUVBLEVBQUVBO2dCQUNmQSxNQUFNQSxFQUFFQSxFQUFFQTthQUNWQSxDQUFDQTtZQUNGQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQTtnQkFDckJBLFNBQVNBLEVBQUVBLEtBQUtBO2dCQUNoQkEsV0FBV0EsRUFBRUEsRUFBRUE7Z0JBQ2ZBLE1BQU1BLEVBQUVBLEVBQUVBO2FBQ1ZBLENBQUNBO1FBQ0hBLENBQUNBO1FBRURELDZDQUFrQkEsR0FBbEJBLFVBQW1CQSxLQUFZQSxFQUFFQSxNQUFjQTtZQUM5Q0UsaURBQWlEQTtRQUNsREEsQ0FBQ0E7UUFFREYsK0NBQW9CQSxHQUFwQkEsVUFBcUJBLEtBQVlBLEVBQUVBLE1BQVdBO1lBQzdDRyxtREFBbURBO1lBRW5EQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUVBLE1BQU1BLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUN4Q0EsS0FBS0EscUJBQXFCQTt3QkFDekJBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7d0JBQ3pCQSxLQUFLQSxDQUFDQTtvQkFFUEEsS0FBS0EsbUJBQW1CQTt3QkFDdkJBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0E7d0JBQ3hCQSxLQUFLQSxDQUFDQTtnQkFDUkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7WUFDMUJBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRURILDZDQUFrQkEsR0FBbEJBLFVBQW1CQSxLQUFLQSxFQUFFQSxNQUFNQTtZQUMvQkksaURBQWlEQTtRQUNsREEsQ0FBQ0E7UUFFREosNENBQWlCQSxHQUFqQkE7WUFDQ0ssSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7Z0JBQ3BCQSxTQUFTQSxFQUFFQSxLQUFLQTtnQkFDaEJBLFdBQVdBLEVBQUVBLEVBQUVBO2dCQUNmQSxNQUFNQSxFQUFFQSxFQUFFQTthQUNWQSxDQUFDQTtZQUVGQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQTtnQkFDckJBLFNBQVNBLEVBQUVBLElBQUlBO2dCQUNmQSxXQUFXQSxFQUFFQSxhQUFhQTtnQkFDMUJBLE1BQU1BLEVBQUVBLFVBQVVBO2FBQ2xCQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVETCwyQ0FBZ0JBLEdBQWhCQTtZQUNDTSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQTtnQkFDcEJBLFNBQVNBLEVBQUVBLElBQUlBO2dCQUNmQSxXQUFXQSxFQUFFQSxRQUFRQTtnQkFDckJBLE1BQU1BLEVBQUVBLE1BQU1BO2FBQ2RBLENBQUNBO1lBRUZBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBO2dCQUNyQkEsU0FBU0EsRUFBRUEsS0FBS0E7Z0JBQ2hCQSxXQUFXQSxFQUFFQSxFQUFFQTtnQkFDZkEsTUFBTUEsRUFBRUEsRUFBRUE7YUFDVkEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFFRE4sdUNBQVlBLEdBQVpBLFVBQWFBLEtBQVlBLEVBQUVBLFNBQWlCQTtZQUMzQ08sS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFFdkJBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN6Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDbkJBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRURQLHNDQUFXQSxHQUFYQTtZQUNDUSw2REFBNkRBO1lBQzdEQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUMzQ0EsQ0FBQ0E7UUFFRFIsa0NBQU9BLEdBQVBBO1lBQ0NTLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLFVBQVVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1FBQ25EQSxDQUFDQTtRQUVEVCxpQ0FBTUEsR0FBTkE7WUFDQ1UsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQzdDQSxDQUFDQTtRQTFHYVYsd0JBQU9BLEdBQUdBO1lBQ3ZCQSxRQUFRQTtZQUNSQSxXQUFXQTtZQUNYQSxTQUFTQTtZQUNUQSxNQUFNQTtZQUNOQSxlQUFlQTtTQUNmQSxDQUFDQTtRQXFHSEEsdUJBQUNBO0lBQURBLENBQUNBLElBQUFSO0lBaEhZQSxvQkFBZ0JBLG1CQWdINUJBO0FBQ0ZBLENBQUNBLEVBcEhNLEdBQUcsS0FBSCxHQUFHLFFBb0hUO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7O0FDdkhqRSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBdVVUO0FBdlVELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFpQkNtQiw2QkFDU0EsTUFBaUJBLEVBQ2pCQSxTQUE4QkEsRUFDOUJBLFVBQXNCQSxFQUN0QkEsWUFBMEJBLEVBQzFCQSxhQUE0QkE7WUFKNUJDLFdBQU1BLEdBQU5BLE1BQU1BLENBQVdBO1lBQ2pCQSxjQUFTQSxHQUFUQSxTQUFTQSxDQUFxQkE7WUFDOUJBLGVBQVVBLEdBQVZBLFVBQVVBLENBQVlBO1lBQ3RCQSxpQkFBWUEsR0FBWkEsWUFBWUEsQ0FBY0E7WUFDMUJBLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFlQTtZQUVwQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDdkNBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFdBQVdBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtZQUVoQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDcEJBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO1lBQzVCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBO1FBQzNCQSxDQUFDQTtRQUVERCxzQ0FBUUEsR0FBUkE7WUFBQUUsaUJBUUNBO1lBUEFBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBO2dCQUN2QkEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsR0FBR0EsY0FBY0E7YUFDaERBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLE1BQU1BO2dCQUN2QkEsS0FBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUM3QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBQ0EsSUFBSUEsRUFBRUEsTUFBTUE7Z0JBQ3JCQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUM3QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDSkEsQ0FBQ0E7UUFFREYsK0NBQWlCQSxHQUFqQkEsVUFBa0JBLElBQVNBO1lBQzFCRyxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxxQkFBcUJBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBRW5EQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3ZCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRURILHFDQUFPQSxHQUFQQTtZQUNDSSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUMzQ0EsQ0FBQ0E7UUFFREo7O1VBRUVBO1FBQ0ZBLDJDQUFhQSxHQUFiQSxVQUFjQSxJQUFZQSxFQUFFQSxNQUFjQSxFQUFFQSxRQUFjQTtZQUN6REssTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2RBLEtBQUtBLE1BQU1BO29CQUNWQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtvQkFDM0JBLEtBQUtBLENBQUNBO2dCQUVQQSxLQUFLQSxRQUFRQTtvQkFDWkEsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7b0JBQzdCQSxLQUFLQSxDQUFDQTtnQkFFUEEsS0FBS0EsTUFBTUE7b0JBQ1ZBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO29CQUN0Q0EsS0FBS0EsQ0FBQ0E7WUFDUkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREw7O1VBRUVBO1FBQ0ZBLDJDQUFhQSxHQUFiQSxVQUFjQSxHQUFXQTtZQUN4Qk0sT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBO1FBRUROLDJDQUFhQSxHQUFiQSxVQUFjQSxNQUFjQTtZQUMzQk8sSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFFMUNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBO2dCQUNmQSxTQUFTQSxFQUFFQSxJQUFJQTtnQkFDZkEsS0FBS0EsRUFBRUEsY0FBY0E7Z0JBQ3JCQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLFdBQVdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO2dCQUMxR0EsTUFBTUEsRUFBRUEsTUFBTUE7YUFDZEEsQ0FBQ0E7WUFDRkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUM5RUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDdENBLENBQUNBO1FBRURQLDRDQUFjQSxHQUFkQSxVQUFlQSxJQUFTQSxFQUFFQSxNQUFjQTtZQUF4Q1EsaUJBd0JDQTtZQXZCQUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFFMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBO2dCQUN4QkEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsR0FBR0EsWUFBWUE7Z0JBQzlDQSxNQUFNQSxFQUFFQTtvQkFDUEEsUUFBUUEsRUFBRUEsTUFBTUE7b0JBQ2hCQSxVQUFVQSxFQUFFQTt3QkFDWEEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0E7d0JBQ2pCQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQTt3QkFDekJBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBO3dCQUN6QkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUE7d0JBQ3ZCQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQTt3QkFDdkJBLFdBQVdBLEVBQUVBLElBQUlBLENBQUNBLFdBQVdBO3FCQUM3QkE7aUJBQ0RBO2dCQUNEQSxPQUFPQSxFQUFFQSxFQUFFQSxjQUFjQSxFQUFFQSxtQ0FBbUNBLEVBQUVBO2FBQ2hFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFDQSxRQUFhQTtnQkFDeEJBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLDBCQUEwQkEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzVEQSxLQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFDQSxRQUFRQTtnQkFDakJBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLHdCQUF3QkEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDM0RBLENBQUNBLENBQUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBRURSLDhDQUFnQkEsR0FBaEJBLFVBQWlCQSxJQUFhQTtZQUM3QlMsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7WUFFckJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7b0JBQ25CQSxLQUFLQSxFQUFFQSxjQUFjQTtvQkFDckJBLElBQUlBLEVBQUVBLHlDQUF5Q0E7b0JBQy9DQSxVQUFVQSxFQUFFQSxHQUFHQTtvQkFDZkEsUUFBUUEsRUFBRUEsSUFBSUE7aUJBQ2RBLENBQUNBLENBQUNBO2dCQUNIQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtZQUNqQkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBO29CQUNwQkEsU0FBU0EsRUFBRUEsSUFBSUE7b0JBQ2ZBLEtBQUtBLEVBQUVBLFFBQVFBO29CQUNmQSxJQUFJQSxFQUFFQSw2RUFBNkVBO29CQUNuRkEsT0FBT0EsRUFBRUEsSUFBSUE7b0JBQ2JBLE9BQU9BLEVBQUVBLEVBQUVBO29CQUNYQSxRQUFRQSxFQUFFQSxLQUFLQTtvQkFDZkEsWUFBWUEsRUFBRUEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtvQkFDL0NBLFlBQVlBLEVBQUVBLGNBQWEsQ0FBQztvQkFDNUJBLGdCQUFnQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtpQkFDbkRBLENBQUNBO2dCQUNGQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxRUEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFRFQ7O1VBRUVBO1FBQ0ZBLDZDQUFlQSxHQUFmQSxVQUFnQkEsTUFBY0E7WUFDN0JVLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBRTFDQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQTtnQkFDcEJBLFNBQVNBLEVBQUVBLElBQUlBO2dCQUNmQSxLQUFLQSxFQUFFQSxjQUFjQTtnQkFDckJBLElBQUlBLEVBQUVBLDZDQUE2Q0E7Z0JBQ25EQSxPQUFPQSxFQUFFQSxJQUFJQTtnQkFDYkEsT0FBT0EsRUFBRUEsUUFBUUE7Z0JBQ2pCQSxRQUFRQSxFQUFFQSxJQUFJQTtnQkFDZEEsWUFBWUEsRUFBRUEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQTtnQkFDdkRBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQy9DQSxnQkFBZ0JBLEVBQUVBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7YUFDbkRBLENBQUNBO1lBQ0ZBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLFlBQVlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1FBQzFFQSxDQUFDQTtRQUVEViwrQ0FBaUJBLEdBQWpCQSxVQUFrQkEsTUFBY0E7WUFBaENXLGlCQWVDQTtZQWRBQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSw2QkFBNkJBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBRTdEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQTtnQkFDeEJBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLEdBQUdBLFlBQVlBO2dCQUM5Q0EsSUFBSUEsRUFBRUE7b0JBQ0xBLFFBQVFBLEVBQUVBLE1BQU1BO2lCQUNoQkE7Z0JBQ0RBLE9BQU9BLEVBQUVBLEVBQUVBLGNBQWNBLEVBQUVBLG1DQUFtQ0EsRUFBRUE7YUFDaEVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLFFBQWFBO2dCQUN4QkEsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzdDQSxLQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNuQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBQ0EsUUFBUUE7Z0JBQ2pCQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxTQUFTQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDSkEsQ0FBQ0E7UUFFRFgsMkNBQWFBLEdBQWJBLFVBQWNBLElBQWFBO1lBQzFCWSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkJBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtvQkFDbkJBLEtBQUtBLEVBQUVBLGNBQWNBO29CQUNyQkEsSUFBSUEsRUFBRUEsb0NBQW9DQTtvQkFDMUNBLFVBQVVBLEVBQUVBLEdBQUdBO29CQUNmQSxRQUFRQSxFQUFFQSxJQUFJQTtpQkFDZEEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0hBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBQ2pCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7b0JBQ3BCQSxTQUFTQSxFQUFFQSxJQUFJQTtvQkFDZkEsS0FBS0EsRUFBRUEsUUFBUUE7b0JBQ2ZBLElBQUlBLEVBQUVBLGlFQUFpRUE7b0JBQ3ZFQSxPQUFPQSxFQUFFQSxJQUFJQTtvQkFDYkEsT0FBT0EsRUFBRUEsRUFBRUE7b0JBQ1hBLFFBQVFBLEVBQUVBLEtBQUtBO29CQUNmQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO29CQUMvQ0EsWUFBWUEsRUFBRUEsY0FBYSxDQUFDO29CQUM1QkEsZ0JBQWdCQSxFQUFFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2lCQUNuREEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFRFo7OztVQUdFQTtRQUNGQSwyQ0FBYUEsR0FBYkEsVUFBY0EsS0FBYUE7WUFDMUJhLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtnQkFDeEJBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxpQkFBaUJBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1lBQzlFQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7UUFFRGIsK0NBQWlCQSxHQUFqQkEsVUFBa0JBLEtBQWFBO1lBQzlCYyxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsS0FBS0EsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7Z0JBQ3hCQSxLQUFLQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7WUFFREEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsWUFBWUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsZUFBZUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDekVBLElBQUlBLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRURkLDZDQUFlQSxHQUFmQSxVQUFnQkEsT0FBWUE7WUFDM0JlLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLEtBQUtBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsR0FBR0EsT0FBT0EsQ0FBQ0E7WUFDaENBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxPQUFPQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFRGYsNENBQWNBLEdBQWRBLFVBQWVBLE1BQVdBO1lBQTFCZ0IsaUJBWUNBO1lBWEFBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBO2dCQUNqQkEsS0FBS0EsRUFBRUEsTUFBTUEsQ0FBQ0EsS0FBS0E7Z0JBQ25CQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQTthQUNqQkEsQ0FBQ0E7WUFDRkEsVUFBVUEsQ0FBQ0E7Z0JBQ1ZBLEtBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLGtCQUFrQkEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDN0VBLENBQUNBLEVBQUVBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBRXRCQSxVQUFVQSxDQUFDQTtnQkFDVkEsS0FBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFDdkJBLENBQUNBLEVBQUVBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQ3JCQSxDQUFDQTtRQUVEaEIsNENBQWNBLEdBQWRBO1lBQ0NpQixJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxrQkFBa0JBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLFlBQVlBLEVBQUVBLENBQUNBLENBQUNBO1lBQzVFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1FBQzFCQSxDQUFDQTtRQUVEakI7O1VBRUVBO1FBQ0ZBLGdEQUFrQkEsR0FBbEJBO1lBQ0NrQixJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxDQUFDQTtvQkFDcEJBLFdBQVdBLEVBQUVBLFVBQVVBO29CQUN2QkEsV0FBV0EsRUFBRUEsV0FBV0E7b0JBQ3hCQSxNQUFNQSxFQUFFQSxNQUFNQTtpQkFDZEEsRUFBRUE7b0JBQ0RBLFdBQVdBLEVBQUVBLFVBQVVBO29CQUN2QkEsV0FBV0EsRUFBRUEsV0FBV0E7b0JBQ3hCQSxNQUFNQSxFQUFFQSxZQUFZQTtpQkFDcEJBLEVBQUVBO29CQUNGQSxXQUFXQSxFQUFFQSxVQUFVQTtvQkFDdkJBLFdBQVdBLEVBQUVBLFVBQVVBO29CQUN2QkEsTUFBTUEsRUFBRUEsV0FBV0E7aUJBQ25CQSxFQUFFQTtvQkFDRkEsV0FBV0EsRUFBRUEsVUFBVUE7b0JBQ3ZCQSxXQUFXQSxFQUFFQSxPQUFPQTtvQkFDcEJBLE1BQU1BLEVBQUVBLE9BQU9BO2lCQUNmQSxFQUFFQTtvQkFDRkEsV0FBV0EsRUFBRUEsVUFBVUE7b0JBQ3ZCQSxXQUFXQSxFQUFFQSxhQUFhQTtvQkFDMUJBLE1BQU1BLEVBQUVBLGNBQWNBO2lCQUN0QkEsRUFBRUE7b0JBQ0ZBLFdBQVdBLEVBQUVBLFVBQVVBO29CQUN2QkEsV0FBV0EsRUFBRUEsVUFBVUE7b0JBQ3ZCQSxNQUFNQSxFQUFFQSxVQUFVQTtpQkFDbEJBLENBQUNBLENBQUNBO1FBQ0xBLENBQUNBO1FBRURsQiw2Q0FBZUEsR0FBZkE7WUFDQ21CLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBO2dCQUNmQSxTQUFTQSxFQUFFQSxLQUFLQTtnQkFDaEJBLEtBQUtBLEVBQUVBLEVBQUVBO2dCQUNUQSxRQUFRQSxFQUFFQSxFQUFFQTtnQkFDWkEsTUFBTUEsRUFBRUEsRUFBRUE7YUFDVkEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFFRG5CLGtEQUFvQkEsR0FBcEJBO1lBQ0NvQixJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQTtnQkFDcEJBLFNBQVNBLEVBQUVBLEtBQUtBO2dCQUNoQkEsS0FBS0EsRUFBRUEsRUFBRUE7Z0JBQ1RBLElBQUlBLEVBQUVBLEVBQUVBO2dCQUNSQSxPQUFPQSxFQUFFQSxFQUFFQTtnQkFDWEEsT0FBT0EsRUFBRUEsRUFBRUE7Z0JBQ1hBLFFBQVFBLEVBQUVBLEtBQUtBO2dCQUNmQSxZQUFZQSxFQUFFQSxjQUFhLENBQUM7Z0JBQzVCQSxZQUFZQSxFQUFFQSxjQUFhLENBQUM7Z0JBQzVCQSxnQkFBZ0JBLEVBQUVBLGNBQWEsQ0FBQzthQUNoQ0EsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFFRHBCLCtDQUFpQkEsR0FBakJBO1lBQ0NxQixJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQTtnQkFDakJBLEtBQUtBLEVBQUVBLEVBQUVBO2dCQUNUQSxJQUFJQSxFQUFFQSxFQUFFQTthQUNSQTtRQUNGQSxDQUFDQTtRQXpUYXJCLDJCQUFPQSxHQUFHQTtZQUN2QkEsUUFBUUE7WUFDUkEsV0FBV0E7WUFDWEEsWUFBWUE7WUFDWkEsY0FBY0E7WUFDZEEsZUFBZUE7U0FDZkEsQ0FBQ0E7UUFvVEhBLDBCQUFDQTtJQUFEQSxDQUFDQSxJQUFBbkI7SUFuVVlBLHVCQUFtQkEsc0JBbVUvQkE7QUFDRkEsQ0FBQ0EsRUF2VU0sR0FBRyxLQUFILEdBQUcsUUF1VVQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7QUMxVXZFLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FnS1Q7QUFoS0QsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQSxDQUFDQTtJQUViQTtRQWNDeUMsMkJBQ1NBLE1BQWlCQSxFQUNqQkEsU0FBOEJBLEVBQzlCQSxVQUFzQkEsRUFDdEJBLFlBQTBCQSxFQUMxQkEsYUFBNEJBO1lBSjVCQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFXQTtZQUNqQkEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBcUJBO1lBQzlCQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFZQTtZQUN0QkEsaUJBQVlBLEdBQVpBLFlBQVlBLENBQWNBO1lBQzFCQSxrQkFBYUEsR0FBYkEsYUFBYUEsQ0FBZUE7WUFFcENBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLElBQUlBO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUN2Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDeEJBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO1FBQzdCQSxDQUFDQTtRQUVERCx5Q0FBYUEsR0FBYkEsVUFBY0EsR0FBV0E7WUFDeEJFLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3hEQSxDQUFDQTtRQUVERix3Q0FBWUEsR0FBWkE7WUFDQ0csa0NBQWtDQTtZQUNsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzdIQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQzNDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkVBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQTtnQkFDNUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1lBQ2RBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN6RUEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSx5QkFBeUJBLENBQUNBLENBQUNBO2dCQUNsREEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9DQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNiQSxDQUFDQTtRQUVESCx3Q0FBWUEsR0FBWkE7WUFDQ0ksSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDN0NBLENBQUNBO1FBRURKLG1DQUFPQSxHQUFQQTtZQUFBSyxpQkFvQkNBO1lBbkJBQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUVuREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQTtvQkFDeEJBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLEdBQUdBLFNBQVNBO29CQUMzQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUE7b0JBQ25CQSxPQUFPQSxFQUFFQSxFQUFFQSxjQUFjQSxFQUFFQSxtQ0FBbUNBLEVBQUVBO2lCQUNoRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsUUFBYUE7b0JBQ3hCQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtvQkFFN0NBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLFFBQVFBLENBQUNBLElBQUlBLElBQUlBLFFBQVFBLENBQUNBLElBQUlBLEtBQUtBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzNFQSxLQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO29CQUN0Q0EsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTtvQkFDckJBLENBQUNBO2dCQUNGQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFDQSxRQUFhQTtvQkFDdEJBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDSkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREwsMkNBQWVBLEdBQWZBO1lBQ0NNLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBO2dCQUNmQSxXQUFXQSxFQUFFQSxFQUFFQTtnQkFDZkEsVUFBVUEsRUFBRUEsRUFBRUE7Z0JBQ2RBLE9BQU9BLEVBQUVBLEVBQUVBO2dCQUNYQSxhQUFhQSxFQUFFQSxFQUFFQTtnQkFDakJBLFVBQVVBLEVBQUVBLElBQUlBO2FBQ2hCQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVETiw2Q0FBaUJBLEdBQWpCQSxVQUFrQkEsU0FBaUJBO1lBQ2xDTyxJQUFJQSxLQUFLQSxHQUFXQSxFQUFFQSxFQUNyQkEsSUFBSUEsR0FBV0EsRUFBRUEsQ0FBQ0E7WUFFbkJBLE1BQU1BLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQkEsS0FBS0EsWUFBWUE7b0JBQ2hCQSxLQUFLQSxHQUFHQSxzQkFBc0JBLENBQUNBO29CQUMvQkEsSUFBSUEsR0FBR0EsaUVBQWlFQSxDQUFDQTtvQkFDekVBLEtBQUtBLENBQUNBO2dCQUVQQSxLQUFLQSxrQkFBa0JBO29CQUN0QkEsS0FBS0EsR0FBR0EsaUJBQWlCQSxDQUFDQTtvQkFDMUJBLElBQUlBLEdBQUdBLGtDQUFrQ0EsQ0FBQ0E7b0JBQzFDQSxLQUFLQSxDQUFDQTtnQkFFUEEsS0FBS0EsbUJBQW1CQTtvQkFDdkJBLEtBQUtBLEdBQUdBLGlCQUFpQkEsQ0FBQ0E7b0JBQzFCQSxJQUFJQSxHQUFHQSwrQkFBK0JBLENBQUNBO29CQUN2Q0EsS0FBS0EsQ0FBQ0E7Z0JBRVBBLEtBQUtBLHlCQUF5QkE7b0JBQzdCQSxLQUFLQSxHQUFHQSxpQkFBaUJBLENBQUNBO29CQUMxQkEsSUFBSUEsR0FBR0EsMEJBQTBCQSxDQUFDQTtvQkFDbENBLEtBQUtBLENBQUNBO2dCQUVQQSxLQUFLQSxzQkFBc0JBO29CQUMxQkEsS0FBS0EsR0FBR0EsaUJBQWlCQSxDQUFDQTtvQkFDMUJBLElBQUlBLEdBQUdBLHdCQUF3QkEsQ0FBQ0E7b0JBQ2hDQSxLQUFLQSxDQUFDQTtZQUNSQSxDQUFDQTtZQUVEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUN6RUEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7Z0JBQ3BCQSxTQUFTQSxFQUFFQSxJQUFJQTtnQkFDZkEsS0FBS0EsRUFBRUEsS0FBS0E7Z0JBQ1pBLElBQUlBLEVBQUVBLElBQUlBO2dCQUNWQSxPQUFPQSxFQUFFQSxJQUFJQTtnQkFDYkEsT0FBT0EsRUFBRUEsRUFBRUE7Z0JBQ1hBLFFBQVFBLEVBQUVBLEtBQUtBO2dCQUNmQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUMvQ0EsWUFBWUEsRUFBRUEsY0FBYSxDQUFDO2dCQUM1QkEsZ0JBQWdCQSxFQUFFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2FBQ25EQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVEUCw2Q0FBaUJBLEdBQWpCQSxVQUFrQkEsS0FBYUE7WUFDOUJRLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtnQkFDeEJBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUN6RUEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7UUFFRFIsZ0RBQW9CQSxHQUFwQkE7WUFDQ1MsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0E7Z0JBQ3BCQSxTQUFTQSxFQUFFQSxLQUFLQTtnQkFDaEJBLEtBQUtBLEVBQUVBLEVBQUVBO2dCQUNUQSxJQUFJQSxFQUFFQSxFQUFFQTtnQkFDUkEsT0FBT0EsRUFBRUEsRUFBRUE7Z0JBQ1hBLE9BQU9BLEVBQUVBLEVBQUVBO2dCQUNYQSxRQUFRQSxFQUFFQSxLQUFLQTtnQkFDZkEsWUFBWUEsRUFBRUEsY0FBYSxDQUFDO2dCQUM1QkEsWUFBWUEsRUFBRUEsY0FBYSxDQUFDO2dCQUM1QkEsZ0JBQWdCQSxFQUFFQSxjQUFhLENBQUM7YUFDaENBLENBQUNBO1FBQ0hBLENBQUNBO1FBckphVCx5QkFBT0EsR0FBR0E7WUFDdkJBLFFBQVFBO1lBQ1JBLFdBQVdBO1lBQ1hBLFlBQVlBO1lBQ1pBLGNBQWNBO1lBQ2RBLGVBQWVBO1NBQ2ZBLENBQUNBO1FBZ0pIQSx3QkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQXpDO0lBNUpZQSxxQkFBaUJBLG9CQTRKN0JBO0FBQ0ZBLENBQUNBLEVBaEtNLEdBQUcsS0FBSCxHQUFHLFFBZ0tUO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7O0FDbktuRSx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBTVQ7QUFORCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBLENBQUNBO0lBRWJBO1FBQ0NtRDtRQUFnQkMsQ0FBQ0E7UUFDbEJELHlCQUFDQTtJQUFEQSxDQUFDQSxJQUFBbkQ7SUFGWUEsc0JBQWtCQSxxQkFFOUJBO0FBQ0ZBLENBQUNBLEVBTk0sR0FBRyxLQUFILEdBQUcsUUFNVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7OztBQ1RyRSx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBTVQ7QUFORCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBLENBQUNBO0lBRWJBO1FBQ0NxRDtRQUFnQkMsQ0FBQ0E7UUFDbEJELDhCQUFDQTtJQUFEQSxDQUFDQSxJQUFBckQ7SUFGWUEsMkJBQXVCQSwwQkFFbkNBO0FBQ0ZBLENBQUNBLEVBTk0sR0FBRyxLQUFILEdBQUcsUUFNVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7OztBQ1QvRSx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBa0JUO0FBbEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFLQ3VEO1FBQWdCQyxDQUFDQTtRQUVqQkQseUNBQVlBLEdBQVpBLFVBQWFBLEtBQVlBO1lBQ3hCRSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7Z0JBQ3ZCQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDdkVBLENBQUNBO1FBQ0ZGLHlCQUFDQTtJQUFEQSxDQUFDQSxJQUFBdkQ7SUFkWUEsc0JBQWtCQSxxQkFjOUJBO0FBQ0ZBLENBQUNBLEVBbEJNLEdBQUcsS0FBSCxHQUFHLFFBa0JUO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7O0FDckJyRSx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBdUNUO0FBdkNELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFTQzBELCtCQUFvQkEsUUFBZ0NBO1lBQWhDQyxhQUFRQSxHQUFSQSxRQUFRQSxDQUF3QkE7WUFDbkRBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7WUFDdkNBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUVERCwrQ0FBZUEsR0FBZkEsVUFBZ0JBLEtBQVlBLEVBQUVBLFNBQWlCQTtZQUM5Q0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO2dCQUN2QkEsS0FBS0EsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7WUFDekJBLENBQUNBO1lBRURBLElBQUlBLFFBQVFBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7WUFDaENBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNyRUEsUUFBUUEsR0FBR0Esa0JBQWtCQSxDQUFDQTtZQUMvQkEsQ0FBQ0E7WUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsS0FBS0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtnQkFDekdBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLFNBQVNBLENBQUNBO1lBQ2hDQSxDQUFDQTtZQUNEQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUU1RUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQ2JBLFNBQVNBLEVBQUVBLFNBQVNBO2FBQ3BCQSxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQTdCYUYsNkJBQU9BLEdBQUdBO1lBQ3ZCQSxVQUFVQTtTQUNWQSxDQUFDQTtRQTRCSEEsNEJBQUNBO0lBQURBLENBQUNBLElBQUExRDtJQW5DWUEseUJBQXFCQSx3QkFtQ2pDQTtBQUNGQSxDQUFDQSxFQXZDTSxHQUFHLEtBQUgsR0FBRyxRQXVDVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7OztBQzFDM0UseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQU1UO0FBTkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQSxDQUFDQTtJQUViQTtRQUNDNkQ7UUFBZ0JDLENBQUNBO1FBQ2xCRCwyQkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQTdEO0lBRllBLHdCQUFvQkEsdUJBRWhDQTtBQUNGQSxDQUFDQSxFQU5NLEdBQUcsS0FBSCxHQUFHLFFBTVQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzs7QUNUekUseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQW9EVDtBQXBERCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBLENBQUNBO0lBRWJBO1FBS0MrRDtZQUNDQyxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUFFREQsMENBQWFBLEdBQWJBLFVBQWNBLE1BQWFBO1lBQzFCRSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7Z0JBQ3ZCQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUMzQkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREYsMkNBQWNBLEdBQWRBLFVBQWVBLEtBQWFBO1lBQzNCRyxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7Z0JBQ3ZCQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRURILDJDQUFjQSxHQUFkQSxVQUFlQSxLQUFZQSxFQUFFQSxJQUFZQSxFQUFFQSxNQUFjQTtZQUN4REksRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO2dCQUN2QkEsS0FBS0EsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7WUFDekJBLENBQUNBO1lBRURBLEVBQUVBLEVBQUNBLElBQUlBLEtBQUtBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUNwQkEsSUFBSUEsUUFBUUEsR0FBR0E7b0JBQ2RBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBO29CQUNsQ0EsU0FBU0EsRUFBRUEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7b0JBQzlDQSxRQUFRQSxFQUFFQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtvQkFDNUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBO29CQUMxQkEsV0FBV0EsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0E7b0JBQ3RDQSxRQUFRQSxFQUFFQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtpQkFDNUNBLENBQUNBO2dCQUNGQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtZQUN2QkEsQ0FBQ0E7WUFFREEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDeEVBLENBQUNBO1FBQ0ZKLHlCQUFDQTtJQUFEQSxDQUFDQSxJQUFBL0Q7SUFoRFlBLHNCQUFrQkEscUJBZ0Q5QkE7QUFDRkEsQ0FBQ0EsRUFwRE0sR0FBRyxLQUFILEdBQUcsUUFvRFQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7QUN2RHJFLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FtQ1Q7QUFuQ0QsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQWdCRm9FO1lBZk9DLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ1RBLFVBQUtBLEdBQUdBO2dCQUNYQSxTQUFTQSxFQUFFQSxHQUFHQTtnQkFDdkJBLEtBQUtBLEVBQUVBLEdBQUdBO2dCQUNWQSxRQUFRQSxFQUFFQSxHQUFHQTtnQkFDYkEsTUFBTUEsRUFBRUEsR0FBR0E7Z0JBQ1hBLFNBQVNBLEVBQUVBLEdBQUdBO2dCQUNkQSxVQUFVQSxFQUFFQSxHQUFHQTtnQkFDZkEsV0FBV0EsRUFBRUEsR0FBR0E7YUFDVkEsQ0FBQ0E7WUFDS0EsZ0JBQVdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLHFDQUFxQ0EsQ0FBQ0E7WUFDOUZBLGVBQVVBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7WUFDbENBLGlCQUFZQSxHQUFHQSxrQkFBa0JBLENBQUNBO1lBQ2xDQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1FBRWhCQSxDQUFDQTtRQUVoQkQsZ0NBQUlBLEdBQUpBLFVBQUtBLEtBQWVBO1lBQ25CRSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxpQkFBaUJBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLE1BQVdBO2dCQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQ0EsQ0FBQ0E7WUFFSEEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxVQUFTQSxLQUFLQSxFQUFFQSxNQUFXQTtnQkFDdkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBRU1GLHlCQUFPQSxHQUFkQTtZQUNDRyxNQUFNQSxFQUFFQSxjQUFNQSxXQUFJQSxpQkFBaUJBLEVBQUVBLEVBQXZCQSxDQUF1QkEsQ0FBQ0EsQ0FBQ0E7UUFDeENBLENBQUNBO1FBQ0NILHdCQUFDQTtJQUFEQSxDQUFDQSxJQUFBcEU7SUEvQllBLHFCQUFpQkEsb0JBK0I3QkE7QUFDTEEsQ0FBQ0EsRUFuQ00sR0FBRyxLQUFILEdBQUcsUUFtQ1Q7QUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7O0FDdENsRSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBcUNUO0FBckNELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUkEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFrQkZ3RTtZQWpCT0MsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDVEEsVUFBS0EsR0FBR0E7Z0JBQ3BCQSxTQUFTQSxFQUFFQSxHQUFHQTtnQkFDZEEsS0FBS0EsRUFBRUEsR0FBR0E7Z0JBQ1ZBLElBQUlBLEVBQUVBLEdBQUdBO2dCQUNUQSxPQUFPQSxFQUFFQSxHQUFHQTtnQkFDWkEsT0FBT0EsRUFBRUEsR0FBR0E7Z0JBQ1pBLFFBQVFBLEVBQUVBLEdBQUdBO2dCQUNiQSxZQUFZQSxFQUFFQSxHQUFHQTtnQkFDakJBLFlBQVlBLEVBQUVBLEdBQUdBO2dCQUNqQkEsZ0JBQWdCQSxFQUFFQSxHQUFHQTthQUNmQSxDQUFDQTtZQUNLQSxnQkFBV0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsR0FBR0EsMENBQTBDQSxDQUFDQTtZQUNuR0EsZUFBVUEsR0FBR0EseUJBQXlCQSxDQUFDQTtZQUN2Q0EsaUJBQVlBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7WUFDbENBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFZkEsQ0FBQ0E7UUFFakJELHFDQUFJQSxHQUFKQSxVQUFLQSxLQUFlQTtZQUNuQkUsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsTUFBV0E7Z0JBQ2xELE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxFQUFFQSxVQUFTQSxLQUFLQSxFQUFFQSxNQUFXQTtnQkFDbEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBRU1GLDhCQUFPQSxHQUFkQTtZQUNDRyxNQUFNQSxDQUFDQSxDQUFDQSxjQUFNQSxXQUFJQSxzQkFBc0JBLEVBQUVBLEVBQTVCQSxDQUE0QkEsQ0FBQ0EsQ0FBQ0E7UUFDN0NBLENBQUNBO1FBQ0NILDZCQUFDQTtJQUFEQSxDQUFDQSxJQUFBeEU7SUFqQ1lBLDBCQUFzQkEseUJBaUNsQ0E7QUFDTEEsQ0FBQ0EsRUFyQ00sR0FBRyxLQUFILEdBQUcsUUFxQ1Q7QUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7O0FDeEM1RSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBd0JUO0FBeEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUkEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFlRjRFO1lBZE9DLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ1RBLFVBQUtBLEdBQUdBO2dCQUNwQkEsUUFBUUEsRUFBRUEsR0FBR0E7Z0JBQ2JBLE1BQU1BLEVBQUVBLEdBQUdBO2dCQUNYQSxRQUFRQSxFQUFFQSxHQUFHQTtnQkFDYkEsYUFBYUEsRUFBRUEsR0FBR0E7Z0JBQ2xCQSxVQUFVQSxFQUFFQSxHQUFHQTtnQkFDZkEsV0FBV0EsRUFBRUEsR0FBR0E7YUFDVkEsQ0FBQ0E7WUFDS0EsZ0JBQVdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLHFDQUFxQ0EsQ0FBQ0E7WUFDOUZBLGVBQVVBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7WUFDbENBLGlCQUFZQSxHQUFHQSxrQkFBa0JBLENBQUNBO1lBQ2xDQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1FBRWhCQSxDQUFDQTtRQUVURCx5QkFBT0EsR0FBZEE7WUFDQ0UsTUFBTUEsQ0FBQ0EsQ0FBQ0EsY0FBTUEsV0FBSUEsaUJBQWlCQSxFQUFFQSxFQUF2QkEsQ0FBdUJBLENBQUNBLENBQUNBO1FBQ3hDQSxDQUFDQTtRQUNDRix3QkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQTVFO0lBcEJZQSxxQkFBaUJBLG9CQW9CN0JBO0FBQ0xBLENBQUNBLEVBeEJNLEdBQUcsS0FBSCxHQUFHLFFBd0JUO0FBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7OztBQzNCbEUsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQWtCVDtBQWxCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1JBLFlBQVlBLENBQUNBO0lBRWJBO1FBQUErRTtZQUNLQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNUQSxVQUFLQSxHQUFHQTtnQkFDWEEsWUFBWUEsRUFBRUEsR0FBR0E7Z0JBQzFCQSxRQUFRQSxFQUFFQSxHQUFHQTthQUNQQSxDQUFDQTtZQUNLQSxnQkFBV0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsR0FBR0Esd0NBQXdDQSxDQUFDQTtZQUNqR0EsZUFBVUEsR0FBR0EsdUJBQXVCQSxDQUFDQTtZQUNyQ0EsaUJBQVlBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7WUFDbENBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFLN0JBLENBQUNBO1FBSElELDRCQUFPQSxHQUFkQTtZQUNDRSxNQUFNQSxDQUFDQSxDQUFDQSxjQUFNQSxXQUFJQSxvQkFBb0JBLEVBQUVBLEVBQTFCQSxDQUEwQkEsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLENBQUNBO1FBQ0NGLDJCQUFDQTtJQUFEQSxDQUFDQSxJQUFBL0U7SUFkWUEsd0JBQW9CQSx1QkFjaENBO0FBQ0xBLENBQUNBLEVBbEJNLEdBQUcsS0FBSCxHQUFHLFFBa0JUO0FBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7OztBQ3JCeEUsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQWdDVDtBQWhDRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1JBLFlBQVlBLENBQUNBO0lBRWJBO1FBYUZrRjtZQVpBQyx5QkFBeUJBO1lBRWxCQSxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNUQSxVQUFLQSxHQUFHQTtnQkFDcEJBLEtBQUtBLEVBQUVBLEdBQUdBO2dCQUNWQSxJQUFJQSxFQUFFQSxHQUFHQTthQUNIQSxDQUFDQTtZQUNLQSxnQkFBV0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsR0FBR0EsdUNBQXVDQSxDQUFDQTtZQUNoR0EsZUFBVUEsR0FBR0Esc0JBQXNCQSxDQUFDQTtZQUNwQ0EsaUJBQVlBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7WUFDbENBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFZkEsQ0FBQ0E7UUFFakJELGtDQUFJQSxHQUFKQSxVQUFLQSxLQUFnQkE7WUFDcEJFLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLGtCQUFrQkEsRUFBRUEsVUFBU0EsS0FBS0EsRUFBRUEsTUFBV0E7Z0JBQ3hELE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDQSxDQUFDQTtZQUVIQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLE1BQVdBO2dCQUN4RCxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQ0EsQ0FBQ0E7UUFDSkEsQ0FBQ0E7UUFFTUYsMkJBQU9BLEdBQWRBO1lBQ0NHLE1BQU1BLENBQUNBLENBQUNBLGNBQU1BLFdBQUlBLG1CQUFtQkEsRUFBRUEsRUFBekJBLENBQXlCQSxDQUFDQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7UUFDQ0gsMEJBQUNBO0lBQURBLENBQUNBLElBQUFsRjtJQTVCWUEsdUJBQW1CQSxzQkE0Qi9CQTtBQUNMQSxDQUFDQSxFQWhDTSxHQUFHLEtBQUgsR0FBRyxRQWdDVDtBQUNELFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOzs7QUNuQ3RFLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0F3QlQ7QUF4QkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQWFGc0Y7WUFaQUMseUJBQXlCQTtZQUVsQkEsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDVEEsVUFBS0EsR0FBR0E7Z0JBQ3BCQSxRQUFRQSxFQUFFQSxHQUFHQTtnQkFDYkEsYUFBYUEsRUFBRUEsR0FBR0E7YUFDWkEsQ0FBQ0E7WUFDS0EsZ0JBQVdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLHFDQUFxQ0EsQ0FBQ0E7WUFDOUZBLGVBQVVBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7WUFDbENBLGlCQUFZQSxHQUFHQSxrQkFBa0JBLENBQUNBO1lBQ2xDQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1FBRWZBLENBQUNBO1FBRWpCRCxnQ0FBSUEsR0FBSkEsVUFBS0EsS0FBZ0JBLElBQUlFLENBQUNBO1FBRW5CRix5QkFBT0EsR0FBZEE7WUFDQ0csTUFBTUEsQ0FBQ0EsQ0FBQ0EsY0FBTUEsV0FBSUEsaUJBQWlCQSxFQUFFQSxFQUF2QkEsQ0FBdUJBLENBQUNBLENBQUNBO1FBQ3hDQSxDQUFDQTtRQUNDSCx3QkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQXRGO0lBcEJZQSxxQkFBaUJBLG9CQW9CN0JBO0FBQ0xBLENBQUNBLEVBeEJNLEdBQUcsS0FBSCxHQUFHLFFBd0JUO0FBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7OztBQzNCbEUsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQXVCVDtBQXZCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1JBLFlBQVlBLENBQUNBO0lBRWJBO1FBSUkwRixvQkFBb0JBLEtBQXNCQTtZQUF0QkMsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBaUJBO1lBQ3RDQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7UUFFREQsNEJBQU9BLEdBQVBBLFVBQVFBLE1BQVdBO1lBQ2ZFLElBQUlBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBLE1BQU1BLElBQUlBLEVBQUVBLENBQUNBO1lBQ2pDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUNwREEsQ0FBQ0E7UUFFREYsNkJBQVFBLEdBQVJBLFVBQVNBLE1BQVdBO1lBQ2hCRyxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUNoQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUE7Z0JBQ2xEQSxPQUFPQSxFQUFFQSxNQUFNQSxDQUFDQSxPQUFPQTthQUMxQkEsQ0FBQ0EsQ0FBQ0E7UUFDUEEsQ0FBQ0E7UUFqQk1ILGtCQUFPQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQWtCL0JBLGlCQUFDQTtJQUFEQSxDQUFDQSxJQUFBMUY7SUFuQllBLGNBQVVBLGFBbUJ0QkE7QUFDTEEsQ0FBQ0EsRUF2Qk0sR0FBRyxLQUFILEdBQUcsUUF1QlQ7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7OztBQzFCL0Msc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQVlUO0FBWkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSQSxZQUFZQSxDQUFDQTtJQUViQTtRQUdJOEYsdUJBQW9CQSxVQUFnQ0E7WUFBaENDLGVBQVVBLEdBQVZBLFVBQVVBLENBQXNCQTtZQUVwREEsbUJBQWNBLEdBQUdBLFVBQVNBLFNBQVNBLEVBQUVBLElBQUlBO2dCQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDQTtRQUpzREEsQ0FBQ0E7UUFGbERELHFCQUFPQSxHQUFHQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQU9wQ0Esb0JBQUNBO0lBQURBLENBQUNBLElBQUE5RjtJQVJZQSxpQkFBYUEsZ0JBUXpCQTtBQUNMQSxDQUFDQSxFQVpNLEdBQUcsS0FBSCxHQUFHLFFBWVQ7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7OztBQ2ZyRCxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBb0VUO0FBcEVELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUkEsWUFBWUEsQ0FBQ0E7SUFFYkE7UUFDSWdHO1FBQWdCQyxDQUFDQTtRQUVqQkQsa0NBQVdBLEdBQVhBLFVBQVlBLEdBQVFBO1lBQ3pCRSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtRQUM5Q0EsQ0FBQ0E7UUFFREYsc0NBQWVBLEdBQWZBLFVBQWdCQSxHQUFRQSxFQUFFQSxlQUF5QkE7WUFDbERHLElBQUlBLE1BQU1BLEdBQVlBLEtBQUtBLEVBQzFCQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUU5QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2RBLEtBQUtBLGdCQUFnQkE7b0JBQ3BCQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdEJBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO29CQUNmQSxDQUFDQTtvQkFDREEsS0FBS0EsQ0FBQ0E7Z0JBRVBBLEtBQUtBLGlCQUFpQkE7b0JBQ3JCQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbkNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO29CQUNmQSxDQUFDQTtvQkFDREEsS0FBS0EsQ0FBQ0E7Z0JBRVBBO29CQUNDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxXQUFXQSxJQUFJQSxHQUFHQSxLQUFLQSxJQUFJQSxJQUFJQSxHQUFHQSxLQUFLQSxFQUFFQSxJQUFJQSxHQUFHQSxLQUFLQSxNQUFNQSxJQUFJQSxHQUFHQSxLQUFLQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDekdBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO29CQUNmQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZUFBZUEsSUFBSUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pEQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDZkEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7WUFDREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUFFREgsNEJBQUtBLEdBQUxBLFVBQU1BLEdBQVFBO1lBQ2JJLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLElBQUlBLElBQUlBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLFFBQVFBLENBQUNBO2dCQUMzQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFFWkEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsR0FBR0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFDakNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLEdBQUdBLENBQUNBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2JBLENBQUNBO1FBRURKLG9DQUFhQSxHQUFiQSxVQUFjQSxLQUFhQTtZQUMxQkssSUFBSUEsV0FBV0EsR0FBR0EsbUdBQW1HQSxDQUFDQTtZQUV0SEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNiQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDZEEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREwsdUNBQWdCQSxHQUFoQkEsVUFBaUJBLEdBQWVBLEVBQUVBLFFBQWdCQSxFQUFFQSxTQUFjQTtZQUNqRU0sR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQTtvQkFBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRUROLDBCQUFHQSxHQUFIQTtZQUFJTyxhQUFhQTtpQkFBYkEsV0FBYUEsQ0FBYkEsc0JBQWFBLENBQWJBLElBQWFBO2dCQUFiQSw0QkFBYUE7O1lBQ2hCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUN2Q0EsQ0FBQ0E7UUFDQ1AsbUJBQUNBO0lBQURBLENBQUNBLElBQUFoRztJQWhFWUEsZ0JBQVlBLGVBZ0V4QkE7QUFDTEEsQ0FBQ0EsRUFwRU0sR0FBRyxLQUFILEdBQUcsUUFvRVQ7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7OztBQ3ZFbkQsK0VBQStFO0FBQy9FLG1GQUFtRjtBQUNuRix5RkFBeUY7QUFFekYsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMscUNBQXFDO0FBQ3JDLDRDQUE0QztBQUU1QyxxRUFBcUU7QUFDckUsb0VBQW9FO0FBQ3BFLGtFQUFrRTtBQUNsRSx3RUFBd0U7QUFDeEUscUVBQXFFO0FBQ3JFLHFFQUFxRTtBQUVyRSxtRUFBbUU7QUFDbkUsa0VBQWtFO0FBQ2xFLGtFQUFrRTtBQUNsRSx1RUFBdUU7QUFDdkUsb0VBQW9FO0FBQ3BFLHNFQUFzRTtBQUV0RSw0REFBNEQ7QUFDNUQsZ0VBQWdFO0FBQ2hFLDhEQUE4RDtBQUU5RCwwRUFBMEU7QUFDMUUsK0VBQStFO0FBQy9FLDBFQUEwRTtBQUMxRSw2RUFBNkU7QUFDN0UsNEVBQTRFO0FBQzVFLDBFQUEwRTtBQUUxRSw2REFBNkQ7QUFDN0Qsa0VBQWtFO0FBQ2xFLDZEQUE2RDtBQUM3RCxnRUFBZ0U7QUFDaEUsK0RBQStEO0FBQy9ELDZEQUE2RDtBQUU3RCxtREFBbUQ7QUFDbkQsc0RBQXNEO0FBQ3RELHFEQUFxRDs7O0FDNUNyRCxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBS1Q7QUFMRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ0FBLFdBQU9BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLFNBQVNBLEVBQUVBLGFBQWFBLEVBQUVBLFVBQVVBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO0lBRXJHQSxXQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFNQSxDQUFDQSxDQUFDQTtJQUNwQkEsV0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsRUFBRUEsV0FBV0EsRUFBRUEsZUFBZUEsRUFBRUEsZ0JBQVlBLENBQUNBLENBQUNBLENBQUNBO0FBQzVFQSxDQUFDQSxFQUxNLEdBQUcsS0FBSCxHQUFHLFFBS1QiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxudmFyIHNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ3NlcnZpY2VzJywgW10pO1xyXG52YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnY29udHJvbGxlcnMnLCBbXSk7XHJcbnZhciBkaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2RpcmVjdGl2ZXMnLCBbXSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcblx0XHRzdGF0aWMgZ2V0IERlZmF1bHQoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy8nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgICAgICAgJyRyb3V0ZVByb3ZpZGVyJ1xyXG4gICAgICAgIF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoJHJvdXRlUHJvdmlkZXI6IG5nLnJvdXRlLklSb3V0ZVByb3ZpZGVyKSB7XHJcblx0XHRcdCRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvdXNlcnNsaXN0XCIsIHtcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ3VzZXJzTGlzdC5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnVXNlcnNMaXN0Q29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcidcclxuXHRcdFx0fSkud2hlbignL2FkZFVzZXInLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ0FkZFVzZXJDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2FkZFVzZXIuaHRtbCdcclxuXHRcdFx0fSkub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy91c2Vyc2xpc3QnIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBSb3V0ZUhhbmRsZXIge1xyXG5cdFx0c3RhdGljIGluamVjdCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnc2hhcmVkU2VydmljZSddO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBhbnksIC8vbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcblx0XHRcdCRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0c2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRyb290U2NvcGUuVXRpbHMgPSB7XHJcblx0XHRcdFx0a2V5czogT2JqZWN0LmtleXNcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN0YXJ0Jywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZUVycm9yJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2Vyc0xpc3RJbnRlcmZhY2Uge1xyXG5cdFx0Z2V0VXNlcnMoKVxyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KVxyXG5cdFx0YWRkVXNlcigpXHJcblx0XHRlZGl0VXNlckNsaWNrKGtleTogc3RyaW5nKVxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogYW55LCB1c2VySWQ6IHN0cmluZylcclxuXHRcdGhpZGVFZGl0UG9wdXAoZXZlbnQ/OiBFdmVudClcclxuXHRcdGVkaXRVc2VyRGVmYXVsdCgpXHJcblx0XHRkZWxldGVVc2VyQ2xpY2soa2V5OiBzdHJpbmcpXHJcblx0XHRkZWxldGVVc2VyQ29uZmlybShrZXk6IHN0cmluZylcclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpXHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgQWRkVXNlckludGVyZmFjZSB7XHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKVxyXG5cdFx0dmFsaWRhdGVGb3JtKClcclxuXHRcdGFkZFVzZXIoKVxyXG5cdFx0dXNlckRhdGFEZWZhdWx0KClcclxuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKVxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OkV2ZW50KVxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uc0ludGVyZmFjZSB7XHJcblx0XHQnc2hvd0J0bic6IEJvb2xlYW4sXHJcblx0XHQnY2xpY2tGdW5jJzogc3RyaW5nLFxyXG5cdFx0J3RleHQnOiBzdHJpbmdcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdG9uUm91dGVDaGFuZ2VTdGFydChldmVudDogRXZlbnQsIHBhcmFtczogT2JqZWN0KVxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSlcclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKVxyXG5cdFx0c2V0VXNlckxpc3RIZWFkZXIoKVxyXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZylcclxuXHRcdGdvVG9BZGRVc2VyKClcclxuXHRcdGFkZFVzZXIoKVxyXG5cdFx0Z29CYWNrKClcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBUYWJsZUhlYWRlckludGVyZmFjZSB7XHJcblx0XHRtYW5hZ2VTb3J0T3JkZXIoZXZlbnQ6IEV2ZW50LCBzb3J0T3JkZXI6IHN0cmluZyk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckZvcm1JbnRlcmZhY2Uge1xyXG5cdFx0b25Gb3JtU3VibWl0KGV2ZW50OiBFdmVudCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckZvcm1JbnRlcmZhY2Uge1xyXG5cdFx0c3RhcnRFZGl0TW9kZShldmVudDogRXZlbnQpOiB2b2lkO1xyXG5cdFx0Y2FuY2VsRWRpdE1vZGUoZXZlbnQ/OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRhY3Rpb25DYWxsYmFjayhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgYXBwQ29uZmlnSW50ZXJmYWNlIHtcclxuXHRcdHNlcnZlclVybDogc3RyaW5nO1xyXG5cdFx0dGVtcGxhdGVVcmw6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJEYXRhSW50ZXJmYWNlIHtcclxuXHRcdGlkX21lbWJlcj86IHN0cmluZztcclxuXHRcdGZpcnN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bGFzdG5hbWU6IHN0cmluZztcclxuXHRcdGVtYWlsOiBzdHJpbmc7XHJcblx0XHRwaG9uZW51bWJlcjogc3RyaW5nO1xyXG5cdFx0bG9jYXRpb246IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEVkaXRVc2VySW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbjtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHR1c2VyRGF0YTogYW55O1xyXG5cdFx0dXNlcklkOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbixcclxuXHRcdHRpdGxlOiBzdHJpbmcsXHJcblx0XHRib2R5OiBzdHJpbmcsXHJcblx0XHRidG4xVHh0OiBzdHJpbmcsXHJcblx0XHRidG4yVHh0Pzogc3RyaW5nLFxyXG5cdFx0c2hvd0J0bjI6IEJvb2xlYW4sXHJcblx0XHRidG4xQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHRcdGJ0bjJDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0Y2xvc2VCdG5DYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSW5mb1NsaWRlckludGVyZmFjZSB7XHJcblx0XHR0aXRsZTogc3RyaW5nO1xyXG5cdFx0Ym9keTogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVGFibGVIZWFkaW5nSW50ZXJmYWNlIHtcclxuXHRcdGNsYXNzTmFtZTogc3RyaW5nO1xyXG5cdFx0c29ydE9yZGVyOiBzdHJpbmc7XHJcblx0XHR0ZXh0OiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0aGVhZGluZzogc3RyaW5nO1xyXG5cdFx0aGVhZGVyTGVmdEJ0bjogQnV0dG9uc0ludGVyZmFjZTtcclxuXHRcdGhlYWRlclJpZ2h0QnRuOiBCdXR0b25zSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJHdpbmRvdycsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3VjY2Vzcy5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgdGhpcy5vblJvdXRlQ2hhbmdlRXJyb3IuYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRpbmcgPSAnVXNlciBtYW5hZ2VtZW50JztcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XHJcblxyXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0Y2FzZSAnVXNlcnNMaXN0Q29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnQWRkVXNlckNvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEFkZFVzZXJIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29Ub0FkZFVzZXInLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0FkZCB1c2VyJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldEFkZFVzZXJIZWFkZXIoKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb0JhY2snLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0JhY2snXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzW2NsaWNrRnVuY10pKSB7XHJcblx0XHRcdFx0dGhpc1tjbGlja0Z1bmNdKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnb1RvQWRkVXNlcigpIHtcclxuXHRcdFx0Ly8gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyXCIpKS5zY29wZSgpXHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnYWRkLXVzZXInLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z29CYWNrKCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgYXBwLkhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlcnNMaXN0Q29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHVzZXJzTGlzdDogQXJyYXk8YW55PjtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGVkaXRVc2VyOiBFZGl0VXNlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgbW9kYWxEaWFsb2d1ZTogTW9kYWxEaWFsb2d1ZUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgaW5mb1NsaWRlcjogSW5mb1NsaWRlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgc29ydE9yZGVyOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIHRhYmxlSGVhZGluZzogVGFibGVIZWFkaW5nSW50ZXJmYWNlW107XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCdBUElTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5hcHBDb25maWcgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQ7XHJcblx0XHRcdHRoaXMuc29ydE9yZGVyID0gJ2ZpcnN0bmFtZSc7XHJcblx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHJcblx0XHRcdHRoaXMudXNlcnNMaXN0ID0gW107XHJcblx0XHRcdHRoaXMuZWRpdFVzZXJEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZXRhYmxlSGVhZGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldFVzZXJzKCkge1xyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UuZ2V0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXHJcblx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEsIHN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc1NlcnZlckRhdGEoZGF0YSlcclxuXHRcdFx0fSkuZXJyb3IoKGRhdGEsIHN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyJylcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygncHJvY2Vzc1NlcnZlckRhdGE6ICcsIGRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0Lmxlbmd0aCA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBBY3Rpb24gYnV0dG9ucyBoYW5kbGluZ1xyXG5cdFx0Ki9cclxuXHRcdGFjdGlvbkhhbmRsZXIodHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpIHtcclxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnZWRpdCc6XHJcblx0XHRcdFx0XHR0aGlzLmVkaXRVc2VyQ2xpY2sodXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdkZWxldGUnOlxyXG5cdFx0XHRcdFx0dGhpcy5kZWxldGVVc2VyQ2xpY2sodXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdzYXZlJzpcclxuXHRcdFx0XHRcdHRoaXMudXBkYXRlVXNlckRhdGEodXNlckRhdGEsIHVzZXJJZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEVkaXQgdXNlciBjb2RlIGZsb3dcclxuXHRcdCovXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd2YWxpZGF0ZUVtYWlsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRWRpdCBkZXRhaWxzJyxcclxuXHRcdFx0XHR1c2VyRGF0YTogdGhpcy51dGlsc1NlcnZpY2UuY2xvbmUodGhpcy51dGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFycih0aGlzLnVzZXJzTGlzdCwgJ2lkX21lbWJlcicsIHVzZXJJZCkpLFxyXG5cdFx0XHRcdHVzZXJJZDogdXNlcklkXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1lZGl0LW1vZGFsJywgeyBpZDogJ2VkaXRVc2VyTW9kYWwnIH0pO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2codGhpcy5lZGl0VXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogYW55LCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhOiAnLCBkYXRhKTtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAndXBkYXRldXNlcicsXHJcblx0XHRcdFx0J2RhdGEnOiB7XHJcblx0XHRcdFx0XHQndXNlcklkJzogdXNlcklkLFxyXG5cdFx0XHRcdFx0J3VzZXJEYXRhJzoge1xyXG5cdFx0XHRcdFx0XHRlbWFpbDogZGF0YS5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Zmlyc3RuYW1lOiBkYXRhLmZpcnN0bmFtZSxcclxuXHRcdFx0XHRcdFx0aWRfbWVtYmVyOiBkYXRhLmlkX21lbWJlcixcclxuXHRcdFx0XHRcdFx0bGFzdG5hbWU6IGRhdGEubGFzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiBkYXRhLmxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0XHRwaG9uZW51bWJlcjogZGF0YS5waG9uZW51bWJlclxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YSBzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5vblVzZXJVcGRhdGVSZXNwKHJlc3BvbnNlLnJlc3ApO1xyXG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhIGVycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uVXNlclVwZGF0ZVJlc3AocmVzcDogQm9vbGVhbikge1xyXG5cdFx0XHR0aGlzLmhpZGVFZGl0UG9wdXAoKTtcclxuXHJcblx0XHRcdGlmIChyZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1VzZXIgdXBkYXRlZCcsXHJcblx0XHRcdFx0XHRib2R5OiAnVXNlciBpbmZvIGhhcyBiZWVuIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuXHRcdFx0XHRcdHN0YXJ0VGltZXI6IDUwMCxcclxuXHRcdFx0XHRcdGVuZFRpbWVyOiA0MDAwXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAnRXJyb3IhJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIHVwZGF0aW5nIHVzZXIgaW5mb3JtYXRpb24uIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywgeyBpZDogJ21vZGFsRGlhbG9ndWUnIH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRGVsZXRlIHVzZXIgY29kZWZsb3dcclxuXHRcdCovXHJcblx0XHRkZWxldGVVc2VyQ2xpY2sodXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlIHVzZXI/JyxcclxuXHRcdFx0XHRib2R5OiAnUGxlYXNlIGNvbmZpcm0sIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgdXNlcicsXHJcblx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnQ2FuY2VsJyxcclxuXHRcdFx0XHRzaG93QnRuMjogdHJ1ZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuZGVsZXRlVXNlckNvbmZpcm0uYmluZCh0aGlzLCB1c2VySWQpLFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywgeyBpZDogJ21vZGFsRGlhbG9ndWUnIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZVVzZXJDb25maXJtKHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZGVsZXRlVXNlckNvbmZpcm0sIHVzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdkZWxldGV1c2VyJyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHQndXNlcklkJzogdXNlcklkXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3N1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR0aGlzLm9uVXNlckRlbGV0ZWQocmVzcG9uc2UucmVzcCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Vc2VyRGVsZXRlZChyZXNwOiBCb29sZWFuKSB7XHJcblx0XHRcdGlmIChyZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5oaWRlTW9kYWxEaWFsb2d1ZSgpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdVc2VyIGRlbGV0ZWQnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1VzZXIgaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxyXG5cdFx0XHRcdFx0ZW5kVGltZXI6IDQwMDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdFcnJvciEnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgZGVsZXRpbmcgdXNlci4gUGxlYXNlIHRyeSBhZ2FpbicsXHJcblx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEdlbmVyaWMgZnVuY3Rpb25zIHRvIGhpZGUgcG9wIHVwc1xyXG5cdFx0KiB0byBzaG93IGluZm8gc2xpZGVyIGV0Y1xyXG5cdFx0Ki9cclxuXHRcdGhpZGVFZGl0UG9wdXAoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1lZGl0LW1vZGFsJywgeyBpZDogJ2VkaXRVc2VyTW9kYWwnIH0pO1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLW1vZGFsJywgeyBpZDogJ21vZGFsRGlhbG9ndWUnIH0pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKG9yZGVyQnk6IGFueSkge1xyXG5cdFx0XHRpZiAob3JkZXJCeSA9PT0gdGhpcy5zb3J0T3JkZXIpIHtcclxuXHRcdFx0XHR0aGlzLnNvcnRPcmRlciA9ICctJyArIG9yZGVyQnk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSBvcmRlckJ5O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd0luZm9TbGlkZXIocGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyID0ge1xyXG5cdFx0XHRcdHRpdGxlOiBwYXJhbXMudGl0bGUsXHJcblx0XHRcdFx0Ym9keTogcGFyYW1zLmJvZHlcclxuXHRcdFx0fTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LWluZm8tc2xpZGVyJywgeyBpZDogJ2luZm9TbGlkZXInIH0pO1xyXG5cdFx0XHR9LCBwYXJhbXMuc3RhcnRUaW1lcik7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLmhpZGVJbmZvU2xpZGVyKCk7XHJcblx0XHRcdH0sIHBhcmFtcy5lbmRUaW1lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZUluZm9TbGlkZXIoKSB7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1pbmZvLXNsaWRlcicsIHsgaWQ6ICdpbmZvU2xpZGVyJyB9KTtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEZ1bmN0aW9ucyB0byBzZXQgZGVhZnVsdCB2YWx1ZXMgZm9yIGRpZmZlcmVudCBjb25maWdzXHJcblx0XHQqL1xyXG5cdFx0Y3JlYXRldGFibGVIZWFkaW5nKCkge1xyXG5cdFx0XHR0aGlzLnRhYmxlSGVhZGluZyA9IFt7XHJcblx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMScsXHJcblx0XHRcdFx0J3NvcnRPcmRlcic6ICdpZF9tZW1iZXInLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ1MuTm8nXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdmaXJzdG5hbWUnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnRmlyc3QgbmFtZSdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnbGFzdG5hbWUnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnTGFzdCBuYW1lJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTMnLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdlbWFpbCcsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdFbWFpbCdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAncGhvbmVudW1iZXInLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnUGhvbmUgTnVtYmVyJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEnLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdsb2NhdGlvbicsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdMb2NhdGlvbidcclxuXHRcdFx0XHR9XTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0VXNlckRlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0dXNlckRhdGE6IHt9LFxyXG5cdFx0XHRcdHVzZXJJZDogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICcnLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aW5mb1NsaWRlckRlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlciA9IHtcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0Ym9keTogJydcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2Vyc0xpc3RDb250cm9sbGVyJywgYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQWRkVXNlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBBZGRVc2VySW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgdmFsaWRFbWFpbDogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgbW9kYWxEaWFsb2d1ZTogTW9kYWxEaWFsb2d1ZUludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0J0FQSVNlcnZpY2UnLFxyXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkc2NvcGUuJG9uKCdhZGQtdXNlcicsIGZ1bmN0aW9uKGV2ZW50LCBhcmdzKSB7XHJcblx0XHRcdFx0dGhpcy5hZGRVc2VyKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5hcHBDb25maWcgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQ7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnVzZXJEYXRhRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSB0aGlzLnV0aWxzU2VydmljZS52YWxpZGF0ZUVtYWlsKHZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVGb3JtKCkge1xyXG5cdFx0XHQvLyBtYWtlIG51bGwgdW5kZWZpbmVkIGNoZWNrcyBoZXJlXHJcblx0XHRcdGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5maXJzdG5hbWUpIHx8IHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmxhc3RuYW1lKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLW5hbWUnKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEuZW1haWwpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tZW1haWwnKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEucGhvbmVudW1iZXIpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tcGhvbmVudW1iZXInKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEubG9jYXRpb24pKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tbG9jYXRpb24nKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z290b1VzZXJMaXN0KCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnYWRkIHVzZXI6ICcsIHRoaXMudXNlckRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcclxuXHRcdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdhZGR1c2VyJyxcclxuXHRcdFx0XHRcdGRhdGE6IHRoaXMudXNlckRhdGEsXHJcblx0XHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XHJcblx0XHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3AgJiYgcmVzcG9uc2UucmVzcCA9PT0gJ0VtYWlsIGFscmVhZHkgaW4gdXNlJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdlbWFpbEluVXNlJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmdvdG9Vc2VyTGlzdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLmVycm9yKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR1c2VyRGF0YURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMudXNlckRhdGEgPSB7XHJcblx0XHRcdFx0J2ZpcnN0bmFtZSc6ICcnLFxyXG5cdFx0XHRcdCdsYXN0bmFtZSc6ICcnLFxyXG5cdFx0XHRcdCdlbWFpbCc6ICcnLFxyXG5cdFx0XHRcdCdwaG9uZW51bWJlcic6ICcnLFxyXG5cdFx0XHRcdCdsb2NhdGlvbic6ICdJTidcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRzaG93TW9kYWxEaWFsb2d1ZShlcnJvclR5cGU6IHN0cmluZykge1xyXG5cdFx0XHRsZXQgdGl0bGU6IHN0cmluZyA9ICcnLFxyXG5cdFx0XHRcdGJvZHk6IHN0cmluZyA9ICcnO1xyXG5cclxuXHRcdFx0c3dpdGNoIChlcnJvclR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdlbWFpbEluVXNlJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0VtYWlsIGFscmVhZHkgaW4gdXNlJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnRW1haWwgSUQgaXMgYWxyZWFkeSBpbiB1c2UsIHBsZWFzZSBlbnRlciBhIHVuaXF1ZSBFbWFpbCBhZGRyZXNzJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1uYW1lJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIEZpcnN0IG5hbWUvTGFzdCBuYW1lJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1lbWFpbCc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCB0aGUgZW1haWwgYWRkcmVzcyc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tcGhvbmVudW1iZXInOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgcGhvbmUgbnVtYmVyJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1sb2NhdGlvbic6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2Ugc2VsZWN0IGxvY2F0aW9uJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7IGlkOiAnbW9kYWxEaWFsb2d1ZScgfSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6IHRpdGxlLFxyXG5cdFx0XHRcdGJvZHk6IGJvZHksXHJcblx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0Ym9keTogJycsXHJcblx0XHRcdFx0YnRuMVR4dDogJycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignQWRkVXNlckNvbnRyb2xsZXInLCBhcHAuQWRkVXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgRWRpdFVzZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdFZGl0VXNlckNvbnRyb2xsZXInLCBhcHAuRWRpdFVzZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWVDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdNb2RhbERpYWxvZ3VlQ29udHJvbGxlcicsIGFwcC5Nb2RhbERpYWxvZ3VlQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VyRm9ybUNvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2VyRm9ybUludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIGZvcm1TdWJtaXQ6IEZ1bmN0aW9uO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhSWQ6IHN0cmluZztcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdG9uRm9ybVN1Ym1pdChldmVudDogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmZvcm1TdWJtaXQoeyBkYXRhOiB0aGlzLnVzZXJEYXRhLCB1c2VyRGF0YUlkOiB0aGlzLnVzZXJEYXRhSWQgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJGb3JtQ29udHJvbGxlcicsIGFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJDb250cm9sbGVyIGltcGxlbWVudHMgVGFibGVIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSBzb3J0RnVuYzogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIGRlZmF1bHRDbGFzczogc3RyaW5nO1xyXG5cdFx0cHJpdmF0ZSBsYXN0U29ydE9yZGVyOiBzdHJpbmc7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJGVsZW1lbnQnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0dGhpcy5kZWZhdWx0Q2xhc3MgPSAnYXJyb3cgYXJyb3ctZG93bic7XHJcblx0XHRcdHRoaXMubGFzdFNvcnRPcmRlciA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy11cCc7XHJcblx0XHRcdGlmIChhbmd1bGFyLmVsZW1lbnQoZXZlbnQudGFyZ2V0KS5maW5kKCdzcGFuJykuaGFzQ2xhc3MoJ2Fycm93LXVwJykpIHtcclxuXHRcdFx0XHRuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMubGFzdFNvcnRPcmRlciAhPT0gc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KCcjaGVhZGluZ18nICsgdGhpcy5sYXN0U29ydE9yZGVyKS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyh0aGlzLmRlZmF1bHRDbGFzcyk7XHJcblx0XHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gc29ydE9yZGVyO1xyXG5cdFx0XHR9XHJcblx0XHRcdGFuZ3VsYXIuZWxlbWVudChldmVudC50YXJnZXQpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKG5ld0NsYXNzKTtcclxuXHJcblx0XHRcdHRoaXMuc29ydEZ1bmMoe1xyXG5cdFx0XHRcdCdvcmRlckJ5Jzogc29ydE9yZGVyXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdUYWJsZUhlYWRlckNvbnRyb2xsZXInLCBhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdJbmZvU2xpZGVyQ29udHJvbGxlcicsIGFwcC5JbmZvU2xpZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VySW5mb0NvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2VyRm9ybUludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHJlYWRPbmx5TW9kZTogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgYWN0aW9uSGFuZGxlcjogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXJ0RWRpdE1vZGUoJGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5yZWFkT25seU1vZGUpIHtcclxuXHRcdFx0XHR0aGlzLnJlYWRPbmx5TW9kZSA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FuY2VsRWRpdE1vZGUoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRhY3Rpb25DYWxsYmFjayhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodHlwZSA9PT0gJ3NhdmUnKSB7XHJcblx0XHRcdFx0dmFyIHVzZXJEYXRhID0ge1xyXG5cdFx0XHRcdFx0aWRfbWVtYmVyOiB0aGlzLnVzZXJEYXRhLmlkX21lbWJlcixcclxuXHRcdFx0XHRcdGZpcnN0bmFtZTogYW5ndWxhci5lbGVtZW50KCcjZmlyc3RuYW1lJykudmFsKCksXHJcblx0XHRcdFx0XHRsYXN0bmFtZTogYW5ndWxhci5lbGVtZW50KCcjbGFzdG5hbWUnKS52YWwoKSxcclxuXHRcdFx0XHRcdGVtYWlsOiB0aGlzLnVzZXJEYXRhLmVtYWlsLFxyXG5cdFx0XHRcdFx0cGhvbmVudW1iZXI6IHRoaXMudXNlckRhdGEucGhvbmVudW1iZXIsXHJcblx0XHRcdFx0XHRsb2NhdGlvbjogYW5ndWxhci5lbGVtZW50KCcjbG9jYXRpb24nKS52YWwoKVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dGhpcy5jYW5jZWxFZGl0TW9kZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFjdGlvbkhhbmRsZXIoeyB0eXBlOiB0eXBlLCB1c2VySWQ6IHVzZXJJZCwgdXNlckRhdGE6IHVzZXJEYXRhIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2VySW5mb0NvbnRyb2xsZXInLCBhcHAuVXNlckluZm9Db250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0VXNlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdHVzZXJJZDogJz0nLFxyXG5cdFx0XHRoaWRlUG9wdXA6ICcmJyxcclxuXHRcdFx0dXBkYXRlRGF0YTogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnRWRpdFVzZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1lZGl0LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4oICgpID0+IG5ldyBFZGl0VXNlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2VkaXRVc2VyJywgYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0aXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdGJvZHk6ICc9JyxcclxuXHRcdFx0YnRuMVR4dDogJz0nLFxyXG5cdFx0XHRidG4yVHh0OiAnPScsXHJcblx0XHRcdHNob3dCdG4yOiAnPScsXHJcblx0XHRcdGJ0bjFDYWxsYmFjazogJyYnLFxyXG5cdFx0XHRidG4yQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogJyYnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuaWQpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuaWQpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ21vZGFsRGlhbG9ndWUnLCBhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFVzZXJGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHR1c2VySWQ6ICc9JyxcclxuXHRcdFx0ZWRpdE1vZGU6ICc9JyxcclxuXHRcdFx0dmFsaWRhdGVFbWFpbDogJyYnLFxyXG5cdFx0XHRmb3JtU3VibWl0OiAnJicsXHJcblx0XHRcdGRpc2NhcmRGb3JtOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VyRm9ybUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VyRm9ybURpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3VzZXJGb3JtJywgYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYmxlSGVhZGluZzogJz0nLFxyXG5cdFx0XHRzb3J0RnVuYzogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVGFibGVIZWFkZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3RhYmxlSGVhZGVyJywgYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW5mb1NsaWRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0Ly8gcHJpdmF0ZSB0aW1lcjogbnVtYmVyO1xyXG5cclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdGJvZHk6ICc9J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnSW5mb1NsaWRlckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctaW5mby1zbGlkZXInLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtaW5mby1zbGlkZXInLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBJbmZvU2xpZGVyRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdpbmZvU2xpZGVyJywgYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVc2VySW5mb0RpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0Ly8gcHJpdmF0ZSB0aW1lcjogbnVtYmVyO1xyXG5cclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdGFjdGlvbkhhbmRsZXI6ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1VzZXJJbmZvQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0bGluayhzY29wZTogbmcuSVNjb3BlKSB7IH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IFVzZXJJbmZvRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VySW5mbycsIGFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaHR0cCddO1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlOiBuZy5JSHR0cFNlcnZpY2U7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlID0gJGh0dHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRDYWxsKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBwYXJhbXMuY29uZmlnIHx8IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQocGFyYW1zLnVybCwgcGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvc3RDYWxsKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXJhbXM6ICcsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QocGFyYW1zLnVybCwgcGFyYW1zLmRhdGEsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHBhcmFtcy5oZWFkZXJzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdBUElTZXJ2aWNlJywgYXBwLkFQSVNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2Uge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuICAgICAgICBicm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChldmVudE5hbWUsIGRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnU2hhcmVkU2VydmljZScsIGFwcC5TaGFyZWRTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVdGlsc1NlcnZpY2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgICAgIGdldERhdGFUeXBlKG9iajogYW55KSB7XHJcblx0XHRcdHJldHVybiAoe30pLnRvU3RyaW5nLmNhbGwob2JqKS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbFVuZGVmaW5lZCh2YWw6IGFueSwgdmFsaWRhdGVaZXJvTmFOPzogQm9vbGVhbikge1xyXG5cdFx0XHRsZXQgaXNOdWxsOiBCb29sZWFuID0gZmFsc2UsXHJcblx0XHRcdFx0dHlwZSA9IHRoaXMuZ2V0RGF0YVR5cGUodmFsKTtcclxuXHJcblx0XHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ1tvYmplY3QgYXJyYXldJzpcclxuXHRcdFx0XHRcdGlmICh2YWwubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnW29iamVjdCBvYmplY3RdJzpcclxuXHRcdFx0XHRcdGlmIChPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mICh2YWwpID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IFwiXCIgfHwgdmFsID09PSBcIm51bGxcIiB8fCB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodmFsaWRhdGVaZXJvTmFOICYmICh2YWwgPT09IDAgfHwgaXNOYU4odmFsKSkpIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNOdWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsb25lKG9iajogYW55KSB7XHJcblx0XHRcdGlmIChvYmogPT0gbnVsbCB8fCB0eXBlb2YgKG9iaikgIT0gJ29iamVjdCcpXHJcblx0XHRcdFx0cmV0dXJuIG9iajtcclxuXHJcblx0XHRcdHZhciB0ZW1wID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xyXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKVxyXG5cdFx0XHRcdHRlbXBba2V5XSA9IHRoaXMuY2xvbmUob2JqW2tleV0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRlbXA7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbChlbWFpbDogc3RyaW5nKTogQm9vbGVhbiB7XHJcblx0XHRcdHZhciBlbWFpbFJlZ2V4cCA9IC9eW2EtejAtOSEjJCUmJyorXFwvPT9eX2B7fH1+Li1dK0BbYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPyhcXC5bYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPykqJC9pO1xyXG5cclxuXHRcdFx0aWYgKGVtYWlsICYmIGVtYWlsUmVnZXhwLnRlc3QoZW1haWwpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0T2JqZWN0RnJvbUFycihhcnI6IEFycmF5PGFueT4sIHByb3BOYW1lOiBzdHJpbmcsIHByb3BWYWx1ZTogYW55KSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGFycltpXVtwcm9wTmFtZV0gPT0gcHJvcFZhbHVlKSByZXR1cm4gYXJyW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bG9nKC4uLm1zZzogYW55W10pIHtcclxuXHRcdFx0Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdVdGlsc1NlcnZpY2UnLCBhcHAuVXRpbHNTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvanF1ZXJ5L2pxdWVyeS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXItcm91dGUuZC50c1wiIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhcHAudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL21vZHVsZXMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnN0YW50cy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29uZmlnLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9yb3V0ZS1oYW5kbGVyLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jbGFzc2VzL3VzZXItbGlzdC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY2xhc3Nlcy9hZGQtdXNlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY2xhc3Nlcy9oZWFkZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NsYXNzZXMvdGFibGUtaGVhZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jbGFzc2VzL3VzZXItZm9ybS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY2xhc3Nlcy91c2VyLWluZm8uaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2FwcC1jb25maWcuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2VkaXQtdXNlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9tb2RhbC1kaWFsb2d1ZS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS90YWJsZS1oZWFkaW5nLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2hlYWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy91c2Vycy1saXN0LmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWluZm8uY29udHJvbGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvYXBpLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzJyAvPlxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0ZXhwb3J0IHZhciBmb3JtQXBwID0gYW5ndWxhci5tb2R1bGUoJ2Zvcm1BcHAnLCBbJ25nUm91dGUnLCAnY29udHJvbGxlcnMnLCAnc2VydmljZXMnLCAnZGlyZWN0aXZlcyddKTtcclxuXHJcblx0Zm9ybUFwcC5jb25maWcoQ29uZmlnKTtcclxuICAgIGZvcm1BcHAucnVuKFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnU2hhcmVkU2VydmljZScsIFJvdXRlSGFuZGxlcl0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
