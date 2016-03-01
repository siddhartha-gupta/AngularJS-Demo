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
            this.sortOrder = '-id_member';
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
        function UserInfoController($scope, $timeout, $element, docEventService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$element = $element;
            this.docEventService = docEventService;
            this.readOnlyMode = true;
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
        UserInfoController.prototype.onMouseClick = function (event) {
            var tagName = event.target.tagName.toLowerCase();
            if ((tagName !== 'input' && tagName !== 'select') || (this.$element.find(event.target).length === 0)) {
                this.cancelEditMode(event);
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
                console.log('in noreset: ', this.userData);
                this.$element.find('#firstname').val(this.userData.firstname);
                this.$element.find('#lastname').val(this.userData.lastname);
                this.$element.find('#location').val(this.userData.location);
                this.$timeout(function () {
                    _this.$scope.$apply();
                });
            }
        };
        UserInfoController.prototype.actionCallback = function (event, type, userId) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            console.log('actionCallback: ', type, ' : ', userId);
            if (type === 'save') {
                var userData = {
                    id_member: this.userData.id_member,
                    firstname: this.$element.find('#firstname').val(),
                    lastname: this.$element.find('#lastname').val(),
                    email: this.userData.email,
                    phonenumber: this.userData.phonenumber,
                    location: this.$element.find('#location').val()
                };
                this.cancelEditMode(null, true);
            }
            this.actionHandler({ type: type, userId: userId, userData: userData });
        };
        UserInfoController.$inject = [
            '$scope',
            '$timeout',
            '$element',
            'DocEventService'
        ];
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
        EditUserDirective.prototype.link = function (scope, element) {
            scope.$on('show-edit-modal', function (event, params) {
                element.find(document.getElementById(params.id)).modal('show');
            });
            scope.$on('hide-edit-modal', function (event, params) {
                element.find(document.getElementById(params.id)).modal('hide');
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
        ModalDialogueDirective.prototype.link = function (scope, element) {
            scope.$on('show-modal', function (event, params) {
                element.find(document.getElementById(params.id)).modal('show');
            });
            scope.$on('hide-modal', function (event, params) {
                element.find(document.getElementById(params.id)).modal('hide');
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
        InfoSliderDirective.prototype.link = function (scope, element) {
            scope.$on('show-info-slider', function (event, params) {
                element.find(document.getElementById(params.id)).modal('show');
            });
            scope.$on('hide-info-slider', function (event, params) {
                element.find(document.getElementById(params.id)).modal('hide');
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
    })();
    app.DocEventService = DocEventService;
})(app || (app = {}));
services.service('DocEventService', app.DocEventService);


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


/// <reference path='_all.ts' />
var app;
(function (app) {
    app.formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services', 'directives']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', 'SharedService', app.RouteHandler]);
})(app || (app = {}));



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWluZm8uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL2FwcC1jb25maWcuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL3VzZXItZGF0YS5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvZWRpdC11c2VyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9tb2RhbC1kaWFsb2d1ZS5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvaW5mby1zbGlkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL3RhYmxlLWhlYWRpbmcuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL2hlYWRlci1idXR0b25zLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvc2VydmljZXMvYXBpLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvc2VydmljZXMvZG9jLWV2ZW50LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvc2VydmljZXMvc2hhcmVkLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvc2VydmljZXMvdXRpbHMuaW50ZXJmYWNlLnRzIiwidHMvY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy91c2Vycy1saXN0LmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWluZm8uY29udHJvbGxlci50cyIsInRzL2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy90YWJsZS1oZWFkZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3VzZXItaW5mby5kaXJlY3RpdmUudHMiLCJ0cy9zZXJ2aWNlcy9hcGkuc2VydmljZS50cyIsInRzL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvdXRpbHMuc2VydmljZS50cyIsInRzL3NlcnZpY2VzL2RvYy1ldmVudC5zZXJ2aWNlLnRzIiwiX2FsbC50cyIsImFwcC50cyJdLCJuYW1lcyI6WyJhcHAiLCJhcHAuQ29uc3RhbnRzIiwiYXBwLkNvbnN0YW50cy5jb25zdHJ1Y3RvciIsImFwcC5Db25zdGFudHMuRGVmYXVsdCIsImFwcC5Db25maWciLCJhcHAuQ29uZmlnLmNvbnN0cnVjdG9yIiwiYXBwLlJvdXRlSGFuZGxlciIsImFwcC5Sb3V0ZUhhbmRsZXIuY29uc3RydWN0b3IiLCJhcHAuSGVhZGVyQ29udHJvbGxlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZVN0YXJ0IiwiYXBwLkhlYWRlckNvbnRyb2xsZXIub25Sb3V0ZUNoYW5nZVN1Y2Nlc3MiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlRXJyb3IiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5zZXRVc2VyTGlzdEhlYWRlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLnNldEFkZFVzZXJIZWFkZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5jYWxsRnVuY3Rpb24iLCJhcHAuSGVhZGVyQ29udHJvbGxlci5nb1RvQWRkVXNlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmFkZFVzZXIiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5nb0JhY2siLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZ2V0VXNlcnMiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5wcm9jZXNzU2VydmVyRGF0YSIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmFkZFVzZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5hY3Rpb25IYW5kbGVyIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIudmFsaWRhdGVFbWFpbCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmVkaXRVc2VyQ2xpY2siLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci51cGRhdGVVc2VyRGF0YSIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLm9uVXNlclVwZGF0ZVJlc3AiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5kZWxldGVVc2VyQ2xpY2siLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5kZWxldGVVc2VyQ29uZmlybSIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLm9uVXNlckRlbGV0ZWQiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5oaWRlRWRpdFBvcHVwIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuaGlkZU1vZGFsRGlhbG9ndWUiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5tYW5hZ2VTb3J0T3JkZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5zaG93SW5mb1NsaWRlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmhpZGVJbmZvU2xpZGVyIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuY3JlYXRldGFibGVIZWFkaW5nIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZWRpdFVzZXJEZWZhdWx0IiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIubW9kYWxEaWFsb2d1ZURlZmF1bHQiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5pbmZvU2xpZGVyRGVmYXVsdCIsImFwcC5BZGRVc2VyQ29udHJvbGxlciIsImFwcC5BZGRVc2VyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5BZGRVc2VyQ29udHJvbGxlci52YWxpZGF0ZUVtYWlsIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLnZhbGlkYXRlRm9ybSIsImFwcC5BZGRVc2VyQ29udHJvbGxlci5nb3RvVXNlckxpc3QiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5BZGRVc2VyQ29udHJvbGxlci51c2VyRGF0YURlZmF1bHQiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuc2hvd01vZGFsRGlhbG9ndWUiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuaGlkZU1vZGFsRGlhbG9ndWUiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIubW9kYWxEaWFsb2d1ZURlZmF1bHQiLCJhcHAuRWRpdFVzZXJDb250cm9sbGVyIiwiYXBwLkVkaXRVc2VyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Nb2RhbERpYWxvZ3VlQ29udHJvbGxlciIsImFwcC5Nb2RhbERpYWxvZ3VlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIiLCJhcHAuVXNlckZvcm1Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJGb3JtQ29udHJvbGxlci5vbkZvcm1TdWJtaXQiLCJhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyIiwiYXBwLlRhYmxlSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5UYWJsZUhlYWRlckNvbnRyb2xsZXIubWFuYWdlU29ydE9yZGVyIiwiYXBwLkluZm9TbGlkZXJDb250cm9sbGVyIiwiYXBwLkluZm9TbGlkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiYXBwLlVzZXJJbmZvQ29udHJvbGxlciIsImFwcC5Vc2VySW5mb0NvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVXNlckluZm9Db250cm9sbGVyLnN0YXJ0RWRpdE1vZGUiLCJhcHAuVXNlckluZm9Db250cm9sbGVyLm9uTW91c2VDbGljayIsImFwcC5Vc2VySW5mb0NvbnRyb2xsZXIuY2FuY2VsRWRpdE1vZGUiLCJhcHAuVXNlckluZm9Db250cm9sbGVyLmFjdGlvbkNhbGxiYWNrIiwiYXBwLkVkaXRVc2VyRGlyZWN0aXZlIiwiYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmxpbmsiLCJhcHAuRWRpdFVzZXJEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5Nb2RhbERpYWxvZ3VlRGlyZWN0aXZlIiwiYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5saW5rIiwiYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5Vc2VyRm9ybURpcmVjdGl2ZSIsImFwcC5Vc2VyRm9ybURpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5Vc2VyRm9ybURpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlIiwiYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiYXBwLlRhYmxlSGVhZGVyRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuSW5mb1NsaWRlckRpcmVjdGl2ZSIsImFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUubGluayIsImFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuVXNlckluZm9EaXJlY3RpdmUiLCJhcHAuVXNlckluZm9EaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuVXNlckluZm9EaXJlY3RpdmUubGluayIsImFwcC5Vc2VySW5mb0RpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLkFQSVNlcnZpY2UiLCJhcHAuQVBJU2VydmljZS5jb25zdHJ1Y3RvciIsImFwcC5BUElTZXJ2aWNlLmdldENhbGwiLCJhcHAuQVBJU2VydmljZS5wb3N0Q2FsbCIsImFwcC5TaGFyZWRTZXJ2aWNlIiwiYXBwLlNoYXJlZFNlcnZpY2UuY29uc3RydWN0b3IiLCJhcHAuVXRpbHNTZXJ2aWNlIiwiYXBwLlV0aWxzU2VydmljZS5jb25zdHJ1Y3RvciIsImFwcC5VdGlsc1NlcnZpY2UuZ2V0RGF0YVR5cGUiLCJhcHAuVXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCIsImFwcC5VdGlsc1NlcnZpY2UuY2xvbmUiLCJhcHAuVXRpbHNTZXJ2aWNlLnZhbGlkYXRlRW1haWwiLCJhcHAuVXRpbHNTZXJ2aWNlLmdldE9iamVjdEZyb21BcnIiLCJhcHAuVXRpbHNTZXJ2aWNlLmxvZyIsImFwcC5Eb2NFdmVudFNlcnZpY2UiLCJhcHAuRG9jRXZlbnRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiYXBwLkRvY0V2ZW50U2VydmljZS5iaW5kTW91c2VFdmVudCIsImFwcC5Eb2NFdmVudFNlcnZpY2UuYmluZEtleWJvYXJkRXZlbnQiLCJhcHAuRG9jRXZlbnRTZXJ2aWNlLnVuYmluZE1vdXNlRXZlbnQiLCJhcHAuRG9jRXZlbnRTZXJ2aWNlLnVuYmluZEtleWJvYXJkRXZlbnQiXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FDSmxELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FXVDtBQVhELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWEEsWUFBWUE7SUFFWkE7UUFBQUM7UUFPQUMsQ0FBQ0E7UUFOQUQsc0JBQVdBLG9CQUFPQTtpQkFBbEJBO2dCQUNDRSxNQUFNQSxDQUFDQTtvQkFDTkEsU0FBU0EsRUFBRUEsd0JBQXdCQTtvQkFDbkNBLFdBQVdBLEVBQUVBLGVBQWVBO2lCQUM1QkE7WUFDRkEsQ0FBQ0E7OztXQUFBRjtRQUNGQSxnQkFBQ0E7SUFBREEsQ0FBQ0EsSUFBQUQ7SUFQWUEsYUFBU0EsWUFPckJBO0FBQ0ZBLENBQUNBLEVBWE0sR0FBRyxLQUFILEdBQUcsUUFXVDs7O0FDYkQsbUNBQW1DO0FBRW5DLElBQU8sR0FBRyxDQW9CVDtBQXBCRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1hBLFlBQVlBO0lBRVpBO1FBS0NJLGdCQUFZQSxjQUF1Q0E7WUFDbERDLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBO2dCQUNqQ0EsV0FBV0EsRUFBRUEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsR0FBR0EsZ0JBQWdCQTtnQkFDakVBLFVBQVVBLEVBQUVBLHFCQUFx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O0FDbkR6RCxnQ0FBZ0M7QUFFaEMsSUFBTyxHQUFHLENBS1Q7QUFMRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ0FBLFdBQU9BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLFNBQVNBLEVBQUVBLGFBQWFBLEVBQUVBLFVBQVVBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO0lBRXJHQSxXQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFNQSxDQUFDQSxDQUFDQTtJQUNwQkEsV0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsRUFBRUEsV0FBV0EsRUFBRUEsZUFBZUEsRUFBRUEsZ0JBQVlBLENBQUNBLENBQUNBLENBQUNBO0FBQzVFQSxDQUFDQSxFQUxNLEdBQUcsS0FBSCxHQUFHLFFBS1QiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxudmFyIHNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ3NlcnZpY2VzJywgW10pO1xyXG52YXIgY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnY29udHJvbGxlcnMnLCBbXSk7XHJcbnZhciBkaXJlY3RpdmVzID0gYW5ndWxhci5tb2R1bGUoJ2RpcmVjdGl2ZXMnLCBbXSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcblx0XHRzdGF0aWMgZ2V0IERlZmF1bHQoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzZXJ2ZXJVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy8nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgICAgICAgJyRyb3V0ZVByb3ZpZGVyJ1xyXG4gICAgICAgIF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoJHJvdXRlUHJvdmlkZXI6IG5nLnJvdXRlLklSb3V0ZVByb3ZpZGVyKSB7XHJcblx0XHRcdCRyb3V0ZVByb3ZpZGVyLndoZW4oXCIvdXNlcnNsaXN0XCIsIHtcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ3VzZXJzTGlzdC5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnVXNlcnNMaXN0Q29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcidcclxuXHRcdFx0fSkud2hlbignL2FkZFVzZXInLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ0FkZFVzZXJDb250cm9sbGVyJyxcclxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdjdXN0b21Db250cm9sbGVyJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2FkZFVzZXIuaHRtbCdcclxuXHRcdFx0fSkub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy91c2Vyc2xpc3QnIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBSb3V0ZUhhbmRsZXIge1xyXG5cdFx0c3RhdGljIGluamVjdCA9IFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnc2hhcmVkU2VydmljZSddO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBhbnksIC8vbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcblx0XHRcdCRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0c2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRyb290U2NvcGUuVXRpbHMgPSB7XHJcblx0XHRcdFx0a2V5czogT2JqZWN0LmtleXNcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN0YXJ0Jywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0LFxyXG5cdFx0XHRcdFx0Y3VycmVudDogY3VycmVudFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJG9uKFwiJHJvdXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcclxuXHRcdFx0XHRzaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdyb3V0ZUNoYW5nZUVycm9yJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2Vyc0xpc3RJbnRlcmZhY2Uge1xyXG5cdFx0Z2V0VXNlcnMoKTogdm9pZDtcclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSk6IHZvaWQ7XHJcblx0XHRhZGRVc2VyKCk6IHZvaWQ7XHJcblx0XHRhY3Rpb25IYW5kbGVyKHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcsIHVzZXJEYXRhPzogVXNlckRhdGFJbnRlcmZhY2UpOiB2b2lkO1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRlZGl0VXNlckNsaWNrKHVzZXJJZDogc3RyaW5nKTogdm9pZDtcclxuXHRcdHVwZGF0ZVVzZXJEYXRhKGRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlLCB1c2VySWQ6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRvblVzZXJVcGRhdGVSZXNwKHJlc3A6IEJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0ZGVsZXRlVXNlckNsaWNrKGtleTogc3RyaW5nKTogdm9pZDtcclxuXHRcdGRlbGV0ZVVzZXJDb25maXJtKGtleTogc3RyaW5nKTogdm9pZDtcclxuXHRcdG9uVXNlckRlbGV0ZWQocmVzcDogQm9vbGVhbik6IHZvaWQ7XHJcblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpOiB2b2lkO1xyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRtYW5hZ2VTb3J0T3JkZXIob3JkZXJCeTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogSW5mb1NsaWRlckludGVyZmFjZSk6IHZvaWQ7XHJcblx0XHRoaWRlSW5mb1NsaWRlcigpOiB2b2lkO1xyXG5cdFx0Y3JlYXRldGFibGVIZWFkaW5nKCk6IHZvaWQ7XHJcblx0XHRlZGl0VXNlckRlZmF1bHQoKTogdm9pZDtcclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCk6IHZvaWQ7XHJcblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHR2YWxpZGF0ZUZvcm0oKTogQm9vbGVhbjtcclxuXHRcdGdvdG9Vc2VyTGlzdCgpOiB2b2lkO1xyXG5cdFx0YWRkVXNlcigpOiB2b2lkO1xyXG5cdFx0dXNlckRhdGFEZWZhdWx0KCk6IHZvaWQ7XHJcblx0XHRzaG93TW9kYWxEaWFsb2d1ZShlcnJvclR5cGU6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KTogdm9pZDtcclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpOiB2b2lkO1xyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSk6IHZvaWQ7XHJcblx0XHRvblJvdXRlQ2hhbmdlRXJyb3IoZXZlbnQsIHBhcmFtcyk6IHZvaWQ7XHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpOiB2b2lkO1xyXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpOiB2b2lkO1xyXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0Z29Ub0FkZFVzZXIoKTogdm9pZDtcclxuXHRcdGFkZFVzZXIoKTogdm9pZDtcclxuXHRcdGdvQmFjaygpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFRhYmxlSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VyRm9ybUludGVyZmFjZSB7XHJcblx0XHRvbkZvcm1TdWJtaXQoZXZlbnQ6IEV2ZW50KTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb0ludGVyZmFjZSB7XHJcblx0XHRzdGFydEVkaXRNb2RlKGV2ZW50OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRjYW5jZWxFZGl0TW9kZShldmVudD86IEV2ZW50LCBub3Jlc2V0PzogQm9vbGVhbik6IHZvaWQ7XHJcblx0XHRhY3Rpb25DYWxsYmFjayhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgYXBwQ29uZmlnSW50ZXJmYWNlIHtcclxuXHRcdHNlcnZlclVybDogc3RyaW5nO1xyXG5cdFx0dGVtcGxhdGVVcmw6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJEYXRhSW50ZXJmYWNlIHtcclxuXHRcdGlkX21lbWJlcj86IHN0cmluZztcclxuXHRcdGZpcnN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bGFzdG5hbWU6IHN0cmluZztcclxuXHRcdGVtYWlsOiBzdHJpbmc7XHJcblx0XHRwaG9uZW51bWJlcjogc3RyaW5nO1xyXG5cdFx0bG9jYXRpb246IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEVkaXRVc2VySW50ZXJmYWNlIHtcclxuXHRcdGlzVmlzaWJsZTogQm9vbGVhbjtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHQvL1RPRE86IG5lZWQgdG8gbG9vayBpbnRvIHRoaXNcclxuXHRcdHVzZXJEYXRhOiBhbnk7XHJcblx0XHR1c2VySWQ6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIE1vZGFsRGlhbG9ndWVJbnRlcmZhY2Uge1xyXG5cdFx0aXNWaXNpYmxlOiBCb29sZWFuLFxyXG5cdFx0dGl0bGU6IHN0cmluZyxcclxuXHRcdGJvZHk6IHN0cmluZyxcclxuXHRcdGJ0bjFUeHQ6IHN0cmluZyxcclxuXHRcdGJ0bjJUeHQ/OiBzdHJpbmcsXHJcblx0XHRzaG93QnRuMjogQm9vbGVhbixcclxuXHRcdGJ0bjFDYWxsYmFjaz86IEZ1bmN0aW9uLFxyXG5cdFx0YnRuMkNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0XHRjbG9zZUJ0bkNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJbmZvU2xpZGVySW50ZXJmYWNlIHtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHRib2R5OiBzdHJpbmc7XHJcblx0XHRzdGFydFRpbWVyPzogbnVtYmVyO1xyXG5cdFx0ZW5kVGltZXI/OiBudW1iZXI7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBUYWJsZUhlYWRpbmdJbnRlcmZhY2Uge1xyXG5cdFx0Y2xhc3NOYW1lOiBzdHJpbmc7XHJcblx0XHRzb3J0T3JkZXI6IHN0cmluZztcclxuXHRcdHRleHQ6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEhlYWRlckJ1dHRvbnNJbnRlcmZhY2Uge1xyXG5cdFx0c2hvd0J0bjogQm9vbGVhbjtcclxuXHRcdGNsaWNrRnVuYzogc3RyaW5nO1xyXG5cdFx0dGV4dDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEFQSVNlcnZpY2VJbnRlcmZhY2Uge1xyXG5cdFx0Z2V0Q2FsbChwYXJhbXM6IGFueSk6IGFueTtcclxuXHRcdHBvc3RDYWxsKHBhcmFtczogYW55KTogYW55O1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIERvY0V2ZW50U2VydmljZUludGVyZmFjZSB7XHJcblx0XHRiaW5kTW91c2VFdmVudChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0YmluZEtleWJvYXJkRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdHVuYmluZE1vdXNlRXZlbnQoKTogdm9pZDtcclxuXHRcdHVuYmluZEtleWJvYXJkRXZlbnQoKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBTaGFyZWRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdGJyb2FkY2FzdEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFV0aWxzU2VydmljZUludGVyZmFjZSB7XHJcblx0XHRnZXREYXRhVHlwZShvYmo6IE9iamVjdCk6IHN0cmluZztcclxuXHRcdGlzTnVsbFVuZGVmaW5lZCh2YWw6IGFueSwgdmFsaWRhdGVaZXJvTmFOPzogQm9vbGVhbik6IEJvb2xlYW47XHJcblx0XHRjbG9uZShvYmo6IGFueSk6IGFueTtcclxuXHRcdHZhbGlkYXRlRW1haWwoZW1haWw6IHN0cmluZyk6IEJvb2xlYW47XHJcblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpOiBhbnk7XHJcblx0XHRsb2coLi4ubXNnOiBhbnlbXSk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBIZWFkZXJJbnRlcmZhY2Uge1xyXG5cdFx0aGVhZGluZzogc3RyaW5nO1xyXG5cdFx0aGVhZGVyTGVmdEJ0bjogSGVhZGVyQnV0dG9uc0ludGVyZmFjZTtcclxuXHRcdGhlYWRlclJpZ2h0QnRuOiBIZWFkZXJCdXR0b25zSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnJHdpbmRvdycsXHJcblx0XHRcdCckbG9nJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3RhcnQuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgdGhpcy5vblJvdXRlQ2hhbmdlU3VjY2Vzcy5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgdGhpcy5vblJvdXRlQ2hhbmdlRXJyb3IuYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRpbmcgPSAnVXNlciBtYW5hZ2VtZW50JztcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCwgcGFyYW1zOiBPYmplY3QpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN0YXJ0OiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZVN1Y2Nlc3M6ICcsIHBhcmFtcyk7XHJcblxyXG5cdFx0XHRpZiAocGFyYW1zLm5leHQgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZSAmJiBwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0Y2FzZSAnVXNlcnNMaXN0Q29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnQWRkVXNlckNvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEFkZFVzZXJIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0VXNlckxpc3RIZWFkZXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VFcnJvcihldmVudCwgcGFyYW1zKSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VFcnJvcjogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRVc2VyTGlzdEhlYWRlcigpIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29Ub0FkZFVzZXInLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0FkZCB1c2VyJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldEFkZFVzZXJIZWFkZXIoKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb0JhY2snLFxyXG5cdFx0XHRcdCd0ZXh0JzogJ0JhY2snXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxsRnVuY3Rpb24oZXZlbnQ6IEV2ZW50LCBjbGlja0Z1bmM6IHN0cmluZykge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzW2NsaWNrRnVuY10pKSB7XHJcblx0XHRcdFx0dGhpc1tjbGlja0Z1bmNdKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnb1RvQWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdhZGQtdXNlcicsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHRnb0JhY2soKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLCBhcHAuSGVhZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2Vyc0xpc3RDb250cm9sbGVyIGltcGxlbWVudHMgVXNlcnNMaXN0SW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgdXNlcnNMaXN0OiBBcnJheTxhbnk+O1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgZWRpdFVzZXI6IEVkaXRVc2VySW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBpbmZvU2xpZGVyOiBJbmZvU2xpZGVySW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBzb3J0T3JkZXI6IHN0cmluZztcclxuXHRcdHByaXZhdGUgdGFibGVIZWFkaW5nOiBUYWJsZUhlYWRpbmdJbnRlcmZhY2VbXTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0J0FQSVNlcnZpY2UnLFxyXG5cdFx0XHQnVXRpbHNTZXJ2aWNlJyxcclxuXHRcdFx0J1NoYXJlZFNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy5zb3J0T3JkZXIgPSAnLWlkX21lbWJlcic7XHJcblx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHJcblx0XHRcdHRoaXMudXNlcnNMaXN0ID0gW107XHJcblx0XHRcdHRoaXMuZWRpdFVzZXJEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZXRhYmxlSGVhZGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldFVzZXJzKCkge1xyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UuZ2V0Q2FsbCh7XHJcblx0XHRcdFx0J3VybCc6IHRoaXMuYXBwQ29uZmlnLnNlcnZlclVybCArICdnZXR1c2Vyc2xpc3QnXHJcblx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEsIHN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc1NlcnZlckRhdGEoZGF0YSlcclxuXHRcdFx0fSkuZXJyb3IoKGRhdGEsIHN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyJylcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygncHJvY2Vzc1NlcnZlckRhdGE6ICcsIGRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBkYXRhO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0Lmxlbmd0aCA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhZGRVc2VyKCkge1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvYWRkVXNlcicpLnJlcGxhY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBBY3Rpb24gYnV0dG9ucyBoYW5kbGluZ1xyXG5cdFx0Ki9cclxuXHRcdGFjdGlvbkhhbmRsZXIodHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgdXNlckRhdGE/OiBVc2VyRGF0YUludGVyZmFjZSkge1xyXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdlZGl0JzpcclxuXHRcdFx0XHRcdHRoaXMuZWRpdFVzZXJDbGljayh1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2RlbGV0ZSc6XHJcblx0XHRcdFx0XHR0aGlzLmRlbGV0ZVVzZXJDbGljayh1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ3NhdmUnOlxyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGVVc2VyRGF0YSh1c2VyRGF0YSwgdXNlcklkKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRWRpdCB1c2VyIGNvZGUgZmxvd1xyXG5cdFx0Ki9cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3ZhbGlkYXRlRW1haWwnKTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0VXNlckNsaWNrKHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5lZGl0VXNlciA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdFZGl0IGRldGFpbHMnLFxyXG5cdFx0XHRcdHVzZXJEYXRhOiB0aGlzLnV0aWxzU2VydmljZS5jbG9uZSh0aGlzLnV0aWxzU2VydmljZS5nZXRPYmplY3RGcm9tQXJyKHRoaXMudXNlcnNMaXN0LCAnaWRfbWVtYmVyJywgdXNlcklkKSksXHJcblx0XHRcdFx0dXNlcklkOiB1c2VySWRcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LWVkaXQtbW9kYWwnLCB7IGlkOiAnZWRpdFVzZXJNb2RhbCcgfSk7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZyh0aGlzLmVkaXRVc2VyKTtcclxuXHRcdH1cclxuXHJcblx0XHR1cGRhdGVVc2VyRGF0YShkYXRhOiBVc2VyRGF0YUludGVyZmFjZSwgdXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YTogJywgZGF0YSk7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ3VwZGF0ZXVzZXInLFxyXG5cdFx0XHRcdCdkYXRhJzoge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZCxcclxuXHRcdFx0XHRcdCd1c2VyRGF0YSc6IHtcclxuXHRcdFx0XHRcdFx0ZW1haWw6IGRhdGEuZW1haWwsXHJcblx0XHRcdFx0XHRcdGZpcnN0bmFtZTogZGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGlkX21lbWJlcjogZGF0YS5pZF9tZW1iZXIsXHJcblx0XHRcdFx0XHRcdGxhc3RuYW1lOiBkYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjogZGF0YS5sb2NhdGlvbixcclxuXHRcdFx0XHRcdFx0cGhvbmVudW1iZXI6IGRhdGEucGhvbmVudW1iZXJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMub25Vc2VyVXBkYXRlUmVzcChyZXNwb25zZS5yZXNwKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YSBlcnJvcjogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRvblVzZXJVcGRhdGVSZXNwKHJlc3A6IEJvb2xlYW4pIHtcclxuXHRcdFx0dGhpcy5oaWRlRWRpdFBvcHVwKCk7XHJcblxyXG5cdFx0XHRpZiAocmVzcCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdVc2VyIHVwZGF0ZWQnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1VzZXIgaW5mbyBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXHJcblx0XHRcdFx0XHRzdGFydFRpbWVyOiA1MDAsXHJcblx0XHRcdFx0XHRlbmRUaW1lcjogNDAwMFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRib2R5OiAnV2UgaGF2ZSBlbmNvdW50ZXJlZCBlcnJvciB3aGlsZSB1cGRhdGluZyB1c2VyIGluZm9ybWF0aW9uLiBQbGVhc2UgdHJ5IGFnYWluJyxcclxuXHRcdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIERlbGV0ZSB1c2VyIGNvZGVmbG93XHJcblx0XHQqL1xyXG5cdFx0ZGVsZXRlVXNlckNsaWNrKHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSB1c2VyPycsXHJcblx0XHRcdFx0Ym9keTogJ1BsZWFzZSBjb25maXJtLCB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHVzZXInLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0c2hvd0J0bjI6IHRydWUsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZVVzZXJDb25maXJtLmJpbmQodGhpcywgdXNlcklkKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGVVc2VyQ29uZmlybSh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2RlbGV0ZVVzZXJDb25maXJtLCB1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZGVsZXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5vblVzZXJEZWxldGVkKHJlc3BvbnNlLnJlc3ApO1xyXG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uVXNlckRlbGV0ZWQocmVzcDogQm9vbGVhbikge1xyXG5cdFx0XHRpZiAocmVzcCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUoKTtcclxuXHRcdFx0XHR0aGlzLnNob3dJbmZvU2xpZGVyKHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnVXNlciBkZWxldGVkJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdVc2VyIGhhcyBiZWVuIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuXHRcdFx0XHRcdHN0YXJ0VGltZXI6IDUwMCxcclxuXHRcdFx0XHRcdGVuZFRpbWVyOiA0MDAwXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAnRXJyb3IhJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIGRlbGV0aW5nIHVzZXIuIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBHZW5lcmljIGZ1bmN0aW9ucyB0byBoaWRlIHBvcCB1cHNcclxuXHRcdCogdG8gc2hvdyBpbmZvIHNsaWRlciBldGNcclxuXHRcdCovXHJcblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtZWRpdC1tb2RhbCcsIHsgaWQ6ICdlZGl0VXNlck1vZGFsJyB9KTtcclxuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihvcmRlckJ5OiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKG9yZGVyQnkgPT09IHRoaXMuc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSAnLScgKyBvcmRlckJ5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc29ydE9yZGVyID0gb3JkZXJCeTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogSW5mb1NsaWRlckludGVyZmFjZSkge1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXIgPSB7XHJcblx0XHRcdFx0dGl0bGU6IHBhcmFtcy50aXRsZSxcclxuXHRcdFx0XHRib2R5OiBwYXJhbXMuYm9keVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctaW5mby1zbGlkZXInLCB7IGlkOiAnaW5mb1NsaWRlcicgfSk7XHJcblx0XHRcdH0sIHBhcmFtcy5zdGFydFRpbWVyKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuaGlkZUluZm9TbGlkZXIoKTtcclxuXHRcdFx0fSwgcGFyYW1zLmVuZFRpbWVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlSW5mb1NsaWRlcigpIHtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLWluZm8tc2xpZGVyJywgeyBpZDogJ2luZm9TbGlkZXInIH0pO1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXJEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRnVuY3Rpb25zIHRvIHNldCBkZWFmdWx0IHZhbHVlcyBmb3IgZGlmZmVyZW50IGNvbmZpZ3NcclxuXHRcdCovXHJcblx0XHRjcmVhdGV0YWJsZUhlYWRpbmcoKSB7XHJcblx0XHRcdHRoaXMudGFibGVIZWFkaW5nID0gW3tcclxuXHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcclxuXHRcdFx0XHQnc29ydE9yZGVyJzogJ2lkX21lbWJlcicsXHJcblx0XHRcdFx0J3RleHQnOiAnUy5ObydcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2ZpcnN0bmFtZScsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdGaXJzdCBuYW1lJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdsYXN0bmFtZScsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdMYXN0IG5hbWUnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMycsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2VtYWlsJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0VtYWlsJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdwaG9uZW51bWJlcicsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdQaG9uZSBOdW1iZXInXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMScsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xvY2F0aW9uJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0xvY2F0aW9uJ1xyXG5cdFx0XHRcdH1dO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVkaXRVc2VyRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5lZGl0VXNlciA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHR1c2VyRGF0YToge30sXHJcblx0XHRcdFx0dXNlcklkOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0Ym9keTogJycsXHJcblx0XHRcdFx0YnRuMVR4dDogJycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyID0ge1xyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJzTGlzdENvbnRyb2xsZXInLCBhcHAuVXNlcnNMaXN0Q29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBZGRVc2VyQ29udHJvbGxlciBpbXBsZW1lbnRzIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnQVBJU2VydmljZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRzY29wZS4kb24oJ2FkZC11c2VyJywgZnVuY3Rpb24oZXZlbnQsIGFyZ3MpIHtcclxuXHRcdFx0XHR0aGlzLmFkZFVzZXIoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudXNlckRhdGFEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRoaXMudXRpbHNTZXJ2aWNlLnZhbGlkYXRlRW1haWwodmFsKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUZvcm0oKSB7XHJcblx0XHRcdC8vIG1ha2UgbnVsbCB1bmRlZmluZWQgY2hlY2tzIGhlcmVcclxuXHRcdFx0aWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmZpcnN0bmFtZSkgfHwgdGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEubGFzdG5hbWUpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tbmFtZScpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5lbWFpbCkpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1lbWFpbCcpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5waG9uZW51bWJlcikpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1waG9uZW51bWJlcicpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5sb2NhdGlvbikpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1sb2NhdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnb3RvVXNlckxpc3QoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdhZGQgdXNlcjogJywgdGhpcy51c2VyRGF0YSk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy52YWxpZGF0ZUZvcm0oKSkge1xyXG5cdFx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2FkZHVzZXInLFxyXG5cdFx0XHRcdFx0ZGF0YTogdGhpcy51c2VyRGF0YSxcclxuXHRcdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3N1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcCAmJiByZXNwb25zZS5yZXNwID09PSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2VtYWlsSW5Vc2UnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZ290b1VzZXJMaXN0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHVzZXJEYXRhRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy51c2VyRGF0YSA9IHtcclxuXHRcdFx0XHQnZmlyc3RuYW1lJzogJycsXHJcblx0XHRcdFx0J2xhc3RuYW1lJzogJycsXHJcblx0XHRcdFx0J2VtYWlsJzogJycsXHJcblx0XHRcdFx0J3Bob25lbnVtYmVyJzogJycsXHJcblx0XHRcdFx0J2xvY2F0aW9uJzogJ0lOJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKSB7XHJcblx0XHRcdGxldCB0aXRsZTogc3RyaW5nID0gJycsXHJcblx0XHRcdFx0Ym9keTogc3RyaW5nID0gJyc7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGVycm9yVHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2VtYWlsSW5Vc2UnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdFbWFpbCBJRCBpcyBhbHJlYWR5IGluIHVzZSwgcGxlYXNlIGVudGVyIGEgdW5pcXVlIEVtYWlsIGFkZHJlc3MnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLW5hbWUnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgRmlyc3QgbmFtZS9MYXN0IG5hbWUnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLWVtYWlsJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHRoZSBlbWFpbCBhZGRyZXNzJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1waG9uZW51bWJlcic6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCBwaG9uZSBudW1iZXInO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLWxvY2F0aW9uJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBzZWxlY3QgbG9jYXRpb24nO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogdGl0bGUsXHJcblx0XHRcdFx0Ym9keTogYm9keSxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLW1vZGFsJywgeyBpZDogJ21vZGFsRGlhbG9ndWUnIH0pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdBZGRVc2VyQ29udHJvbGxlcicsIGFwcC5BZGRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBFZGl0VXNlckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0VkaXRVc2VyQ29udHJvbGxlcicsIGFwcC5FZGl0VXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJywgYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJGb3JtQ29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJGb3JtSW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgZm9ybVN1Ym1pdDogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgdXNlckRhdGFJZDogc3RyaW5nO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0b25Gb3JtU3VibWl0KGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZm9ybVN1Ym1pdCh7IGRhdGE6IHRoaXMudXNlckRhdGEsIHVzZXJEYXRhSWQ6IHRoaXMudXNlckRhdGFJZCB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlckZvcm1Db250cm9sbGVyJywgYXBwLlVzZXJGb3JtQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBUYWJsZUhlYWRlckludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHNvcnRGdW5jOiBGdW5jdGlvbjtcclxuXHRcdHByaXZhdGUgZGVmYXVsdENsYXNzOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIGxhc3RTb3J0T3JkZXI6IHN0cmluZztcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckZWxlbWVudCdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmRlZmF1bHRDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKGV2ZW50OiBFdmVudCwgc29ydE9yZGVyOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG5ld0NsYXNzID0gJ2Fycm93IGFycm93LXVwJyxcclxuXHRcdFx0XHR0YXJnZXQgPSA8SFRNTEVsZW1lbnQ+IGV2ZW50LnRhcmdldDtcclxuXHJcblx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmZpbmQodGFyZ2V0KS5maW5kKCdzcGFuJykuaGFzQ2xhc3MoJ2Fycm93LXVwJykpIHtcclxuXHRcdFx0XHRuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMubGFzdFNvcnRPcmRlciAhPT0gc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjaGVhZGluZ18nICsgdGhpcy5sYXN0U29ydE9yZGVyKS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyh0aGlzLmRlZmF1bHRDbGFzcyk7XHJcblx0XHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gc29ydE9yZGVyO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCh0YXJnZXQpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKG5ld0NsYXNzKTtcclxuXHJcblx0XHRcdHRoaXMuc29ydEZ1bmMoe1xyXG5cdFx0XHRcdCdvcmRlckJ5Jzogc29ydE9yZGVyXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdUYWJsZUhlYWRlckNvbnRyb2xsZXInLCBhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdJbmZvU2xpZGVyQ29udHJvbGxlcicsIGFwcC5JbmZvU2xpZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VySW5mb0NvbnRyb2xsZXIgaW1wbGVtZW50cyBVc2VySW5mb0ludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHJlYWRPbmx5TW9kZTogQm9vbGVhbjtcclxuXHRcdHByaXZhdGUgYWN0aW9uSGFuZGxlcjogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJHRpbWVvdXQnLFxyXG5cdFx0XHQnJGVsZW1lbnQnLFxyXG5cdFx0XHQnRG9jRXZlbnRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGRvY0V2ZW50U2VydmljZTogRG9jRXZlbnRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXJ0RWRpdE1vZGUoJGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5yZWFkT25seU1vZGUpIHtcclxuXHRcdFx0XHR0aGlzLnJlYWRPbmx5TW9kZSA9IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLmJpbmRLZXlib2FyZEV2ZW50KHRoaXMuY2FuY2VsRWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcblx0XHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UuYmluZE1vdXNlRXZlbnQodGhpcy5vbk1vdXNlQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvbk1vdXNlQ2xpY2soZXZlbnQpIHtcclxuXHRcdFx0bGV0IHRhZ05hbWUgPSBldmVudC50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdFx0aWYgKCh0YWdOYW1lICE9PSAnaW5wdXQnICYmIHRhZ05hbWUgIT09ICdzZWxlY3QnKSB8fCAodGhpcy4kZWxlbWVudC5maW5kKGV2ZW50LnRhcmdldCkubGVuZ3RoID09PSAwKSkge1xyXG5cdFx0XHRcdHRoaXMuY2FuY2VsRWRpdE1vZGUoZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FuY2VsRWRpdE1vZGUoZXZlbnQ/OiBFdmVudCwgbm9yZXNldD86IEJvb2xlYW4pIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmRvY0V2ZW50U2VydmljZS51bmJpbmRLZXlib2FyZEV2ZW50KCk7XHJcblx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLnVuYmluZE1vdXNlRXZlbnQoKTtcclxuXHJcblx0XHRcdHRoaXMucmVhZE9ubHlNb2RlID0gdHJ1ZTtcclxuXHRcdFx0LyppZiAodGhpcy4kc2NvcGUuJHJvb3QuJCRwaGFzZSAhPSAnJGFwcGx5JyAmJiB0aGlzLiRzY29wZS4kcm9vdC4kJHBoYXNlICE9ICckZGlnZXN0Jykge1xyXG5cdFx0XHRcdHRoaXMuJHNjb3BlLiRhcHBseSgpO1xyXG5cdFx0XHR9Ki9cclxuXHJcblx0XHRcdGlmICghbm9yZXNldCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdpbiBub3Jlc2V0OiAnLCB0aGlzLnVzZXJEYXRhKTtcclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNmaXJzdG5hbWUnKS52YWwodGhpcy51c2VyRGF0YS5maXJzdG5hbWUpO1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2xhc3RuYW1lJykudmFsKHRoaXMudXNlckRhdGEubGFzdG5hbWUpO1xyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCgnI2xvY2F0aW9uJykudmFsKHRoaXMudXNlckRhdGEubG9jYXRpb24pO1xyXG5cclxuXHRcdFx0XHR0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuJHNjb3BlLiRhcHBseSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YWN0aW9uQ2FsbGJhY2soZXZlbnQ6IEV2ZW50LCB0eXBlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKCdhY3Rpb25DYWxsYmFjazogJywgdHlwZSwgJyA6ICcsIHVzZXJJZCk7XHJcblx0XHRcdGlmICh0eXBlID09PSAnc2F2ZScpIHtcclxuXHRcdFx0XHR2YXIgdXNlckRhdGEgPSB7XHJcblx0XHRcdFx0XHRpZF9tZW1iZXI6IHRoaXMudXNlckRhdGEuaWRfbWVtYmVyLFxyXG5cdFx0XHRcdFx0Zmlyc3RuYW1lOiB0aGlzLiRlbGVtZW50LmZpbmQoJyNmaXJzdG5hbWUnKS52YWwoKSxcclxuXHRcdFx0XHRcdGxhc3RuYW1lOiB0aGlzLiRlbGVtZW50LmZpbmQoJyNsYXN0bmFtZScpLnZhbCgpLFxyXG5cdFx0XHRcdFx0ZW1haWw6IHRoaXMudXNlckRhdGEuZW1haWwsXHJcblx0XHRcdFx0XHRwaG9uZW51bWJlcjogdGhpcy51c2VyRGF0YS5waG9uZW51bWJlcixcclxuXHRcdFx0XHRcdGxvY2F0aW9uOiB0aGlzLiRlbGVtZW50LmZpbmQoJyNsb2NhdGlvbicpLnZhbCgpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR0aGlzLmNhbmNlbEVkaXRNb2RlKG51bGwsIHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFjdGlvbkhhbmRsZXIoeyB0eXBlOiB0eXBlLCB1c2VySWQ6IHVzZXJJZCwgdXNlckRhdGE6IHVzZXJEYXRhIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdVc2VySW5mb0NvbnRyb2xsZXInLCBhcHAuVXNlckluZm9Db250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0VXNlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiAnPScsXHJcblx0XHRcdHRpdGxlOiAnPScsXHJcblx0XHRcdHVzZXJEYXRhOiAnPScsXHJcblx0XHRcdHVzZXJJZDogJz0nLFxyXG5cdFx0XHRoaWRlUG9wdXA6ICcmJyxcclxuXHRcdFx0dXBkYXRlRGF0YTogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnRWRpdFVzZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctZWRpdC1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuZmluZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuaWQpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1lZGl0LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0ZWxlbWVudC5maW5kKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuKCAoKSA9PiBuZXcgRWRpdFVzZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdlZGl0VXNlcicsIGFwcC5FZGl0VXNlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdGlzVmlzaWJsZTogJz0nLFxyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRib2R5OiAnPScsXHJcblx0XHRcdGJ0bjFUeHQ6ICc9JyxcclxuXHRcdFx0YnRuMlR4dDogJz0nLFxyXG5cdFx0XHRzaG93QnRuMjogJz0nLFxyXG5cdFx0XHRidG4xQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0YnRuMkNhbGxiYWNrOiAnJicsXHJcblx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6ICcmJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRsaW5rKHNjb3BlOm5nLklTY29wZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctbW9kYWwnLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRlbGVtZW50LmZpbmQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtbW9kYWwnLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRlbGVtZW50LmZpbmQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBNb2RhbERpYWxvZ3VlRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdtb2RhbERpYWxvZ3VlJywgYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVc2VyRm9ybURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0dXNlckRhdGE6ICc9JyxcclxuXHRcdFx0dXNlcklkOiAnPScsXHJcblx0XHRcdGVkaXRNb2RlOiAnPScsXHJcblx0XHRcdHZhbGlkYXRlRW1haWw6ICcmJyxcclxuXHRcdFx0Zm9ybVN1Ym1pdDogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVXNlckZvcm1Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVXNlckZvcm1EaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VyRm9ybScsIGFwcC5Vc2VyRm9ybURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0YWJsZUhlYWRpbmc6ICc9JyxcclxuXHRcdFx0c29ydEZ1bmM6ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1RhYmxlSGVhZGVyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVGFibGVIZWFkZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd0YWJsZUhlYWRlcicsIGFwcC5UYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdC8vIHByaXZhdGUgdGltZXI6IG51bWJlcjtcclxuXHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRib2R5OiAnPSdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ0luZm9TbGlkZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGUsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LWluZm8tc2xpZGVyJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0ZWxlbWVudC5maW5kKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWluZm8tc2xpZGVyJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0ZWxlbWVudC5maW5kKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgSW5mb1NsaWRlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnaW5mb1NsaWRlcicsIGFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVXNlckluZm9EaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdC8vIHByaXZhdGUgdGltZXI6IG51bWJlcjtcclxuXHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHRhY3Rpb25IYW5kbGVyOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3VzZXItaW5mby5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VySW5mb0NvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZSkgeyB9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VySW5mb0RpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgndXNlckluZm8nLCBhcHAuVXNlckluZm9EaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2UgaW1wbGVtZW50cyBBUElTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cdFx0aHR0cFNlcnZpY2U6IG5nLklIdHRwU2VydmljZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UpIHtcclxuXHRcdFx0dGhpcy5odHRwU2VydmljZSA9ICRodHRwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldENhbGwocGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0bGV0IGNvbmZpZyA9IHBhcmFtcy5jb25maWcgfHwge307XHJcblx0XHRcdHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChwYXJhbXMudXJsLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc3RDYWxsKHBhcmFtczogYW55KSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdwYXJhbXM6ICcsIHBhcmFtcyk7XHJcblx0XHRcdHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QocGFyYW1zLnVybCwgcGFyYW1zLmRhdGEsIHtcclxuXHRcdFx0XHRoZWFkZXJzOiBwYXJhbXMuaGVhZGVyc1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnQVBJU2VydmljZScsIGFwcC5BUElTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIGltcGxlbWVudHMgU2hhcmVkU2VydmljZUludGVyZmFjZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkgeyB9XHJcblxyXG4gICAgICAgIGJyb2FkY2FzdEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGV2ZW50TmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdTaGFyZWRTZXJ2aWNlJywgYXBwLlNoYXJlZFNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFV0aWxzU2VydmljZSBpbXBsZW1lbnRzIFV0aWxzU2VydmljZUludGVyZmFjZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAgICAgZ2V0RGF0YVR5cGUob2JqOiBhbnkpIHtcclxuXHRcdFx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChvYmopLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aXNOdWxsVW5kZWZpbmVkKHZhbDogYW55LCB2YWxpZGF0ZVplcm9OYU4/OiBCb29sZWFuKSB7XHJcblx0XHRcdGxldCBpc051bGw6IEJvb2xlYW4gPSBmYWxzZSxcclxuXHRcdFx0XHR0eXBlID0gdGhpcy5nZXREYXRhVHlwZSh2YWwpO1xyXG5cclxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnW29iamVjdCBhcnJheV0nOlxyXG5cdFx0XHRcdFx0aWYgKHZhbC5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdbb2JqZWN0IG9iamVjdF0nOlxyXG5cdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHZhbCkgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gXCJcIiB8fCB2YWwgPT09IFwibnVsbFwiIHx8IHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2YWxpZGF0ZVplcm9OYU4gJiYgKHZhbCA9PT0gMCB8fCBpc05hTih2YWwpKSkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpc051bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xvbmUob2JqOiBhbnkpIHtcclxuXHRcdFx0aWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZiAob2JqKSAhPSAnb2JqZWN0JylcclxuXHRcdFx0XHRyZXR1cm4gb2JqO1xyXG5cclxuXHRcdFx0dmFyIHRlbXAgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XHJcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopXHJcblx0XHRcdFx0dGVtcFtrZXldID0gdGhpcy5jbG9uZShvYmpba2V5XSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGVtcDtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBCb29sZWFuIHtcclxuXHRcdFx0dmFyIGVtYWlsUmVnZXhwID0gL15bYS16MC05ISMkJSYnKitcXC89P15fYHt8fX4uLV0rQFthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KFxcLlthLXowLTldKFthLXowLTktXSpbYS16MC05XSk/KSokL2k7XHJcblxyXG5cdFx0XHRpZiAoZW1haWwgJiYgZW1haWxSZWdleHAudGVzdChlbWFpbCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnZXRPYmplY3RGcm9tQXJyKGFycjogQXJyYXk8YW55PiwgcHJvcE5hbWU6IHN0cmluZywgcHJvcFZhbHVlOiBhbnkpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoYXJyW2ldW3Byb3BOYW1lXSA9PSBwcm9wVmFsdWUpIHJldHVybiBhcnJbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRsb2coLi4ubXNnOiBhbnlbXSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ1V0aWxzU2VydmljZScsIGFwcC5VdGlsc1NlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBleHBvcnQgY2xhc3MgRG9jRXZlbnRTZXJ2aWNlIGltcGxlbWVudHMgRG9jRXZlbnRTZXJ2aWNlSW50ZXJmYWNlIHtcclxuICAgIHByaXZhdGUgZG9jUmVmOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICckZG9jdW1lbnQnXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGRvY3VtZW50OiBuZy5JRG9jdW1lbnRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBiaW5kTW91c2VFdmVudChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgdGhpcy4kZG9jdW1lbnQub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5Ym9hcmRFdmVudChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgdGhpcy4kZG9jdW1lbnQub24oJ2tleWRvd24ga2V5cHJlc3MnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDI3KSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRNb3VzZUV2ZW50KCkge1xyXG4gICAgICB0aGlzLiRkb2N1bWVudC5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kS2V5Ym9hcmRFdmVudCgpIHtcclxuICAgICAgdGhpcy4kZG9jdW1lbnQub2ZmKCdrZXlkb3duIGtleXByZXNzJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0RvY0V2ZW50U2VydmljZScsIGFwcC5Eb2NFdmVudFNlcnZpY2UpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9qcXVlcnkvanF1ZXJ5LmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci1yb3V0ZS5kLnRzXCIgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FwcC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvbW9kdWxlcy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29uc3RhbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25maWcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3JvdXRlLWhhbmRsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItbGlzdC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL2hlYWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdGFibGUtaGVhZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3VzZXItaW5mby5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvYXBwLWNvbmZpZy5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS91c2VyLWRhdGEuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvZWRpdC11c2VyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2luZm8tc2xpZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL3RhYmxlLWhlYWRpbmcuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvaGVhZGVyLWJ1dHRvbnMuaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9hcGkuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3NlcnZpY2VzL2RvYy1ldmVudC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvc2hhcmVkLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy91dGlscy5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvdXNlcnMtbGlzdC5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItZm9ybS5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvdXRpbHMuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMnIC8+XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHRleHBvcnQgdmFyIGZvcm1BcHAgPSBhbmd1bGFyLm1vZHVsZSgnZm9ybUFwcCcsIFsnbmdSb3V0ZScsICdjb250cm9sbGVycycsICdzZXJ2aWNlcycsICdkaXJlY3RpdmVzJ10pO1xyXG5cclxuXHRmb3JtQXBwLmNvbmZpZyhDb25maWcpO1xyXG4gICAgZm9ybUFwcC5ydW4oWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdTaGFyZWRTZXJ2aWNlJywgUm91dGVIYW5kbGVyXSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
