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
        function UsersListController($scope, $location, apiService, utilsService, sharedService, checkboxHandlerService) {
            this.$scope = $scope;
            this.$location = $location;
            this.apiService = apiService;
            this.utilsService = utilsService;
            this.sharedService = sharedService;
            this.checkboxHandlerService = checkboxHandlerService;
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWluZm8uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kaXJlY3RpdmVzL3VzZXItaW5mby5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvYXBwLWNvbmZpZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdGFibGUtaGVhZGluZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvaGVhZGVyLWJ1dHRvbnMuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9hcGkuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9kb2MtZXZlbnQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zaGFyZWQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy91dGlscy5pbnRlcmZhY2UudHMiLCJ0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9zcGlubmVyLmNvbnRyb2xsZXIudHMiLCJ0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9zcGlubmVyLmRpcmVjdGl2ZS50cyIsInRzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy9jaGVja2JveC1oYW5kbGVyLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIiwidHMvY29udHJvbGxlcnMvdGVzdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FDSmxELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FpQlQ7QUFqQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYLFlBQVk7SUFFWjtRQUFBO1FBYUEsQ0FBQztRQVpBLHNCQUFXLG9CQUFPO2lCQUFsQjtnQkFDQyxNQUFNLENBQUM7b0JBQ04sdUNBQXVDO29CQUN2QyxTQUFTLEVBQUUsK0NBQStDO29CQUMxRCxXQUFXLEVBQUUsWUFBWTtvQkFDekIsY0FBYyxFQUFFO3dCQUNmLElBQUksRUFBRSxPQUFPO3dCQUNiLElBQUksRUFBRSxlQUFlO3dCQUNyQixJQUFJLEVBQUUsZ0JBQWdCO3FCQUN0QjtpQkFDRDtZQUNGLENBQUM7OztXQUFBO1FBQ0YsZ0JBQUM7SUFBRCxDQUFDO0lBYlksYUFBUyxZQWFyQjtBQUNGLENBQUMsRUFqQk0sR0FBRyxLQUFILEdBQUcsUUFpQlQ7OztBQ25CRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBb0JUO0FBcEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0lBRVo7UUFLQyxnQkFBWSxjQUF1QztZQUNsRCxjQUFjLENBQUMsSUFBSSxDQUFD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R0FBRyxRQXNCVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbnZhciBzZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCdzZXJ2aWNlcycsIFtdKTtcclxudmFyIGNvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2NvbnRyb2xsZXJzJywgW10pO1xyXG52YXIgZGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzJywgW10pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG5cdFx0c3RhdGljIGdldCBEZWZhdWx0KCk6IGFueSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0Ly8gc2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXHJcblx0XHRcdFx0c2VydmVyVXJsOiAnaHR0cHM6Ly91c2VyLW1hbmFnZW1lbnQtODgxNTEyLmhlcm9rdWFwcC5jb20vJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy8nLFxyXG5cdFx0XHRcdGxvY2F0aW9uT3B0aW9uOiB7XHJcblx0XHRcdFx0XHQnSU4nOiAnSW5kaWEnLFxyXG5cdFx0XHRcdFx0J1VTJzogJ1VuaXRlZCBTdGF0ZXMnLFxyXG5cdFx0XHRcdFx0J1VLJzogJ1VuaXRlZCBLaW5nZG9tJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25maWcge1xyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG4gICAgICAgICAgICAnJHJvdXRlUHJvdmlkZXInXHJcbiAgICAgICAgXTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcigkcm91dGVQcm92aWRlcjogbmcucm91dGUuSVJvdXRlUHJvdmlkZXIpIHtcclxuXHRcdFx0JHJvdXRlUHJvdmlkZXIud2hlbihcIi91c2Vyc2xpc3RcIiwge1xyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAndXNlcnNMaXN0Lmh0bWwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdVc2Vyc0xpc3RDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJ1xyXG5cdFx0XHR9KS53aGVuKCcvYWRkVXNlcicsIHtcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnQWRkVXNlckNvbnRyb2xsZXInLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2N1c3RvbUNvbnRyb2xsZXInLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnYWRkVXNlci5odG1sJ1xyXG5cdFx0XHR9KS5vdGhlcndpc2UoeyByZWRpcmVjdFRvOiAnL3VzZXJzbGlzdCcgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFJvdXRlSGFuZGxlciB7XHJcblx0XHRzdGF0aWMgaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdzaGFyZWRTZXJ2aWNlJ107XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgICRyb290U2NvcGU6IGFueSwgLy9uZy5JUm9vdFNjb3BlU2VydmljZSxcclxuXHRcdFx0JGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHJvb3RTY29wZS5VdGlscyA9IHtcclxuXHRcdFx0XHRrZXlzOiBPYmplY3Qua2V5c1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlU3VjY2VzcycsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xyXG5cdFx0XHRcdHNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3JvdXRlQ2hhbmdlRXJyb3InLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblx0XHRnZXRVc2VycygpOiB2b2lkO1xyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KTogdm9pZDtcclxuXHRcdGFkZFVzZXIoKTogdm9pZDtcclxuXHRcdGFjdGlvbkhhbmRsZXIodHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgdXNlckRhdGE/OiBVc2VyRGF0YUludGVyZmFjZSk6IHZvaWQ7XHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKTogdm9pZDtcclxuXHRcdGVkaXRVc2VyQ2xpY2sodXNlcklkOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogVXNlckRhdGFJbnRlcmZhY2UsIHVzZXJJZDogc3RyaW5nKTogdm9pZDtcclxuXHRcdG9uVXNlclVwZGF0ZVJlc3AocmVzcDogQm9vbGVhbik6IHZvaWQ7XHJcblx0XHRkZWxldGVVc2VyQ2xpY2soa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZGVsZXRlVXNlckNvbmZpcm0oa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0b25Vc2VyRGVsZXRlZChyZXNwOiBCb29sZWFuKTogdm9pZDtcclxuXHRcdGhpZGVFZGl0UG9wdXAoZXZlbnQ/OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KTogdm9pZDtcclxuXHRcdG1hbmFnZVNvcnRPcmRlcihvcmRlckJ5OiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0c2hvd0luZm9TbGlkZXIocGFyYW1zOiBJbmZvU2xpZGVySW50ZXJmYWNlKTogdm9pZDtcclxuXHRcdGhpZGVJbmZvU2xpZGVyKCk6IHZvaWQ7XHJcblx0XHRjcmVhdGV0YWJsZUhlYWRpbmcoKTogdm9pZDtcclxuXHRcdGVkaXRVc2VyRGVmYXVsdCgpOiB2b2lkO1xyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKTogdm9pZDtcclxuXHRcdGluZm9TbGlkZXJEZWZhdWx0KCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgQWRkVXNlckludGVyZmFjZSB7XHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKTogdm9pZDtcclxuXHRcdHZhbGlkYXRlRm9ybSgpOiBCb29sZWFuO1xyXG5cdFx0Z290b1VzZXJMaXN0KCk6IHZvaWQ7XHJcblx0XHRhZGRVc2VyKCk6IHZvaWQ7XHJcblx0XHR1c2VyRGF0YURlZmF1bHQoKTogdm9pZDtcclxuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpOiB2b2lkO1xyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEhlYWRlckludGVyZmFjZSB7XHJcblx0XHRvblJvdXRlQ2hhbmdlU3RhcnQoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdCk6IHZvaWQ7XHJcblx0XHRvblJvdXRlQ2hhbmdlU3VjY2VzcyhldmVudDogRXZlbnQsIHBhcmFtczogYW55KTogdm9pZDtcclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKTogdm9pZDtcclxuXHRcdHNldFVzZXJMaXN0SGVhZGVyKCk6IHZvaWQ7XHJcblx0XHRzZXRBZGRVc2VySGVhZGVyKCk6IHZvaWQ7XHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRnb1RvQWRkVXNlcigpOiB2b2lkO1xyXG5cdFx0YWRkVXNlcigpOiB2b2lkO1xyXG5cdFx0Z29CYWNrKCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVGFibGVIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0bWFuYWdlU29ydE9yZGVyKGV2ZW50OiBFdmVudCwgc29ydE9yZGVyOiBzdHJpbmcpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJGb3JtSW50ZXJmYWNlIHtcclxuXHRcdG9uRm9ybVN1Ym1pdChldmVudDogRXZlbnQpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvSW50ZXJmYWNlIHtcclxuXHRcdHN0YXJ0RWRpdE1vZGUoZXZlbnQ6IEV2ZW50KTogdm9pZDtcclxuXHRcdGNhbmNlbEVkaXRNb2RlKGV2ZW50PzogRXZlbnQsIG5vcmVzZXQ/OiBCb29sZWFuKTogdm9pZDtcclxuXHRcdG9uTW91c2VDbGljayhldmVudDogRXZlbnQpOiB2b2lkO1xyXG5cdFx0YWN0aW9uQ2FsbGJhY2soZXZlbnQ6IEV2ZW50LCB0eXBlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogdm9pZDtcclxuXHRcdHZhbGlkYXRlRm9ybSgpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHQvLyBleHBvcnQgaW50ZXJmYWNlIElNZW51RGlyZWN0aXZlIGV4dGVuZHMgbmcuSVNjb3BlXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1Njb3BlSW50ZXJmYWNlIGV4dGVuZHMgbmcuSVNjb3BlIHtcclxuXHRcdGN1c3RvbUNvbnRyb2xsZXI6IGFueTtcclxuXHRcdHVzZXJEYXRhOiBhbnk7XHJcblx0XHRhY3Rpb25IYW5kbGVyOiBhbnk7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBhcHBDb25maWdJbnRlcmZhY2Uge1xyXG5cdFx0c2VydmVyVXJsOiBzdHJpbmc7XHJcblx0XHR0ZW1wbGF0ZVVybDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckRhdGFJbnRlcmZhY2Uge1xyXG5cdFx0aWRfbWVtYmVyPzogc3RyaW5nO1xyXG5cdFx0Zmlyc3RuYW1lOiBzdHJpbmc7XHJcblx0XHRsYXN0bmFtZTogc3RyaW5nO1xyXG5cdFx0ZW1haWw6IHN0cmluZztcclxuXHRcdHBob25lbnVtYmVyOiBzdHJpbmc7XHJcblx0XHRsb2NhdGlvbjogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSB1c2VyRWRpdERhdGFJbnRlcmZhY2Uge1xyXG5cdFx0Zmlyc3RuYW1lOiBzdHJpbmc7XHJcblx0XHRsYXN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bG9jYXRpb246IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEVkaXRVc2VySW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbjtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHQvL1RPRE86IG5lZWQgdG8gbG9vayBpbnRvIHRoaXNcclxuXHRcdHVzZXJEYXRhOiBhbnk7XHJcblx0XHR1c2VySWQ6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIE1vZGFsRGlhbG9ndWVJbnRlcmZhY2Uge1xyXG5cdFx0aXNWaXNpYmxlOiBCb29sZWFuLFxyXG5cdFx0dGl0bGU6IHN0cmluZyxcclxuXHRcdGJvZHk6IHN0cmluZyxcclxuXHRcdGJ0bjFUeHQ6IHN0cmluZyxcclxuXHRcdGJ0bjJUeHQ/OiBzdHJpbmcsXHJcblx0XHRzaG93QnRuMjogQm9vbGVhbixcclxuXHRcdGJ0bjFDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0YnRuMkNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0XHRjbG9zZUJ0bkNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJbmZvU2xpZGVySW50ZXJmYWNlIHtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHRib2R5OiBzdHJpbmc7XHJcblx0XHRzdGFydFRpbWVyPzogbnVtYmVyO1xyXG5cdFx0ZW5kVGltZXI/OiBudW1iZXI7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBUYWJsZUhlYWRpbmdJbnRlcmZhY2Uge1xyXG5cdFx0Y2xhc3NOYW1lOiBzdHJpbmc7XHJcblx0XHRzb3J0T3JkZXI6IHN0cmluZztcclxuXHRcdHRleHQ6IHN0cmluZztcclxuXHRcdGN1c3RvbUZ1bmM/OiBGdW5jdGlvbjtcclxuXHRcdGN1c3RvbUhUTUw/OiBCb29sZWFuO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSGVhZGVyQnV0dG9uc0ludGVyZmFjZSB7XHJcblx0XHRzaG93QnRuOiBCb29sZWFuO1xyXG5cdFx0Y2xpY2tGdW5jOiBzdHJpbmc7XHJcblx0XHR0ZXh0OiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgQVBJU2VydmljZUludGVyZmFjZSB7XHJcblx0XHRnZXRDYWxsKHBhcmFtczogYW55KTogYW55O1xyXG5cdFx0cG9zdENhbGwocGFyYW1zOiBhbnkpOiBhbnk7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgRG9jRXZlbnRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdGJpbmRNb3VzZUV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XHJcblx0XHRiaW5kS2V5Ym9hcmRFdmVudChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0dW5iaW5kTW91c2VFdmVudCgpOiB2b2lkO1xyXG5cdFx0dW5iaW5kS2V5Ym9hcmRFdmVudCgpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFNoYXJlZFNlcnZpY2VJbnRlcmZhY2Uge1xyXG5cdFx0YnJvYWRjYXN0RXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXRpbHNTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdGdldERhdGFUeXBlKG9iajogT2JqZWN0KTogc3RyaW5nO1xyXG5cdFx0aXNOdWxsVW5kZWZpbmVkKHZhbDogYW55LCB2YWxpZGF0ZVplcm9OYU4/OiBCb29sZWFuKTogQm9vbGVhbjtcclxuXHRcdGNsb25lKG9iajogYW55KTogYW55O1xyXG5cdFx0dmFsaWRhdGVFbWFpbChlbWFpbDogc3RyaW5nKTogQm9vbGVhbjtcclxuXHRcdGdldE9iamVjdEZyb21BcnIoYXJyOiBBcnJheTxhbnk+LCBwcm9wTmFtZTogc3RyaW5nLCBwcm9wVmFsdWU6IGFueSk6IGFueTtcclxuXHRcdGxvZyguLi5tc2c6IGFueVtdKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgSGVhZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIEhlYWRlckludGVyZmFjZSB7XHJcblx0XHRoZWFkaW5nOiBzdHJpbmc7XHJcblx0XHRoZWFkZXJMZWZ0QnRuOiBIZWFkZXJCdXR0b25zSW50ZXJmYWNlO1xyXG5cdFx0aGVhZGVyUmlnaHRCdG46IEhlYWRlckJ1dHRvbnNJbnRlcmZhY2U7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCckd2luZG93JyxcclxuXHRcdFx0JyRsb2cnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdGFydFwiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdWNjZXNzLmJpbmQodGhpcykpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCB0aGlzLm9uUm91dGVDaGFuZ2VFcnJvci5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGluZyA9ICdVc2VyIG1hbmFnZW1lbnQnO1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlU3RhcnQoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdCkge1xyXG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3RhcnQ6ICcsIHBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3VjY2VzczogJywgcGFyYW1zKTtcclxuXHJcblx0XHRcdGlmIChwYXJhbXMubmV4dCAmJiBwYXJhbXMubmV4dC4kJHJvdXRlICYmIHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdHN3aXRjaCAocGFyYW1zLm5leHQuJCRyb3V0ZS5jb250cm9sbGVyKSB7XHJcblx0XHRcdFx0XHRjYXNlICdVc2Vyc0xpc3RDb250cm9sbGVyJzpcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRVc2VyTGlzdEhlYWRlcigpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRjYXNlICdBZGRVc2VyQ29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0QWRkVXNlckhlYWRlcigpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRVc2VyTGlzdEhlYWRlcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZUVycm9yKGV2ZW50LCBwYXJhbXMpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZUVycm9yOiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFVzZXJMaXN0SGVhZGVyKCkge1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb1RvQWRkVXNlcicsXHJcblx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvQmFjaycsXHJcblx0XHRcdFx0J3RleHQnOiAnQmFjaydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGNhbGxGdW5jdGlvbihldmVudDogRXZlbnQsIGNsaWNrRnVuYzogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzW2NsaWNrRnVuY10pKSB7XHJcblx0XHRcdFx0dGhpc1tjbGlja0Z1bmNdKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnb1RvQWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdhZGQtdXNlcicsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHRnb0JhY2soKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLCBhcHAuSGVhZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2Vyc0xpc3RDb250cm9sbGVyIGltcGxlbWVudHMgVXNlcnNMaXN0SW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgdXNlcnNMaXN0OiBBcnJheTxhbnk+O1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgZWRpdFVzZXI6IEVkaXRVc2VySW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBpbmZvU2xpZGVyOiBJbmZvU2xpZGVySW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBzb3J0T3JkZXI6IHN0cmluZztcclxuXHRcdHByaXZhdGUgdGFibGVIZWFkaW5nOiBUYWJsZUhlYWRpbmdJbnRlcmZhY2VbXTtcclxuXHRcdHByaXZhdGUgc2hvd0xvYWRlcjogQm9vbGVhbjtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0J0FQSVNlcnZpY2UnLFxyXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnLFxyXG5cdFx0XHQnQ2hlY2tib3hIYW5kbGVyU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBjaGVja2JveEhhbmRsZXJTZXJ2aWNlOiBDaGVja2JveEhhbmRsZXJTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5hcHBDb25maWcgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQ7XHJcblx0XHRcdHRoaXMuc29ydE9yZGVyID0gJy1pZF9tZW1iZXInO1xyXG5cdFx0XHR0aGlzLnVzZXJzTGlzdCA9IFtdO1xyXG5cdFx0XHR0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXJEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuY3JlYXRldGFibGVIZWFkaW5nKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0VXNlcnMoKSB7XHJcblx0XHRcdHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UuZ2V0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXHJcblx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEsIHN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc1NlcnZlckRhdGEoZGF0YSk7XHJcblx0XHRcdH0pLmVycm9yKChkYXRhLCBzdGF0dXMpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2VycicpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9jZXNzU2VydmVyRGF0YShkYXRhOiBhbnkpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdwcm9jZXNzU2VydmVyRGF0YTogJywgZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLnVzZXJzTGlzdCA9IGRhdGE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QubGVuZ3RoID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBBY3Rpb24gYnV0dG9ucyBoYW5kbGluZ1xyXG5cdFx0Ki9cclxuXHRcdGFjdGlvbkhhbmRsZXIodHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgdXNlckRhdGE/OiBVc2VyRGF0YUludGVyZmFjZSkge1xyXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdlZGl0JzpcclxuXHRcdFx0XHRcdHRoaXMuZWRpdFVzZXJDbGljayh1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2RlbGV0ZSc6XHJcblx0XHRcdFx0XHR0aGlzLmRlbGV0ZVVzZXJDbGljayh1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ3NhdmUnOlxyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGVVc2VyRGF0YSh1c2VyRGF0YSwgdXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRWRpdCB1c2VyIGNvZGUgZmxvd1xyXG5cdFx0Ki9cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd2YWxpZGF0ZUVtYWlsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRWRpdCBkZXRhaWxzJyxcclxuXHRcdFx0XHR1c2VyRGF0YTogdGhpcy51dGlsc1NlcnZpY2UuY2xvbmUodGhpcy51dGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFycih0aGlzLnVzZXJzTGlzdCwgJ2lkX21lbWJlcicsIHVzZXJJZCkpLFxyXG5cdFx0XHRcdHVzZXJJZDogdXNlcklkXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1lZGl0LW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2codGhpcy5lZGl0VXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogVXNlckRhdGFJbnRlcmZhY2UsIHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGE6ICcsIGRhdGEpO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICd1cGRhdGV1c2VyJyxcclxuXHRcdFx0XHQnZGF0YSc6IHtcclxuXHRcdFx0XHRcdCd1c2VySWQnOiB1c2VySWQsXHJcblx0XHRcdFx0XHQndXNlckRhdGEnOiB7XHJcblx0XHRcdFx0XHRcdGVtYWlsOiBkYXRhLmVtYWlsLFxyXG5cdFx0XHRcdFx0XHRmaXJzdG5hbWU6IGRhdGEuZmlyc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRpZF9tZW1iZXI6IGRhdGEuaWRfbWVtYmVyLFxyXG5cdFx0XHRcdFx0XHRsYXN0bmFtZTogZGF0YS5sYXN0bmFtZSxcclxuXHRcdFx0XHRcdFx0bG9jYXRpb246IGRhdGEubG9jYXRpb24sXHJcblx0XHRcdFx0XHRcdHBob25lbnVtYmVyOiBkYXRhLnBob25lbnVtYmVyXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhIHN1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR0aGlzLm9uVXNlclVwZGF0ZVJlc3AocmVzcG9uc2UucmVzcCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Vc2VyVXBkYXRlUmVzcChyZXNwOiBCb29sZWFuKSB7XHJcblx0XHRcdHRoaXMuaGlkZUVkaXRQb3B1cCgpO1xyXG5cclxuXHRcdFx0aWYgKHJlc3AgPT09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dJbmZvU2xpZGVyKHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnVXNlciB1cGRhdGVkJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdVc2VyIGluZm8gaGFzIGJlZW4gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxyXG5cdFx0XHRcdFx0ZW5kVGltZXI6IDQwMDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdFcnJvciEnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgdXBkYXRpbmcgdXNlciBpbmZvcm1hdGlvbi4gUGxlYXNlIHRyeSBhZ2FpbicsXHJcblx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBEZWxldGUgdXNlciBjb2RlZmxvd1xyXG5cdFx0Ki9cclxuXHRcdGRlbGV0ZVVzZXJDbGljayh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdEZWxldGUgdXNlcj8nLFxyXG5cdFx0XHRcdGJvZHk6ICdQbGVhc2UgY29uZmlybSwgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSB1c2VyJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICdDYW5jZWwnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiB0cnVlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5kZWxldGVVc2VyQ29uZmlybS5iaW5kKHRoaXMsIHVzZXJJZCksXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVsZXRlVXNlckNvbmZpcm0odXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdkZWxldGVVc2VyQ29uZmlybSwgdXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2RlbGV0ZXVzZXInLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdCd1c2VySWQnOiB1c2VySWRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMub25Vc2VyRGVsZXRlZChyZXNwb25zZS5yZXNwKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdlcnJvcjogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRvblVzZXJEZWxldGVkKHJlc3A6IEJvb2xlYW4pIHtcclxuXHRcdFx0aWYgKHJlc3AgPT09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLmhpZGVNb2RhbERpYWxvZ3VlKCk7XHJcblx0XHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XHJcblx0XHRcdFx0XHR0aXRsZTogJ1VzZXIgZGVsZXRlZCcsXHJcblx0XHRcdFx0XHRib2R5OiAnVXNlciBoYXMgYmVlbiBkZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcblx0XHRcdFx0XHRzdGFydFRpbWVyOiA1MDAsXHJcblx0XHRcdFx0XHRlbmRUaW1lcjogNDAwMFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRib2R5OiAnV2UgaGF2ZSBlbmNvdW50ZXJlZCBlcnJvciB3aGlsZSBkZWxldGluZyB1c2VyLiBQbGVhc2UgdHJ5IGFnYWluJyxcclxuXHRcdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRGVsZXRlIGFsbCB1c2VycyBjb2RlZmxvd1xyXG5cdFx0Ki9cclxuXHRcdGRlbGV0ZUFsbCgkZXZlbnQpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSBhbGwgdXNlcnM/JyxcclxuXHRcdFx0XHRib2R5OiAnUGxlYXNlIGNvbmZpcm0sIHlvdSB3YW50IHRvIGRlbGV0ZSBhbGwgdXNlcnMnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0c2hvd0J0bjI6IHRydWUsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZUFsbFVzZXJzQ29uZmlybS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywge30pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZUFsbFVzZXJzQ29uZmlybSh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2RlbGV0ZVVzZXJDb25maXJtLCB1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR2YXIgdXNlcklkcyA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMudXNlcnNMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0dXNlcklkcy5wdXNoKHRoaXMudXNlcnNMaXN0W2ldLmlkX21lbWJlcik7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2RlbGV0ZWFsbHVzZXJzJyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHQndXNlcklkcyc6IHVzZXJJZHNcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMub25BbGxVc2Vyc0RlbGV0ZWQocmVzcG9uc2UucmVzcCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25BbGxVc2Vyc0RlbGV0ZWQocmVzcDogQm9vbGVhbikge1xyXG5cdFx0XHRpZiAocmVzcCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUoKTtcclxuXHRcdFx0XHR0aGlzLnNob3dJbmZvU2xpZGVyKHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnQWxsIHVzZXJzIGRlbGV0ZWQnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ0FsbCBVc2VycyBhcmUgZGVsZXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxyXG5cdFx0XHRcdFx0ZW5kVGltZXI6IDQwMDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdFcnJvciEnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgZGVsZXRpbmcgdXNlcnMuIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBHZW5lcmljIGZ1bmN0aW9ucyB0byBoaWRlIHBvcCB1cHNcclxuXHRcdCogdG8gc2hvdyBpbmZvIHNsaWRlciBldGNcclxuXHRcdCovXHJcblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtZWRpdC1tb2RhbCcsIHt9KTtcclxuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1tb2RhbCcsIHt9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihvcmRlckJ5OiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKG9yZGVyQnkgPT09IHRoaXMuc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSAnLScgKyBvcmRlckJ5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc29ydE9yZGVyID0gb3JkZXJCeTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogSW5mb1NsaWRlckludGVyZmFjZSkge1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXIgPSB7XHJcblx0XHRcdFx0dGl0bGU6IHBhcmFtcy50aXRsZSxcclxuXHRcdFx0XHRib2R5OiBwYXJhbXMuYm9keVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctaW5mby1zbGlkZXInLCB7fSk7XHJcblx0XHRcdH0sIHBhcmFtcy5zdGFydFRpbWVyKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuaGlkZUluZm9TbGlkZXIoKTtcclxuXHRcdFx0fSwgcGFyYW1zLmVuZFRpbWVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlSW5mb1NsaWRlcigpIHtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLWluZm8tc2xpZGVyJywge30pO1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXJEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRnVuY3Rpb25zIHRvIHNldCBkZWFmdWx0IHZhbHVlcyBmb3IgZGlmZmVyZW50IGNvbmZpZ3NcclxuXHRcdCovXHJcblx0XHRjcmVhdGV0YWJsZUhlYWRpbmcoKSB7XHJcblx0XHRcdHRoaXMudGFibGVIZWFkaW5nID0gW3tcclxuXHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcclxuXHRcdFx0XHQnc29ydE9yZGVyJzogJ2lkX21lbWJlcicsXHJcblx0XHRcdFx0J3RleHQnOiAnUy5ObydcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2ZpcnN0bmFtZScsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdGaXJzdCBuYW1lJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdsYXN0bmFtZScsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdMYXN0IG5hbWUnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMycsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2VtYWlsJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0VtYWlsJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdwaG9uZW51bWJlcicsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdQaG9uZSBOdW1iZXInXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMScsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xvY2F0aW9uJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0xvY2F0aW9uJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvKiwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMSB0ZXh0LXJpZ2h0JyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1jaGVja2VkPVwiY3VzdG9tQ29udHJvbGxlci5jaGVja2JveEhhbmRsZXJTZXJ2aWNlLmNoZWNrYm94Q291bnRlclwiIC8+JyxcclxuXHRcdFx0XHRcdCdjdXN0b21GdW5jJzogdGhpcy5jaGVja2JveEhhbmRsZXJTZXJ2aWNlLmNoZWNrQWxsLmJpbmQodGhpcy5jaGVja2JveEhhbmRsZXJTZXJ2aWNlKSxcclxuXHRcdFx0XHRcdCdjdXN0b21IVE1MJzogdHJ1ZVxyXG5cdFx0XHRcdH0qL1xyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVkaXRVc2VyRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5lZGl0VXNlciA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHR1c2VyRGF0YToge30sXHJcblx0XHRcdFx0dXNlcklkOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0Ym9keTogJycsXHJcblx0XHRcdFx0YnRuMVR4dDogJycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyID0ge1xyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJzTGlzdENvbnRyb2xsZXInLCBhcHAuVXNlcnNMaXN0Q29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBZGRVc2VyQ29udHJvbGxlciBpbXBsZW1lbnRzIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnQVBJU2VydmljZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRzY29wZS4kb24oJ2FkZC11c2VyJywgZnVuY3Rpb24oZXZlbnQsIGFyZ3MpIHtcclxuXHRcdFx0XHR0aGlzLmFkZFVzZXIoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudXNlckRhdGFEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRoaXMudXRpbHNTZXJ2aWNlLnZhbGlkYXRlRW1haWwodmFsKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUZvcm0oKSB7XHJcblx0XHRcdC8vIG1ha2UgbnVsbCB1bmRlZmluZWQgY2hlY2tzIGhlcmVcclxuXHRcdFx0aWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmZpcnN0bmFtZSkgfHwgdGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEubGFzdG5hbWUpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tbmFtZScpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5lbWFpbCkpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1lbWFpbCcpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5waG9uZW51bWJlcikpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1waG9uZW51bWJlcicpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5sb2NhdGlvbikpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1sb2NhdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnb3RvVXNlckxpc3QoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdhZGQgdXNlcjogJywgdGhpcy51c2VyRGF0YSk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy52YWxpZGF0ZUZvcm0oKSkge1xyXG5cdFx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2FkZHVzZXInLFxyXG5cdFx0XHRcdFx0ZGF0YTogdGhpcy51c2VyRGF0YSxcclxuXHRcdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3N1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcCAmJiByZXNwb25zZS5yZXNwID09PSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2VtYWlsSW5Vc2UnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZ290b1VzZXJMaXN0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHVzZXJEYXRhRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy51c2VyRGF0YSA9IHtcclxuXHRcdFx0XHQnZmlyc3RuYW1lJzogJycsXHJcblx0XHRcdFx0J2xhc3RuYW1lJzogJycsXHJcblx0XHRcdFx0J2VtYWlsJzogJycsXHJcblx0XHRcdFx0J3Bob25lbnVtYmVyJzogJycsXHJcblx0XHRcdFx0J2xvY2F0aW9uJzogJ0lOJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKSB7XHJcblx0XHRcdGxldCB0aXRsZTogc3RyaW5nID0gJycsXHJcblx0XHRcdFx0Ym9keTogc3RyaW5nID0gJyc7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGVycm9yVHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2VtYWlsSW5Vc2UnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdFbWFpbCBJRCBpcyBhbHJlYWR5IGluIHVzZSwgcGxlYXNlIGVudGVyIGEgdW5pcXVlIEVtYWlsIGFkZHJlc3MnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLW5hbWUnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgRmlyc3QgbmFtZS9MYXN0IG5hbWUnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLWVtYWlsJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHRoZSBlbWFpbCBhZGRyZXNzJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1waG9uZW51bWJlcic6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCBwaG9uZSBudW1iZXInO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLWxvY2F0aW9uJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBzZWxlY3QgbG9jYXRpb24nO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogdGl0bGUsXHJcblx0XHRcdFx0Ym9keTogYm9keSxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdBZGRVc2VyQ29udHJvbGxlcicsIGFwcC5BZGRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBFZGl0VXNlckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0VkaXRVc2VyQ29udHJvbGxlcicsIGFwcC5FZGl0VXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJywgYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJGb3JtQ29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJGb3JtSW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgZm9ybVN1Ym1pdDogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgdXNlckRhdGFJZDogc3RyaW5nO1xyXG5cdFx0cHJpdmF0ZSBsb2NhdGlvbk9wdGlvbjogT2JqZWN0O1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0XHR0aGlzLmxvY2F0aW9uT3B0aW9uID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LmxvY2F0aW9uT3B0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uRm9ybVN1Ym1pdChldmVudDogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmZvcm1TdWJtaXQoeyBkYXRhOiB0aGlzLnVzZXJEYXRhLCB1c2VyRGF0YUlkOiB0aGlzLnVzZXJEYXRhSWQgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJGb3JtQ29udHJvbGxlcicsIGFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJDb250cm9sbGVyIGltcGxlbWVudHMgVGFibGVIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSBzb3J0RnVuYzogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIGRlZmF1bHRDbGFzczogc3RyaW5nO1xyXG5cdFx0cHJpdmF0ZSBsYXN0U29ydE9yZGVyOiBzdHJpbmc7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJGVsZW1lbnQnLFxyXG5cdFx0XHQnJHNjZScsXHJcblx0XHRcdCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkc2NlOiBuZy5JU0NFU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBjaGVja2JveEhhbmRsZXJTZXJ2aWNlOiBDaGVja2JveEhhbmRsZXJTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5kZWZhdWx0Q2xhc3MgPSAnYXJyb3cgYXJyb3ctZG93bic7XHJcblx0XHRcdHRoaXMubGFzdFNvcnRPcmRlciA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy11cCcsXHJcblx0XHRcdFx0dGFyZ2V0ID0gPEhUTUxFbGVtZW50PiBldmVudC50YXJnZXQ7XHJcblxyXG5cdFx0XHRpZiAodGhpcy4kZWxlbWVudC5maW5kKHRhcmdldCkuZmluZCgnc3BhbicpLmhhc0NsYXNzKCdhcnJvdy11cCcpKSB7XHJcblx0XHRcdFx0bmV3Q2xhc3MgPSAnYXJyb3cgYXJyb3ctZG93bic7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLmxhc3RTb3J0T3JkZXIgIT09IHNvcnRPcmRlcikge1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2hlYWRpbmdfJyArIHRoaXMubGFzdFNvcnRPcmRlcikuZmluZCgnc3BhbicpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3ModGhpcy5kZWZhdWx0Q2xhc3MpO1xyXG5cdFx0XHRcdHRoaXMubGFzdFNvcnRPcmRlciA9IHNvcnRPcmRlcjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQodGFyZ2V0KS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhuZXdDbGFzcyk7XHJcblxyXG5cdFx0XHR0aGlzLnNvcnRGdW5jKHtcclxuXHRcdFx0XHQnb3JkZXJCeSc6IHNvcnRPcmRlclxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdC8qdG9UcnVzdGVkSFRNTChodG1sOiBzdHJpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuJHNjZS50cnVzdEFzSHRtbChodG1sKTtcclxuXHRcdH0qL1xyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdUYWJsZUhlYWRlckNvbnRyb2xsZXInLCBhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdJbmZvU2xpZGVyQ29udHJvbGxlcicsIGFwcC5JbmZvU2xpZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VySW5mb0NvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2VySW5mb0ludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHJlYWRPbmx5TW9kZTogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgYWN0aW9uSGFuZGxlcjogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgdXNlckVkaXREYXRhOiB1c2VyRWRpdERhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGNoZWNrYm94U2VsZWN0ZWQ6IEJvb2xlYW47XHJcblx0XHRwcml2YXRlIGxvY2F0aW9uT3B0aW9uOiBPYmplY3Q7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyR0aW1lb3V0JyxcclxuXHRcdFx0JyRlbGVtZW50JyxcclxuXHRcdFx0J0RvY0V2ZW50U2VydmljZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxyXG5cdFx0XHQnQ2hlY2tib3hIYW5kbGVyU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBkb2NFdmVudFNlcnZpY2U6IERvY0V2ZW50U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBjaGVja2JveEhhbmRsZXJTZXJ2aWNlOiBDaGVja2JveEhhbmRsZXJTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94U2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2NhdGlvbk9wdGlvbiA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC5sb2NhdGlvbk9wdGlvbjtcclxuXHJcblx0XHRcdHRoaXMudXNlckVkaXREYXRhRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLiRzY29wZS4kb24oJ2NoZWNrLWFsbCcsIChldmVudCwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLm9uQ2hlY2tib3hDbGlja2VkKG51bGwsIHBhcmFtcyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXJ0RWRpdE1vZGUoZXZlbnQ6IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLnJlYWRPbmx5TW9kZSkge1xyXG5cdFx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gZmFsc2U7XHJcblx0XHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UuYmluZEtleWJvYXJkRXZlbnQodGhpcy5jYW5jZWxFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuXHRcdFx0XHR0aGlzLmRvY0V2ZW50U2VydmljZS5iaW5kTW91c2VFdmVudCh0aGlzLm9uTW91c2VDbGljay5iaW5kKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGNhbmNlbEVkaXRNb2RlKGV2ZW50PzogRXZlbnQsIG5vcmVzZXQ/OiBCb29sZWFuKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UudW5iaW5kS2V5Ym9hcmRFdmVudCgpO1xyXG5cdFx0XHR0aGlzLmRvY0V2ZW50U2VydmljZS51bmJpbmRNb3VzZUV2ZW50KCk7XHJcblxyXG5cdFx0XHR0aGlzLnJlYWRPbmx5TW9kZSA9IHRydWU7XHJcblx0XHRcdC8qaWYgKHRoaXMuJHNjb3BlLiRyb290LiQkcGhhc2UgIT0gJyRhcHBseScgJiYgdGhpcy4kc2NvcGUuJHJvb3QuJCRwaGFzZSAhPSAnJGRpZ2VzdCcpIHtcclxuXHRcdFx0XHR0aGlzLiRzY29wZS4kYXBwbHkoKTtcclxuXHRcdFx0fSovXHJcblxyXG5cdFx0XHRpZiAoIW5vcmVzZXQpIHtcclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNmaXJzdG5hbWUnKS52YWwodGhpcy51c2VyRGF0YS5maXJzdG5hbWUpO1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2xhc3RuYW1lJykudmFsKHRoaXMudXNlckRhdGEubGFzdG5hbWUpO1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2xvY2F0aW9uJykudmFsKHRoaXMudXNlckRhdGEubG9jYXRpb24pO1xyXG5cclxuXHRcdFx0XHR0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuJHNjb3BlLiRhcHBseSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Nb3VzZUNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRsZXQgdGFyZ2V0ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuXHRcdFx0bGV0IHRhZ05hbWUgPSB0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdFx0aWYgKCh0YWdOYW1lICE9PSAnaW5wdXQnICYmIHRhZ05hbWUgIT09ICdzZWxlY3QnKSB8fCAodGhpcy4kZWxlbWVudC5maW5kKHRhcmdldCkubGVuZ3RoID09PSAwKSkge1xyXG5cdFx0XHRcdHRoaXMuY2FuY2VsRWRpdE1vZGUoZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YWN0aW9uQ2FsbGJhY2soZXZlbnQ6IEV2ZW50LCB0eXBlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlID09PSAnc2F2ZScpIHtcclxuXHRcdFx0XHRpZiAodGhpcy52YWxpZGF0ZUZvcm0oKSkge1xyXG5cdFx0XHRcdFx0dmFyIHVzZXJEYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRpZF9tZW1iZXI6IHRoaXMudXNlckRhdGEuaWRfbWVtYmVyLFxyXG5cdFx0XHRcdFx0XHRmaXJzdG5hbWU6IHRoaXMudXNlckVkaXREYXRhLmZpcnN0bmFtZSxcclxuXHRcdFx0XHRcdFx0bGFzdG5hbWU6IHRoaXMudXNlckVkaXREYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRlbWFpbDogdGhpcy51c2VyRGF0YS5lbWFpbCxcclxuXHRcdFx0XHRcdFx0cGhvbmVudW1iZXI6IHRoaXMudXNlckRhdGEucGhvbmVudW1iZXIsXHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiB0aGlzLnVzZXJFZGl0RGF0YS5sb2NhdGlvblxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHRoaXMuY2FuY2VsRWRpdE1vZGUobnVsbCwgdHJ1ZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMudXNlckVkaXREYXRhRGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmFjdGlvbkhhbmRsZXIoeyB0eXBlOiB0eXBlLCB1c2VySWQ6IHVzZXJJZCwgdXNlckRhdGE6IHVzZXJEYXRhIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRm9ybSgpIHtcclxuXHRcdFx0bGV0IGZpcnN0bmFtZSA9IHRoaXMudXNlckVkaXREYXRhLmZpcnN0bmFtZSxcclxuXHRcdFx0XHRsYXN0bmFtZSA9IHRoaXMudXNlckVkaXREYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdGxvY2F0aW9uID0gdGhpcy51c2VyRWRpdERhdGEubG9jYXRpb247XHJcblxyXG5cdFx0XHRpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKGZpcnN0bmFtZSkgfHxcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQobGFzdG5hbWUpIHx8XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKGxvY2F0aW9uKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdHVzZXJFZGl0RGF0YURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMudXNlckVkaXREYXRhID0ge1xyXG5cdFx0XHRcdGZpcnN0bmFtZTogdGhpcy51c2VyRGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0bGFzdG5hbWU6IHRoaXMudXNlckRhdGEubGFzdG5hbWUsXHJcblx0XHRcdFx0bG9jYXRpb246IHRoaXMudXNlckRhdGEubG9jYXRpb25cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRvbkNoZWNrYm94Q2xpY2tlZChldmVudD86IEV2ZW50LCBwYXJhbXM/OiBhbnkpIHtcclxuXHRcdFx0bGV0IGNoYW5nZWQgPSBmYWxzZTtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoKHBhcmFtcyAmJiBwYXJhbXMuc3RhdGUgIT09IHRoaXMuY2hlY2tib3hTZWxlY3RlZCkpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94U2VsZWN0ZWQgPSBwYXJhbXMuc3RhdGU7XHJcblx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGFuZ2VkKSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveEhhbmRsZXJTZXJ2aWNlLm1hbmFnZUNoZWNrYm94Q291bnRlcih0aGlzLmNoZWNrYm94U2VsZWN0ZWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJJbmZvQ29udHJvbGxlcicsIGFwcC5Vc2VySW5mb0NvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgU3Bpbm5lckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1NwaW5uZXJDb250cm9sbGVyJywgYXBwLlNwaW5uZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0VXNlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdHVzZXJJZDogJz0nLFxyXG5cdFx0XHRoaWRlUG9wdXA6ICcmJyxcclxuXHRcdFx0dXBkYXRlRGF0YTogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnRWRpdFVzZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctZWRpdC1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjZWRpdFVzZXJNb2RhbCcpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1lZGl0LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNlZGl0VXNlck1vZGFsJykpLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuKCAoKSA9PiBuZXcgRWRpdFVzZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdlZGl0VXNlcicsIGFwcC5FZGl0VXNlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdGlzVmlzaWJsZTogJz0nLFxyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRib2R5OiAnPScsXHJcblx0XHRcdGJ0bjFUeHQ6ICc9JyxcclxuXHRcdFx0YnRuMlR4dDogJz0nLFxyXG5cdFx0XHRzaG93QnRuMjogJz0nLFxyXG5cdFx0XHRidG4xQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0YnRuMkNhbGxiYWNrOiAnJicsXHJcblx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6ICcmJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRsaW5rKHNjb3BlOm5nLklTY29wZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctbW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI21vZGFsRGlhbG9ndWUnKSkubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtbW9kYWwnLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNtb2RhbERpYWxvZ3VlJykpLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnbW9kYWxEaWFsb2d1ZScsIGFwcC5Nb2RhbERpYWxvZ3VlRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVXNlckZvcm1EaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdHVzZXJJZDogJz0nLFxyXG5cdFx0XHRlZGl0TW9kZTogJz0nLFxyXG5cdFx0XHR2YWxpZGF0ZUVtYWlsOiAnJicsXHJcblx0XHRcdGZvcm1TdWJtaXQ6ICcmJyxcclxuXHRcdFx0ZGlzY2FyZEZvcm06ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1VzZXJGb3JtQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IFVzZXJGb3JtRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59IFxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgndXNlckZvcm0nLCBhcHAuVXNlckZvcm1EaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGFibGVIZWFkaW5nOiAnPScsXHJcblx0XHRcdHNvcnRGdW5jOiAnJicsXHJcblx0XHRcdGNoZWNrQWxsOiAnJicsXHJcblx0XHRcdGRlbGV0ZUFsbDogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVGFibGVIZWFkZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkY29tcGlsZTogbmcuSUNvbXBpbGVTZXJ2aWNlLCBwcml2YXRlICRwYXJzZTogbmcuSVBhcnNlU2VydmljZSkgeyB9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHR2YXIgZGlyZWN0aXZlID0gKCRjb21waWxlOiBuZy5JQ29tcGlsZVNlcnZpY2UsICRwYXJzZTogbmcuSVBhcnNlU2VydmljZSkgPT4gbmV3IFRhYmxlSGVhZGVyRGlyZWN0aXZlKCRjb21waWxlLCAkcGFyc2UpO1xyXG5cdFx0XHRkaXJlY3RpdmUuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJHBhcnNlJ107XHJcblx0XHRcdHJldHVybiBkaXJlY3RpdmU7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3RhYmxlSGVhZGVyJywgYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW5mb1NsaWRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0Ly8gcHJpdmF0ZSB0aW1lcjogbnVtYmVyO1xyXG5cclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdGJvZHk6ICc9J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnSW5mb1NsaWRlckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctaW5mby1zbGlkZXInLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI2luZm9TbGlkZXInKSkubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtaW5mby1zbGlkZXInLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI2luZm9TbGlkZXInKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBJbmZvU2xpZGVyRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdpbmZvU2xpZGVyJywgYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJJbmZvRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHQvLyBwcml2YXRlIHRpbWVyOiBudW1iZXI7XHJcblxyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG5cdFx0cHVibGljIHNjb3BlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHRhY3Rpb25IYW5kbGVyOiAnJidcclxuXHRcdH07XHJcblx0XHRwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVXNlckluZm9Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRsaW5rKHNjb3BlOiBVc2VySW5mb1Njb3BlSW50ZXJmYWNlLCBlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlKSB7IH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IFVzZXJJbmZvRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgndXNlckluZm8nLCBhcHAuVXNlckluZm9EaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTcGlubmVyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBzaG93TG9hZGVyOiAnPSdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3NwaW5uZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnU3Bpbm5lckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBTcGlubmVyRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59IFxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnc3Bpbm5lcicsIGFwcC5TcGlubmVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBUElTZXJ2aWNlIGltcGxlbWVudHMgQVBJU2VydmljZUludGVyZmFjZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHRcdGh0dHBTZXJ2aWNlOiBuZy5JSHR0cFNlcnZpY2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKSB7XHJcblx0XHRcdHRoaXMuaHR0cFNlcnZpY2UgPSAkaHR0cDtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDYWxsKHBhcmFtczogYW55KSB7XHJcblx0XHRcdGxldCBjb25maWcgPSBwYXJhbXMuY29uZmlnIHx8IHt9O1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQocGFyYW1zLnVybCwgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRwb3N0Q2FsbChwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KHBhcmFtcy51cmwsIHBhcmFtcy5kYXRhLCB7XHJcblx0XHRcdFx0aGVhZGVyczogcGFyYW1zLmhlYWRlcnNcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0FQSVNlcnZpY2UnLCBhcHAuQVBJU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSBpbXBsZW1lbnRzIFNoYXJlZFNlcnZpY2VJbnRlcmZhY2Uge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuICAgICAgICBicm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChldmVudE5hbWUsIGRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnU2hhcmVkU2VydmljZScsIGFwcC5TaGFyZWRTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVdGlsc1NlcnZpY2UgaW1wbGVtZW50cyBVdGlsc1NlcnZpY2VJbnRlcmZhY2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgICAgIGdldERhdGFUeXBlKG9iajogYW55KSB7XHJcblx0XHRcdHJldHVybiAoe30pLnRvU3RyaW5nLmNhbGwob2JqKS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbFVuZGVmaW5lZCh2YWw6IGFueSwgdmFsaWRhdGVaZXJvTmFOPzogQm9vbGVhbikge1xyXG5cdFx0XHRsZXQgaXNOdWxsOiBCb29sZWFuID0gZmFsc2UsXHJcblx0XHRcdFx0dHlwZSA9IHRoaXMuZ2V0RGF0YVR5cGUodmFsKTtcclxuXHJcblx0XHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ1tvYmplY3QgYXJyYXldJzpcclxuXHRcdFx0XHRcdGlmICh2YWwubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnW29iamVjdCBvYmplY3RdJzpcclxuXHRcdFx0XHRcdGlmIChPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mICh2YWwpID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IFwiXCIgfHwgdmFsID09PSBcIm51bGxcIiB8fCB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodmFsaWRhdGVaZXJvTmFOICYmICh2YWwgPT09IDAgfHwgaXNOYU4odmFsKSkpIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNOdWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsb25lKG9iajogYW55KSB7XHJcblx0XHRcdGlmIChvYmogPT0gbnVsbCB8fCB0eXBlb2YgKG9iaikgIT0gJ29iamVjdCcpXHJcblx0XHRcdFx0cmV0dXJuIG9iajtcclxuXHJcblx0XHRcdHZhciB0ZW1wID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xyXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKVxyXG5cdFx0XHRcdHRlbXBba2V5XSA9IHRoaXMuY2xvbmUob2JqW2tleV0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRlbXA7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbChlbWFpbDogc3RyaW5nKTogQm9vbGVhbiB7XHJcblx0XHRcdHZhciBlbWFpbFJlZ2V4cCA9IC9eW2EtejAtOSEjJCUmJyorXFwvPT9eX2B7fH1+Li1dK0BbYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPyhcXC5bYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPykqJC9pO1xyXG5cclxuXHRcdFx0aWYgKGVtYWlsICYmIGVtYWlsUmVnZXhwLnRlc3QoZW1haWwpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0T2JqZWN0RnJvbUFycihhcnI6IEFycmF5PGFueT4sIHByb3BOYW1lOiBzdHJpbmcsIHByb3BWYWx1ZTogYW55KSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGFycltpXVtwcm9wTmFtZV0gPT0gcHJvcFZhbHVlKSByZXR1cm4gYXJyW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bG9nKC4uLm1zZzogYW55W10pIHtcclxuXHRcdFx0Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdVdGlsc1NlcnZpY2UnLCBhcHAuVXRpbHNTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgZXhwb3J0IGNsYXNzIERvY0V2ZW50U2VydmljZSBpbXBsZW1lbnRzIERvY0V2ZW50U2VydmljZUludGVyZmFjZSB7XHJcbiAgICBwcml2YXRlIGRvY1JlZjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG4gICAgICAnJGRvY3VtZW50J1xyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRkb2N1bWVudDogbmcuSURvY3VtZW50U2VydmljZSkgeyB9XHJcblxyXG4gICAgYmluZE1vdXNlRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEtleWJvYXJkRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9uKCdrZXlkb3duIGtleXByZXNzJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xyXG4gICAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kTW91c2VFdmVudCgpIHtcclxuICAgICAgdGhpcy4kZG9jdW1lbnQub2ZmKCdjbGljaycpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEtleWJvYXJkRXZlbnQoKSB7XHJcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9mZigna2V5ZG93biBrZXlwcmVzcycpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdEb2NFdmVudFNlcnZpY2UnLCBhcHAuRG9jRXZlbnRTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENoZWNrYm94SGFuZGxlclNlcnZpY2Uge1xyXG5cdFx0cHVibGljIGNoZWNrYm94Q291bnRlcjogbnVtYmVyO1xyXG5cdFx0cHJpdmF0ZSBzZWxlY3RlZEFsbDogQm9vbGVhbjtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXIgPSAwO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQWxsID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2hlY2tBbGwoKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRBbGwgPSAhdGhpcy5zZWxlY3RlZEFsbDtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdjaGVjay1hbGwnLCB7IHN0YXRlOiB0aGlzLnNlbGVjdGVkQWxsIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZUNoZWNrYm94Q291bnRlcihpc0NoZWNrZWQ6IEJvb2xlYW4pIHtcclxuXHRcdFx0aWYoaXNDaGVja2VkKSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXIrKztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94Q291bnRlci0tO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5jaGVja2JveENvdW50ZXIgPCAwKSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXIgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0NoZWNrYm94SGFuZGxlclNlcnZpY2UnLCBhcHAuQ2hlY2tib3hIYW5kbGVyU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2pxdWVyeS9qcXVlcnkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXIuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLXJvdXRlLmQudHNcIiAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXBwLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9tb2R1bGVzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25zdGFudHMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbmZpZy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvcm91dGUtaGFuZGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9hZGQtdXNlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvaGVhZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItZm9ybS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1pbmZvLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGlyZWN0aXZlcy91c2VyLWluZm8uaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2FwcC1jb25maWcuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2VkaXQtdXNlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9tb2RhbC1kaWFsb2d1ZS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS90YWJsZS1oZWFkaW5nLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2hlYWRlci1idXR0b25zLmludGVyZmFjZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvYXBpLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9kb2MtZXZlbnQuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3NlcnZpY2VzL3NoYXJlZC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvdXRpbHMuaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvYWRkLXVzZXIuY29udHJvbGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3NwaW5uZXIuY29udHJvbGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy91c2VyLWluZm8uZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3NwaW5uZXIuZGlyZWN0aXZlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvYXBpLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9kb2MtZXZlbnQuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvY2hlY2tib3gtaGFuZGxlci5zZXJ2aWNlLnRzJyAvPlxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0ZXhwb3J0IHZhciBmb3JtQXBwID0gYW5ndWxhci5tb2R1bGUoJ2Zvcm1BcHAnLCBbJ25nUm91dGUnLCAnY29udHJvbGxlcnMnLCAnc2VydmljZXMnLCAnZGlyZWN0aXZlcyddKTtcclxuXHJcblx0Zm9ybUFwcC5jb25maWcoQ29uZmlnKTtcclxuICAgIGZvcm1BcHAucnVuKFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnU2hhcmVkU2VydmljZScsIFJvdXRlSGFuZGxlcl0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUZXN0Q29udHJvbGxlciB7XHJcblx0XHRwcml2YXRlIHZhbGlkRW1haWw6IEJvb2xlYW47XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRoaXMudXRpbHNTZXJ2aWNlLnZhbGlkYXRlRW1haWwodmFsKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVGVzdENvbnRyb2xsZXInLCBhcHAuVGVzdENvbnRyb2xsZXIpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
