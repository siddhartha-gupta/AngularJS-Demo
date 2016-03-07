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
                    serverUrl: 'https://user-management-881512.herokuapp.com/',
                    templateUrl: 'templates/'
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
            this.showLoader = false;
            this.getUsers();
            this.editUserDefault();
            this.modalDialogueDefault();
            this.infoSliderDefault();
            this.createtableHeading();
        }
        UsersListController.prototype.getUsers = function () {
            var _this = this;
            this.showLoader = true;
            this.apiService.getCall({
                'url': this.appConfig.serverUrl + 'getuserslist'
            }).success(function (data, status) {
                _this.processServerData(data);
            }).error(function (data, status) {
                _this.utilsService.log('err');
                _this.showLoader = false;
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
            this.showLoader = false;
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
/// <reference path='ts/controllers/directives/spinner.controller.ts' />
/// <reference path='ts/directives/edit-user.directive.ts' />
/// <reference path='ts/directives/modal-dialogue.directive.ts' />
/// <reference path='ts/directives/user-form.directive.ts' />
/// <reference path='ts/directives/table-header.directive.ts' />
/// <reference path='ts/directives/info-slider.directive.ts' />
/// <reference path='ts/directives/user-info.directive.ts' />
/// <reference path='ts/directives/spinner.directive.ts' />
/// <reference path='ts/services/api.service.ts' />
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWluZm8uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kaXJlY3RpdmVzL3VzZXItaW5mby5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvYXBwLWNvbmZpZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdGFibGUtaGVhZGluZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvaGVhZGVyLWJ1dHRvbnMuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9hcGkuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9kb2MtZXZlbnQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zaGFyZWQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy91dGlscy5pbnRlcmZhY2UudHMiLCJ0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9zcGlubmVyLmNvbnRyb2xsZXIudHMiLCJ0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9zcGlubmVyLmRpcmVjdGl2ZS50cyIsInRzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy9jaGVja2JveC1oYW5kbGVyLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIiwidHMvY29udHJvbGxlcnMvdGVzdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FDSmxELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FZVDtBQVpELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0lBRVo7UUFBQTtRQVFBLENBQUM7UUFQQSxzQkFBVyxvQkFBTztpQkFBbEI7Z0JBQ0MsTUFBTSxDQUFDO29CQUNOLHVDQUF1QztvQkFDdkMsU0FBUyxFQUFFLCtDQUErQztvQkFDMUQsV0FBVyxFQUFFLFlBQVk7aUJBQ3pCO1lBQ0YsQ0FBQzs7O1dBQUE7UUFDRixnQkFBQztJQUFELENBQUM7SUFSWSxhQUFTLFlBUXJCO0FBQ0YsQ0FBQyxFQVpNLEdBQUcsS0FBSCxHQUFHLFFBWVQ7OztBQ2RELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVk7SUFFWjtRQUtDLGdCQUFZLGNBQXVDO1lBQ2xELGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNqQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGdCQUFnQjtnQkFDakUsVUFBVSxFQUFFLHFC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PScuLi9fYWxsLnRzJyAvPlxyXG5cclxudmFyIHNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ3NlcnZpY2VzJywgW10pO1xyXG52YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnY29udHJvbGxlcnMnLCBbXSk7XHJcbnZhciBkaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2RpcmVjdGl2ZXMnLCBbXSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcblx0XHRzdGF0aWMgZ2V0IERlZmF1bHQoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHQvLyBzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcclxuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwczovL3VzZXItbWFuYWdlbWVudC04ODE1MTIuaGVyb2t1YXBwLmNvbS8nLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzLydcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25maWcge1xyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG4gICAgICAgICAgICAnJHJvdXRlUHJvdmlkZXInXHJcbiAgICAgICAgXTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcigkcm91dGVQcm92aWRlcjogbmcucm91dGUuSVJvdXRlUHJvdmlkZXIpIHtcclxuXHRcdFx0JHJvdXRlUHJvdmlkZXIud2hlbihcIi91c2Vyc2xpc3RcIiwge1xyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAndXNlcnNMaXN0Lmh0bWwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdVc2Vyc0xpc3RDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJ1xyXG5cdFx0XHR9KS53aGVuKCcvYWRkVXNlcicsIHtcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnQWRkVXNlckNvbnRyb2xsZXInLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2N1c3RvbUNvbnRyb2xsZXInLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnYWRkVXNlci5odG1sJ1xyXG5cdFx0XHR9KS5vdGhlcndpc2UoeyByZWRpcmVjdFRvOiAnL3VzZXJzbGlzdCcgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFJvdXRlSGFuZGxlciB7XHJcblx0XHRzdGF0aWMgaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdzaGFyZWRTZXJ2aWNlJ107XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgICRyb290U2NvcGU6IGFueSwgLy9uZy5JUm9vdFNjb3BlU2VydmljZSxcclxuXHRcdFx0JGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHJvb3RTY29wZS5VdGlscyA9IHtcclxuXHRcdFx0XHRrZXlzOiBPYmplY3Qua2V5c1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3VjY2VzcycsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlRXJyb3InLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblx0XHRnZXRVc2VycygpOiB2b2lkO1xyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KTogdm9pZDtcclxuXHRcdGFkZFVzZXIoKTogdm9pZDtcclxuXHRcdGFjdGlvbkhhbmRsZXIodHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgdXNlckRhdGE/OiBVc2VyRGF0YUludGVyZmFjZSk6IHZvaWQ7XHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKTogdm9pZDtcclxuXHRcdGVkaXRVc2VyQ2xpY2sodXNlcklkOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogVXNlckRhdGFJbnRlcmZhY2UsIHVzZXJJZDogc3RyaW5nKTogdm9pZDtcclxuXHRcdG9uVXNlclVwZGF0ZVJlc3AocmVzcDogQm9vbGVhbik6IHZvaWQ7XHJcblx0XHRkZWxldGVVc2VyQ2xpY2soa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZGVsZXRlVXNlckNvbmZpcm0oa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0b25Vc2VyRGVsZXRlZChyZXNwOiBCb29sZWFuKTogdm9pZDtcclxuXHRcdGhpZGVFZGl0UG9wdXAoZXZlbnQ/OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KTogdm9pZDtcclxuXHRcdG1hbmFnZVNvcnRPcmRlcihvcmRlckJ5OiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0c2hvd0luZm9TbGlkZXIocGFyYW1zOiBJbmZvU2xpZGVySW50ZXJmYWNlKTogdm9pZDtcclxuXHRcdGhpZGVJbmZvU2xpZGVyKCk6IHZvaWQ7XHJcblx0XHRjcmVhdGV0YWJsZUhlYWRpbmcoKTogdm9pZDtcclxuXHRcdGVkaXRVc2VyRGVmYXVsdCgpOiB2b2lkO1xyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKTogdm9pZDtcclxuXHRcdGluZm9TbGlkZXJEZWZhdWx0KCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgQWRkVXNlckludGVyZmFjZSB7XHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKTogdm9pZDtcclxuXHRcdHZhbGlkYXRlRm9ybSgpOiBCb29sZWFuO1xyXG5cdFx0Z290b1VzZXJMaXN0KCk6IHZvaWQ7XHJcblx0XHRhZGRVc2VyKCk6IHZvaWQ7XHJcblx0XHR1c2VyRGF0YURlZmF1bHQoKTogdm9pZDtcclxuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpOiB2b2lkO1xyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEhlYWRlckludGVyZmFjZSB7XHJcblx0XHRvblJvdXRlQ2hhbmdlU3RhcnQoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdCk6IHZvaWQ7XHJcblx0XHRvblJvdXRlQ2hhbmdlU3VjY2VzcyhldmVudDogRXZlbnQsIHBhcmFtczogYW55KTogdm9pZDtcclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKTogdm9pZDtcclxuXHRcdHNldFVzZXJMaXN0SGVhZGVyKCk6IHZvaWQ7XHJcblx0XHRzZXRBZGRVc2VySGVhZGVyKCk6IHZvaWQ7XHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRnb1RvQWRkVXNlcigpOiB2b2lkO1xyXG5cdFx0YWRkVXNlcigpOiB2b2lkO1xyXG5cdFx0Z29CYWNrKCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVGFibGVIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0bWFuYWdlU29ydE9yZGVyKGV2ZW50OiBFdmVudCwgc29ydE9yZGVyOiBzdHJpbmcpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJGb3JtSW50ZXJmYWNlIHtcclxuXHRcdG9uRm9ybVN1Ym1pdChldmVudDogRXZlbnQpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvSW50ZXJmYWNlIHtcclxuXHRcdHN0YXJ0RWRpdE1vZGUoZXZlbnQ6IEV2ZW50KTogdm9pZDtcclxuXHRcdGNhbmNlbEVkaXRNb2RlKGV2ZW50PzogRXZlbnQsIG5vcmVzZXQ/OiBCb29sZWFuKTogdm9pZDtcclxuXHRcdG9uTW91c2VDbGljayhldmVudDogRXZlbnQpOiB2b2lkO1xyXG5cdFx0YWN0aW9uQ2FsbGJhY2soZXZlbnQ6IEV2ZW50LCB0eXBlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogdm9pZDtcclxuXHRcdHZhbGlkYXRlRm9ybSgpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHQvLyBleHBvcnQgaW50ZXJmYWNlIElNZW51RGlyZWN0aXZlIGV4dGVuZHMgbmcuSVNjb3BlXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1Njb3BlSW50ZXJmYWNlIGV4dGVuZHMgbmcuSVNjb3BlIHtcclxuXHRcdGN1c3RvbUNvbnRyb2xsZXI6IGFueTtcclxuXHRcdHVzZXJEYXRhOiBhbnk7XHJcblx0XHRhY3Rpb25IYW5kbGVyOiBhbnk7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBhcHBDb25maWdJbnRlcmZhY2Uge1xyXG5cdFx0c2VydmVyVXJsOiBzdHJpbmc7XHJcblx0XHR0ZW1wbGF0ZVVybDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckRhdGFJbnRlcmZhY2Uge1xyXG5cdFx0aWRfbWVtYmVyPzogc3RyaW5nO1xyXG5cdFx0Zmlyc3RuYW1lOiBzdHJpbmc7XHJcblx0XHRsYXN0bmFtZTogc3RyaW5nO1xyXG5cdFx0ZW1haWw6IHN0cmluZztcclxuXHRcdHBob25lbnVtYmVyOiBzdHJpbmc7XHJcblx0XHRsb2NhdGlvbjogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSB1c2VyRWRpdERhdGFJbnRlcmZhY2Uge1xyXG5cdFx0Zmlyc3RuYW1lOiBzdHJpbmc7XHJcblx0XHRsYXN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bG9jYXRpb246IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEVkaXRVc2VySW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbjtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHQvL1RPRE86IG5lZWQgdG8gbG9vayBpbnRvIHRoaXNcclxuXHRcdHVzZXJEYXRhOiBhbnk7XHJcblx0XHR1c2VySWQ6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIE1vZGFsRGlhbG9ndWVJbnRlcmZhY2Uge1xyXG5cdFx0aXNWaXNpYmxlOiBCb29sZWFuLFxyXG5cdFx0dGl0bGU6IHN0cmluZyxcclxuXHRcdGJvZHk6IHN0cmluZyxcclxuXHRcdGJ0bjFUeHQ6IHN0cmluZyxcclxuXHRcdGJ0bjJUeHQ/OiBzdHJpbmcsXHJcblx0XHRzaG93QnRuMjogQm9vbGVhbixcclxuXHRcdGJ0bjFDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0YnRuMkNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0XHRjbG9zZUJ0bkNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJbmZvU2xpZGVySW50ZXJmYWNlIHtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHRib2R5OiBzdHJpbmc7XHJcblx0XHRzdGFydFRpbWVyPzogbnVtYmVyO1xyXG5cdFx0ZW5kVGltZXI/OiBudW1iZXI7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBUYWJsZUhlYWRpbmdJbnRlcmZhY2Uge1xyXG5cdFx0Y2xhc3NOYW1lOiBzdHJpbmc7XHJcblx0XHRzb3J0T3JkZXI6IHN0cmluZztcclxuXHRcdHRleHQ6IHN0cmluZztcclxuXHRcdGN1c3RvbUZ1bmM/OiBGdW5jdGlvbjtcclxuXHRcdGN1c3RvbUhUTUw/OiBCb29sZWFuO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSGVhZGVyQnV0dG9uc0ludGVyZmFjZSB7XHJcblx0XHRzaG93QnRuOiBCb29sZWFuO1xyXG5cdFx0Y2xpY2tGdW5jOiBzdHJpbmc7XHJcblx0XHR0ZXh0OiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgQVBJU2VydmljZUludGVyZmFjZSB7XHJcblx0XHRnZXRDYWxsKHBhcmFtczogYW55KTogYW55O1xyXG5cdFx0cG9zdENhbGwocGFyYW1zOiBhbnkpOiBhbnk7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgRG9jRXZlbnRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdGJpbmRNb3VzZUV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XHJcblx0XHRiaW5kS2V5Ym9hcmRFdmVudChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0dW5iaW5kTW91c2VFdmVudCgpOiB2b2lkO1xyXG5cdFx0dW5iaW5kS2V5Ym9hcmRFdmVudCgpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFNoYXJlZFNlcnZpY2VJbnRlcmZhY2Uge1xyXG5cdFx0YnJvYWRjYXN0RXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXRpbHNTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdGdldERhdGFUeXBlKG9iajogT2JqZWN0KTogc3RyaW5nO1xyXG5cdFx0aXNOdWxsVW5kZWZpbmVkKHZhbDogYW55LCB2YWxpZGF0ZVplcm9OYU4/OiBCb29sZWFuKTogQm9vbGVhbjtcclxuXHRcdGNsb25lKG9iajogYW55KTogYW55O1xyXG5cdFx0dmFsaWRhdGVFbWFpbChlbWFpbDogc3RyaW5nKTogQm9vbGVhbjtcclxuXHRcdGdldE9iamVjdEZyb21BcnIoYXJyOiBBcnJheTxhbnk+LCBwcm9wTmFtZTogc3RyaW5nLCBwcm9wVmFsdWU6IGFueSk6IGFueTtcclxuXHRcdGxvZyguLi5tc2c6IGFueVtdKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgSGVhZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIEhlYWRlckludGVyZmFjZSB7XHJcblx0XHRoZWFkaW5nOiBzdHJpbmc7XHJcblx0XHRoZWFkZXJMZWZ0QnRuOiBIZWFkZXJCdXR0b25zSW50ZXJmYWNlO1xyXG5cdFx0aGVhZGVyUmlnaHRCdG46IEhlYWRlckJ1dHRvbnNJbnRlcmZhY2U7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCckd2luZG93JyxcclxuXHRcdFx0JyRsb2cnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdGFydFwiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdWNjZXNzLmJpbmQodGhpcykpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCB0aGlzLm9uUm91dGVDaGFuZ2VFcnJvci5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGluZyA9ICdVc2VyIG1hbmFnZW1lbnQnO1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlU3RhcnQoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdCkge1xyXG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3RhcnQ6ICcsIHBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3VjY2VzczogJywgcGFyYW1zKTtcclxuXHJcblx0XHRcdGlmIChwYXJhbXMubmV4dCAmJiBwYXJhbXMubmV4dC4kJHJvdXRlICYmIHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdHN3aXRjaCAocGFyYW1zLm5leHQuJCRyb3V0ZS5jb250cm9sbGVyKSB7XHJcblx0XHRcdFx0XHRjYXNlICdVc2Vyc0xpc3RDb250cm9sbGVyJzpcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRVc2VyTGlzdEhlYWRlcigpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRjYXNlICdBZGRVc2VyQ29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0QWRkVXNlckhlYWRlcigpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRVc2VyTGlzdEhlYWRlcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZUVycm9yKGV2ZW50LCBwYXJhbXMpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZUVycm9yOiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFVzZXJMaXN0SGVhZGVyKCkge1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb1RvQWRkVXNlcicsXHJcblx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvQmFjaycsXHJcblx0XHRcdFx0J3RleHQnOiAnQmFjaydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGNhbGxGdW5jdGlvbihldmVudDogRXZlbnQsIGNsaWNrRnVuYzogc3RyaW5nKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXNbY2xpY2tGdW5jXSkpIHtcclxuXHRcdFx0XHR0aGlzW2NsaWNrRnVuY10oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdvVG9BZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2FkZC11c2VyJywge30pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdvQmFjaygpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignSGVhZGVyQ29udHJvbGxlcicsIGFwcC5IZWFkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJzTGlzdENvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2Vyc0xpc3RJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSB1c2Vyc0xpc3Q6IEFycmF5PGFueT47XHJcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBlZGl0VXNlcjogRWRpdFVzZXJJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIG1vZGFsRGlhbG9ndWU6IE1vZGFsRGlhbG9ndWVJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGluZm9TbGlkZXI6IEluZm9TbGlkZXJJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIHNvcnRPcmRlcjogc3RyaW5nO1xyXG5cdFx0cHJpdmF0ZSB0YWJsZUhlYWRpbmc6IFRhYmxlSGVhZGluZ0ludGVyZmFjZVtdO1xyXG5cdFx0cHJpdmF0ZSBzaG93TG9hZGVyOiBCb29sZWFuO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnQVBJU2VydmljZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZScsXHJcblx0XHRcdCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGNoZWNrYm94SGFuZGxlclNlcnZpY2U6IENoZWNrYm94SGFuZGxlclNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygndXNlcnNMaXN0IGNvbnN0cnVjdG9yJyk7XHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLnNvcnRPcmRlciA9ICctaWRfbWVtYmVyJztcclxuXHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBbXTtcclxuXHRcdFx0dGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdHRoaXMuZWRpdFVzZXJEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZXRhYmxlSGVhZGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldFVzZXJzKCkge1xyXG5cdFx0XHR0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xyXG5cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLmdldENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZ2V0dXNlcnNsaXN0J1xyXG5cdFx0XHR9KS5zdWNjZXNzKChkYXRhLCBzdGF0dXMpID0+IHtcclxuXHRcdFx0XHR0aGlzLnByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGEpO1xyXG5cdFx0XHR9KS5lcnJvcigoZGF0YSwgc3RhdHVzKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdlcnInKTtcclxuXHRcdFx0XHR0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygncHJvY2Vzc1NlcnZlckRhdGE6ICcsIGRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0Lmxlbmd0aCA9IDA7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogQWN0aW9uIGJ1dHRvbnMgaGFuZGxpbmdcclxuXHRcdCovXHJcblx0XHRhY3Rpb25IYW5kbGVyKHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIHVzZXJEYXRhPzogVXNlckRhdGFJbnRlcmZhY2UpIHtcclxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnZWRpdCc6XHJcblx0XHRcdFx0XHR0aGlzLmVkaXRVc2VyQ2xpY2sodXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdkZWxldGUnOlxyXG5cdFx0XHRcdFx0dGhpcy5kZWxldGVVc2VyQ2xpY2sodXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdzYXZlJzpcclxuXHRcdFx0XHRcdHRoaXMudXBkYXRlVXNlckRhdGEodXNlckRhdGEsIHVzZXJJZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEVkaXQgdXNlciBjb2RlIGZsb3dcclxuXHRcdCovXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndmFsaWRhdGVFbWFpbCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVkaXRVc2VyQ2xpY2sodXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmVkaXRVc2VyID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0VkaXQgZGV0YWlscycsXHJcblx0XHRcdFx0dXNlckRhdGE6IHRoaXMudXRpbHNTZXJ2aWNlLmNsb25lKHRoaXMudXRpbHNTZXJ2aWNlLmdldE9iamVjdEZyb21BcnIodGhpcy51c2Vyc0xpc3QsICdpZF9tZW1iZXInLCB1c2VySWQpKSxcclxuXHRcdFx0XHR1c2VySWQ6IHVzZXJJZFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctZWRpdC1tb2RhbCcsIHt9KTtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKHRoaXMuZWRpdFVzZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZVVzZXJEYXRhKGRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlLCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhOiAnLCBkYXRhKTtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAndXBkYXRldXNlcicsXHJcblx0XHRcdFx0J2RhdGEnOiB7XHJcblx0XHRcdFx0XHQndXNlcklkJzogdXNlcklkLFxyXG5cdFx0XHRcdFx0J3VzZXJEYXRhJzoge1xyXG5cdFx0XHRcdFx0XHRlbWFpbDogZGF0YS5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Zmlyc3RuYW1lOiBkYXRhLmZpcnN0bmFtZSxcclxuXHRcdFx0XHRcdFx0aWRfbWVtYmVyOiBkYXRhLmlkX21lbWJlcixcclxuXHRcdFx0XHRcdFx0bGFzdG5hbWU6IGRhdGEubGFzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiBkYXRhLmxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0XHRwaG9uZW51bWJlcjogZGF0YS5waG9uZW51bWJlclxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YSBzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5vblVzZXJVcGRhdGVSZXNwKHJlc3BvbnNlLnJlc3ApO1xyXG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhIGVycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uVXNlclVwZGF0ZVJlc3AocmVzcDogQm9vbGVhbikge1xyXG5cdFx0XHR0aGlzLmhpZGVFZGl0UG9wdXAoKTtcclxuXHJcblx0XHRcdGlmIChyZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1VzZXIgdXBkYXRlZCcsXHJcblx0XHRcdFx0XHRib2R5OiAnVXNlciBpbmZvIGhhcyBiZWVuIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuXHRcdFx0XHRcdHN0YXJ0VGltZXI6IDUwMCxcclxuXHRcdFx0XHRcdGVuZFRpbWVyOiA0MDAwXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAnRXJyb3IhJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIHVwZGF0aW5nIHVzZXIgaW5mb3JtYXRpb24uIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywge30pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRGVsZXRlIHVzZXIgY29kZWZsb3dcclxuXHRcdCovXHJcblx0XHRkZWxldGVVc2VyQ2xpY2sodXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlIHVzZXI/JyxcclxuXHRcdFx0XHRib2R5OiAnUGxlYXNlIGNvbmZpcm0sIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgdXNlcicsXHJcblx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnQ2FuY2VsJyxcclxuXHRcdFx0XHRzaG93QnRuMjogdHJ1ZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuZGVsZXRlVXNlckNvbmZpcm0uYmluZCh0aGlzLCB1c2VySWQpLFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywge30pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZVVzZXJDb25maXJtKHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZGVsZXRlVXNlckNvbmZpcm0sIHVzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdkZWxldGV1c2VyJyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHQndXNlcklkJzogdXNlcklkXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3N1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR0aGlzLm9uVXNlckRlbGV0ZWQocmVzcG9uc2UucmVzcCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Vc2VyRGVsZXRlZChyZXNwOiBCb29sZWFuKSB7XHJcblx0XHRcdGlmIChyZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5oaWRlTW9kYWxEaWFsb2d1ZSgpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdVc2VyIGRlbGV0ZWQnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1VzZXIgaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxyXG5cdFx0XHRcdFx0ZW5kVGltZXI6IDQwMDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdFcnJvciEnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgZGVsZXRpbmcgdXNlci4gUGxlYXNlIHRyeSBhZ2FpbicsXHJcblx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIERlbGV0ZSBhbGwgdXNlcnMgY29kZWZsb3dcclxuXHRcdCovXHJcblx0XHRkZWxldGVBbGwoJGV2ZW50KSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdkZWxldGVBbGwnKTtcclxuXHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdEZWxldGUgYWxsIHVzZXJzPycsXHJcblx0XHRcdFx0Ym9keTogJ1BsZWFzZSBjb25maXJtLCB5b3Ugd2FudCB0byBkZWxldGUgYWxsIHVzZXJzJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICdDYW5jZWwnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiB0cnVlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5kZWxldGVBbGxVc2Vyc0NvbmZpcm0uYmluZCh0aGlzKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGVBbGxVc2Vyc0NvbmZpcm0odXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdkZWxldGVVc2VyQ29uZmlybSwgdXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dmFyIHVzZXJJZHMgPSBbXTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLnVzZXJzTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdHVzZXJJZHMucHVzaCh0aGlzLnVzZXJzTGlzdFtpXS5pZF9tZW1iZXIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnNvbGUubG9nKHVzZXJJZHMpO1xyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZGVsZXRlYWxsdXNlcnMnLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdCd1c2VySWRzJzogdXNlcklkc1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5vbkFsbFVzZXJzRGVsZXRlZChyZXNwb25zZS5yZXNwKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdlcnJvcjogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRvbkFsbFVzZXJzRGVsZXRlZChyZXNwOiBCb29sZWFuKSB7XHJcblx0XHRcdGlmIChyZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5oaWRlTW9kYWxEaWFsb2d1ZSgpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdBbGwgdXNlcnMgZGVsZXRlZCcsXHJcblx0XHRcdFx0XHRib2R5OiAnQWxsIFVzZXJzIGFyZSBkZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcblx0XHRcdFx0XHRzdGFydFRpbWVyOiA1MDAsXHJcblx0XHRcdFx0XHRlbmRUaW1lcjogNDAwMFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRib2R5OiAnV2UgaGF2ZSBlbmNvdW50ZXJlZCBlcnJvciB3aGlsZSBkZWxldGluZyB1c2Vycy4gUGxlYXNlIHRyeSBhZ2FpbicsXHJcblx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEdlbmVyaWMgZnVuY3Rpb25zIHRvIGhpZGUgcG9wIHVwc1xyXG5cdFx0KiB0byBzaG93IGluZm8gc2xpZGVyIGV0Y1xyXG5cdFx0Ki9cclxuXHRcdGhpZGVFZGl0UG9wdXAoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1lZGl0LW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKG9yZGVyQnk6IHN0cmluZykge1xyXG5cdFx0XHRpZiAob3JkZXJCeSA9PT0gdGhpcy5zb3J0T3JkZXIpIHtcclxuXHRcdFx0XHR0aGlzLnNvcnRPcmRlciA9ICctJyArIG9yZGVyQnk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSBvcmRlckJ5O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd0luZm9TbGlkZXIocGFyYW1zOiBJbmZvU2xpZGVySW50ZXJmYWNlKSB7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlciA9IHtcclxuXHRcdFx0XHR0aXRsZTogcGFyYW1zLnRpdGxlLFxyXG5cdFx0XHRcdGJvZHk6IHBhcmFtcy5ib2R5XHJcblx0XHRcdH07XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1pbmZvLXNsaWRlcicsIHt9KTtcclxuXHRcdFx0fSwgcGFyYW1zLnN0YXJ0VGltZXIpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5oaWRlSW5mb1NsaWRlcigpO1xyXG5cdFx0XHR9LCBwYXJhbXMuZW5kVGltZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVJbmZvU2xpZGVyKCkge1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtaW5mby1zbGlkZXInLCB7fSk7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlckRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBGdW5jdGlvbnMgdG8gc2V0IGRlYWZ1bHQgdmFsdWVzIGZvciBkaWZmZXJlbnQgY29uZmlnc1xyXG5cdFx0Ki9cclxuXHRcdGNyZWF0ZXRhYmxlSGVhZGluZygpIHtcclxuXHRcdFx0dGhpcy50YWJsZUhlYWRpbmcgPSBbe1xyXG5cdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEnLFxyXG5cdFx0XHRcdCdzb3J0T3JkZXInOiAnaWRfbWVtYmVyJyxcclxuXHRcdFx0XHQndGV4dCc6ICdTLk5vJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZmlyc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0ZpcnN0IG5hbWUnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xhc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0xhc3QgbmFtZSdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0zJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZW1haWwnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnRW1haWwnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ3Bob25lbnVtYmVyJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ1Bob25lIE51bWJlcidcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnbG9jYXRpb24nLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnTG9jYXRpb24nXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8qLCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xIHRleHQtcmlnaHQnLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICcnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLWNoZWNrZWQ9XCJjdXN0b21Db250cm9sbGVyLmNoZWNrYm94SGFuZGxlclNlcnZpY2UuY2hlY2tib3hDb3VudGVyXCIgLz4nLFxyXG5cdFx0XHRcdFx0J2N1c3RvbUZ1bmMnOiB0aGlzLmNoZWNrYm94SGFuZGxlclNlcnZpY2UuY2hlY2tBbGwuYmluZCh0aGlzLmNoZWNrYm94SGFuZGxlclNlcnZpY2UpLFxyXG5cdFx0XHRcdFx0J2N1c3RvbUhUTUwnOiB0cnVlXHJcblx0XHRcdFx0fSovXHJcblx0XHRcdF07XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdHVzZXJEYXRhOiB7fSxcclxuXHRcdFx0XHR1c2VySWQ6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGluZm9TbGlkZXJEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXIgPSB7XHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlcnNMaXN0Q29udHJvbGxlcicsIGFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEFkZFVzZXJDb250cm9sbGVyIGltcGxlbWVudHMgQWRkVXNlckludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHZhbGlkRW1haWw6IEJvb2xlYW47XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIG1vZGFsRGlhbG9ndWU6IE1vZGFsRGlhbG9ndWVJbnRlcmZhY2U7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCdBUElTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbignYWRkLXVzZXInLCBmdW5jdGlvbihldmVudCwgYXJncykge1xyXG5cdFx0XHRcdHRoaXMuYWRkVXNlcigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy51c2VyRGF0YURlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gdGhpcy51dGlsc1NlcnZpY2UudmFsaWRhdGVFbWFpbCh2YWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRm9ybSgpIHtcclxuXHRcdFx0Ly8gbWFrZSBudWxsIHVuZGVmaW5lZCBjaGVja3MgaGVyZVxyXG5cdFx0XHRpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEuZmlyc3RuYW1lKSB8fCB0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5sYXN0bmFtZSkpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1uYW1lJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmVtYWlsKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLWVtYWlsJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLnBob25lbnVtYmVyKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLXBob25lbnVtYmVyJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmxvY2F0aW9uKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLWxvY2F0aW9uJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdvdG9Vc2VyTGlzdCgpIHtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2FkZCB1c2VyOiAnLCB0aGlzLnVzZXJEYXRhKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XHJcblx0XHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnYWRkdXNlcicsXHJcblx0XHRcdFx0XHRkYXRhOiB0aGlzLnVzZXJEYXRhLFxyXG5cdFx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5yZXNwICYmIHJlc3BvbnNlLnJlc3AgPT09ICdFbWFpbCBhbHJlYWR5IGluIHVzZScpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnZW1haWxJblVzZScpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5nb3RvVXNlckxpc3QoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KS5lcnJvcigocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdlcnJvcjogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dXNlckRhdGFEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLnVzZXJEYXRhID0ge1xyXG5cdFx0XHRcdCdmaXJzdG5hbWUnOiAnJyxcclxuXHRcdFx0XHQnbGFzdG5hbWUnOiAnJyxcclxuXHRcdFx0XHQnZW1haWwnOiAnJyxcclxuXHRcdFx0XHQncGhvbmVudW1iZXInOiAnJyxcclxuXHRcdFx0XHQnbG9jYXRpb24nOiAnSU4nXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd01vZGFsRGlhbG9ndWUoZXJyb3JUeXBlOiBzdHJpbmcpIHtcclxuXHRcdFx0bGV0IHRpdGxlOiBzdHJpbmcgPSAnJyxcclxuXHRcdFx0XHRib2R5OiBzdHJpbmcgPSAnJztcclxuXHJcblx0XHRcdHN3aXRjaCAoZXJyb3JUeXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnZW1haWxJblVzZSc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdFbWFpbCBhbHJlYWR5IGluIHVzZSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ0VtYWlsIElEIGlzIGFscmVhZHkgaW4gdXNlLCBwbGVhc2UgZW50ZXIgYSB1bmlxdWUgRW1haWwgYWRkcmVzcyc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tbmFtZSc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCBGaXJzdCBuYW1lL0xhc3QgbmFtZSc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tZW1haWwnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgdGhlIGVtYWlsIGFkZHJlc3MnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLXBob25lbnVtYmVyJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHBob25lIG51bWJlcic7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tbG9jYXRpb24nOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIHNlbGVjdCBsb2NhdGlvbic7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiB0aXRsZSxcclxuXHRcdFx0XHRib2R5OiBib2R5LFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtbW9kYWwnLCB7fSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICcnLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0FkZFVzZXJDb250cm9sbGVyJywgYXBwLkFkZFVzZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEVkaXRVc2VyQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignRWRpdFVzZXJDb250cm9sbGVyJywgYXBwLkVkaXRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBNb2RhbERpYWxvZ3VlQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInLCBhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlckZvcm1Db250cm9sbGVyIGltcGxlbWVudHMgVXNlckZvcm1JbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSBmb3JtU3VibWl0OiBGdW5jdGlvbjtcclxuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YUlkOiBzdHJpbmc7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRvbkZvcm1TdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5mb3JtU3VibWl0KHsgZGF0YTogdGhpcy51c2VyRGF0YSwgdXNlckRhdGFJZDogdGhpcy51c2VyRGF0YUlkIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2VyRm9ybUNvbnRyb2xsZXInLCBhcHAuVXNlckZvcm1Db250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIFRhYmxlSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgc29ydEZ1bmM6IEZ1bmN0aW9uO1xyXG5cdFx0cHJpdmF0ZSBkZWZhdWx0Q2xhc3M6IHN0cmluZztcclxuXHRcdHByaXZhdGUgbGFzdFNvcnRPcmRlcjogc3RyaW5nO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRlbGVtZW50JyxcclxuXHRcdFx0JyRzY2UnLFxyXG5cdFx0XHQnQ2hlY2tib3hIYW5kbGVyU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJHNjZTogbmcuSVNDRVNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgY2hlY2tib3hIYW5kbGVyU2VydmljZTogQ2hlY2tib3hIYW5kbGVyU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuZGVmYXVsdENsYXNzID0gJ2Fycm93IGFycm93LWRvd24nO1xyXG5cdFx0XHR0aGlzLmxhc3RTb3J0T3JkZXIgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHRtYW5hZ2VTb3J0T3JkZXIoZXZlbnQ6IEV2ZW50LCBzb3J0T3JkZXI6IHN0cmluZykge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgbmV3Q2xhc3MgPSAnYXJyb3cgYXJyb3ctdXAnLFxyXG5cdFx0XHRcdHRhcmdldCA9IDxIVE1MRWxlbWVudD4gZXZlbnQudGFyZ2V0O1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuJGVsZW1lbnQuZmluZCh0YXJnZXQpLmZpbmQoJ3NwYW4nKS5oYXNDbGFzcygnYXJyb3ctdXAnKSkge1xyXG5cdFx0XHRcdG5ld0NsYXNzID0gJ2Fycm93IGFycm93LWRvd24nO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5sYXN0U29ydE9yZGVyICE9PSBzb3J0T3JkZXIpIHtcclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNoZWFkaW5nXycgKyB0aGlzLmxhc3RTb3J0T3JkZXIpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHRoaXMuZGVmYXVsdENsYXNzKTtcclxuXHRcdFx0XHR0aGlzLmxhc3RTb3J0T3JkZXIgPSBzb3J0T3JkZXI7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKHRhcmdldCkuZmluZCgnc3BhbicpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MobmV3Q2xhc3MpO1xyXG5cclxuXHRcdFx0dGhpcy5zb3J0RnVuYyh7XHJcblx0XHRcdFx0J29yZGVyQnknOiBzb3J0T3JkZXJcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHQvKnRvVHJ1c3RlZEhUTUwoaHRtbDogc3RyaW5nKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLiRzY2UudHJ1c3RBc0h0bWwoaHRtbCk7XHJcblx0XHR9Ki9cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVGFibGVIZWFkZXJDb250cm9sbGVyJywgYXBwLlRhYmxlSGVhZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBJbmZvU2xpZGVyQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignSW5mb1NsaWRlckNvbnRyb2xsZXInLCBhcHAuSW5mb1NsaWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlckluZm9Db250cm9sbGVyIGltcGxlbWVudHMgVXNlckluZm9JbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSByZWFkT25seU1vZGU6IEJvb2xlYW47XHJcblx0XHRwcml2YXRlIGFjdGlvbkhhbmRsZXI6IEZ1bmN0aW9uO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIHVzZXJFZGl0RGF0YTogdXNlckVkaXREYXRhSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBjaGVja2JveFNlbGVjdGVkOiBCb29sZWFuO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckdGltZW91dCcsXHJcblx0XHRcdCckZWxlbWVudCcsXHJcblx0XHRcdCdEb2NFdmVudFNlcnZpY2UnLFxyXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcclxuXHRcdFx0J0NoZWNrYm94SGFuZGxlclNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgZG9jRXZlbnRTZXJ2aWNlOiBEb2NFdmVudFNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgY2hlY2tib3hIYW5kbGVyU2VydmljZTogQ2hlY2tib3hIYW5kbGVyU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jaGVja2JveFNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudXNlckVkaXREYXRhRGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0dGhpcy4kc2NvcGUuJG9uKCdjaGVjay1hbGwnLCAoZXZlbnQsIHBhcmFtczogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy5vbkNoZWNrYm94Q2xpY2tlZChudWxsLCBwYXJhbXMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8qdGhpcy4kc2NvcGUuJG9uKCdjaGVja2JveC1jb3VudGVyLWNoYW5nZWQnLCAoZXZlbnQsIHBhcmFtczogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy5vbkNoZWNrYm94Q291bnRlckNoYW5nZWQoZXZlbnQsIHBhcmFtcyk7XHJcblx0XHRcdH0pOyovXHJcblx0XHR9XHJcblxyXG5cdFx0c3RhcnRFZGl0TW9kZSgkZXZlbnQ6IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLnJlYWRPbmx5TW9kZSkge1xyXG5cdFx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gZmFsc2U7XHJcblx0XHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UuYmluZEtleWJvYXJkRXZlbnQodGhpcy5jYW5jZWxFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuXHRcdFx0XHR0aGlzLmRvY0V2ZW50U2VydmljZS5iaW5kTW91c2VFdmVudCh0aGlzLm9uTW91c2VDbGljay5iaW5kKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGNhbmNlbEVkaXRNb2RlKGV2ZW50PzogRXZlbnQsIG5vcmVzZXQ/OiBCb29sZWFuKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UudW5iaW5kS2V5Ym9hcmRFdmVudCgpO1xyXG5cdFx0XHR0aGlzLmRvY0V2ZW50U2VydmljZS51bmJpbmRNb3VzZUV2ZW50KCk7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRPbmx5TW9kZSA9IHRydWU7XHJcblx0XHRcdC8qaWYgKHRoaXMuJHNjb3BlLiRyb290LiQkcGhhc2UgIT0gJyRhcHBseScgJiYgdGhpcy4kc2NvcGUuJHJvb3QuJCRwaGFzZSAhPSAnJGRpZ2VzdCcpIHtcclxuXHRcdFx0XHR0aGlzLiRzY29wZS4kYXBwbHkoKTtcclxuXHRcdFx0fSovXHJcblxyXG5cdFx0XHRpZiAoIW5vcmVzZXQpIHtcclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNmaXJzdG5hbWUnKS52YWwodGhpcy51c2VyRGF0YS5maXJzdG5hbWUpO1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2xhc3RuYW1lJykudmFsKHRoaXMudXNlckRhdGEubGFzdG5hbWUpO1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2xvY2F0aW9uJykudmFsKHRoaXMudXNlckRhdGEubG9jYXRpb24pO1xyXG5cclxuXHRcdFx0XHR0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuJHNjb3BlLiRhcHBseSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Nb3VzZUNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRsZXQgdGFyZ2V0ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuXHRcdFx0bGV0IHRhZ05hbWUgPSB0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdFx0aWYgKCh0YWdOYW1lICE9PSAnaW5wdXQnICYmIHRhZ05hbWUgIT09ICdzZWxlY3QnKSB8fCAodGhpcy4kZWxlbWVudC5maW5kKHRhcmdldCkubGVuZ3RoID09PSAwKSkge1xyXG5cdFx0XHRcdHRoaXMuY2FuY2VsRWRpdE1vZGUoZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YWN0aW9uQ2FsbGJhY2soZXZlbnQ6IEV2ZW50LCB0eXBlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlID09PSAnc2F2ZScpIHtcclxuXHRcdFx0XHRpZiAodGhpcy52YWxpZGF0ZUZvcm0oKSkge1xyXG5cdFx0XHRcdFx0dmFyIHVzZXJEYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRpZF9tZW1iZXI6IHRoaXMudXNlckRhdGEuaWRfbWVtYmVyLFxyXG5cdFx0XHRcdFx0XHRmaXJzdG5hbWU6IHRoaXMudXNlckVkaXREYXRhLmZpcnN0bmFtZSxcclxuXHRcdFx0XHRcdFx0bGFzdG5hbWU6IHRoaXMudXNlckVkaXREYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRlbWFpbDogdGhpcy51c2VyRGF0YS5lbWFpbCxcclxuXHRcdFx0XHRcdFx0cGhvbmVudW1iZXI6IHRoaXMudXNlckRhdGEucGhvbmVudW1iZXIsXHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiB0aGlzLnVzZXJFZGl0RGF0YS5sb2NhdGlvblxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHRoaXMuY2FuY2VsRWRpdE1vZGUobnVsbCwgdHJ1ZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMudXNlckVkaXREYXRhRGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmFjdGlvbkhhbmRsZXIoeyB0eXBlOiB0eXBlLCB1c2VySWQ6IHVzZXJJZCwgdXNlckRhdGE6IHVzZXJEYXRhIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRm9ybSgpIHtcclxuXHRcdFx0bGV0IGZpcnN0bmFtZSA9IHRoaXMudXNlckVkaXREYXRhLmZpcnN0bmFtZSxcclxuXHRcdFx0XHRsYXN0bmFtZSA9IHRoaXMudXNlckVkaXREYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdGxvY2F0aW9uID0gdGhpcy51c2VyRWRpdERhdGEubG9jYXRpb247XHJcblxyXG5cdFx0XHRpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKGZpcnN0bmFtZSkgfHxcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQobGFzdG5hbWUpIHx8XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKGxvY2F0aW9uKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdHVzZXJFZGl0RGF0YURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMudXNlckVkaXREYXRhID0ge1xyXG5cdFx0XHRcdGZpcnN0bmFtZTogdGhpcy51c2VyRGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0bGFzdG5hbWU6IHRoaXMudXNlckRhdGEubGFzdG5hbWUsXHJcblx0XHRcdFx0bG9jYXRpb246IHRoaXMudXNlckRhdGEubG9jYXRpb25cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRvbkNoZWNrYm94Q2xpY2tlZChldmVudD86IEV2ZW50LCBwYXJhbXM/OiBhbnkpIHtcclxuXHRcdFx0bGV0IGNoYW5nZWQgPSBmYWxzZTtcclxuXHRcdFx0aWYoZXZlbnQpIHtcclxuXHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmICgocGFyYW1zICYmIHBhcmFtcy5zdGF0ZSAhPT0gdGhpcy5jaGVja2JveFNlbGVjdGVkKSkge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hTZWxlY3RlZCA9IHBhcmFtcy5zdGF0ZTtcclxuXHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoY2hhbmdlZCkge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hIYW5kbGVyU2VydmljZS5tYW5hZ2VDaGVja2JveENvdW50ZXIodGhpcy5jaGVja2JveFNlbGVjdGVkKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2VySW5mb0NvbnRyb2xsZXInLCBhcHAuVXNlckluZm9Db250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFNwaW5uZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdTcGlubmVyQ29udHJvbGxlcicsIGFwcC5TcGlubmVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRWRpdFVzZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGlzVmlzaWJsZTogJz0nLFxyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHR1c2VySWQ6ICc9JyxcclxuXHRcdFx0aGlkZVBvcHVwOiAnJicsXHJcblx0XHRcdHVwZGF0ZURhdGE6ICcmJyxcclxuXHRcdFx0ZGlzY2FyZEZvcm06ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ0VkaXRVc2VyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGUsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI2VkaXRVc2VyTW9kYWwnKSkubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtZWRpdC1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjZWRpdFVzZXJNb2RhbCcpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiggKCkgPT4gbmV3IEVkaXRVc2VyRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59IFxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnZWRpdFVzZXInLCBhcHAuRWRpdFVzZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNb2RhbERpYWxvZ3VlRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHRpc1Zpc2libGU6ICc9JyxcclxuXHRcdFx0dGl0bGU6ICc9JyxcclxuXHRcdFx0Ym9keTogJz0nLFxyXG5cdFx0XHRidG4xVHh0OiAnPScsXHJcblx0XHRcdGJ0bjJUeHQ6ICc9JyxcclxuXHRcdFx0c2hvd0J0bjI6ICc9JyxcclxuXHRcdFx0YnRuMUNhbGxiYWNrOiAnJicsXHJcblx0XHRcdGJ0bjJDYWxsYmFjazogJyYnLFxyXG5cdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiAnJicsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdNb2RhbERpYWxvZ3VlQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0bGluayhzY29wZTpuZy5JU2NvcGUsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNtb2RhbERpYWxvZ3VlJykpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLW1vZGFsJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjbW9kYWxEaWFsb2d1ZScpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ21vZGFsRGlhbG9ndWUnLCBhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFVzZXJGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHR1c2VySWQ6ICc9JyxcclxuXHRcdFx0ZWRpdE1vZGU6ICc9JyxcclxuXHRcdFx0dmFsaWRhdGVFbWFpbDogJyYnLFxyXG5cdFx0XHRmb3JtU3VibWl0OiAnJicsXHJcblx0XHRcdGRpc2NhcmRGb3JtOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VyRm9ybUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VyRm9ybURpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3VzZXJGb3JtJywgYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYmxlSGVhZGluZzogJz0nLFxyXG5cdFx0XHRzb3J0RnVuYzogJyYnLFxyXG5cdFx0XHRjaGVja0FsbDogJyYnLFxyXG5cdFx0XHRkZWxldGVBbGw6ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1RhYmxlSGVhZGVyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGU6IG5nLklDb21waWxlU2VydmljZSwgcHJpdmF0ZSAkcGFyc2U6IG5nLklQYXJzZVNlcnZpY2UpIHsgfVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0dmFyIGRpcmVjdGl2ZSA9ICgkY29tcGlsZTogbmcuSUNvbXBpbGVTZXJ2aWNlLCAkcGFyc2U6IG5nLklQYXJzZVNlcnZpY2UpID0+IG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgkY29tcGlsZSwgJHBhcnNlKTtcclxuXHRcdFx0ZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRjb21waWxlJywgJyRwYXJzZSddO1xyXG5cdFx0XHRyZXR1cm4gZGlyZWN0aXZlO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd0YWJsZUhlYWRlcicsIGFwcC5UYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdC8vIHByaXZhdGUgdGltZXI6IG51bWJlcjtcclxuXHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRib2R5OiAnPSdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ0luZm9TbGlkZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGUsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LWluZm8tc2xpZGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNpbmZvU2xpZGVyJykpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWluZm8tc2xpZGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNpbmZvU2xpZGVyJykpLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgSW5mb1NsaWRlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnaW5mb1NsaWRlcicsIGFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VySW5mb0RpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0Ly8gcHJpdmF0ZSB0aW1lcjogbnVtYmVyO1xyXG5cclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuXHRcdHB1YmxpYyBzY29wZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuXHRcdFx0dXNlckRhdGE6ICc9JyxcclxuXHRcdFx0YWN0aW9uSGFuZGxlcjogJyYnXHJcblx0XHR9O1xyXG5cdFx0cHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1VzZXJJbmZvQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0bGluayhzY29wZTogVXNlckluZm9TY29wZUludGVyZmFjZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkgeyB9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VySW5mb0RpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3VzZXJJbmZvJywgYXBwLlVzZXJJbmZvRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3Bpbm5lckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2hvd0xvYWRlcjogJz0nXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9zcGlubmVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1NwaW5uZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgU3Bpbm5lckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3NwaW5uZXInLCBhcHAuU3Bpbm5lckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQVBJU2VydmljZSBpbXBsZW1lbnRzIEFQSVNlcnZpY2VJbnRlcmZhY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3QgPSBbJyRodHRwJ107XHJcblx0XHRodHRwU2VydmljZTogbmcuSUh0dHBTZXJ2aWNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSkge1xyXG5cdFx0XHR0aGlzLmh0dHBTZXJ2aWNlID0gJGh0dHA7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Q2FsbChwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRsZXQgY29uZmlnID0gcGFyYW1zLmNvbmZpZyB8fCB7fTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KHBhcmFtcy51cmwsIHBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zdENhbGwocGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChwYXJhbXMudXJsLCBwYXJhbXMuZGF0YSwge1xyXG5cdFx0XHRcdGhlYWRlcnM6IHBhcmFtcy5oZWFkZXJzXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdBUElTZXJ2aWNlJywgYXBwLkFQSVNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2UgaW1wbGVtZW50cyBTaGFyZWRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAgICAgYnJvYWRjYXN0RXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoZXZlbnROYW1lLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ1NoYXJlZFNlcnZpY2UnLCBhcHAuU2hhcmVkU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVXRpbHNTZXJ2aWNlIGltcGxlbWVudHMgVXRpbHNTZXJ2aWNlSW50ZXJmYWNlIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgICAgICBnZXREYXRhVHlwZShvYmo6IGFueSkge1xyXG5cdFx0XHRyZXR1cm4gKHt9KS50b1N0cmluZy5jYWxsKG9iaikudG9Mb3dlckNhc2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpc051bGxVbmRlZmluZWQodmFsOiBhbnksIHZhbGlkYXRlWmVyb05hTj86IEJvb2xlYW4pIHtcclxuXHRcdFx0bGV0IGlzTnVsbDogQm9vbGVhbiA9IGZhbHNlLFxyXG5cdFx0XHRcdHR5cGUgPSB0aGlzLmdldERhdGFUeXBlKHZhbCk7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdbb2JqZWN0IGFycmF5XSc6XHJcblx0XHRcdFx0XHRpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ1tvYmplY3Qgb2JqZWN0XSc6XHJcblx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAodmFsKSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSBcIlwiIHx8IHZhbCA9PT0gXCJudWxsXCIgfHwgdmFsID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHZhbGlkYXRlWmVyb05hTiAmJiAodmFsID09PSAwIHx8IGlzTmFOKHZhbCkpKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlzTnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRjbG9uZShvYmo6IGFueSkge1xyXG5cdFx0XHRpZiAob2JqID09IG51bGwgfHwgdHlwZW9mIChvYmopICE9ICdvYmplY3QnKVxyXG5cdFx0XHRcdHJldHVybiBvYmo7XHJcblxyXG5cdFx0XHR2YXIgdGVtcCA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcclxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iailcclxuXHRcdFx0XHR0ZW1wW2tleV0gPSB0aGlzLmNsb25lKG9ialtrZXldKTtcclxuXHJcblx0XHRcdHJldHVybiB0ZW1wO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRW1haWwoZW1haWw6IHN0cmluZyk6IEJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgZW1haWxSZWdleHAgPSAvXlthLXowLTkhIyQlJicqK1xcLz0/Xl9ge3x9fi4tXStAW2EtejAtOV0oW2EtejAtOS1dKlthLXowLTldKT8oXFwuW2EtejAtOV0oW2EtejAtOS1dKlthLXowLTldKT8pKiQvaTtcclxuXHJcblx0XHRcdGlmIChlbWFpbCAmJiBlbWFpbFJlZ2V4cC50ZXN0KGVtYWlsKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldE9iamVjdEZyb21BcnIoYXJyOiBBcnJheTxhbnk+LCBwcm9wTmFtZTogc3RyaW5nLCBwcm9wVmFsdWU6IGFueSkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChhcnJbaV1bcHJvcE5hbWVdID09IHByb3BWYWx1ZSkgcmV0dXJuIGFycltpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGxvZyguLi5tc2c6IGFueVtdKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnVXRpbHNTZXJ2aWNlJywgYXBwLlV0aWxzU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBEb2NFdmVudFNlcnZpY2UgaW1wbGVtZW50cyBEb2NFdmVudFNlcnZpY2VJbnRlcmZhY2Uge1xyXG4gICAgcHJpdmF0ZSBkb2NSZWY6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgJyRkb2N1bWVudCdcclxuICAgIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkZG9jdW1lbnQ6IG5nLklEb2N1bWVudFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIGJpbmRNb3VzZUV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICB0aGlzLiRkb2N1bWVudC5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjYWxsYmFjayhldmVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRLZXlib2FyZEV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICB0aGlzLiRkb2N1bWVudC5vbigna2V5ZG93biBrZXlwcmVzcycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMjcpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZE1vdXNlRXZlbnQoKSB7XHJcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9mZignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRLZXlib2FyZEV2ZW50KCkge1xyXG4gICAgICB0aGlzLiRkb2N1bWVudC5vZmYoJ2tleWRvd24ga2V5cHJlc3MnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnRG9jRXZlbnRTZXJ2aWNlJywgYXBwLkRvY0V2ZW50U2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDaGVja2JveEhhbmRsZXJTZXJ2aWNlIHtcclxuXHRcdHB1YmxpYyBjaGVja2JveENvdW50ZXI6IG51bWJlcjtcclxuXHRcdHByaXZhdGUgc2VsZWN0ZWRBbGw6IEJvb2xlYW47XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hDb3VudGVyID0gMDtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEFsbCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNoZWNrQWxsKCkge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnY2hlY2tBbGwnKTtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2codGhpcyk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRBbGwgPSAhdGhpcy5zZWxlY3RlZEFsbDtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdjaGVjay1hbGwnLCB7IHN0YXRlOiB0aGlzLnNlbGVjdGVkQWxsIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZUNoZWNrYm94Q291bnRlcihpc0NoZWNrZWQ6IEJvb2xlYW4pIHtcclxuXHRcdFx0aWYoaXNDaGVja2VkKSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXIrKztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94Q291bnRlci0tO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5jaGVja2JveENvdW50ZXIgPCAwKSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXIgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdjaGVja2JveENvdW50ZXI6ICcsIHRoaXMuY2hlY2tib3hDb3VudGVyKTsgXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0NoZWNrYm94SGFuZGxlclNlcnZpY2UnLCBhcHAuQ2hlY2tib3hIYW5kbGVyU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2pxdWVyeS9qcXVlcnkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXIuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLXJvdXRlLmQudHNcIiAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXBwLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9tb2R1bGVzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25zdGFudHMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbmZpZy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvcm91dGUtaGFuZGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9hZGQtdXNlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvaGVhZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItZm9ybS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1pbmZvLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGlyZWN0aXZlcy91c2VyLWluZm8uaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2FwcC1jb25maWcuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2VkaXQtdXNlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9tb2RhbC1kaWFsb2d1ZS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS90YWJsZS1oZWFkaW5nLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2hlYWRlci1idXR0b25zLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvYXBpLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9kb2MtZXZlbnQuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3NlcnZpY2VzL3NoYXJlZC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvdXRpbHMuaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvYWRkLXVzZXIuY29udHJvbGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3NwaW5uZXIuY29udHJvbGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3NwaW5uZXIuZGlyZWN0aXZlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvYXBpLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9kb2MtZXZlbnQuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvY2hlY2tib3gtaGFuZGxlci5zZXJ2aWNlLnRzJyAvPlxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0ZXhwb3J0IHZhciBmb3JtQXBwID0gYW5ndWxhci5tb2R1bGUoJ2Zvcm1BcHAnLCBbJ25nUm91dGUnLCAnY29udHJvbGxlcnMnLCAnc2VydmljZXMnLCAnZGlyZWN0aXZlcyddKTtcclxuXHJcblx0Zm9ybUFwcC5jb25maWcoQ29uZmlnKTtcclxuICAgIGZvcm1BcHAucnVuKFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnU2hhcmVkU2VydmljZScsIFJvdXRlSGFuZGxlcl0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUZXN0Q29udHJvbGxlciB7XHJcblx0XHRwcml2YXRlIHZhbGlkRW1haWw6IEJvb2xlYW47XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRoaXMudXRpbHNTZXJ2aWNlLnZhbGlkYXRlRW1haWwodmFsKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVGVzdENvbnRyb2xsZXInLCBhcHAuVGVzdENvbnRyb2xsZXIpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
