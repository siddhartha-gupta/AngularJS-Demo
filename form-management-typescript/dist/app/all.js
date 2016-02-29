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
        UsersListController.prototype.actionHandler = function (type, userId, userData) {
            console.log('actionHandler: ', type, ' : ', userId);
            console.log(userData);
            switch (type) {
                case 'edit':
                    this.editUserClick(userId);
                    break;
                case 'delete':
                    this.deleteUserClick(userId);
                    break;
                case 'save':
                    this.saveUserClick(userId, userData);
                    break;
            }
        };
        UsersListController.prototype.saveUserClick = function (userId, userData) {
            this.updateUserData(userData, userId);
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
                _this.hideEditPopup();
                if (response.resp === true) {
                    _this.onUserUpdated();
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
        UsersListController.prototype.onUserUpdated = function () {
            this.showInfoSlider({
                title: 'User updated',
                body: 'User info has been updated successfully',
                startTimer: 500,
                endTimer: 4000
            });
            this.getUsers();
        };
        UsersListController.prototype.hideEditPopup = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-edit-modal', { id: 'editUserModal' });
            this.editUserDefault();
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
                if (response.resp === true) {
                    _this.onUserDeleted();
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
        UsersListController.prototype.onUserDeleted = function () {
            this.hideModalDialogue();
            this.showInfoSlider({
                title: 'User deleted',
                body: 'User has been deleted successfully',
                startTimer: 500,
                endTimer: 4000
            });
            this.getUsers();
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
        UserFormController.prototype.onFormSubmit = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            console.log('onFormSubmit');
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
            console.log('startEditMode');
            if (this.readOnlyMode) {
                this.readOnlyMode = false;
            }
        };
        UserInfoController.prototype.cancelEditMode = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            console.log('cancelEditMode');
            this.readOnlyMode = true;
        };
        UserInfoController.prototype.actionCallback = function (event, type, userId) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (type === 'save') {
                var userData = {
                    id_member: angular.element('#id_member').val(),
                    firstname: angular.element('#firstname').val(),
                    lastname: angular.element('#lastname').val(),
                    email: angular.element('#email').val(),
                    phonenumber: angular.element('#phonenumber').val(),
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
            /*return this.httpService({
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            url: params.url,
                            method: 'POST',
                            data: $.param(params.data)
                     });*/
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
/// <reference path='ts/interfaces/info-slider.interface.ts' />
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9hcHAtY29uZmlnLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvaGVhZGVyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZWRpdC11c2VyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvbW9kYWwtZGlhbG9ndWUuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMiLCJ0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzIiwidHMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS50cyIsInRzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzIiwiX2FsbC50cyIsImFwcC50cyJdLCJuYW1lcyI6WyJhcHAiLCJhcHAuQ29uc3RhbnRzIiwiYXBwLkNvbnN0YW50cy5jb25zdHJ1Y3RvciIsImFwcC5Db25zdGFudHMuRGVmYXVsdCIsImFwcC5Db25maWciLCJhcHAuQ29uZmlnLmNvbnN0cnVjdG9yIiwiYXBwLlJvdXRlSGFuZGxlciIsImFwcC5Sb3V0ZUhhbmRsZXIuY29uc3RydWN0b3IiLCJhcHAuSGVhZGVyQ29udHJvbGxlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZVN0YXJ0IiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZVN1Y2Nlc3MiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlRXJyb3IiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5zZXRVc2VyTGlzdEhlYWRlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLnNldEFkZFVzZXJIZWFkZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5jYWxsRnVuY3Rpb24iLCJhcHAuSGVhZGVyQ29udHJvbGxlci5nb1RvQWRkVXNlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmFkZFVzZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5nb0JhY2siLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuYWN0aW9uSGFuZGxlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnNhdmVVc2VyQ2xpY2siLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5nZXRVc2VycyIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnByb2Nlc3NTZXJ2ZXJEYXRhIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnZhbGlkYXRlRW1haWwiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5lZGl0VXNlckNsaWNrIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIudXBkYXRlVXNlckRhdGEiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5vblVzZXJVcGRhdGVkIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuaGlkZUVkaXRQb3B1cCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmRlbGV0ZVVzZXJDbGljayIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmRlbGV0ZVVzZXJDb25maXJtIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIub25Vc2VyRGVsZXRlZCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmhpZGVNb2RhbERpYWxvZ3VlIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIubWFuYWdlU29ydE9yZGVyIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuc2hvd0luZm9TbGlkZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5oaWRlSW5mb1NsaWRlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmNyZWF0ZXRhYmxlSGVhZGluZyIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmVkaXRVc2VyRGVmYXVsdCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLm1vZGFsRGlhbG9ndWVEZWZhdWx0IiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuaW5mb1NsaWRlckRlZmF1bHQiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIudmFsaWRhdGVFbWFpbCIsImFwcC5BZGRVc2VyQ29udHJvbGxlci52YWxpZGF0ZUZvcm0iLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuZ290b1VzZXJMaXN0IiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmFkZFVzZXIiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIudXNlckRhdGFEZWZhdWx0IiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLnNob3dNb2RhbERpYWxvZ3VlIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmhpZGVNb2RhbERpYWxvZ3VlIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLm1vZGFsRGlhbG9ndWVEZWZhdWx0IiwiYXBwLkVkaXRVc2VyQ29udHJvbGxlciIsImFwcC5FZGl0VXNlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIiLCJhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVXNlckZvcm1Db250cm9sbGVyIiwiYXBwLlVzZXJGb3JtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIub25Gb3JtU3VibWl0IiwiYXBwLlRhYmxlSGVhZGVyQ29udHJvbGxlciIsImFwcC5UYWJsZUhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyLm1hbmFnZVNvcnRPcmRlciIsImFwcC5JbmZvU2xpZGVyQ29udHJvbGxlciIsImFwcC5JbmZvU2xpZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2VySW5mb0NvbnRyb2xsZXIiLCJhcHAuVXNlckluZm9Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJJbmZvQ29udHJvbGxlci5zdGFydEVkaXRNb2RlIiwiYXBwLlVzZXJJbmZvQ29udHJvbGxlci5jYW5jZWxFZGl0TW9kZSIsImFwcC5Vc2VySW5mb0NvbnRyb2xsZXIuYWN0aW9uQ2FsbGJhY2siLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUubGluayIsImFwcC5FZGl0VXNlckRpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUiLCJhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5Nb2RhbERpYWxvZ3VlRGlyZWN0aXZlLmxpbmsiLCJhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLlVzZXJGb3JtRGlyZWN0aXZlIiwiYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuVGFibGVIZWFkZXJEaXJlY3RpdmUiLCJhcHAuVGFibGVIZWFkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuVGFibGVIZWFkZXJEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlIiwiYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuSW5mb1NsaWRlckRpcmVjdGl2ZS5saW5rIiwiYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5Vc2VySW5mb0RpcmVjdGl2ZSIsImFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5saW5rIiwiYXBwLlVzZXJJbmZvRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuQVBJU2VydmljZSIsImFwcC5BUElTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLkFQSVNlcnZpY2UuZ2V0Q2FsbCIsImFwcC5BUElTZXJ2aWNlLnBvc3RDYWxsIiwiYXBwLlNoYXJlZFNlcnZpY2UiLCJhcHAuU2hhcmVkU2VydmljZS5jb25zdHJ1Y3RvciIsImFwcC5VdGlsc1NlcnZpY2UiLCJhcHAuVXRpbHNTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLlV0aWxzU2VydmljZS5nZXREYXRhVHlwZSIsImFwcC5VdGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkIiwiYXBwLlV0aWxzU2VydmljZS5jbG9uZSIsImFwcC5VdGlsc1NlcnZpY2UudmFsaWRhdGVFbWFpbCIsImFwcC5VdGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFyciIsImFwcC5VdGlsc1NlcnZpY2UubG9nIl0sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7QUFFbkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDOUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7OztBQ0psRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBV1Q7QUFYRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBQUFDO1FBT0FDLENBQUNBO1FBTkFELHNCQUFXQSxvQkFBT0E7aUJBQWxCQTtnQkFDQ0UsTUFBTUEsQ0FBQ0E7b0JBQ05BLFNBQVNBLEVBQUVBLHdCQUF3QkE7b0JBQ25DQSxXQUFXQSxFQUFFQSxlQUFlQTtpQkFDNUJBO1lBQ0ZBLENBQUNBOzs7V0FBQUY7UUFDRkEsZ0JBQUNBO0lBQURBLENBQUNBLElBQUFEO0lBUFlBLGFBQVNBLFlBT3JCQTtBQUNGQSxDQUFDQSxFQVhNLEdBQUcsS0FBSCxHQUFHLFFBV1Q7OztBQ2JELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FvQlQ7QUFwQkQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNYQSxZQUFZQTtJQUVaQTtRQUtDSSxn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QUFnRTtBQUNoRSw4REFBOEQ7QUFFOUQsMEVBQTBFO0FBQzFFLCtFQUErRTtBQUMvRSwwRUFBMEU7QUFDMUUsNkVBQTZFO0FBQzdFLDRFQUE0RTtBQUM1RSwwRUFBMEU7QUFFMUUsNkRBQTZEO0FBQzdELGtFQUFrRTtBQUNsRSw2REFBNkQ7QUFDN0QsZ0VBQWdFO0FBQ2hFLCtEQUErRDtBQUMvRCw2REFBNkQ7QUFFN0QsbURBQW1EO0FBQ25ELHNEQUFzRDtBQUN0RCxxREFBcUQ7OztBQ3hDckQsZ0NBQWdDO0FBRWhDLElBQU8sR0FBRyxDQUtUO0FBTEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNBQSxXQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxTQUFTQSxFQUFFQSxhQUFhQSxFQUFFQSxVQUFVQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVyR0EsV0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDcEJBLFdBQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLFlBQVlBLEVBQUVBLFdBQVdBLEVBQUVBLGVBQWVBLEVBQUVBLGdCQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUM1RUEsQ0FBQ0EsRUFMTSxHQUFHLEtBQUgsR0FBRyxRQUtUIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbnZhciBzZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCdzZXJ2aWNlcycsIFtdKTtcclxudmFyIGNvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2NvbnRyb2xsZXJzJywgW10pO1xyXG52YXIgZGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzJywgW10pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG5cdFx0c3RhdGljIGdldCBEZWZhdWx0KCk6IGFueSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICcuLi90ZW1wbGF0ZXMvJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgICAgICckcm91dGVQcm92aWRlcidcclxuICAgICAgICBdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCRyb3V0ZVByb3ZpZGVyOiBuZy5yb3V0ZS5JUm91dGVQcm92aWRlcikge1xyXG5cdFx0XHQkcm91dGVQcm92aWRlci53aGVuKFwiL3VzZXJzbGlzdFwiLCB7XHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICd1c2Vyc0xpc3QuaHRtbCcsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ1VzZXJzTGlzdENvbnRyb2xsZXInLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2N1c3RvbUNvbnRyb2xsZXInXHJcblx0XHRcdH0pLndoZW4oJy9hZGRVc2VyJywge1xyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdBZGRVc2VyQ29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcicsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdhZGRVc2VyLmh0bWwnXHJcblx0XHRcdH0pLm90aGVyd2lzZSh7IHJlZGlyZWN0VG86ICcvdXNlcnNsaXN0JyB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgUm91dGVIYW5kbGVyIHtcclxuXHRcdHN0YXRpYyBpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ3NoYXJlZFNlcnZpY2UnXTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgJHJvb3RTY29wZTogYW55LCAvL25nLklSb290U2NvcGVTZXJ2aWNlLFxyXG5cdFx0XHQkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkcm9vdFNjb3BlLlV0aWxzID0ge1xyXG5cdFx0XHRcdGtleXM6IE9iamVjdC5rZXlzXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdGFydCcsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdWNjZXNzJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZUVycm9yXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VFcnJvcicsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlcnNMaXN0SW50ZXJmYWNlIHtcclxuXHRcdGdldFVzZXJzKClcclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSlcclxuXHRcdGFkZFVzZXIoKVxyXG5cdFx0ZWRpdFVzZXJDbGljayhldmVudDogRXZlbnQsIGtleTogc3RyaW5nKVxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogYW55LCB1c2VySWQ6IHN0cmluZylcclxuXHRcdGhpZGVFZGl0UG9wdXAoZXZlbnQ/OiBFdmVudClcclxuXHRcdGVkaXRVc2VyRGVmYXVsdCgpXHJcblx0XHRkZWxldGVVc2VyQ2xpY2soZXZlbnQ6IEV2ZW50LCBrZXk6IHN0cmluZylcclxuXHRcdGRlbGV0ZVVzZXJDb25maXJtKGtleTogc3RyaW5nKVxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudClcclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KClcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBBZGRVc2VySW50ZXJmYWNlIHtcclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpXHJcblx0XHR2YWxpZGF0ZUZvcm0oKVxyXG5cdFx0YWRkVXNlcigpXHJcblx0XHR1c2VyRGF0YURlZmF1bHQoKVxyXG5cdFx0c2hvd01vZGFsRGlhbG9ndWUoZXJyb3JUeXBlOiBzdHJpbmcpXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86RXZlbnQpXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpXHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0FkZFVzZXJDb250cm9sbGVyJywgYXBwLkFkZFVzZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIGFwcENvbmZpZ0ludGVyZmFjZSB7XHJcblx0XHRzZXJ2ZXJVcmw6IHN0cmluZztcclxuXHRcdHRlbXBsYXRlVXJsOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VyRGF0YUludGVyZmFjZSB7XHJcblx0XHRmaXJzdG5hbWU6IHN0cmluZztcclxuXHRcdGxhc3RuYW1lOiBzdHJpbmc7XHJcblx0XHRlbWFpbDogc3RyaW5nO1xyXG5cdFx0cGhvbmVudW1iZXI6IHN0cmluZztcclxuXHRcdGxvY2F0aW9uOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBCdXR0b25zSW50ZXJmYWNlIHtcclxuXHRcdCdzaG93QnRuJzogQm9vbGVhbixcclxuXHRcdCdjbGlja0Z1bmMnOiBzdHJpbmcsXHJcblx0XHQndGV4dCc6IHN0cmluZ1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpXHJcblx0XHRvblJvdXRlQ2hhbmdlU3VjY2VzcyhldmVudDogRXZlbnQsIHBhcmFtczogYW55KVxyXG5cdFx0b25Sb3V0ZUNoYW5nZUVycm9yKGV2ZW50LCBwYXJhbXMpXHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpXHJcblx0XHRzZXRBZGRVc2VySGVhZGVyKClcclxuXHRcdGNhbGxGdW5jdGlvbihldmVudDogRXZlbnQsIGNsaWNrRnVuYzogc3RyaW5nKVxyXG5cdFx0Z29Ub0FkZFVzZXIoKVxyXG5cdFx0YWRkVXNlcigpXHJcblx0XHRnb0JhY2soKVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgRWRpdFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0aXNWaXNpYmxlOiBCb29sZWFuO1xyXG5cdFx0dGl0bGU6IHN0cmluZztcclxuXHRcdHVzZXJEYXRhOiBhbnk7XHJcblx0XHR1c2VySWQ6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIE1vZGFsRGlhbG9ndWVJbnRlcmZhY2Uge1xyXG5cdFx0aXNWaXNpYmxlOiBCb29sZWFuLFxyXG5cdFx0dGl0bGU6IHN0cmluZyxcclxuXHRcdGJvZHk6IHN0cmluZyxcclxuXHRcdGJ0bjFUeHQ6IHN0cmluZyxcclxuXHRcdGJ0bjJUeHQ/OiBzdHJpbmcsXHJcblx0XHRzaG93QnRuMjogQm9vbGVhbixcclxuXHRcdGJ0bjFDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0YnRuMkNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0XHRjbG9zZUJ0bkNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJbmZvU2xpZGVySW50ZXJmYWNlIHtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHRib2R5OiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0aGVhZGluZzogc3RyaW5nO1xyXG5cdFx0aGVhZGVyTGVmdEJ0bjogQnV0dG9uc0ludGVyZmFjZTtcclxuXHRcdGhlYWRlclJpZ2h0QnRuOiBCdXR0b25zSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJHdpbmRvdycsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3VjY2Vzcy5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgdGhpcy5vblJvdXRlQ2hhbmdlRXJyb3IuYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRpbmcgPSAnVXNlciBtYW5hZ2VtZW50JztcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XHJcblxyXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0Y2FzZSAnVXNlcnNMaXN0Q29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnQWRkVXNlckNvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEFkZFVzZXJIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29Ub0FkZFVzZXInLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0FkZCB1c2VyJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldEFkZFVzZXJIZWFkZXIoKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb0JhY2snLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0JhY2snXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzW2NsaWNrRnVuY10pKSB7XHJcblx0XHRcdFx0dGhpc1tjbGlja0Z1bmNdKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnb1RvQWRkVXNlcigpIHtcclxuXHRcdFx0Ly8gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyXCIpKS5zY29wZSgpXHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnYWRkLXVzZXInLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z29CYWNrKCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgYXBwLkhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlcnNMaXN0Q29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHVzZXJzTGlzdDogQXJyYXk8YW55PjtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGVkaXRVc2VyOiBFZGl0VXNlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgbW9kYWxEaWFsb2d1ZTogTW9kYWxEaWFsb2d1ZUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgaW5mb1NsaWRlcjogSW5mb1NsaWRlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgc29ydE9yZGVyOiBzdHJpbmc7XHJcblx0XHQvL1RPRE86IGNyZWF0ZSBpbnRlcmZhY2VcclxuXHRcdHByaXZhdGUgdGFibGVIZWFkaW5nOiBBcnJheTxhbnk+O1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnQVBJU2VydmljZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLnNvcnRPcmRlciA9ICdmaXJzdG5hbWUnO1xyXG5cdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblxyXG5cdFx0XHR0aGlzLnVzZXJzTGlzdCA9IFtdO1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlckRlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5jcmVhdGV0YWJsZUhlYWRpbmcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhY3Rpb25IYW5kbGVyKHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdhY3Rpb25IYW5kbGVyOiAnLCB0eXBlLCAnIDogJywgdXNlcklkKTtcclxuXHRcdFx0Y29uc29sZS5sb2codXNlckRhdGEpO1xyXG5cclxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnZWRpdCc6XHJcblx0XHRcdFx0XHR0aGlzLmVkaXRVc2VyQ2xpY2sodXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdkZWxldGUnOlxyXG5cdFx0XHRcdFx0dGhpcy5kZWxldGVVc2VyQ2xpY2sodXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdzYXZlJzpcclxuXHRcdFx0XHRcdHRoaXMuc2F2ZVVzZXJDbGljayh1c2VySWQsIHVzZXJEYXRhKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c2F2ZVVzZXJDbGljayh1c2VySWQ6IHN0cmluZywgdXNlckRhdGE6IGFueSkge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZVVzZXJEYXRhKHVzZXJEYXRhLCB1c2VySWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldFVzZXJzKCkge1xyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UuZ2V0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXHJcblx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEsIHN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc1NlcnZlckRhdGEoZGF0YSlcclxuXHRcdFx0fSkuZXJyb3IoKGRhdGEsIHN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyJylcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygncHJvY2Vzc1NlcnZlckRhdGE6ICcsIGRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0Lmxlbmd0aCA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBFZGl0IHVzZXIgY29kZSBmbG93XHJcblx0XHQqL1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykge1xyXG5cdFx0XHRjb25zb2xlLmxvZygndmFsaWRhdGVFbWFpbCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVkaXRVc2VyQ2xpY2sodXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmVkaXRVc2VyID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0VkaXQgZGV0YWlscycsXHJcblx0XHRcdFx0dXNlckRhdGE6IHRoaXMudXRpbHNTZXJ2aWNlLmNsb25lKHRoaXMudXRpbHNTZXJ2aWNlLmdldE9iamVjdEZyb21BcnIodGhpcy51c2Vyc0xpc3QsICdpZF9tZW1iZXInLCB1c2VySWQpKSxcclxuXHRcdFx0XHR1c2VySWQ6IHVzZXJJZFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctZWRpdC1tb2RhbCcsIHsgaWQ6ICdlZGl0VXNlck1vZGFsJyB9KTtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKHRoaXMuZWRpdFVzZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZVVzZXJEYXRhKGRhdGE6IGFueSwgdXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YTogJywgZGF0YSk7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ3VwZGF0ZXVzZXInLFxyXG5cdFx0XHRcdCdkYXRhJzoge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZCxcclxuXHRcdFx0XHRcdCd1c2VyRGF0YSc6IHtcclxuXHRcdFx0XHRcdFx0ZW1haWw6IGRhdGEuZW1haWwsXHJcblx0XHRcdFx0XHRcdGZpcnN0bmFtZTogZGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGlkX21lbWJlcjogZGF0YS5pZF9tZW1iZXIsXHJcblx0XHRcdFx0XHRcdGxhc3RuYW1lOiBkYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjogZGF0YS5sb2NhdGlvbixcclxuXHRcdFx0XHRcdFx0cGhvbmVudW1iZXI6IGRhdGEucGhvbmVudW1iZXJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMuaGlkZUVkaXRQb3B1cCgpO1xyXG5cclxuXHRcdFx0XHRpZiAocmVzcG9uc2UucmVzcCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5vblVzZXJVcGRhdGVkKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIHVwZGF0aW5nIHVzZXIgaW5mb3JtYXRpb24uIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Vc2VyVXBkYXRlZCgpIHtcclxuXHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XHJcblx0XHRcdFx0dGl0bGU6ICdVc2VyIHVwZGF0ZWQnLFxyXG5cdFx0XHRcdGJvZHk6ICdVc2VyIGluZm8gaGFzIGJlZW4gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdHN0YXJ0VGltZXI6IDUwMCxcclxuXHRcdFx0XHRlbmRUaW1lcjogNDAwMFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVFZGl0UG9wdXAoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1lZGl0LW1vZGFsJywgeyBpZDogJ2VkaXRVc2VyTW9kYWwnIH0pO1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIERlbGV0ZSB1c2VyIGNvZGVmbG93XHJcblx0XHQqL1xyXG5cdFx0ZGVsZXRlVXNlckNsaWNrKHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSB1c2VyPycsXHJcblx0XHRcdFx0Ym9keTogJ1BsZWFzZSBjb25maXJtLCB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHVzZXInLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0c2hvd0J0bjI6IHRydWUsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZVVzZXJDb25maXJtLmJpbmQodGhpcywgdXNlcklkKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGVVc2VyQ29uZmlybSh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2RlbGV0ZVVzZXJDb25maXJtLCB1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZGVsZXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlLnJlc3AgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdHRoaXMub25Vc2VyRGVsZXRlZCgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0dGl0bGU6ICdFcnJvciEnLFxyXG5cdFx0XHRcdFx0XHRib2R5OiAnV2UgaGF2ZSBlbmNvdW50ZXJlZCBlcnJvciB3aGlsZSBkZWxldGluZyB1c2VyLiBQbGVhc2UgdHJ5IGFnYWluJyxcclxuXHRcdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uVXNlckRlbGV0ZWQoKSB7XHJcblx0XHRcdHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUoKTtcclxuXHRcdFx0dGhpcy5zaG93SW5mb1NsaWRlcih7XHJcblx0XHRcdFx0dGl0bGU6ICdVc2VyIGRlbGV0ZWQnLFxyXG5cdFx0XHRcdGJvZHk6ICdVc2VyIGhhcyBiZWVuIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuXHRcdFx0XHRzdGFydFRpbWVyOiA1MDAsXHJcblx0XHRcdFx0ZW5kVGltZXI6IDQwMDBcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihvcmRlckJ5OiBhbnkpIHtcclxuXHRcdFx0aWYgKG9yZGVyQnkgPT09IHRoaXMuc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSAnLScgKyBvcmRlckJ5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc29ydE9yZGVyID0gb3JkZXJCeTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogYW55KSB7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlciA9IHtcclxuXHRcdFx0XHR0aXRsZTogcGFyYW1zLnRpdGxlLFxyXG5cdFx0XHRcdGJvZHk6IHBhcmFtcy5ib2R5XHJcblx0XHRcdH07XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1pbmZvLXNsaWRlcicsIHsgaWQ6ICdpbmZvU2xpZGVyJyB9KTtcclxuXHRcdFx0fSwgcGFyYW1zLnN0YXJ0VGltZXIpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5oaWRlSW5mb1NsaWRlcigpO1xyXG5cdFx0XHR9LCBwYXJhbXMuZW5kVGltZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVJbmZvU2xpZGVyKCkge1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtaW5mby1zbGlkZXInLCB7IGlkOiAnaW5mb1NsaWRlcicgfSk7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlckRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBGdW5jdGlvbnMgdG8gc2V0IGRlYWZ1bHQgdmFsdWVzIGZvciBkaWZmZXJlbnQgY29uZmlnc1xyXG5cdFx0Ki9cclxuXHRcdGNyZWF0ZXRhYmxlSGVhZGluZygpIHtcclxuXHRcdFx0dGhpcy50YWJsZUhlYWRpbmcgPSBbe1xyXG5cdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEnLFxyXG5cdFx0XHRcdCdzb3J0T3JkZXInOiAnaWRfbWVtYmVyJyxcclxuXHRcdFx0XHQndGV4dCc6ICdTLk5vJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZmlyc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0ZpcnN0IG5hbWUnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xhc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0xhc3QgbmFtZSdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0zJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZW1haWwnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnRW1haWwnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ3Bob25lbnVtYmVyJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ1Bob25lIE51bWJlcidcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnbG9jYXRpb24nLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnTG9jYXRpb24nXHJcblx0XHRcdFx0fV07XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdHVzZXJEYXRhOiB7fSxcclxuXHRcdFx0XHR1c2VySWQ6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGluZm9TbGlkZXJEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXIgPSB7XHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlcnNMaXN0Q29udHJvbGxlcicsIGFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEFkZFVzZXJDb250cm9sbGVyIGltcGxlbWVudHMgQWRkVXNlckludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHZhbGlkRW1haWw6IEJvb2xlYW47XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIG1vZGFsRGlhbG9ndWU6IE1vZGFsRGlhbG9ndWVJbnRlcmZhY2U7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCdBUElTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbignYWRkLXVzZXInLCBmdW5jdGlvbihldmVudCwgYXJncykge1xyXG5cdFx0XHRcdHRoaXMuYWRkVXNlcigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy51c2VyRGF0YURlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gdGhpcy51dGlsc1NlcnZpY2UudmFsaWRhdGVFbWFpbCh2YWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRm9ybSgpIHtcclxuXHRcdFx0Ly8gbWFrZSBudWxsIHVuZGVmaW5lZCBjaGVja3MgaGVyZVxyXG5cdFx0XHRpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEuZmlyc3RuYW1lKSB8fCB0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5sYXN0bmFtZSkpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1uYW1lJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmVtYWlsKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLWVtYWlsJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLnBob25lbnVtYmVyKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLXBob25lbnVtYmVyJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmxvY2F0aW9uKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2luVmFsaWRGb3JtLWxvY2F0aW9uJyk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdvdG9Vc2VyTGlzdCgpIHtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL3VzZXJzbGlzdCcpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2FkZCB1c2VyOiAnLCB0aGlzLnVzZXJEYXRhKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XHJcblx0XHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnYWRkdXNlcicsXHJcblx0XHRcdFx0XHRkYXRhOiB0aGlzLnVzZXJEYXRhXHJcblx0XHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3AgJiYgcmVzcG9uc2UucmVzcCA9PT0gJ0VtYWlsIGFscmVhZHkgaW4gdXNlJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdlbWFpbEluVXNlJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmdvdG9Vc2VyTGlzdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLmVycm9yKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR1c2VyRGF0YURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMudXNlckRhdGEgPSB7XHJcblx0XHRcdFx0J2ZpcnN0bmFtZSc6ICcnLFxyXG5cdFx0XHRcdCdsYXN0bmFtZSc6ICcnLFxyXG5cdFx0XHRcdCdlbWFpbCc6ICcnLFxyXG5cdFx0XHRcdCdwaG9uZW51bWJlcic6ICcnLFxyXG5cdFx0XHRcdCdsb2NhdGlvbic6ICdJTidcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRzaG93TW9kYWxEaWFsb2d1ZShlcnJvclR5cGU6IHN0cmluZykge1xyXG5cdFx0XHRsZXQgdGl0bGU6IHN0cmluZyA9ICcnLFxyXG5cdFx0XHRcdGJvZHk6IHN0cmluZyA9ICcnO1xyXG5cclxuXHRcdFx0c3dpdGNoIChlcnJvclR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdlbWFpbEluVXNlJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0VtYWlsIGFscmVhZHkgaW4gdXNlJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnRW1haWwgSUQgaXMgYWxyZWFkeSBpbiB1c2UsIHBsZWFzZSBlbnRlciBhIHVuaXF1ZSBFbWFpbCBhZGRyZXNzJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1uYW1lJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIEZpcnN0IG5hbWUvTGFzdCBuYW1lJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1lbWFpbCc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCB0aGUgZW1haWwgYWRkcmVzcyc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tcGhvbmVudW1iZXInOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgcGhvbmUgbnVtYmVyJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1sb2NhdGlvbic6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2Ugc2VsZWN0IGxvY2F0aW9uJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7IGlkOiAnbW9kYWxEaWFsb2d1ZScgfSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6IHRpdGxlLFxyXG5cdFx0XHRcdGJvZHk6IGJvZHksXHJcblx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0Ym9keTogJycsXHJcblx0XHRcdFx0YnRuMVR4dDogJycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignQWRkVXNlckNvbnRyb2xsZXInLCBhcHAuQWRkVXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgRWRpdFVzZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdFZGl0VXNlckNvbnRyb2xsZXInLCBhcHAuRWRpdFVzZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWVDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdNb2RhbERpYWxvZ3VlQ29udHJvbGxlcicsIGFwcC5Nb2RhbERpYWxvZ3VlQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VyRm9ybUNvbnRyb2xsZXIge1xyXG5cdFx0Zm9ybVN1Ym1pdDogRnVuY3Rpb247XHJcblx0XHR1c2VyRGF0YTogYW55O1xyXG5cdFx0dXNlckRhdGFJZDogYW55O1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0b25Gb3JtU3VibWl0KGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnNvbGUubG9nKCdvbkZvcm1TdWJtaXQnKTtcclxuXHRcdFx0dGhpcy5mb3JtU3VibWl0KHsgZGF0YTogdGhpcy51c2VyRGF0YSwgdXNlckRhdGFJZDogdGhpcy51c2VyRGF0YUlkIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2VyRm9ybUNvbnRyb2xsZXInLCBhcHAuVXNlckZvcm1Db250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyQ29udHJvbGxlciB7XHJcblx0XHRzb3J0RnVuYzogRnVuY3Rpb247XHJcblx0XHRkZWZhdWx0Q2xhc3M6IHN0cmluZztcclxuXHRcdGxhc3RTb3J0T3JkZXI6IHN0cmluZztcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckZWxlbWVudCdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkge1xyXG5cdFx0XHR0aGlzLmRlZmF1bHRDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKGV2ZW50OiBFdmVudCwgc29ydE9yZGVyOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG5ld0NsYXNzID0gJ2Fycm93IGFycm93LXVwJztcclxuXHRcdFx0aWYgKGFuZ3VsYXIuZWxlbWVudChldmVudC50YXJnZXQpLmZpbmQoJ3NwYW4nKS5oYXNDbGFzcygnYXJyb3ctdXAnKSkge1xyXG5cdFx0XHRcdG5ld0NsYXNzID0gJ2Fycm93IGFycm93LWRvd24nO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5sYXN0U29ydE9yZGVyICE9PSBzb3J0T3JkZXIpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoJyNoZWFkaW5nXycgKyB0aGlzLmxhc3RTb3J0T3JkZXIpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHRoaXMuZGVmYXVsdENsYXNzKTtcclxuXHRcdFx0XHR0aGlzLmxhc3RTb3J0T3JkZXIgPSBzb3J0T3JkZXI7XHJcblx0XHRcdH1cclxuXHRcdFx0YW5ndWxhci5lbGVtZW50KGV2ZW50LnRhcmdldCkuZmluZCgnc3BhbicpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MobmV3Q2xhc3MpO1xyXG5cclxuXHRcdFx0dGhpcy5zb3J0RnVuYyh7XHJcblx0XHRcdFx0J29yZGVyQnknOiBzb3J0T3JkZXJcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1RhYmxlSGVhZGVyQ29udHJvbGxlcicsIGFwcC5UYWJsZUhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgSW5mb1NsaWRlckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0luZm9TbGlkZXJDb250cm9sbGVyJywgYXBwLkluZm9TbGlkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJJbmZvQ29udHJvbGxlciB7XHJcblx0XHRwcml2YXRlIHJlYWRPbmx5TW9kZTogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgYWN0aW9uSGFuZGxlcjogRnVuY3Rpb247XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGFydEVkaXRNb2RlKCRldmVudDogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coJ3N0YXJ0RWRpdE1vZGUnKTtcclxuXHRcdFx0aWYgKHRoaXMucmVhZE9ubHlNb2RlKSB7XHJcblx0XHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGNhbmNlbEVkaXRNb2RlKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zb2xlLmxvZygnY2FuY2VsRWRpdE1vZGUnKTtcclxuXHJcblx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRhY3Rpb25DYWxsYmFjayhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodHlwZSA9PT0gJ3NhdmUnKSB7XHJcblx0XHRcdFx0dmFyIHVzZXJEYXRhID0ge1xyXG5cdFx0XHRcdFx0aWRfbWVtYmVyOiBhbmd1bGFyLmVsZW1lbnQoJyNpZF9tZW1iZXInKS52YWwoKSxcclxuXHRcdFx0XHRcdGZpcnN0bmFtZTogYW5ndWxhci5lbGVtZW50KCcjZmlyc3RuYW1lJykudmFsKCksXHJcblx0XHRcdFx0XHRsYXN0bmFtZTogYW5ndWxhci5lbGVtZW50KCcjbGFzdG5hbWUnKS52YWwoKSxcclxuXHRcdFx0XHRcdGVtYWlsOiBhbmd1bGFyLmVsZW1lbnQoJyNlbWFpbCcpLnZhbCgpLFxyXG5cdFx0XHRcdFx0cGhvbmVudW1iZXI6IGFuZ3VsYXIuZWxlbWVudCgnI3Bob25lbnVtYmVyJykudmFsKCksXHJcblx0XHRcdFx0XHRsb2NhdGlvbjogYW5ndWxhci5lbGVtZW50KCcjbG9jYXRpb24nKS52YWwoKVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dGhpcy5jYW5jZWxFZGl0TW9kZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFjdGlvbkhhbmRsZXIoeyB0eXBlOiB0eXBlLCB1c2VySWQ6IHVzZXJJZCwgdXNlckRhdGE6IHVzZXJEYXRhIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2VySW5mb0NvbnRyb2xsZXInLCBhcHAuVXNlckluZm9Db250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0VXNlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdHVzZXJJZDogJz0nLFxyXG5cdFx0XHRoaWRlUG9wdXA6ICcmJyxcclxuXHRcdFx0dXBkYXRlRGF0YTogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnRWRpdFVzZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1lZGl0LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4oICgpID0+IG5ldyBFZGl0VXNlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ2VkaXRVc2VyJywgYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0aXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdGJvZHk6ICc9JyxcclxuXHRcdFx0YnRuMVR4dDogJz0nLFxyXG5cdFx0XHRidG4yVHh0OiAnPScsXHJcblx0XHRcdHNob3dCdG4yOiAnPScsXHJcblx0XHRcdGJ0bjFDYWxsYmFjazogJyYnLFxyXG5cdFx0XHRidG4yQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogJyYnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6bmcuSVNjb3BlKSB7XHJcblx0XHRcdHNjb3BlLiRvbignc2hvdy1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuaWQpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuaWQpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ21vZGFsRGlhbG9ndWUnLCBhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFVzZXJGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHR1c2VySWQ6ICc9JyxcclxuXHRcdFx0ZWRpdE1vZGU6ICc9JyxcclxuXHRcdFx0dmFsaWRhdGVFbWFpbDogJyYnLFxyXG5cdFx0XHRmb3JtU3VibWl0OiAnJicsXHJcblx0XHRcdGRpc2NhcmRGb3JtOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VyRm9ybUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VyRm9ybURpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3VzZXJGb3JtJywgYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYmxlSGVhZGluZzogJz0nLFxyXG5cdFx0XHRzb3J0RnVuYzogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVGFibGVIZWFkZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3RhYmxlSGVhZGVyJywgYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW5mb1NsaWRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0Ly8gcHJpdmF0ZSB0aW1lcjogbnVtYmVyO1xyXG5cclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdGJvZHk6ICc9J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnSW5mb1NsaWRlckNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctaW5mby1zbGlkZXInLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtaW5mby1zbGlkZXInLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBJbmZvU2xpZGVyRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdpbmZvU2xpZGVyJywgYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVc2VySW5mb0RpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0Ly8gcHJpdmF0ZSB0aW1lcjogbnVtYmVyO1xyXG5cclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdGFjdGlvbkhhbmRsZXI6ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1VzZXJJbmZvQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0bGluayhzY29wZTogbmcuSVNjb3BlKSB7IH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IFVzZXJJbmZvRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VySW5mbycsIGFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaHR0cCddO1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlOiBuZy5JSHR0cFNlcnZpY2U7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlID0gJGh0dHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRDYWxsKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBwYXJhbXMuY29uZmlnIHx8IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQocGFyYW1zLnVybCwgcGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvc3RDYWxsKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXJhbXM6ICcsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QocGFyYW1zLnVybCwgcGFyYW1zLmRhdGEsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHBhcmFtcy5oZWFkZXJzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvKnJldHVybiB0aGlzLmh0dHBTZXJ2aWNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHBhcmFtcy51cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQucGFyYW0ocGFyYW1zLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0FQSVNlcnZpY2UnLCBhcHAuQVBJU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG4gICAgICAgIGJyb2FkY2FzdEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGV2ZW50TmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdTaGFyZWRTZXJ2aWNlJywgYXBwLlNoYXJlZFNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFV0aWxzU2VydmljZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAgICAgZ2V0RGF0YVR5cGUob2JqOiBhbnkpIHtcclxuXHRcdFx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChvYmopLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aXNOdWxsVW5kZWZpbmVkKHZhbDogYW55LCB2YWxpZGF0ZVplcm9OYU4/OiBCb29sZWFuKSB7XHJcblx0XHRcdGxldCBpc051bGw6IEJvb2xlYW4gPSBmYWxzZSxcclxuXHRcdFx0XHR0eXBlID0gdGhpcy5nZXREYXRhVHlwZSh2YWwpO1xyXG5cclxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnW29iamVjdCBhcnJheV0nOlxyXG5cdFx0XHRcdFx0aWYgKHZhbC5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdbb2JqZWN0IG9iamVjdF0nOlxyXG5cdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHZhbCkgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gXCJcIiB8fCB2YWwgPT09IFwibnVsbFwiIHx8IHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2YWxpZGF0ZVplcm9OYU4gJiYgKHZhbCA9PT0gMCB8fCBpc05hTih2YWwpKSkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpc051bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xvbmUob2JqOiBhbnkpIHtcclxuXHRcdFx0aWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZiAob2JqKSAhPSAnb2JqZWN0JylcclxuXHRcdFx0XHRyZXR1cm4gb2JqO1xyXG5cclxuXHRcdFx0dmFyIHRlbXAgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XHJcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopXHJcblx0XHRcdFx0dGVtcFtrZXldID0gdGhpcy5jbG9uZShvYmpba2V5XSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGVtcDtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBCb29sZWFuIHtcclxuXHRcdFx0dmFyIGVtYWlsUmVnZXhwID0gL15bYS16MC05ISMkJSYnKitcXC89P15fYHt8fX4uLV0rQFthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KFxcLlthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KSokL2k7XHJcblxyXG5cdFx0XHRpZiAoZW1haWwgJiYgZW1haWxSZWdleHAudGVzdChlbWFpbCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoYXJyW2ldW3Byb3BOYW1lXSA9PSBwcm9wVmFsdWUpIHJldHVybiBhcnJbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRsb2coLi4ubXNnOiBhbnlbXSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ1V0aWxzU2VydmljZScsIGFwcC5VdGlsc1NlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9qcXVlcnkvanF1ZXJ5LmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FwcC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvbW9kdWxlcy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29uc3RhbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25maWcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3JvdXRlLWhhbmRsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3VzZXItbGlzdC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9hcHAtY29uZmlnLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy91c2VyLWRhdGEuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2hlYWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZWRpdC11c2VyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9tb2RhbC1kaWFsb2d1ZS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvaW5mby1zbGlkZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvYWRkLXVzZXIuY29udHJvbGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3VzZXItaW5mby5kaXJlY3RpdmUudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9hcGkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL3V0aWxzLnNlcnZpY2UudHMnIC8+XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHRleHBvcnQgdmFyIGZvcm1BcHAgPSBhbmd1bGFyLm1vZHVsZSgnZm9ybUFwcCcsIFsnbmdSb3V0ZScsICdjb250cm9sbGVycycsICdzZXJ2aWNlcycsICdkaXJlY3RpdmVzJ10pO1xyXG5cclxuXHRmb3JtQXBwLmNvbmZpZyhDb25maWcpO1xyXG4gICAgZm9ybUFwcC5ydW4oWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdTaGFyZWRTZXJ2aWNlJywgUm91dGVIYW5kbGVyXSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
