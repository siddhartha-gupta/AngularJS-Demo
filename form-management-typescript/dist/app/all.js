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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWluZm8uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kaXJlY3RpdmVzL3VzZXItaW5mby5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvYXBwLWNvbmZpZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdGFibGUtaGVhZGluZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvaGVhZGVyLWJ1dHRvbnMuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9hcGkuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9kb2MtZXZlbnQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zaGFyZWQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy91dGlscy5pbnRlcmZhY2UudHMiLCJ0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9zcGlubmVyLmNvbnRyb2xsZXIudHMiLCJ0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9zcGlubmVyLmRpcmVjdGl2ZS50cyIsInRzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy9jaGVja2JveC1oYW5kbGVyLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIiwidHMvY29udHJvbGxlcnMvdGVzdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FDSmxELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FZVDtBQVpELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0lBRVo7UUFBQTtRQVFBLENBQUM7UUFQQSxzQkFBVyxvQkFBTztpQkFBbEI7Z0JBQ0MsTUFBTSxDQUFDO29CQUNOLHVDQUF1QztvQkFDdkMsU0FBUyxFQUFFLCtDQUErQztvQkFDMUQsV0FBVyxFQUFFLFlBQVk7aUJBQ3pCO1lBQ0YsQ0FBQzs7O1dBQUE7UUFDRixnQkFBQztJQUFELENBQUM7SUFSWSxhQUFTLFlBUXJCO0FBQ0YsQ0FBQyxFQVpNLEdBQUcsS0FBSCxHQUFHLFFBWVQ7OztBQ2RELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVk7SUFFWjtRQUtDLGdCQUFZLGNBQXVDO1lBQ2xELGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNqQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGdCQUFnQjtnQkFDakUsVUFBVSxFQUFFLHFCQUFxQjtnQkFDakMsWUFBWSxFQUFFLGtCQUFrQjthQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsVUFBVSxFQUFFLG1CQUFtQjtnQkFDL0IsWUFBWSxFQUFFLGtCQUFrQjtnQkFDaEMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxjQUFjO2FBQy9ELENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBZGEsY0FBTyxHQUFHO1lBQ2QsZ0JBQWdCO1NBQ25CLENBQUM7UUFhVCxhQUFDO0lBQUQsQ0FBQztJQWhCWSxVQUFNLFNBZ0JsQjtBQUNGLENBQUMsRUFwQk0sR0FBRyxLQUFILEdBQUcsUUFvQlQ7OztBQ3RCRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBcUNUO0FBckNELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0lBRVo7UUFHQyxzQkFDVSxVQUFlLEVBQUUsdUJBQXVCO1lBQ2pELFNBQThCLEVBQzlCLGFBQTRCO1lBRTVCLFVBQVUsQ0FBQyxLQUFLLEdBQUc7Z0JBQ2xCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTthQUNqQixDQUFDO1lBRUYsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFTLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTztnQkFDaEUsYUFBYSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDaEQsSUFBSSxFQUFFLElBQUk7b0JBQ1YsT0FBTyxFQUFFLE9BQU87aUJBQ2hCLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsVUFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxVQUFTLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTztnQkFDbEUsYUFBYSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRTtvQkFDbEQsSUFBSSxFQUFFLElBQUk7b0JBQ1YsT0FBTyxFQUFFLE9BQU87aUJBQ2hCLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFTLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTztnQkFDaEUsYUFBYSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDaEQsSUFBSSxFQUFFLElBQUk7b0JBQ1YsT0FBTyxFQUFFLE9BQU87aUJBQ2hCLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQS9CTSxtQkFBTSxHQUFHLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQWdDOUQsbUJBQUM7SUFBRCxDQUFDO0lBakNZLGdCQUFZLGVBaUN4QjtBQUNGLENBQUMsRUFyQ00sR0FBRyxLQUFILEdBQUcsUUFxQ1Q7OztBQ3ZDRCx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBd0JUO0FBeEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7QUF1QmQsQ0FBQyxFQXhCTSxHQUFHLEtBQUgsR0FBRyxRQXdCVDs7O0FDMUJELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FhVDtBQWJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7QUFZZCxDQUFDLEVBYk0sR0FBRyxLQUFILEdBQUcsUUFhVDs7O0FDZkQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQWNUO0FBZEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVk7QUFhYixDQUFDLEVBZE0sR0FBRyxLQUFILEdBQUcsUUFjVDs7O0FDaEJELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FNVDtBQU5ELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7QUFLZCxDQUFDLEVBTk0sR0FBRyxLQUFILEdBQUcsUUFNVDs7O0FDUkQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQU1UO0FBTkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVksQ0FBQztBQUtkLENBQUMsRUFOTSxHQUFHLEtBQUgsR0FBRyxRQU1UOzs7QUNSRCx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBVVQ7QUFWRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWSxDQUFDO0FBU2QsQ0FBQyxFQVZNLEdBQUcsS0FBSCxHQUFHLFFBVVQ7OztBQ1pELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FTVDtBQVRELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7QUFRZCxDQUFDLEVBVE0sR0FBRyxLQUFILEdBQUcsUUFTVDs7O0FDWEQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQU9UO0FBUEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVk7QUFNYixDQUFDLEVBUE0sR0FBRyxLQUFILEdBQUcsUUFPVDs7O0FDVEQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQWlCVDtBQWpCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWTtBQWdCYixDQUFDLEVBakJNLEdBQUcsS0FBSCxHQUFHLFFBaUJUOzs7QUNuQkQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQVVUO0FBVkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVk7QUFTYixDQUFDLEVBVk0sR0FBRyxLQUFILEdBQUcsUUFVVDs7O0FDWkQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQWNUO0FBZEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVk7QUFhYixDQUFDLEVBZE0sR0FBRyxLQUFILEdBQUcsUUFjVDs7O0FDaEJELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FTVDtBQVRELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0FBUWIsQ0FBQyxFQVRNLEdBQUcsS0FBSCxHQUFHLFFBU1Q7OztBQ1hELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FVVDtBQVZELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0FBU2IsQ0FBQyxFQVZNLEdBQUcsS0FBSCxHQUFHLFFBVVQ7OztBQ1pELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FRVDtBQVJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0FBT2IsQ0FBQyxFQVJNLEdBQUcsS0FBSCxHQUFHLFFBUVQ7OztBQ1ZELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FPVDtBQVBELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7QUFNZCxDQUFDLEVBUE0sR0FBRyxLQUFILEdBQUcsUUFPVDs7O0FDVEQseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQVNUO0FBVEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVksQ0FBQztBQVFkLENBQUMsRUFUTSxHQUFHLEtBQUgsR0FBRyxRQVNUOzs7QUNYRCx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBTVQ7QUFORCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWSxDQUFDO0FBS2QsQ0FBQyxFQU5NLEdBQUcsS0FBSCxHQUFHLFFBTVQ7OztBQ1JELHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FXVDtBQVhELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7QUFVZCxDQUFDLEVBWE0sR0FBRyxLQUFILEdBQUcsUUFXVDs7O0FDYkQsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQXFIVDtBQXJIRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWTtJQUVaO1FBYUMsMEJBQ1MsTUFBaUIsRUFDakIsU0FBOEIsRUFDOUIsT0FBMEIsRUFDMUIsSUFBb0IsRUFDcEIsYUFBNEI7WUFKNUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFxQjtZQUM5QixZQUFPLEdBQVAsT0FBTyxDQUFtQjtZQUMxQixTQUFJLEdBQUosSUFBSSxDQUFnQjtZQUNwQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtZQUVwQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RSxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVuRSxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUc7Z0JBQ3BCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixXQUFXLEVBQUUsRUFBRTtnQkFDZixNQUFNLEVBQUUsRUFBRTthQUNWLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxHQUFHO2dCQUNyQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsTUFBTSxFQUFFLEVBQUU7YUFDVixDQUFDO1FBQ0gsQ0FBQztRQUVELDZDQUFrQixHQUFsQixVQUFtQixLQUFZLEVBQUUsTUFBYztZQUM5QyxpREFBaUQ7UUFDbEQsQ0FBQztRQUVELCtDQUFvQixHQUFwQixVQUFxQixLQUFZLEVBQUUsTUFBVztZQUM3QyxtREFBbUQ7WUFFbkQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxLQUFLLHFCQUFxQjt3QkFDekIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7d0JBQ3pCLEtBQUssQ0FBQztvQkFFUCxLQUFLLG1CQUFtQjt3QkFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBQ3hCLEtBQUssQ0FBQztnQkFDUixDQUFDO1lBQ0YsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzFCLENBQUM7UUFDRixDQUFDO1FBRUQsNkNBQWtCLEdBQWxCLFVBQW1CLEtBQUssRUFBRSxNQUFNO1lBQy9CLGlEQUFpRDtRQUNsRCxDQUFDO1FBRUQsNENBQWlCLEdBQWpCO1lBQ0MsSUFBSSxDQUFDLGFBQWEsR0FBRztnQkFDcEIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFdBQVcsRUFBRSxFQUFFO2dCQUNmLE1BQU0sRUFBRSxFQUFFO2FBQ1YsQ0FBQztZQUVGLElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ3JCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixNQUFNLEVBQUUsVUFBVTthQUNsQixDQUFDO1FBQ0gsQ0FBQztRQUVELDJDQUFnQixHQUFoQjtZQUNDLElBQUksQ0FBQyxhQUFhLEdBQUc7Z0JBQ3BCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixNQUFNLEVBQUUsTUFBTTthQUNkLENBQUM7WUFFRixJQUFJLENBQUMsY0FBYyxHQUFHO2dCQUNyQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsTUFBTSxFQUFFLEVBQUU7YUFDVixDQUFDO1FBQ0gsQ0FBQztRQUVELHVDQUFZLEdBQVosVUFBYSxLQUFZLEVBQUUsU0FBaUI7WUFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ25CLENBQUM7UUFDRixDQUFDO1FBRUQsc0NBQVcsR0FBWDtZQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLENBQUM7UUFFRCxrQ0FBTyxHQUFQO1lBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRCxpQ0FBTSxHQUFOO1lBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0MsQ0FBQztRQTNHYSx3QkFBTyxHQUFHO1lBQ3ZCLFFBQVE7WUFDUixXQUFXO1lBQ1gsU0FBUztZQUNULE1BQU07WUFDTixlQUFlO1NBQ2YsQ0FBQztRQXNHSCx1QkFBQztJQUFELENBQUM7SUFqSFksb0JBQWdCLG1CQWlINUI7QUFDRixDQUFDLEVBckhNLEdBQUcsS0FBSCxHQUFHLFFBcUhUO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7O0FDeEhqRSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBNFpUO0FBNVpELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7SUFFYjtRQW1CQyw2QkFDUyxNQUFpQixFQUNqQixTQUE4QixFQUM5QixVQUFzQixFQUN0QixZQUEwQixFQUMxQixhQUE0QixFQUM1QixzQkFBOEM7WUFMOUMsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFxQjtZQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1lBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBQzVCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7WUFFdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsc0NBQVEsR0FBUjtZQUFBLGlCQVdDO1lBVkEsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxjQUFjO2FBQ2hELENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsTUFBTTtnQkFDdkIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQUksRUFBRSxNQUFNO2dCQUNyQixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQsK0NBQWlCLEdBQWpCLFVBQWtCLElBQVM7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztRQUVELHFDQUFPLEdBQVA7WUFDQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQyxDQUFDO1FBRUQ7O1VBRUU7UUFDRiwyQ0FBYSxHQUFiLFVBQWMsSUFBWSxFQUFFLE1BQWMsRUFBRSxRQUE0QjtZQUN2RSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUssTUFBTTtvQkFDVixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMzQixLQUFLLENBQUM7Z0JBRVAsS0FBSyxRQUFRO29CQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzdCLEtBQUssQ0FBQztnQkFFUCxLQUFLLE1BQU07b0JBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3RDLEtBQUssQ0FBQztZQUNSLENBQUM7UUFDRixDQUFDO1FBRUQ7O1VBRUU7UUFDRiwyQ0FBYSxHQUFiLFVBQWMsR0FBVztZQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsMkNBQWEsR0FBYixVQUFjLE1BQWM7WUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUc7Z0JBQ2YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRyxNQUFNLEVBQUUsTUFBTTthQUNkLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELDRDQUFjLEdBQWQsVUFBZSxJQUF1QixFQUFFLE1BQWM7WUFBdEQsaUJBd0JDO1lBdkJBLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUUxQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztnQkFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFlBQVk7Z0JBQzlDLE1BQU0sRUFBRTtvQkFDUCxRQUFRLEVBQUUsTUFBTTtvQkFDaEIsVUFBVSxFQUFFO3dCQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzt3QkFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO3dCQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7d0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt3QkFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUN2QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7cUJBQzdCO2lCQUNEO2dCQUNELE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxtQ0FBbUMsRUFBRTthQUNoRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBYTtnQkFDeEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsUUFBUTtnQkFDakIsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQsOENBQWdCLEdBQWhCLFVBQWlCLElBQWE7WUFDN0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDO29CQUNuQixLQUFLLEVBQUUsY0FBYztvQkFDckIsSUFBSSxFQUFFLHlDQUF5QztvQkFDL0MsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsUUFBUSxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGFBQWEsR0FBRztvQkFDcEIsU0FBUyxFQUFFLElBQUk7b0JBQ2YsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLDZFQUE2RTtvQkFDbkYsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsY0FBYSxDQUFDO29CQUM1QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDbkQsQ0FBQztnQkFDRixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckQsQ0FBQztRQUNGLENBQUM7UUFFRDs7VUFFRTtRQUNGLDZDQUFlLEdBQWYsVUFBZ0IsTUFBYztZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLGFBQWEsR0FBRztnQkFDcEIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLElBQUksRUFBRSw2Q0FBNkM7Z0JBQ25ELE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO2dCQUN2RCxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQy9DLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ25ELENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELCtDQUFpQixHQUFqQixVQUFrQixNQUFjO1lBQWhDLGlCQWVDO1lBZEEsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3hCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxZQUFZO2dCQUM5QyxJQUFJLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLE1BQU07aUJBQ2hCO2dCQUNELE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxtQ0FBbUMsRUFBRTthQUNoRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBYTtnQkFDeEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxRQUFRO2dCQUNqQixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQsMkNBQWEsR0FBYixVQUFjLElBQWE7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDO29CQUNuQixLQUFLLEVBQUUsY0FBYztvQkFDckIsSUFBSSxFQUFFLG9DQUFvQztvQkFDMUMsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsUUFBUSxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGFBQWEsR0FBRztvQkFDcEIsU0FBUyxFQUFFLElBQUk7b0JBQ2YsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLGlFQUFpRTtvQkFDdkUsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsY0FBYSxDQUFDO29CQUM1QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDbkQsQ0FBQztZQUNILENBQUM7UUFDRixDQUFDO1FBRUQ7O1VBRUU7UUFDRix1Q0FBUyxHQUFULFVBQVUsTUFBTTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFekIsSUFBSSxDQUFDLGFBQWEsR0FBRztnQkFDcEIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsSUFBSSxFQUFFLDhDQUE4QztnQkFDcEQsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFlBQVksRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbkQsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMvQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCxtREFBcUIsR0FBckIsVUFBc0IsTUFBYztZQUFwQyxpQkFxQkM7WUFwQkEsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0QsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRWpCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3hCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0I7Z0JBQ2xELElBQUksRUFBRTtvQkFDTCxTQUFTLEVBQUUsT0FBTztpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLG1DQUFtQyxFQUFFO2FBQ2hFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFhO2dCQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzdDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsUUFBUTtnQkFDakIsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELCtDQUFpQixHQUFqQixVQUFrQixJQUFhO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQztvQkFDbkIsS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsSUFBSSxFQUFFLG9DQUFvQztvQkFDMUMsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsUUFBUSxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGFBQWEsR0FBRztvQkFDcEIsU0FBUyxFQUFFLElBQUk7b0JBQ2YsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLGtFQUFrRTtvQkFDeEUsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsY0FBYSxDQUFDO29CQUM1QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDbkQsQ0FBQztZQUNILENBQUM7UUFDRixDQUFDO1FBRUQ7OztVQUdFO1FBQ0YsMkNBQWEsR0FBYixVQUFjLEtBQWE7WUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN4QixDQUFDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCwrQ0FBaUIsR0FBakIsVUFBa0IsS0FBYTtZQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hCLENBQUM7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVELDZDQUFlLEdBQWYsVUFBZ0IsT0FBZTtZQUM5QixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQztZQUNoQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDMUIsQ0FBQztRQUNGLENBQUM7UUFFRCw0Q0FBYyxHQUFkLFVBQWUsTUFBMkI7WUFBMUMsaUJBWUM7WUFYQSxJQUFJLENBQUMsVUFBVSxHQUFHO2dCQUNqQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7Z0JBQ25CLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTthQUNqQixDQUFDO1lBQ0YsVUFBVSxDQUFDO2dCQUNWLEtBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNELENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdEIsVUFBVSxDQUFDO2dCQUNWLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFFRCw0Q0FBYyxHQUFkO1lBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVEOztVQUVFO1FBQ0YsZ0RBQWtCLEdBQWxCO1lBQ0MsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDO29CQUNwQixXQUFXLEVBQUUsVUFBVTtvQkFDdkIsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLE1BQU0sRUFBRSxNQUFNO2lCQUNkLEVBQUU7b0JBQ0QsV0FBVyxFQUFFLFVBQVU7b0JBQ3ZCLFdBQVcsRUFBRSxXQUFXO29CQUN4QixNQUFNLEVBQUUsWUFBWTtpQkFDcEIsRUFBRTtvQkFDRixXQUFXLEVBQUUsVUFBVTtvQkFDdkIsV0FBVyxFQUFFLFVBQVU7b0JBQ3ZCLE1BQU0sRUFBRSxXQUFXO2lCQUNuQixFQUFFO29CQUNGLFdBQVcsRUFBRSxVQUFVO29CQUN2QixXQUFXLEVBQUUsT0FBTztvQkFDcEIsTUFBTSxFQUFFLE9BQU87aUJBQ2YsRUFBRTtvQkFDRixXQUFXLEVBQUUsVUFBVTtvQkFDdkIsV0FBVyxFQUFFLGFBQWE7b0JBQzFCLE1BQU0sRUFBRSxjQUFjO2lCQUN0QixFQUFFO29CQUNGLFdBQVcsRUFBRSxVQUFVO29CQUN2QixXQUFXLEVBQUUsVUFBVTtvQkFDdkIsTUFBTSxFQUFFLFVBQVU7aUJBQ2xCO2FBUUQsQ0FBQztRQUNILENBQUM7UUFFRCw2Q0FBZSxHQUFmO1lBQ0MsSUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDZixTQUFTLEVBQUUsS0FBSztnQkFDaEIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLEVBQUU7YUFDVixDQUFDO1FBQ0gsQ0FBQztRQUVELGtEQUFvQixHQUFwQjtZQUNDLElBQUksQ0FBQyxhQUFhLEdBQUc7Z0JBQ3BCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixLQUFLLEVBQUUsRUFBRTtnQkFDVCxJQUFJLEVBQUUsRUFBRTtnQkFDUixPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxRQUFRLEVBQUUsS0FBSztnQkFDZixZQUFZLEVBQUUsY0FBYSxDQUFDO2dCQUM1QixZQUFZLEVBQUUsY0FBYSxDQUFDO2dCQUM1QixnQkFBZ0IsRUFBRSxjQUFhLENBQUM7YUFDaEMsQ0FBQztRQUNILENBQUM7UUFFRCwrQ0FBaUIsR0FBakI7WUFDQyxJQUFJLENBQUMsVUFBVSxHQUFHO2dCQUNqQixLQUFLLEVBQUUsRUFBRTtnQkFDVCxJQUFJLEVBQUUsRUFBRTthQUNSO1FBQ0YsQ0FBQztRQTdZYSwyQkFBTyxHQUFHO1lBQ3ZCLFFBQVE7WUFDUixXQUFXO1lBQ1gsWUFBWTtZQUNaLGNBQWM7WUFDZCxlQUFlO1lBQ2Ysd0JBQXdCO1NBQ3hCLENBQUM7UUF1WUgsMEJBQUM7SUFBRCxDQUFDO0lBeFpZLHVCQUFtQixzQkF3Wi9CO0FBQ0YsQ0FBQyxFQTVaTSxHQUFHLEtBQUgsR0FBRyxRQTRaVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7OztBQy9adkUsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQWdLVDtBQWhLRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWSxDQUFDO0lBRWI7UUFjQywyQkFDUyxNQUFpQixFQUNqQixTQUE4QixFQUM5QixVQUFzQixFQUN0QixZQUEwQixFQUMxQixhQUE0QjtZQUo1QixXQUFNLEdBQU4sTUFBTSxDQUFXO1lBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQXFCO1lBQzlCLGVBQVUsR0FBVixVQUFVLENBQVk7WUFDdEIsaUJBQVksR0FBWixZQUFZLENBQWM7WUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7WUFFcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBUyxLQUFLLEVBQUUsSUFBSTtnQkFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVELHlDQUFhLEdBQWIsVUFBYyxHQUFXO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVELHdDQUFZLEdBQVo7WUFDQyxrQ0FBa0M7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNkLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2QsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDZCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCx3Q0FBWSxHQUFaO1lBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0MsQ0FBQztRQUVELG1DQUFPLEdBQVA7WUFBQSxpQkFvQkM7WUFuQkEsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztvQkFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVM7b0JBQzNDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDbkIsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLG1DQUFtQyxFQUFFO2lCQUNoRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBYTtvQkFDeEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUU3QyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLHNCQUFzQixDQUFDLENBQUMsQ0FBQzt3QkFDM0UsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN0QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDckIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxRQUFhO29CQUN0QixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUM7UUFFRCwyQ0FBZSxHQUFmO1lBQ0MsSUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDZixXQUFXLEVBQUUsRUFBRTtnQkFDZixVQUFVLEVBQUUsRUFBRTtnQkFDZCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxhQUFhLEVBQUUsRUFBRTtnQkFDakIsVUFBVSxFQUFFLElBQUk7YUFDaEIsQ0FBQztRQUNILENBQUM7UUFFRCw2Q0FBaUIsR0FBakIsVUFBa0IsU0FBaUI7WUFDbEMsSUFBSSxLQUFLLEdBQVcsRUFBRSxFQUNyQixJQUFJLEdBQVcsRUFBRSxDQUFDO1lBRW5CLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUssWUFBWTtvQkFDaEIsS0FBSyxHQUFHLHNCQUFzQixDQUFDO29CQUMvQixJQUFJLEdBQUcsaUVBQWlFLENBQUM7b0JBQ3pFLEtBQUssQ0FBQztnQkFFUCxLQUFLLGtCQUFrQjtvQkFDdEIsS0FBSyxHQUFHLGlCQUFpQixDQUFDO29CQUMxQixJQUFJLEdBQUcsa0NBQWtDLENBQUM7b0JBQzFDLEtBQUssQ0FBQztnQkFFUCxLQUFLLG1CQUFtQjtvQkFDdkIsS0FBSyxHQUFHLGlCQUFpQixDQUFDO29CQUMxQixJQUFJLEdBQUcsK0JBQStCLENBQUM7b0JBQ3ZDLEtBQUssQ0FBQztnQkFFUCxLQUFLLHlCQUF5QjtvQkFDN0IsS0FBSyxHQUFHLGlCQUFpQixDQUFDO29CQUMxQixJQUFJLEdBQUcsMEJBQTBCLENBQUM7b0JBQ2xDLEtBQUssQ0FBQztnQkFFUCxLQUFLLHNCQUFzQjtvQkFDMUIsS0FBSyxHQUFHLGlCQUFpQixDQUFDO29CQUMxQixJQUFJLEdBQUcsd0JBQXdCLENBQUM7b0JBQ2hDLEtBQUssQ0FBQztZQUNSLENBQUM7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGFBQWEsR0FBRztnQkFDcEIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMvQyxZQUFZLEVBQUUsY0FBYSxDQUFDO2dCQUM1QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuRCxDQUFDO1FBQ0gsQ0FBQztRQUVELDZDQUFpQixHQUFqQixVQUFrQixLQUFhO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDeEIsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM3QixDQUFDO1FBRUQsZ0RBQW9CLEdBQXBCO1lBQ0MsSUFBSSxDQUFDLGFBQWEsR0FBRztnQkFDcEIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFlBQVksRUFBRSxjQUFhLENBQUM7Z0JBQzVCLFlBQVksRUFBRSxjQUFhLENBQUM7Z0JBQzVCLGdCQUFnQixFQUFFLGNBQWEsQ0FBQzthQUNoQyxDQUFDO1FBQ0gsQ0FBQztRQXJKYSx5QkFBTyxHQUFHO1lBQ3ZCLFFBQVE7WUFDUixXQUFXO1lBQ1gsWUFBWTtZQUNaLGNBQWM7WUFDZCxlQUFlO1NBQ2YsQ0FBQztRQWdKSCx3QkFBQztJQUFELENBQUM7SUE1SlkscUJBQWlCLG9CQTRKN0I7QUFDRixDQUFDLEVBaEtNLEdBQUcsS0FBSCxHQUFHLFFBZ0tUO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7O0FDbktuRSx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBTVQ7QUFORCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWSxDQUFDO0lBRWI7UUFDQztRQUFnQixDQUFDO1FBQ2xCLHlCQUFDO0lBQUQsQ0FBQztJQUZZLHNCQUFrQixxQkFFOUI7QUFDRixDQUFDLEVBTk0sR0FBRyxLQUFILEdBQUcsUUFNVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7OztBQ1RyRSx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBTVQ7QUFORCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWSxDQUFDO0lBRWI7UUFDQztRQUFnQixDQUFDO1FBQ2xCLDhCQUFDO0lBQUQsQ0FBQztJQUZZLDJCQUF1QiwwQkFFbkM7QUFDRixDQUFDLEVBTk0sR0FBRyxLQUFILEdBQUcsUUFNVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7OztBQ1QvRSx5Q0FBeUM7QUFFekMsSUFBTyxHQUFHLENBa0JUO0FBbEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7SUFFYjtRQUtDO1FBQWdCLENBQUM7UUFFakIseUNBQVksR0FBWixVQUFhLEtBQVk7WUFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBQ0YseUJBQUM7SUFBRCxDQUFDO0lBZFksc0JBQWtCLHFCQWM5QjtBQUNGLENBQUMsRUFsQk0sR0FBRyxLQUFILEdBQUcsUUFrQlQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7QUNyQnJFLHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FrRFQ7QUFsREQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVksQ0FBQztJQUViO1FBV0MsK0JBQ1MsUUFBZ0MsRUFDaEMsSUFBb0IsRUFDcEIsc0JBQThDO1lBRjlDLGFBQVEsR0FBUixRQUFRLENBQXdCO1lBQ2hDLFNBQUksR0FBSixJQUFJLENBQWdCO1lBQ3BCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7WUFFdEQsSUFBSSxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQsK0NBQWUsR0FBZixVQUFnQixLQUFZLEVBQUUsU0FBaUI7WUFDOUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBRUQsSUFBSSxRQUFRLEdBQUcsZ0JBQWdCLEVBQzlCLE1BQU0sR0FBaUIsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUVyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1lBQy9CLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzVHLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpFLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ2IsU0FBUyxFQUFFLFNBQVM7YUFDcEIsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQXJDYSw2QkFBTyxHQUFHO1lBQ3ZCLFVBQVU7WUFDVixNQUFNO1lBQ04sd0JBQXdCO1NBQ3hCLENBQUM7UUFxQ0gsNEJBQUM7SUFBRCxDQUFDO0lBOUNZLHlCQUFxQix3QkE4Q2pDO0FBQ0YsQ0FBQyxFQWxETSxHQUFHLEtBQUgsR0FBRyxRQWtEVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7OztBQ3JEM0UseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQU1UO0FBTkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVksQ0FBQztJQUViO1FBQ0M7UUFBZ0IsQ0FBQztRQUNsQiwyQkFBQztJQUFELENBQUM7SUFGWSx3QkFBb0IsdUJBRWhDO0FBQ0YsQ0FBQyxFQU5NLEdBQUcsS0FBSCxHQUFHLFFBTVQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzs7QUNUekUseUNBQXlDO0FBRXpDLElBQU8sR0FBRyxDQWtKVDtBQWxKRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWSxDQUFDO0lBRWI7UUFnQkMsNEJBQ1MsTUFBaUIsRUFDakIsUUFBNEIsRUFDNUIsUUFBZ0MsRUFDaEMsZUFBZ0MsRUFDaEMsWUFBMEIsRUFDMUIsc0JBQThDO1lBdEJ4RCxpQkE4SUM7WUE3SFMsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUM1QixhQUFRLEdBQVIsUUFBUSxDQUF3QjtZQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7WUFDaEMsaUJBQVksR0FBWixZQUFZLENBQWM7WUFDMUIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtZQUV0RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRTNCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQUssRUFBRSxNQUFXO2dCQUMvQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBRUg7O2lCQUVLO1FBQ04sQ0FBQztRQUVELDBDQUFhLEdBQWIsVUFBYyxLQUFZO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDekIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25FLENBQUM7UUFDRixDQUFDO1FBRUQsMkNBQWMsR0FBZCxVQUFlLEtBQWEsRUFBRSxPQUFpQjtZQUEvQyxpQkFzQkM7WUFyQkEsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV4QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6Qjs7ZUFFRztZQUVILEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUU1RCxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNiLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUM7UUFFRCx5Q0FBWSxHQUFaLFVBQWEsS0FBWTtZQUN4QixJQUFJLE1BQU0sR0FBZ0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUN2QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxPQUFPLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDRixDQUFDO1FBRUQsMkNBQWMsR0FBZCxVQUFlLEtBQVksRUFBRSxJQUFZLEVBQUUsTUFBYztZQUN4RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3pCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxRQUFRLEdBQUc7d0JBQ2QsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzt3QkFDbEMsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzt3QkFDdEMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTt3QkFDcEMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSzt3QkFDMUIsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVzt3QkFDdEMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTtxQkFDcEMsQ0FBQztvQkFDRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDakMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDZCxDQUFDO1lBQ0YsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUVELHlDQUFZLEdBQVo7WUFDQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFDMUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFFdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNkLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSTtRQUNaLENBQUM7UUFFRCxnREFBbUIsR0FBbkI7WUFDQyxJQUFJLENBQUMsWUFBWSxHQUFHO2dCQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2dCQUNsQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO2dCQUNoQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO2FBQ2hDLENBQUM7UUFDSCxDQUFDO1FBRUQsOENBQWlCLEdBQWpCLFVBQWtCLEtBQWEsRUFBRSxNQUFZO1lBQzVDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNwQixFQUFFLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNyQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxFQUFFLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsc0JBQXNCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDMUUsQ0FBQztRQUNGLENBQUM7UUF0SWEsMEJBQU8sR0FBRztZQUN2QixRQUFRO1lBQ1IsVUFBVTtZQUNWLFVBQVU7WUFDVixpQkFBaUI7WUFDakIsY0FBYztZQUNkLHdCQUF3QjtTQUN4QixDQUFDO1FBZ0lILHlCQUFDO0lBQUQsQ0FBQztJQTlJWSxzQkFBa0IscUJBOEk5QjtBQUNGLENBQUMsRUFsSk0sR0FBRyxLQUFILEdBQUcsUUFrSlQ7QUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7QUNySnJFLHlDQUF5QztBQUV6QyxJQUFPLEdBQUcsQ0FNVDtBQU5ELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7SUFFYjtRQUNDO1FBQWdCLENBQUM7UUFDbEIsd0JBQUM7SUFBRCxDQUFDO0lBRlkscUJBQWlCLG9CQUU3QjtBQUNGLENBQUMsRUFOTSxHQUFHLEtBQUgsR0FBRyxRQU1UO0FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7O0FDVG5FLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FtQ1Q7QUFuQ0QsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSLFlBQVksQ0FBQztJQUViO1FBZ0JGO1lBZk8sYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNULFVBQUssR0FBRztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDdkIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsV0FBVyxFQUFFLEdBQUc7YUFDVixDQUFDO1lBQ0ssZ0JBQVcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcscUNBQXFDLENBQUM7WUFDOUYsZUFBVSxHQUFHLG9CQUFvQixDQUFDO1lBQ2xDLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRWhCLENBQUM7UUFFaEIsZ0NBQUksR0FBSixVQUFLLEtBQWdCLEVBQUUsT0FBK0I7WUFDckQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFTLEtBQUs7Z0JBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFVBQVMsS0FBSztnQkFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFTSx5QkFBTyxHQUFkO1lBQ0MsTUFBTSxFQUFFLGNBQU0sV0FBSSxpQkFBaUIsRUFBRSxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUNDLHdCQUFDO0lBQUQsQ0FBQztJQS9CWSxxQkFBaUIsb0JBK0I3QjtBQUNMLENBQUMsRUFuQ00sR0FBRyxLQUFILEdBQUcsUUFtQ1Q7QUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7O0FDdENsRSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBcUNUO0FBckNELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUixZQUFZLENBQUM7SUFFYjtRQWtCRjtZQWpCTyxhQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ1QsVUFBSyxHQUFHO2dCQUNwQixTQUFTLEVBQUUsR0FBRztnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsR0FBRztnQkFDVCxPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsR0FBRztnQkFDYixZQUFZLEVBQUUsR0FBRztnQkFDakIsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLGdCQUFnQixFQUFFLEdBQUc7YUFDZixDQUFDO1lBQ0ssZ0JBQVcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsMENBQTBDLENBQUM7WUFDbkcsZUFBVSxHQUFHLHlCQUF5QixDQUFDO1lBQ3ZDLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRWYsQ0FBQztRQUVqQixxQ0FBSSxHQUFKLFVBQUssS0FBZSxFQUFFLE9BQStCO1lBQ3BELEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVMsS0FBSztnQkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVMsS0FBSyxFQUFFLE1BQVc7Z0JBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRU0sOEJBQU8sR0FBZDtZQUNDLE1BQU0sQ0FBQyxDQUFDLGNBQU0sV0FBSSxzQkFBc0IsRUFBRSxFQUE1QixDQUE0QixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNDLDZCQUFDO0lBQUQsQ0FBQztJQWpDWSwwQkFBc0IseUJBaUNsQztBQUNMLENBQUMsRUFyQ00sR0FBRyxLQUFILEdBQUcsUUFxQ1Q7QUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7O0FDeEM1RSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBd0JUO0FBeEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUixZQUFZLENBQUM7SUFFYjtRQWVGO1lBZE8sYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNULFVBQUssR0FBRztnQkFDcEIsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLFdBQVcsRUFBRSxHQUFHO2FBQ1YsQ0FBQztZQUNLLGdCQUFXLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLHFDQUFxQyxDQUFDO1lBQzlGLGVBQVUsR0FBRyxvQkFBb0IsQ0FBQztZQUNsQyxpQkFBWSxHQUFHLGtCQUFrQixDQUFDO1lBQ2xDLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUVoQixDQUFDO1FBRVQseUJBQU8sR0FBZDtZQUNDLE1BQU0sQ0FBQyxDQUFDLGNBQU0sV0FBSSxpQkFBaUIsRUFBRSxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUNDLHdCQUFDO0lBQUQsQ0FBQztJQXBCWSxxQkFBaUIsb0JBb0I3QjtBQUNMLENBQUMsRUF4Qk0sR0FBRyxLQUFILEdBQUcsUUF3QlQ7QUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7O0FDM0JsRSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBd0JUO0FBeEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUixZQUFZLENBQUM7SUFFYjtRQWFGLDhCQUFvQixRQUE0QixFQUFVLE1BQXdCO1lBQTlELGFBQVEsR0FBUixRQUFRLENBQW9CO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7WUFaM0UsYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNULFVBQUssR0FBRztnQkFDWCxZQUFZLEVBQUUsR0FBRztnQkFDMUIsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsU0FBUyxFQUFFLEdBQUc7YUFDUixDQUFDO1lBQ0ssZ0JBQVcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsd0NBQXdDLENBQUM7WUFDakcsZUFBVSxHQUFHLHVCQUF1QixDQUFDO1lBQ3JDLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRXVELENBQUM7UUFFaEYsNEJBQU8sR0FBZDtZQUNDLElBQUksU0FBUyxHQUFHLFVBQUMsUUFBNEIsRUFBRSxNQUF3QixJQUFLLFdBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUExQyxDQUEwQyxDQUFDO1lBQ3ZILFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQixDQUFDO1FBQ0MsMkJBQUM7SUFBRCxDQUFDO0lBcEJZLHdCQUFvQix1QkFvQmhDO0FBQ0wsQ0FBQyxFQXhCTSxHQUFHLEtBQUgsR0FBRyxRQXdCVDtBQUNELFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOzs7QUMzQnhFLHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FnQ1Q7QUFoQ0QsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSLFlBQVksQ0FBQztJQUViO1FBYUY7WUFaQSx5QkFBeUI7WUFFbEIsYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNULFVBQUssR0FBRztnQkFDcEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLEdBQUc7YUFDSCxDQUFDO1lBQ0ssZ0JBQVcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsdUNBQXVDLENBQUM7WUFDaEcsZUFBVSxHQUFHLHNCQUFzQixDQUFDO1lBQ3BDLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRWYsQ0FBQztRQUVqQixrQ0FBSSxHQUFKLFVBQUssS0FBZ0IsRUFBRSxPQUErQjtZQUNyRCxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFVBQVMsS0FBSztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFVBQVMsS0FBSztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRU0sMkJBQU8sR0FBZDtZQUNDLE1BQU0sQ0FBQyxDQUFDLGNBQU0sV0FBSSxtQkFBbUIsRUFBRSxFQUF6QixDQUF5QixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNDLDBCQUFDO0lBQUQsQ0FBQztJQTVCWSx1QkFBbUIsc0JBNEIvQjtBQUNMLENBQUMsRUFoQ00sR0FBRyxLQUFILEdBQUcsUUFnQ1Q7QUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7O0FDbkN0RSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBd0JUO0FBeEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7SUFFYjtRQWFDO1lBWkEseUJBQXlCO1lBRWxCLGFBQVEsR0FBRyxHQUFHLENBQUM7WUFDZixVQUFLLEdBQThCO2dCQUN6QyxRQUFRLEVBQUUsR0FBRztnQkFDYixhQUFhLEVBQUUsR0FBRzthQUNsQixDQUFDO1lBQ0ssZ0JBQVcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcscUNBQXFDLENBQUM7WUFDeEYsZUFBVSxHQUFHLG9CQUFvQixDQUFDO1lBQ2xDLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRWYsQ0FBQztRQUVqQixnQ0FBSSxHQUFKLFVBQUssS0FBNkIsRUFBRSxPQUErQixJQUFJLENBQUM7UUFFakUseUJBQU8sR0FBZDtZQUNDLE1BQU0sQ0FBQyxDQUFDLGNBQU0sV0FBSSxpQkFBaUIsRUFBRSxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUNGLHdCQUFDO0lBQUQsQ0FBQztJQXBCWSxxQkFBaUIsb0JBb0I3QjtBQUNGLENBQUMsRUF4Qk0sR0FBRyxLQUFILEdBQUcsUUF3QlQ7QUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7O0FDM0JsRSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBbUJUO0FBbkJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDUixZQUFZLENBQUM7SUFFYjtRQVVGO1lBVE8sYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNULFVBQUssR0FBRztnQkFDWCxVQUFVLEVBQUUsR0FBRzthQUNsQixDQUFDO1lBQ0ssZ0JBQVcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsbUNBQW1DLENBQUM7WUFDNUYsZUFBVSxHQUFHLG1CQUFtQixDQUFDO1lBQ2pDLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRWhCLENBQUM7UUFFVCx3QkFBTyxHQUFkO1lBQ0MsTUFBTSxDQUFDLENBQUMsY0FBTSxXQUFJLGdCQUFnQixFQUFFLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0MsdUJBQUM7SUFBRCxDQUFDO0lBZlksb0JBQWdCLG1CQWU1QjtBQUNMLENBQUMsRUFuQk0sR0FBRyxLQUFILEdBQUcsUUFtQlQ7QUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7O0FDdEJoRSxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBc0JUO0FBdEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7SUFFYjtRQUlDLG9CQUFvQixLQUFzQjtZQUF0QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBRUQsNEJBQU8sR0FBUCxVQUFRLE1BQVc7WUFDbEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELDZCQUFRLEdBQVIsVUFBUyxNQUFXO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3JELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTzthQUN2QixDQUFDLENBQUM7UUFDSixDQUFDO1FBaEJNLGtCQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQWlCNUIsaUJBQUM7SUFBRCxDQUFDO0lBbEJZLGNBQVUsYUFrQnRCO0FBQ0YsQ0FBQyxFQXRCTSxHQUFHLEtBQUgsR0FBRyxRQXNCVDtBQUNELFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7O0FDekIvQyxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBWVQ7QUFaRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1IsWUFBWSxDQUFDO0lBRWI7UUFHSSx1QkFBb0IsVUFBZ0M7WUFBaEMsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7WUFFcEQsbUJBQWMsR0FBRyxVQUFTLFNBQVMsRUFBRSxJQUFJO2dCQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDO1FBSnNELENBQUM7UUFGbEQscUJBQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBT3BDLG9CQUFDO0lBQUQsQ0FBQztJQVJZLGlCQUFhLGdCQVF6QjtBQUNMLENBQUMsRUFaTSxHQUFHLEtBQUgsR0FBRyxRQVlUO0FBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7QUNmckQsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQW9FVDtBQXBFRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1IsWUFBWSxDQUFDO0lBRWI7UUFDSTtRQUFnQixDQUFDO1FBRWpCLGtDQUFXLEdBQVgsVUFBWSxHQUFRO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUMsQ0FBQztRQUVELHNDQUFlLEdBQWYsVUFBZ0IsR0FBUSxFQUFFLGVBQXlCO1lBQ2xELElBQUksTUFBTSxHQUFZLEtBQUssRUFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFOUIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFLLGdCQUFnQjtvQkFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNmLENBQUM7b0JBQ0QsS0FBSyxDQUFDO2dCQUVQLEtBQUssaUJBQWlCO29CQUNyQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNmLENBQUM7b0JBQ0QsS0FBSyxDQUFDO2dCQUVQO29CQUNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ3pHLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2YsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pELE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2YsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2YsQ0FBQztRQUVELDRCQUFLLEdBQUwsVUFBTSxHQUFRO1lBQ2IsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDO2dCQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBRVosSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDO2dCQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVsQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELG9DQUFhLEdBQWIsVUFBYyxLQUFhO1lBQzFCLElBQUksV0FBVyxHQUFHLG1HQUFtRyxDQUFDO1lBRXRILEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNGLENBQUM7UUFFRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsR0FBZSxFQUFFLFFBQWdCLEVBQUUsU0FBYztZQUNqRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDckMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQVMsQ0FBQztvQkFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDRixDQUFDO1FBRUQsMEJBQUcsR0FBSDtZQUFJLGFBQWE7aUJBQWIsV0FBYSxDQUFiLHNCQUFhLENBQWIsSUFBYTtnQkFBYiw0QkFBYTs7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDQyxtQkFBQztJQUFELENBQUM7SUFoRVksZ0JBQVksZUFnRXhCO0FBQ0wsQ0FBQyxFQXBFTSxHQUFHLEtBQUgsR0FBRyxRQW9FVDtBQUNELFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7O0FDdkVuRCxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBa0NUO0FBbENELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDVixZQUFZLENBQUM7SUFFYjtRQU9FLHlCQUFvQixTQUE4QjtZQUE5QixjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUFJLENBQUM7UUFFdkQsd0NBQWMsR0FBZCxVQUFlLFFBQWtCO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQUs7Z0JBQy9CLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCwyQ0FBaUIsR0FBakIsVUFBa0IsUUFBa0I7WUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFLO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELDBDQUFnQixHQUFoQjtZQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCw2Q0FBbUIsR0FBbkI7WUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUExQmEsdUJBQU8sR0FBRztZQUN0QixXQUFXO1NBQ1osQ0FBQztRQXlCSixzQkFBQztJQUFELENBQUM7SUE5QlksbUJBQWUsa0JBOEIzQjtBQUNILENBQUMsRUFsQ00sR0FBRyxLQUFILEdBQUcsUUFrQ1Q7QUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7O0FDckN6RCxzQ0FBc0M7QUFFdEMsSUFBTyxHQUFHLENBc0NUO0FBdENELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7SUFFYjtRQVFDLGdDQUNTLGFBQTRCO1lBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBRXBDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7UUFFRCx5Q0FBUSxHQUFSO1lBQ0MsMkJBQTJCO1lBQzNCLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVELHNEQUFxQixHQUFyQixVQUFzQixTQUFrQjtZQUN2QyxFQUFFLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDO1lBQ0QsMkRBQTJEO1FBQzVELENBQUM7UUE3QmEsOEJBQU8sR0FBRztZQUN2QixlQUFlO1NBQ2YsQ0FBQztRQTRCSCw2QkFBQztJQUFELENBQUM7SUFsQ1ksMEJBQXNCLHlCQWtDbEM7QUFDRixDQUFDLEVBdENNLEdBQUcsS0FBSCxHQUFHLFFBc0NUO0FBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs7O0FDekN2RSwrRUFBK0U7QUFDL0UsbUZBQW1GO0FBQ25GLHlGQUF5RjtBQUV6RiwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLHdDQUF3QztBQUN4QyxxQ0FBcUM7QUFDckMsNENBQTRDO0FBRTVDLHlFQUF5RTtBQUN6RSx3RUFBd0U7QUFDeEUsc0VBQXNFO0FBQ3RFLDRFQUE0RTtBQUM1RSx5RUFBeUU7QUFDekUseUVBQXlFO0FBRXpFLHdFQUF3RTtBQUV4RSxtRUFBbUU7QUFDbkUsa0VBQWtFO0FBQ2xFLGtFQUFrRTtBQUNsRSx1RUFBdUU7QUFDdkUsb0VBQW9FO0FBQ3BFLHNFQUFzRTtBQUN0RSx1RUFBdUU7QUFFdkUsZ0VBQWdFO0FBQ2hFLHNFQUFzRTtBQUN0RSxtRUFBbUU7QUFDbkUsa0VBQWtFO0FBRWxFLDREQUE0RDtBQUM1RCxnRUFBZ0U7QUFDaEUsOERBQThEO0FBRTlELDBFQUEwRTtBQUMxRSwrRUFBK0U7QUFDL0UsMEVBQTBFO0FBQzFFLDZFQUE2RTtBQUM3RSw0RUFBNEU7QUFDNUUsMEVBQTBFO0FBQzFFLHdFQUF3RTtBQUV4RSw2REFBNkQ7QUFDN0Qsa0VBQWtFO0FBQ2xFLDZEQUE2RDtBQUM3RCxnRUFBZ0U7QUFDaEUsK0RBQStEO0FBQy9ELDZEQUE2RDtBQUM3RCwyREFBMkQ7QUFFM0QsbURBQW1EO0FBQ25ELHNEQUFzRDtBQUN0RCxxREFBcUQ7QUFDckQseURBQXlEO0FBQ3pELGdFQUFnRTs7O0FDeERoRSxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBS1Q7QUFMRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ0EsV0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUVyRyxXQUFPLENBQUMsTUFBTSxDQUFDLFVBQU0sQ0FBQyxDQUFDO0lBQ3BCLFdBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxnQkFBWSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDLEVBTE0sR0FBRyxLQUFILEdBQUcsUUFLVDs7O0FDUEQsc0NBQXNDO0FBRXRDLElBQU8sR0FBRyxDQXNCVDtBQXRCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1gsWUFBWSxDQUFDO0lBRWI7UUFRQyx3QkFDUyxNQUFpQixFQUNqQixZQUEwQjtZQUQxQixXQUFNLEdBQU4sTUFBTSxDQUFXO1lBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBRWxDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFFRCxzQ0FBYSxHQUFiLFVBQWMsR0FBVztZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFkYSxzQkFBTyxHQUFHO1lBQ3ZCLFFBQVE7WUFDUixjQUFjO1NBQ2QsQ0FBQztRQVlILHFCQUFDO0lBQUQsQ0FBQztJQWxCWSxrQkFBYyxpQkFrQjFCO0FBQ0YsQ0FBQyxFQXRCTSxHQUFHLEtBQUgsR0FBRyxRQXNCVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbnZhciBzZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCdzZXJ2aWNlcycsIFtdKTtcclxudmFyIGNvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2NvbnRyb2xsZXJzJywgW10pO1xyXG52YXIgZGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzJywgW10pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG5cdFx0c3RhdGljIGdldCBEZWZhdWx0KCk6IGFueSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0Ly8gc2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXHJcblx0XHRcdFx0c2VydmVyVXJsOiAnaHR0cHM6Ly91c2VyLW1hbmFnZW1lbnQtODgxNTEyLmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy8nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgICAgICAgJyRyb3V0ZVByb3ZpZGVyJ1xyXG4gICAgICAgIF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoJHJvdXRlUHJvdmlkZXI6IG5nLnJvdXRlLklSb3V0ZVByb3ZpZGVyKSB7XHJcblx0XHRcdCRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvdXNlcnNsaXN0XCIsIHtcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ3VzZXJzTGlzdC5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnVXNlcnNMaXN0Q29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcidcclxuXHRcdFx0fSkud2hlbignL2FkZFVzZXInLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ0FkZFVzZXJDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2FkZFVzZXIuaHRtbCdcclxuXHRcdFx0fSkub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy91c2Vyc2xpc3QnIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBSb3V0ZUhhbmRsZXIge1xyXG5cdFx0c3RhdGljIGluamVjdCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnc2hhcmVkU2VydmljZSddO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBhbnksIC8vbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcblx0XHRcdCRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0c2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRyb290U2NvcGUuVXRpbHMgPSB7XHJcblx0XHRcdFx0a2V5czogT2JqZWN0LmtleXNcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN0YXJ0Jywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZUVycm9yJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2Vyc0xpc3RJbnRlcmZhY2Uge1xyXG5cdFx0Z2V0VXNlcnMoKTogdm9pZDtcclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSk6IHZvaWQ7XHJcblx0XHRhZGRVc2VyKCk6IHZvaWQ7XHJcblx0XHRhY3Rpb25IYW5kbGVyKHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIHVzZXJEYXRhPzogVXNlckRhdGFJbnRlcmZhY2UpOiB2b2lkO1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRlZGl0VXNlckNsaWNrKHVzZXJJZDogc3RyaW5nKTogdm9pZDtcclxuXHRcdHVwZGF0ZVVzZXJEYXRhKGRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlLCB1c2VySWQ6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRvblVzZXJVcGRhdGVSZXNwKHJlc3A6IEJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0ZGVsZXRlVXNlckNsaWNrKGtleTogc3RyaW5nKTogdm9pZDtcclxuXHRcdGRlbGV0ZVVzZXJDb25maXJtKGtleTogc3RyaW5nKTogdm9pZDtcclxuXHRcdG9uVXNlckRlbGV0ZWQocmVzcDogQm9vbGVhbik6IHZvaWQ7XHJcblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpOiB2b2lkO1xyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRtYW5hZ2VTb3J0T3JkZXIob3JkZXJCeTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogSW5mb1NsaWRlckludGVyZmFjZSk6IHZvaWQ7XHJcblx0XHRoaWRlSW5mb1NsaWRlcigpOiB2b2lkO1xyXG5cdFx0Y3JlYXRldGFibGVIZWFkaW5nKCk6IHZvaWQ7XHJcblx0XHRlZGl0VXNlckRlZmF1bHQoKTogdm9pZDtcclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCk6IHZvaWQ7XHJcblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHR2YWxpZGF0ZUZvcm0oKTogQm9vbGVhbjtcclxuXHRcdGdvdG9Vc2VyTGlzdCgpOiB2b2lkO1xyXG5cdFx0YWRkVXNlcigpOiB2b2lkO1xyXG5cdFx0dXNlckRhdGFEZWZhdWx0KCk6IHZvaWQ7XHJcblx0XHRzaG93TW9kYWxEaWFsb2d1ZShlcnJvclR5cGU6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KTogdm9pZDtcclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpOiB2b2lkO1xyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSk6IHZvaWQ7XHJcblx0XHRvblJvdXRlQ2hhbmdlRXJyb3IoZXZlbnQsIHBhcmFtcyk6IHZvaWQ7XHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpOiB2b2lkO1xyXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpOiB2b2lkO1xyXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0Z29Ub0FkZFVzZXIoKTogdm9pZDtcclxuXHRcdGFkZFVzZXIoKTogdm9pZDtcclxuXHRcdGdvQmFjaygpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFRhYmxlSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VyRm9ybUludGVyZmFjZSB7XHJcblx0XHRvbkZvcm1TdWJtaXQoZXZlbnQ6IEV2ZW50KTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb0ludGVyZmFjZSB7XHJcblx0XHRzdGFydEVkaXRNb2RlKGV2ZW50OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRjYW5jZWxFZGl0TW9kZShldmVudD86IEV2ZW50LCBub3Jlc2V0PzogQm9vbGVhbik6IHZvaWQ7XHJcblx0XHRvbk1vdXNlQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZDtcclxuXHRcdGFjdGlvbkNhbGxiYWNrKGV2ZW50OiBFdmVudCwgdHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHR2YWxpZGF0ZUZvcm0oKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0Ly8gZXhwb3J0IGludGVyZmFjZSBJTWVudURpcmVjdGl2ZSBleHRlbmRzIG5nLklTY29wZVxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9TY29wZUludGVyZmFjZSBleHRlbmRzIG5nLklTY29wZSB7XHJcblx0XHRjdXN0b21Db250cm9sbGVyOiBhbnk7XHJcblx0XHR1c2VyRGF0YTogYW55O1xyXG5cdFx0YWN0aW9uSGFuZGxlcjogYW55O1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgYXBwQ29uZmlnSW50ZXJmYWNlIHtcclxuXHRcdHNlcnZlclVybDogc3RyaW5nO1xyXG5cdFx0dGVtcGxhdGVVcmw6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJEYXRhSW50ZXJmYWNlIHtcclxuXHRcdGlkX21lbWJlcj86IHN0cmluZztcclxuXHRcdGZpcnN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bGFzdG5hbWU6IHN0cmluZztcclxuXHRcdGVtYWlsOiBzdHJpbmc7XHJcblx0XHRwaG9uZW51bWJlcjogc3RyaW5nO1xyXG5cdFx0bG9jYXRpb246IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgdXNlckVkaXREYXRhSW50ZXJmYWNlIHtcclxuXHRcdGZpcnN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bGFzdG5hbWU6IHN0cmluZztcclxuXHRcdGxvY2F0aW9uOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBFZGl0VXNlckludGVyZmFjZSB7XHJcblx0XHRpc1Zpc2libGU6IEJvb2xlYW47XHJcblx0XHR0aXRsZTogc3RyaW5nO1xyXG5cdFx0Ly9UT0RPOiBuZWVkIHRvIGxvb2sgaW50byB0aGlzXHJcblx0XHR1c2VyRGF0YTogYW55O1xyXG5cdFx0dXNlcklkOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbixcclxuXHRcdHRpdGxlOiBzdHJpbmcsXHJcblx0XHRib2R5OiBzdHJpbmcsXHJcblx0XHRidG4xVHh0OiBzdHJpbmcsXHJcblx0XHRidG4yVHh0Pzogc3RyaW5nLFxyXG5cdFx0c2hvd0J0bjI6IEJvb2xlYW4sXHJcblx0XHRidG4xQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHRcdGJ0bjJDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0Y2xvc2VCdG5DYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSW5mb1NsaWRlckludGVyZmFjZSB7XHJcblx0XHR0aXRsZTogc3RyaW5nO1xyXG5cdFx0Ym9keTogc3RyaW5nO1xyXG5cdFx0c3RhcnRUaW1lcj86IG51bWJlcjtcclxuXHRcdGVuZFRpbWVyPzogbnVtYmVyO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVGFibGVIZWFkaW5nSW50ZXJmYWNlIHtcclxuXHRcdGNsYXNzTmFtZTogc3RyaW5nO1xyXG5cdFx0c29ydE9yZGVyOiBzdHJpbmc7XHJcblx0XHR0ZXh0OiBzdHJpbmc7XHJcblx0XHRjdXN0b21GdW5jPzogRnVuY3Rpb247XHJcblx0XHRjdXN0b21IVE1MPzogQm9vbGVhbjtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEhlYWRlckJ1dHRvbnNJbnRlcmZhY2Uge1xyXG5cdFx0c2hvd0J0bjogQm9vbGVhbjtcclxuXHRcdGNsaWNrRnVuYzogc3RyaW5nO1xyXG5cdFx0dGV4dDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEFQSVNlcnZpY2VJbnRlcmZhY2Uge1xyXG5cdFx0Z2V0Q2FsbChwYXJhbXM6IGFueSk6IGFueTtcclxuXHRcdHBvc3RDYWxsKHBhcmFtczogYW55KTogYW55O1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIERvY0V2ZW50U2VydmljZUludGVyZmFjZSB7XHJcblx0XHRiaW5kTW91c2VFdmVudChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0YmluZEtleWJvYXJkRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdHVuYmluZE1vdXNlRXZlbnQoKTogdm9pZDtcclxuXHRcdHVuYmluZEtleWJvYXJkRXZlbnQoKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBTaGFyZWRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdGJyb2FkY2FzdEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFV0aWxzU2VydmljZUludGVyZmFjZSB7XHJcblx0XHRnZXREYXRhVHlwZShvYmo6IE9iamVjdCk6IHN0cmluZztcclxuXHRcdGlzTnVsbFVuZGVmaW5lZCh2YWw6IGFueSwgdmFsaWRhdGVaZXJvTmFOPzogQm9vbGVhbik6IEJvb2xlYW47XHJcblx0XHRjbG9uZShvYmo6IGFueSk6IGFueTtcclxuXHRcdHZhbGlkYXRlRW1haWwoZW1haWw6IHN0cmluZyk6IEJvb2xlYW47XHJcblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpOiBhbnk7XHJcblx0XHRsb2coLi4ubXNnOiBhbnlbXSk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0aGVhZGluZzogc3RyaW5nO1xyXG5cdFx0aGVhZGVyTGVmdEJ0bjogSGVhZGVyQnV0dG9uc0ludGVyZmFjZTtcclxuXHRcdGhlYWRlclJpZ2h0QnRuOiBIZWFkZXJCdXR0b25zSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJHdpbmRvdycsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3VjY2Vzcy5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgdGhpcy5vblJvdXRlQ2hhbmdlRXJyb3IuYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRpbmcgPSAnVXNlciBtYW5hZ2VtZW50JztcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XHJcblxyXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0Y2FzZSAnVXNlcnNMaXN0Q29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnQWRkVXNlckNvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEFkZFVzZXJIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29Ub0FkZFVzZXInLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0FkZCB1c2VyJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldEFkZFVzZXJIZWFkZXIoKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb0JhY2snLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0JhY2snXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZykge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1x0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpc1tjbGlja0Z1bmNdKSkge1xyXG5cdFx0XHRcdHRoaXNbY2xpY2tGdW5jXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z29Ub0FkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnYWRkLXVzZXInLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z29CYWNrKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgYXBwLkhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlcnNMaXN0Q29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHVzZXJzTGlzdDogQXJyYXk8YW55PjtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGVkaXRVc2VyOiBFZGl0VXNlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgbW9kYWxEaWFsb2d1ZTogTW9kYWxEaWFsb2d1ZUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgaW5mb1NsaWRlcjogSW5mb1NsaWRlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgc29ydE9yZGVyOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIHRhYmxlSGVhZGluZzogVGFibGVIZWFkaW5nSW50ZXJmYWNlW107XHJcblx0XHRwcml2YXRlIHNob3dMb2FkZXI6IEJvb2xlYW47XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCdBUElTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJyxcclxuXHRcdFx0J0NoZWNrYm94SGFuZGxlclNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgY2hlY2tib3hIYW5kbGVyU2VydmljZTogQ2hlY2tib3hIYW5kbGVyU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd1c2Vyc0xpc3QgY29uc3RydWN0b3InKTtcclxuXHRcdFx0dGhpcy5hcHBDb25maWcgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQ7XHJcblx0XHRcdHRoaXMuc29ydE9yZGVyID0gJy1pZF9tZW1iZXInO1xyXG5cdFx0XHR0aGlzLnVzZXJzTGlzdCA9IFtdO1xyXG5cdFx0XHR0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXJEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuY3JlYXRldGFibGVIZWFkaW5nKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0VXNlcnMoKSB7XHJcblx0XHRcdHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UuZ2V0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXHJcblx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEsIHN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc1NlcnZlckRhdGEoZGF0YSk7XHJcblx0XHRcdH0pLmVycm9yKChkYXRhLCBzdGF0dXMpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2VycicpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9jZXNzU2VydmVyRGF0YShkYXRhOiBhbnkpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdwcm9jZXNzU2VydmVyRGF0YTogJywgZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLnVzZXJzTGlzdCA9IGRhdGE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QubGVuZ3RoID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBBY3Rpb24gYnV0dG9ucyBoYW5kbGluZ1xyXG5cdFx0Ki9cclxuXHRcdGFjdGlvbkhhbmRsZXIodHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgdXNlckRhdGE/OiBVc2VyRGF0YUludGVyZmFjZSkge1xyXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdlZGl0JzpcclxuXHRcdFx0XHRcdHRoaXMuZWRpdFVzZXJDbGljayh1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2RlbGV0ZSc6XHJcblx0XHRcdFx0XHR0aGlzLmRlbGV0ZVVzZXJDbGljayh1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ3NhdmUnOlxyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGVVc2VyRGF0YSh1c2VyRGF0YSwgdXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRWRpdCB1c2VyIGNvZGUgZmxvd1xyXG5cdFx0Ki9cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd2YWxpZGF0ZUVtYWlsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRWRpdCBkZXRhaWxzJyxcclxuXHRcdFx0XHR1c2VyRGF0YTogdGhpcy51dGlsc1NlcnZpY2UuY2xvbmUodGhpcy51dGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFycih0aGlzLnVzZXJzTGlzdCwgJ2lkX21lbWJlcicsIHVzZXJJZCkpLFxyXG5cdFx0XHRcdHVzZXJJZDogdXNlcklkXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1lZGl0LW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2codGhpcy5lZGl0VXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogVXNlckRhdGFJbnRlcmZhY2UsIHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGE6ICcsIGRhdGEpO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICd1cGRhdGV1c2VyJyxcclxuXHRcdFx0XHQnZGF0YSc6IHtcclxuXHRcdFx0XHRcdCd1c2VySWQnOiB1c2VySWQsXHJcblx0XHRcdFx0XHQndXNlckRhdGEnOiB7XHJcblx0XHRcdFx0XHRcdGVtYWlsOiBkYXRhLmVtYWlsLFxyXG5cdFx0XHRcdFx0XHRmaXJzdG5hbWU6IGRhdGEuZmlyc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRpZF9tZW1iZXI6IGRhdGEuaWRfbWVtYmVyLFxyXG5cdFx0XHRcdFx0XHRsYXN0bmFtZTogZGF0YS5sYXN0bmFtZSxcclxuXHRcdFx0XHRcdFx0bG9jYXRpb246IGRhdGEubG9jYXRpb24sXHJcblx0XHRcdFx0XHRcdHBob25lbnVtYmVyOiBkYXRhLnBob25lbnVtYmVyXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhIHN1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR0aGlzLm9uVXNlclVwZGF0ZVJlc3AocmVzcG9uc2UucmVzcCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Vc2VyVXBkYXRlUmVzcChyZXNwOiBCb29sZWFuKSB7XHJcblx0XHRcdHRoaXMuaGlkZUVkaXRQb3B1cCgpO1xyXG5cclxuXHRcdFx0aWYgKHJlc3AgPT09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dJbmZvU2xpZGVyKHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnVXNlciB1cGRhdGVkJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdVc2VyIGluZm8gaGFzIGJlZW4gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxyXG5cdFx0XHRcdFx0ZW5kVGltZXI6IDQwMDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdFcnJvciEnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgdXBkYXRpbmcgdXNlciBpbmZvcm1hdGlvbi4gUGxlYXNlIHRyeSBhZ2FpbicsXHJcblx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBEZWxldGUgdXNlciBjb2RlZmxvd1xyXG5cdFx0Ki9cclxuXHRcdGRlbGV0ZVVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdEZWxldGUgdXNlcj8nLFxyXG5cdFx0XHRcdGJvZHk6ICdQbGVhc2UgY29uZmlybSwgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSB1c2VyJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICdDYW5jZWwnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiB0cnVlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5kZWxldGVVc2VyQ29uZmlybS5iaW5kKHRoaXMsIHVzZXJJZCksXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVsZXRlVXNlckNvbmZpcm0odXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdkZWxldGVVc2VyQ29uZmlybSwgdXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2RlbGV0ZXVzZXInLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdCd1c2VySWQnOiB1c2VySWRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMub25Vc2VyRGVsZXRlZChyZXNwb25zZS5yZXNwKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdlcnJvcjogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRvblVzZXJEZWxldGVkKHJlc3A6IEJvb2xlYW4pIHtcclxuXHRcdFx0aWYgKHJlc3AgPT09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLmhpZGVNb2RhbERpYWxvZ3VlKCk7XHJcblx0XHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1VzZXIgZGVsZXRlZCcsXHJcblx0XHRcdFx0XHRib2R5OiAnVXNlciBoYXMgYmVlbiBkZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcblx0XHRcdFx0XHRzdGFydFRpbWVyOiA1MDAsXHJcblx0XHRcdFx0XHRlbmRUaW1lcjogNDAwMFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRib2R5OiAnV2UgaGF2ZSBlbmNvdW50ZXJlZCBlcnJvciB3aGlsZSBkZWxldGluZyB1c2VyLiBQbGVhc2UgdHJ5IGFnYWluJyxcclxuXHRcdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRGVsZXRlIGFsbCB1c2VycyBjb2RlZmxvd1xyXG5cdFx0Ki9cclxuXHRcdGRlbGV0ZUFsbCgkZXZlbnQpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2RlbGV0ZUFsbCcpO1xyXG5cclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSBhbGwgdXNlcnM/JyxcclxuXHRcdFx0XHRib2R5OiAnUGxlYXNlIGNvbmZpcm0sIHlvdSB3YW50IHRvIGRlbGV0ZSBhbGwgdXNlcnMnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0c2hvd0J0bjI6IHRydWUsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZUFsbFVzZXJzQ29uZmlybS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywge30pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZUFsbFVzZXJzQ29uZmlybSh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2RlbGV0ZVVzZXJDb25maXJtLCB1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR2YXIgdXNlcklkcyA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMudXNlcnNMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0dXNlcklkcy5wdXNoKHRoaXMudXNlcnNMaXN0W2ldLmlkX21lbWJlcik7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc29sZS5sb2codXNlcklkcyk7XHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdkZWxldGVhbGx1c2VycycsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J3VzZXJJZHMnOiB1c2VySWRzXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3N1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR0aGlzLm9uQWxsVXNlcnNEZWxldGVkKHJlc3BvbnNlLnJlc3ApO1xyXG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uQWxsVXNlcnNEZWxldGVkKHJlc3A6IEJvb2xlYW4pIHtcclxuXHRcdFx0aWYgKHJlc3AgPT09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLmhpZGVNb2RhbERpYWxvZ3VlKCk7XHJcblx0XHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XHJcblx0XHRcdFx0XHR0aXRsZTogJ0FsbCB1c2VycyBkZWxldGVkJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdBbGwgVXNlcnMgYXJlIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuXHRcdFx0XHRcdHN0YXJ0VGltZXI6IDUwMCxcclxuXHRcdFx0XHRcdGVuZFRpbWVyOiA0MDAwXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAnRXJyb3IhJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIGRlbGV0aW5nIHVzZXJzLiBQbGVhc2UgdHJ5IGFnYWluJyxcclxuXHRcdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogR2VuZXJpYyBmdW5jdGlvbnMgdG8gaGlkZSBwb3AgdXBzXHJcblx0XHQqIHRvIHNob3cgaW5mbyBzbGlkZXIgZXRjXHJcblx0XHQqL1xyXG5cdFx0aGlkZUVkaXRQb3B1cChldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLWVkaXQtbW9kYWwnLCB7fSk7XHJcblx0XHRcdHRoaXMuZWRpdFVzZXJEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtbW9kYWwnLCB7fSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtYW5hZ2VTb3J0T3JkZXIob3JkZXJCeTogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChvcmRlckJ5ID09PSB0aGlzLnNvcnRPcmRlcikge1xyXG5cdFx0XHRcdHRoaXMuc29ydE9yZGVyID0gJy0nICsgb3JkZXJCeTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNvcnRPcmRlciA9IG9yZGVyQnk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRzaG93SW5mb1NsaWRlcihwYXJhbXM6IEluZm9TbGlkZXJJbnRlcmZhY2UpIHtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyID0ge1xyXG5cdFx0XHRcdHRpdGxlOiBwYXJhbXMudGl0bGUsXHJcblx0XHRcdFx0Ym9keTogcGFyYW1zLmJvZHlcclxuXHRcdFx0fTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LWluZm8tc2xpZGVyJywge30pO1xyXG5cdFx0XHR9LCBwYXJhbXMuc3RhcnRUaW1lcik7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLmhpZGVJbmZvU2xpZGVyKCk7XHJcblx0XHRcdH0sIHBhcmFtcy5lbmRUaW1lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZUluZm9TbGlkZXIoKSB7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1pbmZvLXNsaWRlcicsIHt9KTtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEZ1bmN0aW9ucyB0byBzZXQgZGVhZnVsdCB2YWx1ZXMgZm9yIGRpZmZlcmVudCBjb25maWdzXHJcblx0XHQqL1xyXG5cdFx0Y3JlYXRldGFibGVIZWFkaW5nKCkge1xyXG5cdFx0XHR0aGlzLnRhYmxlSGVhZGluZyA9IFt7XHJcblx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMScsXHJcblx0XHRcdFx0J3NvcnRPcmRlcic6ICdpZF9tZW1iZXInLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ1MuTm8nXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdmaXJzdG5hbWUnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnRmlyc3QgbmFtZSdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnbGFzdG5hbWUnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnTGFzdCBuYW1lJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTMnLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdlbWFpbCcsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdFbWFpbCdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAncGhvbmVudW1iZXInLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnUGhvbmUgTnVtYmVyJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEnLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdsb2NhdGlvbicsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdMb2NhdGlvbidcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0LyosIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEgdGV4dC1yaWdodCcsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJycsXHJcblx0XHRcdFx0XHQndGV4dCc6ICc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmctY2hlY2tlZD1cImN1c3RvbUNvbnRyb2xsZXIuY2hlY2tib3hIYW5kbGVyU2VydmljZS5jaGVja2JveENvdW50ZXJcIiAvPicsXHJcblx0XHRcdFx0XHQnY3VzdG9tRnVuYyc6IHRoaXMuY2hlY2tib3hIYW5kbGVyU2VydmljZS5jaGVja0FsbC5iaW5kKHRoaXMuY2hlY2tib3hIYW5kbGVyU2VydmljZSksXHJcblx0XHRcdFx0XHQnY3VzdG9tSFRNTCc6IHRydWVcclxuXHRcdFx0XHR9Ki9cclxuXHRcdFx0XTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0VXNlckRlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0dXNlckRhdGE6IHt9LFxyXG5cdFx0XHRcdHVzZXJJZDogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICcnLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aW5mb1NsaWRlckRlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlciA9IHtcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0Ym9keTogJydcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2Vyc0xpc3RDb250cm9sbGVyJywgYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQWRkVXNlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBBZGRVc2VySW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgdmFsaWRFbWFpbDogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgbW9kYWxEaWFsb2d1ZTogTW9kYWxEaWFsb2d1ZUludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0J0FQSVNlcnZpY2UnLFxyXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkc2NvcGUuJG9uKCdhZGQtdXNlcicsIGZ1bmN0aW9uKGV2ZW50LCBhcmdzKSB7XHJcblx0XHRcdFx0dGhpcy5hZGRVc2VyKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5hcHBDb25maWcgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQ7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnVzZXJEYXRhRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSB0aGlzLnV0aWxzU2VydmljZS52YWxpZGF0ZUVtYWlsKHZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVGb3JtKCkge1xyXG5cdFx0XHQvLyBtYWtlIG51bGwgdW5kZWZpbmVkIGNoZWNrcyBoZXJlXHJcblx0XHRcdGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5maXJzdG5hbWUpIHx8IHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmxhc3RuYW1lKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLW5hbWUnKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEuZW1haWwpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tZW1haWwnKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEucGhvbmVudW1iZXIpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tcGhvbmVudW1iZXInKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEubG9jYXRpb24pKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tbG9jYXRpb24nKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z290b1VzZXJMaXN0KCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnYWRkIHVzZXI6ICcsIHRoaXMudXNlckRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcclxuXHRcdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdhZGR1c2VyJyxcclxuXHRcdFx0XHRcdGRhdGE6IHRoaXMudXNlckRhdGEsXHJcblx0XHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XHJcblx0XHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3AgJiYgcmVzcG9uc2UucmVzcCA9PT0gJ0VtYWlsIGFscmVhZHkgaW4gdXNlJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdlbWFpbEluVXNlJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmdvdG9Vc2VyTGlzdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLmVycm9yKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR1c2VyRGF0YURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMudXNlckRhdGEgPSB7XHJcblx0XHRcdFx0J2ZpcnN0bmFtZSc6ICcnLFxyXG5cdFx0XHRcdCdsYXN0bmFtZSc6ICcnLFxyXG5cdFx0XHRcdCdlbWFpbCc6ICcnLFxyXG5cdFx0XHRcdCdwaG9uZW51bWJlcic6ICcnLFxyXG5cdFx0XHRcdCdsb2NhdGlvbic6ICdJTidcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRzaG93TW9kYWxEaWFsb2d1ZShlcnJvclR5cGU6IHN0cmluZykge1xyXG5cdFx0XHRsZXQgdGl0bGU6IHN0cmluZyA9ICcnLFxyXG5cdFx0XHRcdGJvZHk6IHN0cmluZyA9ICcnO1xyXG5cclxuXHRcdFx0c3dpdGNoIChlcnJvclR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdlbWFpbEluVXNlJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0VtYWlsIGFscmVhZHkgaW4gdXNlJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnRW1haWwgSUQgaXMgYWxyZWFkeSBpbiB1c2UsIHBsZWFzZSBlbnRlciBhIHVuaXF1ZSBFbWFpbCBhZGRyZXNzJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1uYW1lJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIEZpcnN0IG5hbWUvTGFzdCBuYW1lJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1lbWFpbCc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCB0aGUgZW1haWwgYWRkcmVzcyc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tcGhvbmVudW1iZXInOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgcGhvbmUgbnVtYmVyJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1sb2NhdGlvbic6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2Ugc2VsZWN0IGxvY2F0aW9uJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7fSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6IHRpdGxlLFxyXG5cdFx0XHRcdGJvZHk6IGJvZHksXHJcblx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1tb2RhbCcsIHt9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0Ym9keTogJycsXHJcblx0XHRcdFx0YnRuMVR4dDogJycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignQWRkVXNlckNvbnRyb2xsZXInLCBhcHAuQWRkVXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgRWRpdFVzZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdFZGl0VXNlckNvbnRyb2xsZXInLCBhcHAuRWRpdFVzZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWVDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdNb2RhbERpYWxvZ3VlQ29udHJvbGxlcicsIGFwcC5Nb2RhbERpYWxvZ3VlQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VyRm9ybUNvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2VyRm9ybUludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIGZvcm1TdWJtaXQ6IEZ1bmN0aW9uO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhSWQ6IHN0cmluZztcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdG9uRm9ybVN1Ym1pdChldmVudDogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmZvcm1TdWJtaXQoeyBkYXRhOiB0aGlzLnVzZXJEYXRhLCB1c2VyRGF0YUlkOiB0aGlzLnVzZXJEYXRhSWQgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJGb3JtQ29udHJvbGxlcicsIGFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJDb250cm9sbGVyIGltcGxlbWVudHMgVGFibGVIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSBzb3J0RnVuYzogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIGRlZmF1bHRDbGFzczogc3RyaW5nO1xyXG5cdFx0cHJpdmF0ZSBsYXN0U29ydE9yZGVyOiBzdHJpbmc7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJGVsZW1lbnQnLFxyXG5cdFx0XHQnJHNjZScsXHJcblx0XHRcdCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkc2NlOiBuZy5JU0NFU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBjaGVja2JveEhhbmRsZXJTZXJ2aWNlOiBDaGVja2JveEhhbmRsZXJTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5kZWZhdWx0Q2xhc3MgPSAnYXJyb3cgYXJyb3ctZG93bic7XHJcblx0XHRcdHRoaXMubGFzdFNvcnRPcmRlciA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy11cCcsXHJcblx0XHRcdFx0dGFyZ2V0ID0gPEhUTUxFbGVtZW50PiBldmVudC50YXJnZXQ7XHJcblxyXG5cdFx0XHRpZiAodGhpcy4kZWxlbWVudC5maW5kKHRhcmdldCkuZmluZCgnc3BhbicpLmhhc0NsYXNzKCdhcnJvdy11cCcpKSB7XHJcblx0XHRcdFx0bmV3Q2xhc3MgPSAnYXJyb3cgYXJyb3ctZG93bic7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLmxhc3RTb3J0T3JkZXIgIT09IHNvcnRPcmRlcikge1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2hlYWRpbmdfJyArIHRoaXMubGFzdFNvcnRPcmRlcikuZmluZCgnc3BhbicpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3ModGhpcy5kZWZhdWx0Q2xhc3MpO1xyXG5cdFx0XHRcdHRoaXMubGFzdFNvcnRPcmRlciA9IHNvcnRPcmRlcjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQodGFyZ2V0KS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhuZXdDbGFzcyk7XHJcblxyXG5cdFx0XHR0aGlzLnNvcnRGdW5jKHtcclxuXHRcdFx0XHQnb3JkZXJCeSc6IHNvcnRPcmRlclxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdC8qdG9UcnVzdGVkSFRNTChodG1sOiBzdHJpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuJHNjZS50cnVzdEFzSHRtbChodG1sKTtcclxuXHRcdH0qL1xyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdUYWJsZUhlYWRlckNvbnRyb2xsZXInLCBhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdJbmZvU2xpZGVyQ29udHJvbGxlcicsIGFwcC5JbmZvU2xpZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VySW5mb0NvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2VySW5mb0ludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHJlYWRPbmx5TW9kZTogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgYWN0aW9uSGFuZGxlcjogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgdXNlckVkaXREYXRhOiB1c2VyRWRpdERhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGNoZWNrYm94U2VsZWN0ZWQ6IEJvb2xlYW47XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyR0aW1lb3V0JyxcclxuXHRcdFx0JyRlbGVtZW50JyxcclxuXHRcdFx0J0RvY0V2ZW50U2VydmljZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxyXG5cdFx0XHQnQ2hlY2tib3hIYW5kbGVyU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBkb2NFdmVudFNlcnZpY2U6IERvY0V2ZW50U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBjaGVja2JveEhhbmRsZXJTZXJ2aWNlOiBDaGVja2JveEhhbmRsZXJTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94U2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy51c2VyRWRpdERhdGFEZWZhdWx0KCk7XHJcblxyXG5cdFx0XHR0aGlzLiRzY29wZS4kb24oJ2NoZWNrLWFsbCcsIChldmVudCwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLm9uQ2hlY2tib3hDbGlja2VkKG51bGwsIHBhcmFtcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Lyp0aGlzLiRzY29wZS4kb24oJ2NoZWNrYm94LWNvdW50ZXItY2hhbmdlZCcsIChldmVudCwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLm9uQ2hlY2tib3hDb3VudGVyQ2hhbmdlZChldmVudCwgcGFyYW1zKTtcclxuXHRcdFx0fSk7Ki9cclxuXHRcdH1cclxuXHJcblx0XHRzdGFydEVkaXRNb2RlKGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5yZWFkT25seU1vZGUpIHtcclxuXHRcdFx0XHR0aGlzLnJlYWRPbmx5TW9kZSA9IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLmJpbmRLZXlib2FyZEV2ZW50KHRoaXMuY2FuY2VsRWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcblx0XHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UuYmluZE1vdXNlRXZlbnQodGhpcy5vbk1vdXNlQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjYW5jZWxFZGl0TW9kZShldmVudD86IEV2ZW50LCBub3Jlc2V0PzogQm9vbGVhbikge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLnVuYmluZEtleWJvYXJkRXZlbnQoKTtcclxuXHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UudW5iaW5kTW91c2VFdmVudCgpO1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSB0cnVlO1xyXG5cdFx0XHQvKmlmICh0aGlzLiRzY29wZS4kcm9vdC4kJHBoYXNlICE9ICckYXBwbHknICYmIHRoaXMuJHNjb3BlLiRyb290LiQkcGhhc2UgIT0gJyRkaWdlc3QnKSB7XHJcblx0XHRcdFx0dGhpcy4kc2NvcGUuJGFwcGx5KCk7XHJcblx0XHRcdH0qL1xyXG5cclxuXHRcdFx0aWYgKCFub3Jlc2V0KSB7XHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjZmlyc3RuYW1lJykudmFsKHRoaXMudXNlckRhdGEuZmlyc3RuYW1lKTtcclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNsYXN0bmFtZScpLnZhbCh0aGlzLnVzZXJEYXRhLmxhc3RuYW1lKTtcclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNsb2NhdGlvbicpLnZhbCh0aGlzLnVzZXJEYXRhLmxvY2F0aW9uKTtcclxuXHJcblx0XHRcdFx0dGhpcy4kdGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLiRzY29wZS4kYXBwbHkoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uTW91c2VDbGljayhldmVudDogRXZlbnQpIHtcclxuXHRcdFx0bGV0IHRhcmdldCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XHJcblx0XHRcdGxldCB0YWdOYW1lID0gdGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRcdGlmICgodGFnTmFtZSAhPT0gJ2lucHV0JyAmJiB0YWdOYW1lICE9PSAnc2VsZWN0JykgfHwgKHRoaXMuJGVsZW1lbnQuZmluZCh0YXJnZXQpLmxlbmd0aCA9PT0gMCkpIHtcclxuXHRcdFx0XHR0aGlzLmNhbmNlbEVkaXRNb2RlKGV2ZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGFjdGlvbkNhbGxiYWNrKGV2ZW50OiBFdmVudCwgdHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZSA9PT0gJ3NhdmUnKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcclxuXHRcdFx0XHRcdHZhciB1c2VyRGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0aWRfbWVtYmVyOiB0aGlzLnVzZXJEYXRhLmlkX21lbWJlcixcclxuXHRcdFx0XHRcdFx0Zmlyc3RuYW1lOiB0aGlzLnVzZXJFZGl0RGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGxhc3RuYW1lOiB0aGlzLnVzZXJFZGl0RGF0YS5sYXN0bmFtZSxcclxuXHRcdFx0XHRcdFx0ZW1haWw6IHRoaXMudXNlckRhdGEuZW1haWwsXHJcblx0XHRcdFx0XHRcdHBob25lbnVtYmVyOiB0aGlzLnVzZXJEYXRhLnBob25lbnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjogdGhpcy51c2VyRWRpdERhdGEubG9jYXRpb25cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR0aGlzLmNhbmNlbEVkaXRNb2RlKG51bGwsIHRydWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnVzZXJFZGl0RGF0YURlZmF1bHQoKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5hY3Rpb25IYW5kbGVyKHsgdHlwZTogdHlwZSwgdXNlcklkOiB1c2VySWQsIHVzZXJEYXRhOiB1c2VyRGF0YSB9KTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUZvcm0oKSB7XHJcblx0XHRcdGxldCBmaXJzdG5hbWUgPSB0aGlzLnVzZXJFZGl0RGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0bGFzdG5hbWUgPSB0aGlzLnVzZXJFZGl0RGF0YS5sYXN0bmFtZSxcclxuXHRcdFx0XHRsb2NhdGlvbiA9IHRoaXMudXNlckVkaXREYXRhLmxvY2F0aW9uO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZChmaXJzdG5hbWUpIHx8XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKGxhc3RuYW1lKSB8fFxyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZChsb2NhdGlvbikpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHJcblx0XHR1c2VyRWRpdERhdGFEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLnVzZXJFZGl0RGF0YSA9IHtcclxuXHRcdFx0XHRmaXJzdG5hbWU6IHRoaXMudXNlckRhdGEuZmlyc3RuYW1lLFxyXG5cdFx0XHRcdGxhc3RuYW1lOiB0aGlzLnVzZXJEYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdGxvY2F0aW9uOiB0aGlzLnVzZXJEYXRhLmxvY2F0aW9uXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0b25DaGVja2JveENsaWNrZWQoZXZlbnQ/OiBFdmVudCwgcGFyYW1zPzogYW55KSB7XHJcblx0XHRcdGxldCBjaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdGlmKGV2ZW50KSB7XHJcblx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoKHBhcmFtcyAmJiBwYXJhbXMuc3RhdGUgIT09IHRoaXMuY2hlY2tib3hTZWxlY3RlZCkpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94U2VsZWN0ZWQgPSBwYXJhbXMuc3RhdGU7XHJcblx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGNoYW5nZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94SGFuZGxlclNlcnZpY2UubWFuYWdlQ2hlY2tib3hDb3VudGVyKHRoaXMuY2hlY2tib3hTZWxlY3RlZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlckluZm9Db250cm9sbGVyJywgYXBwLlVzZXJJbmZvQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBTcGlubmVyQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignU3Bpbm5lckNvbnRyb2xsZXInLCBhcHAuU3Bpbm5lckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEVkaXRVc2VyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBpc1Zpc2libGU6ICc9JyxcclxuXHRcdFx0dGl0bGU6ICc9JyxcclxuXHRcdFx0dXNlckRhdGE6ICc9JyxcclxuXHRcdFx0dXNlcklkOiAnPScsXHJcblx0XHRcdGhpZGVQb3B1cDogJyYnLFxyXG5cdFx0XHR1cGRhdGVEYXRhOiAnJicsXHJcblx0XHRcdGRpc2NhcmRGb3JtOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdFZGl0VXNlckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0bGluayhzY29wZTogbmcuSVNjb3BlLCBlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1lZGl0LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNlZGl0VXNlck1vZGFsJykpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI2VkaXRVc2VyTW9kYWwnKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4oICgpID0+IG5ldyBFZGl0VXNlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2VkaXRVc2VyJywgYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0aXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdGJvZHk6ICc9JyxcclxuXHRcdFx0YnRuMVR4dDogJz0nLFxyXG5cdFx0XHRidG4yVHh0OiAnPScsXHJcblx0XHRcdHNob3dCdG4yOiAnPScsXHJcblx0XHRcdGJ0bjFDYWxsYmFjazogJyYnLFxyXG5cdFx0XHRidG4yQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogJyYnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlLCBlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjbW9kYWxEaWFsb2d1ZScpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI21vZGFsRGlhbG9ndWUnKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBNb2RhbERpYWxvZ3VlRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdtb2RhbERpYWxvZ3VlJywgYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVc2VyRm9ybURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0dXNlckRhdGE6ICc9JyxcclxuXHRcdFx0dXNlcklkOiAnPScsXHJcblx0XHRcdGVkaXRNb2RlOiAnPScsXHJcblx0XHRcdHZhbGlkYXRlRW1haWw6ICcmJyxcclxuXHRcdFx0Zm9ybVN1Ym1pdDogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVXNlckZvcm1Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVXNlckZvcm1EaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VyRm9ybScsIGFwcC5Vc2VyRm9ybURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0YWJsZUhlYWRpbmc6ICc9JyxcclxuXHRcdFx0c29ydEZ1bmM6ICcmJyxcclxuXHRcdFx0Y2hlY2tBbGw6ICcmJyxcclxuXHRcdFx0ZGVsZXRlQWxsOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdUYWJsZUhlYWRlckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICRjb21waWxlOiBuZy5JQ29tcGlsZVNlcnZpY2UsIHByaXZhdGUgJHBhcnNlOiBuZy5JUGFyc2VTZXJ2aWNlKSB7IH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHZhciBkaXJlY3RpdmUgPSAoJGNvbXBpbGU6IG5nLklDb21waWxlU2VydmljZSwgJHBhcnNlOiBuZy5JUGFyc2VTZXJ2aWNlKSA9PiBuZXcgVGFibGVIZWFkZXJEaXJlY3RpdmUoJGNvbXBpbGUsICRwYXJzZSk7XHJcblx0XHRcdGRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckY29tcGlsZScsICckcGFyc2UnXTtcclxuXHRcdFx0cmV0dXJuIGRpcmVjdGl2ZTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgndGFibGVIZWFkZXInLCBhcHAuVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbmZvU2xpZGVyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHQvLyBwcml2YXRlIHRpbWVyOiBudW1iZXI7XHJcblxyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0dGl0bGU6ICc9JyxcclxuXHRcdFx0Ym9keTogJz0nXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdJbmZvU2xpZGVyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0bGluayhzY29wZTogbmcuSVNjb3BlLCBlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1pbmZvLXNsaWRlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjaW5mb1NsaWRlcicpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1pbmZvLXNsaWRlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjaW5mb1NsaWRlcicpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IEluZm9TbGlkZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2luZm9TbGlkZXInLCBhcHAuSW5mb1NsaWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlckluZm9EaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdC8vIHByaXZhdGUgdGltZXI6IG51bWJlcjtcclxuXHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcblx0XHRwdWJsaWMgc2NvcGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdGFjdGlvbkhhbmRsZXI6ICcmJ1xyXG5cdFx0fTtcclxuXHRcdHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3VzZXItaW5mby5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VySW5mb0NvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6IFVzZXJJbmZvU2NvcGVJbnRlcmZhY2UsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHsgfVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVXNlckluZm9EaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VySW5mbycsIGFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNwaW5uZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNob3dMb2FkZXI6ICc9J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvc3Bpbm5lci5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdTcGlubmVyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IFNwaW5uZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdzcGlubmVyJywgYXBwLlNwaW5uZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2UgaW1wbGVtZW50cyBBUElTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cdFx0aHR0cFNlcnZpY2U6IG5nLklIdHRwU2VydmljZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UpIHtcclxuXHRcdFx0dGhpcy5odHRwU2VydmljZSA9ICRodHRwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldENhbGwocGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0bGV0IGNvbmZpZyA9IHBhcmFtcy5jb25maWcgfHwge307XHJcblx0XHRcdHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChwYXJhbXMudXJsLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc3RDYWxsKHBhcmFtczogYW55KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QocGFyYW1zLnVybCwgcGFyYW1zLmRhdGEsIHtcclxuXHRcdFx0XHRoZWFkZXJzOiBwYXJhbXMuaGVhZGVyc1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnQVBJU2VydmljZScsIGFwcC5BUElTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIGltcGxlbWVudHMgU2hhcmVkU2VydmljZUludGVyZmFjZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG4gICAgICAgIGJyb2FkY2FzdEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGV2ZW50TmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdTaGFyZWRTZXJ2aWNlJywgYXBwLlNoYXJlZFNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFV0aWxzU2VydmljZSBpbXBsZW1lbnRzIFV0aWxzU2VydmljZUludGVyZmFjZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAgICAgZ2V0RGF0YVR5cGUob2JqOiBhbnkpIHtcclxuXHRcdFx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChvYmopLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aXNOdWxsVW5kZWZpbmVkKHZhbDogYW55LCB2YWxpZGF0ZVplcm9OYU4/OiBCb29sZWFuKSB7XHJcblx0XHRcdGxldCBpc051bGw6IEJvb2xlYW4gPSBmYWxzZSxcclxuXHRcdFx0XHR0eXBlID0gdGhpcy5nZXREYXRhVHlwZSh2YWwpO1xyXG5cclxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnW29iamVjdCBhcnJheV0nOlxyXG5cdFx0XHRcdFx0aWYgKHZhbC5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdbb2JqZWN0IG9iamVjdF0nOlxyXG5cdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHZhbCkgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gXCJcIiB8fCB2YWwgPT09IFwibnVsbFwiIHx8IHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2YWxpZGF0ZVplcm9OYU4gJiYgKHZhbCA9PT0gMCB8fCBpc05hTih2YWwpKSkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpc051bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xvbmUob2JqOiBhbnkpIHtcclxuXHRcdFx0aWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZiAob2JqKSAhPSAnb2JqZWN0JylcclxuXHRcdFx0XHRyZXR1cm4gb2JqO1xyXG5cclxuXHRcdFx0dmFyIHRlbXAgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XHJcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopXHJcblx0XHRcdFx0dGVtcFtrZXldID0gdGhpcy5jbG9uZShvYmpba2V5XSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGVtcDtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBCb29sZWFuIHtcclxuXHRcdFx0dmFyIGVtYWlsUmVnZXhwID0gL15bYS16MC05ISMkJSYnKitcXC89P15fYHt8fX4uLV0rQFthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KFxcLlthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KSokL2k7XHJcblxyXG5cdFx0XHRpZiAoZW1haWwgJiYgZW1haWxSZWdleHAudGVzdChlbWFpbCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoYXJyW2ldW3Byb3BOYW1lXSA9PSBwcm9wVmFsdWUpIHJldHVybiBhcnJbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRsb2coLi4ubXNnOiBhbnlbXSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ1V0aWxzU2VydmljZScsIGFwcC5VdGlsc1NlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBleHBvcnQgY2xhc3MgRG9jRXZlbnRTZXJ2aWNlIGltcGxlbWVudHMgRG9jRXZlbnRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuICAgIHByaXZhdGUgZG9jUmVmOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICckZG9jdW1lbnQnXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGRvY3VtZW50OiBuZy5JRG9jdW1lbnRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBiaW5kTW91c2VFdmVudChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5Ym9hcmRFdmVudChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgdGhpcy4kZG9jdW1lbnQub24oJ2tleWRvd24ga2V5cHJlc3MnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDI3KSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRNb3VzZUV2ZW50KCkge1xyXG4gICAgICB0aGlzLiRkb2N1bWVudC5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kS2V5Ym9hcmRFdmVudCgpIHtcclxuICAgICAgdGhpcy4kZG9jdW1lbnQub2ZmKCdrZXlkb3duIGtleXByZXNzJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0RvY0V2ZW50U2VydmljZScsIGFwcC5Eb2NFdmVudFNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQ2hlY2tib3hIYW5kbGVyU2VydmljZSB7XHJcblx0XHRwdWJsaWMgY2hlY2tib3hDb3VudGVyOiBudW1iZXI7XHJcblx0XHRwcml2YXRlIHNlbGVjdGVkQWxsOiBCb29sZWFuO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94Q291bnRlciA9IDA7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRjaGVja0FsbCgpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coJ2NoZWNrQWxsJyk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQWxsID0gIXRoaXMuc2VsZWN0ZWRBbGw7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnY2hlY2stYWxsJywgeyBzdGF0ZTogdGhpcy5zZWxlY3RlZEFsbCB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRtYW5hZ2VDaGVja2JveENvdW50ZXIoaXNDaGVja2VkOiBCb29sZWFuKSB7XHJcblx0XHRcdGlmKGlzQ2hlY2tlZCkge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hDb3VudGVyKys7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXItLTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuY2hlY2tib3hDb3VudGVyIDwgMCkge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hDb3VudGVyID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnY2hlY2tib3hDb3VudGVyOiAnLCB0aGlzLmNoZWNrYm94Q291bnRlcik7IFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJywgYXBwLkNoZWNrYm94SGFuZGxlclNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9qcXVlcnkvanF1ZXJ5LmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FwcC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvbW9kdWxlcy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29uc3RhbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25maWcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3JvdXRlLWhhbmRsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItbGlzdC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL2hlYWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdGFibGUtaGVhZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItaW5mby5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9hcHAtY29uZmlnLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL3VzZXItZGF0YS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvbW9kYWwtZGlhbG9ndWUuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvaW5mby1zbGlkZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvdGFibGUtaGVhZGluZy5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9oZWFkZXItYnV0dG9ucy5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3NlcnZpY2VzL2FwaS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvZG9jLWV2ZW50LmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zaGFyZWQuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3NlcnZpY2VzL3V0aWxzLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2hlYWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy91c2Vycy1saXN0LmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWluZm8uY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9zcGlubmVyLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9zcGlubmVyLmRpcmVjdGl2ZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvdXRpbHMuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL2NoZWNrYm94LWhhbmRsZXIuc2VydmljZS50cycgLz5cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdGV4cG9ydCB2YXIgZm9ybUFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmb3JtQXBwJywgWyduZ1JvdXRlJywgJ2NvbnRyb2xsZXJzJywgJ3NlcnZpY2VzJywgJ2RpcmVjdGl2ZXMnXSk7XHJcblxyXG5cdGZvcm1BcHAuY29uZmlnKENvbmZpZyk7XHJcbiAgICBmb3JtQXBwLnJ1bihbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ1NoYXJlZFNlcnZpY2UnLCBSb3V0ZUhhbmRsZXJdKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVGVzdENvbnRyb2xsZXIge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSB0aGlzLnV0aWxzU2VydmljZS52YWxpZGF0ZUVtYWlsKHZhbCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1Rlc3RDb250cm9sbGVyJywgYXBwLlRlc3RDb250cm9sbGVyKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
