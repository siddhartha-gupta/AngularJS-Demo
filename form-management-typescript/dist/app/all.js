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
/// <reference path='ts/directives/edit-user.directive.ts' />
/// <reference path='ts/directives/modal-dialogue.directive.ts' />
/// <reference path='ts/directives/user-form.directive.ts' />
/// <reference path='ts/directives/table-header.directive.ts' />
/// <reference path='ts/directives/info-slider.directive.ts' />
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9hcHAtY29uZmlnLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvaGVhZGVyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZWRpdC11c2VyLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvbW9kYWwtZGlhbG9ndWUuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMiLCJ0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdXNlci1mb3JtLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvaW5mby1zbGlkZXIuZGlyZWN0aXZlLnRzIiwidHMvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZS50cyIsInRzL3NlcnZpY2VzL3V0aWxzLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIl0sIm5hbWVzIjpbImFwcCIsImFwcC5Db25zdGFudHMiLCJhcHAuQ29uc3RhbnRzLmNvbnN0cnVjdG9yIiwiYXBwLkNvbnN0YW50cy5EZWZhdWx0IiwiYXBwLkNvbmZpZyIsImFwcC5Db25maWcuY29uc3RydWN0b3IiLCJhcHAuUm91dGVIYW5kbGVyIiwiYXBwLlJvdXRlSGFuZGxlci5jb25zdHJ1Y3RvciIsImFwcC5IZWFkZXJDb250cm9sbGVyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlU3RhcnQiLCJhcHAuSGVhZGVyQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlU3VjY2VzcyIsImFwcC5IZWFkZXJDb250cm9sbGVyLm9uUm91dGVDaGFuZ2VFcnJvciIsImFwcC5IZWFkZXJDb250cm9sbGVyLnNldFVzZXJMaXN0SGVhZGVyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuc2V0QWRkVXNlckhlYWRlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmNhbGxGdW5jdGlvbiIsImFwcC5IZWFkZXJDb250cm9sbGVyLmdvVG9BZGRVc2VyIiwiYXBwLkhlYWRlckNvbnRyb2xsZXIuYWRkVXNlciIsImFwcC5IZWFkZXJDb250cm9sbGVyLmdvQmFjayIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5jcmVhdGV0YWJsZUhlYWRpbmciLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5kYXRhQXZhaWxhYmxlIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZ2V0VXNlcnMiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5wcm9jZXNzU2VydmVyRGF0YSIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmFkZFVzZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci52YWxpZGF0ZUVtYWlsIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuZWRpdFVzZXJDbGljayIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLnVwZGF0ZVVzZXJEYXRhIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIub25Vc2VyVXBkYXRlZCIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmhpZGVFZGl0UG9wdXAiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5lZGl0VXNlckRlZmF1bHQiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5kZWxldGVVc2VyQ2xpY2siLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5kZWxldGVVc2VyQ29uZmlybSIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmhpZGVNb2RhbERpYWxvZ3VlIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIubW9kYWxEaWFsb2d1ZURlZmF1bHQiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5tYW5hZ2VTb3J0T3JkZXIiLCJhcHAuVXNlcnNMaXN0Q29udHJvbGxlci5zaG93SW5mb1NsaWRlciIsImFwcC5Vc2Vyc0xpc3RDb250cm9sbGVyLmhpZGVJbmZvU2xpZGVyIiwiYXBwLlVzZXJzTGlzdENvbnRyb2xsZXIuaW5mb1NsaWRlckRlZmF1bHQiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIudmFsaWRhdGVFbWFpbCIsImFwcC5BZGRVc2VyQ29udHJvbGxlci52YWxpZGF0ZUZvcm0iLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIuZ290b1VzZXJMaXN0IiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmFkZFVzZXIiLCJhcHAuQWRkVXNlckNvbnRyb2xsZXIudXNlckRhdGFEZWZhdWx0IiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLnNob3dNb2RhbERpYWxvZ3VlIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLmhpZGVNb2RhbERpYWxvZ3VlIiwiYXBwLkFkZFVzZXJDb250cm9sbGVyLm1vZGFsRGlhbG9ndWVEZWZhdWx0IiwiYXBwLkVkaXRVc2VyQ29udHJvbGxlciIsImFwcC5FZGl0VXNlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIiLCJhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVXNlckZvcm1Db250cm9sbGVyIiwiYXBwLlVzZXJGb3JtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5Vc2VyRm9ybUNvbnRyb2xsZXIub25Gb3JtU3VibWl0IiwiYXBwLlRhYmxlSGVhZGVyQ29udHJvbGxlciIsImFwcC5UYWJsZUhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyLm1hbmFnZVNvcnRPcmRlciIsImFwcC5JbmZvU2xpZGVyQ29udHJvbGxlciIsImFwcC5JbmZvU2xpZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsImFwcC5FZGl0VXNlckRpcmVjdGl2ZSIsImFwcC5FZGl0VXNlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5FZGl0VXNlckRpcmVjdGl2ZS5saW5rIiwiYXBwLkVkaXRVc2VyRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZSIsImFwcC5Nb2RhbERpYWxvZ3VlRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUubGluayIsImFwcC5Nb2RhbERpYWxvZ3VlRGlyZWN0aXZlLmZhY3RvcnkiLCJhcHAuVXNlckZvcm1EaXJlY3RpdmUiLCJhcHAuVXNlckZvcm1EaXJlY3RpdmUuY29uc3RydWN0b3IiLCJhcHAuVXNlckZvcm1EaXJlY3RpdmUuZmFjdG9yeSIsImFwcC5UYWJsZUhlYWRlckRpcmVjdGl2ZSIsImFwcC5UYWJsZUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5UYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLkluZm9TbGlkZXJEaXJlY3RpdmUiLCJhcHAuSW5mb1NsaWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsImFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlLmxpbmsiLCJhcHAuSW5mb1NsaWRlckRpcmVjdGl2ZS5mYWN0b3J5IiwiYXBwLkFQSVNlcnZpY2UiLCJhcHAuQVBJU2VydmljZS5jb25zdHJ1Y3RvciIsImFwcC5BUElTZXJ2aWNlLmdldENhbGwiLCJhcHAuQVBJU2VydmljZS5wb3N0Q2FsbCIsImFwcC5TaGFyZWRTZXJ2aWNlIiwiYXBwLlNoYXJlZFNlcnZpY2UuY29uc3RydWN0b3IiLCJhcHAuVXRpbHNTZXJ2aWNlIiwiYXBwLlV0aWxzU2VydmljZS5jb25zdHJ1Y3RvciIsImFwcC5VdGlsc1NlcnZpY2UuZ2V0RGF0YVR5cGUiLCJhcHAuVXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCIsImFwcC5VdGlsc1NlcnZpY2UuY2xvbmUiLCJhcHAuVXRpbHNTZXJ2aWNlLnZhbGlkYXRlRW1haWwiLCJhcHAuVXRpbHNTZXJ2aWNlLmdldE9iamVjdEZyb21BcnIiLCJhcHAuVXRpbHNTZXJ2aWNlLmxvZyJdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DO0FBRW5DLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENB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OUQsNkRBQTZEO0FBQzdELDBEQUEwRDtBQUMxRCw2REFBNkQ7QUFDN0Qsa0VBQWtFO0FBQ2xFLCtEQUErRDtBQUUvRCw0REFBNEQ7QUFDNUQsZ0VBQWdFO0FBQ2hFLDhEQUE4RDtBQUU5RCwwRUFBMEU7QUFDMUUsK0VBQStFO0FBQy9FLDBFQUEwRTtBQUMxRSw2RUFBNkU7QUFDN0UsNEVBQTRFO0FBRTVFLDZEQUE2RDtBQUM3RCxrRUFBa0U7QUFDbEUsNkRBQTZEO0FBQzdELGdFQUFnRTtBQUNoRSwrREFBK0Q7QUFFL0QsbURBQW1EO0FBQ25ELHNEQUFzRDtBQUN0RCxxREFBcUQ7OztBQ3RDckQsZ0NBQWdDO0FBRWhDLElBQU8sR0FBRyxDQUtUO0FBTEQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNBQSxXQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxTQUFTQSxFQUFFQSxhQUFhQSxFQUFFQSxVQUFVQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVyR0EsV0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDcEJBLFdBQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLFlBQVlBLEVBQUVBLFdBQVdBLEVBQUVBLGVBQWVBLEVBQUVBLGdCQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUM1RUEsQ0FBQ0EsRUFMTSxHQUFHLEtBQUgsR0FBRyxRQUtUIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbnZhciBzZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCdzZXJ2aWNlcycsIFtdKTtcclxudmFyIGNvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2NvbnRyb2xsZXJzJywgW10pO1xyXG52YXIgZGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzJywgW10pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG5cdFx0c3RhdGljIGdldCBEZWZhdWx0KCk6IGFueSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICcuLi90ZW1wbGF0ZXMvJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgICAgICckcm91dGVQcm92aWRlcidcclxuICAgICAgICBdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCRyb3V0ZVByb3ZpZGVyOiBuZy5yb3V0ZS5JUm91dGVQcm92aWRlcikge1xyXG5cdFx0XHQkcm91dGVQcm92aWRlci53aGVuKFwiL3VzZXJzbGlzdFwiLCB7XHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICd1c2Vyc0xpc3QuaHRtbCcsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ1VzZXJzTGlzdENvbnRyb2xsZXInLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2N1c3RvbUNvbnRyb2xsZXInXHJcblx0XHRcdH0pLndoZW4oJy9hZGRVc2VyJywge1xyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdBZGRVc2VyQ29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcicsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdhZGRVc2VyLmh0bWwnXHJcblx0XHRcdH0pLm90aGVyd2lzZSh7IHJlZGlyZWN0VG86ICcvdXNlcnNsaXN0JyB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgUm91dGVIYW5kbGVyIHtcclxuXHRcdHN0YXRpYyBpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ3NoYXJlZFNlcnZpY2UnXTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgJHJvb3RTY29wZTogYW55LCAvL25nLklSb290U2NvcGVTZXJ2aWNlLFxyXG5cdFx0XHQkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkcm9vdFNjb3BlLlV0aWxzID0ge1xyXG5cdFx0XHRcdGtleXM6IE9iamVjdC5rZXlzXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdGFydCcsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdWNjZXNzJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZUVycm9yXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VFcnJvcicsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlcnNMaXN0SW50ZXJmYWNlIHtcclxuXHRcdGRhdGFBdmFpbGFibGUoKVxyXG5cdFx0Z2V0VXNlcnMoKVxyXG5cdFx0cHJvY2Vzc1NlcnZlckRhdGEoZGF0YTogYW55KVxyXG5cdFx0YWRkVXNlcigpXHJcblx0XHRlZGl0VXNlckNsaWNrKGV2ZW50OiBFdmVudCwga2V5OiBzdHJpbmcpXHJcblx0XHR1cGRhdGVVc2VyRGF0YShkYXRhOiBhbnksIHVzZXJJZDogc3RyaW5nKVxyXG5cdFx0aGlkZUVkaXRQb3B1cChldmVudD86IEV2ZW50KVxyXG5cdFx0ZWRpdFVzZXJEZWZhdWx0KClcclxuXHRcdGRlbGV0ZVVzZXJDbGljayhldmVudDogRXZlbnQsIGtleTogc3RyaW5nKVxyXG5cdFx0ZGVsZXRlVXNlckNvbmZpcm0oa2V5OiBzdHJpbmcpXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KVxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZylcclxuXHRcdHZhbGlkYXRlRm9ybSgpXHJcblx0XHRhZGRVc2VyKClcclxuXHRcdHVzZXJEYXRhRGVmYXVsdCgpXHJcblx0XHRzaG93TW9kYWxEaWFsb2d1ZShlcnJvclR5cGU6IHN0cmluZylcclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzpFdmVudClcclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KClcclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignQWRkVXNlckNvbnRyb2xsZXInLCBhcHAuQWRkVXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgYXBwQ29uZmlnSW50ZXJmYWNlIHtcclxuXHRcdHNlcnZlclVybDogc3RyaW5nO1xyXG5cdFx0dGVtcGxhdGVVcmw6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJEYXRhSW50ZXJmYWNlIHtcclxuXHRcdGZpcnN0bmFtZTogc3RyaW5nO1xyXG5cdFx0bGFzdG5hbWU6IHN0cmluZztcclxuXHRcdGVtYWlsOiBzdHJpbmc7XHJcblx0XHRwaG9uZW51bWJlcjogc3RyaW5nO1xyXG5cdFx0bG9jYXRpb246IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEJ1dHRvbnNJbnRlcmZhY2Uge1xyXG5cdFx0J3Nob3dCdG4nOiBCb29sZWFuLFxyXG5cdFx0J2NsaWNrRnVuYyc6IHN0cmluZyxcclxuXHRcdCd0ZXh0Jzogc3RyaW5nXHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEhlYWRlckludGVyZmFjZSB7XHJcblx0XHRvblJvdXRlQ2hhbmdlU3RhcnQoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdClcclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBhbnkpXHJcblx0XHRvblJvdXRlQ2hhbmdlRXJyb3IoZXZlbnQsIHBhcmFtcylcclxuXHRcdHNldFVzZXJMaXN0SGVhZGVyKClcclxuXHRcdHNldEFkZFVzZXJIZWFkZXIoKVxyXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpXHJcblx0XHRnb1RvQWRkVXNlcigpXHJcblx0XHRhZGRVc2VyKClcclxuXHRcdGdvQmFjaygpXHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBFZGl0VXNlckludGVyZmFjZSB7XHJcblx0XHRpc1Zpc2libGU6IEJvb2xlYW47XHJcblx0XHR0aXRsZTogc3RyaW5nO1xyXG5cdFx0dXNlckRhdGE6IGFueTtcclxuXHRcdHVzZXJJZDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgTW9kYWxEaWFsb2d1ZUludGVyZmFjZSB7XHJcblx0XHRpc1Zpc2libGU6IEJvb2xlYW4sXHJcblx0XHR0aXRsZTogc3RyaW5nLFxyXG5cdFx0Ym9keTogc3RyaW5nLFxyXG5cdFx0YnRuMVR4dDogc3RyaW5nLFxyXG5cdFx0YnRuMlR4dD86IHN0cmluZyxcclxuXHRcdHNob3dCdG4yOiBCb29sZWFuLFxyXG5cdFx0YnRuMUNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0XHRidG4yQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHRcdGNsb3NlQnRuQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEluZm9TbGlkZXJJbnRlcmZhY2Uge1xyXG5cdFx0dGl0bGU6IHN0cmluZztcclxuXHRcdGJvZHk6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgSGVhZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIEhlYWRlckludGVyZmFjZSB7XHJcblx0XHRoZWFkaW5nOiBzdHJpbmc7XHJcblx0XHRoZWFkZXJMZWZ0QnRuOiBCdXR0b25zSW50ZXJmYWNlO1xyXG5cdFx0aGVhZGVyUmlnaHRCdG46IEJ1dHRvbnNJbnRlcmZhY2U7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCckd2luZG93JyxcclxuXHRcdFx0JyRsb2cnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdGFydFwiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdGFydC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0JHNjb3BlLiRvbihcInJvdXRlQ2hhbmdlU3VjY2Vzc1wiLCB0aGlzLm9uUm91dGVDaGFuZ2VTdWNjZXNzLmJpbmQodGhpcykpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCB0aGlzLm9uUm91dGVDaGFuZ2VFcnJvci5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGluZyA9ICdVc2VyIG1hbmFnZW1lbnQnO1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogZmFsc2UsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICcnLFxyXG5cdFx0XHRcdCd0ZXh0JzogJydcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlU3RhcnQoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IE9iamVjdCkge1xyXG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3RhcnQ6ICcsIHBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZVN1Y2Nlc3MoZXZlbnQ6IEV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlU3VjY2VzczogJywgcGFyYW1zKTtcclxuXHJcblx0XHRcdGlmIChwYXJhbXMubmV4dCAmJiBwYXJhbXMubmV4dC4kJHJvdXRlICYmIHBhcmFtcy5uZXh0LiQkcm91dGUuY29udHJvbGxlcikge1xyXG5cdFx0XHRcdHN3aXRjaCAocGFyYW1zLm5leHQuJCRyb3V0ZS5jb250cm9sbGVyKSB7XHJcblx0XHRcdFx0XHRjYXNlICdVc2Vyc0xpc3RDb250cm9sbGVyJzpcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRVc2VyTGlzdEhlYWRlcigpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRjYXNlICdBZGRVc2VyQ29udHJvbGxlcic6XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0QWRkVXNlckhlYWRlcigpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRVc2VyTGlzdEhlYWRlcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Sb3V0ZUNoYW5nZUVycm9yKGV2ZW50LCBwYXJhbXMpIHtcclxuXHRcdFx0Ly8gdGhpcy4kbG9nLmxvZygnb25Sb3V0ZUNoYW5nZUVycm9yOiAnLCBwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFVzZXJMaXN0SGVhZGVyKCkge1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IHRydWUsXHJcblx0XHRcdFx0J2NsaWNrRnVuYyc6ICdnb1RvQWRkVXNlcicsXHJcblx0XHRcdFx0J3RleHQnOiAnQWRkIHVzZXInXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0QWRkVXNlckhlYWRlcigpIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJMZWZ0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvQmFjaycsXHJcblx0XHRcdFx0J3RleHQnOiAnQmFjaydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGNhbGxGdW5jdGlvbihldmVudDogRXZlbnQsIGNsaWNrRnVuYzogc3RyaW5nKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXNbY2xpY2tGdW5jXSkpIHtcclxuXHRcdFx0XHR0aGlzW2NsaWNrRnVuY10oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdvVG9BZGRVc2VyKCkge1xyXG5cdFx0XHQvLyBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJcIikpLnNjb3BlKClcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdhZGQtdXNlcicsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHRnb0JhY2soKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLCBhcHAuSGVhZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2Vyc0xpc3RDb250cm9sbGVyIGltcGxlbWVudHMgVXNlcnNMaXN0SW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgdXNlcnNMaXN0OiBBcnJheTxhbnk+O1xyXG5cdFx0cHJpdmF0ZSBhcHBDb25maWc6IGFwcENvbmZpZ0ludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgZWRpdFVzZXI6IEVkaXRVc2VySW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBpbmZvU2xpZGVyOiBJbmZvU2xpZGVySW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBzb3J0T3JkZXI6IHN0cmluZztcclxuXHRcdC8vVE9ETzogY3JlYXRlIGludGVyZmFjZVxyXG5cdFx0cHJpdmF0ZSB0YWJsZUhlYWRpbmc6IEFycmF5PGFueT47XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCdBUElTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgYXBpU2VydmljZTogQVBJU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5hcHBDb25maWcgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQ7XHJcblx0XHRcdHRoaXMuc29ydE9yZGVyID0gJ2ZpcnN0bmFtZSc7XHJcblx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHJcblx0XHRcdHRoaXMudXNlcnNMaXN0ID0gW107XHJcblx0XHRcdHRoaXMuZWRpdFVzZXJEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZXRhYmxlSGVhZGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNyZWF0ZXRhYmxlSGVhZGluZygpIHtcclxuXHRcdFx0dGhpcy50YWJsZUhlYWRpbmcgPSBbe1xyXG5cdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTEnLFxyXG5cdFx0XHRcdCdzb3J0T3JkZXInOiAnaWRfbWVtYmVyJyxcclxuXHRcdFx0XHQndGV4dCc6ICdTLk5vJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0yJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZmlyc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0ZpcnN0IG5hbWUnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xhc3RuYW1lJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0xhc3QgbmFtZSdcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0zJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnZW1haWwnLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnRW1haWwnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ3Bob25lbnVtYmVyJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ1Bob25lIE51bWJlcidcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnbG9jYXRpb24nLFxyXG5cdFx0XHRcdFx0J3RleHQnOiAnTG9jYXRpb24nXHJcblx0XHRcdFx0fV07XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0YUF2YWlsYWJsZSgpIHtcclxuXHRcdFx0aWYgKHRoaXMudXNlcnNMaXN0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1cclxuXHJcblx0XHRnZXRVc2VycygpIHtcclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLmdldENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZ2V0dXNlcnNsaXN0J1xyXG5cdFx0XHR9KS5zdWNjZXNzKChkYXRhLCBzdGF0dXMpID0+IHtcclxuXHRcdFx0XHR0aGlzLnByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGEpXHJcblx0XHRcdH0pLmVycm9yKChkYXRhLCBzdGF0dXMpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2VycicpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb2Nlc3NTZXJ2ZXJEYXRhKGRhdGE6IGFueSkge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3Byb2Nlc3NTZXJ2ZXJEYXRhOiAnLCBkYXRhKTtcclxuXHJcblx0XHRcdGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMudXNlcnNMaXN0ID0gZGF0YTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnVzZXJzTGlzdC5sZW5ndGggPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy4kbG9jYXRpb24ucGF0aCgnL2FkZFVzZXInKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRWRpdCB1c2VyIGNvZGUgZmxvd1xyXG5cdFx0Ki9cclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3ZhbGlkYXRlRW1haWwnKTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0VXNlckNsaWNrKGV2ZW50OiBFdmVudCwgdXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHRoaXMuZWRpdFVzZXIgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRWRpdCBkZXRhaWxzJyxcclxuXHRcdFx0XHR1c2VyRGF0YTogdGhpcy51dGlsc1NlcnZpY2UuY2xvbmUodGhpcy51dGlsc1NlcnZpY2UuZ2V0T2JqZWN0RnJvbUFycih0aGlzLnVzZXJzTGlzdCwgJ2lkX21lbWJlcicsIHVzZXJJZCkpLFxyXG5cdFx0XHRcdHVzZXJJZDogdXNlcklkXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1lZGl0LW1vZGFsJywgeyBpZDogJ2VkaXRVc2VyTW9kYWwnIH0pO1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2codGhpcy5lZGl0VXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dXBkYXRlVXNlckRhdGEoZGF0YTogYW55LCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3VwZGF0ZVVzZXJEYXRhOiAnLCBkYXRhKTtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAndXBkYXRldXNlcicsXHJcblx0XHRcdFx0J2RhdGEnOiB7XHJcblx0XHRcdFx0XHQndXNlcklkJzogdXNlcklkLFxyXG5cdFx0XHRcdFx0J3VzZXJEYXRhJzoge1xyXG5cdFx0XHRcdFx0XHRlbWFpbDogZGF0YS5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Zmlyc3RuYW1lOiBkYXRhLmZpcnN0bmFtZSxcclxuXHRcdFx0XHRcdFx0aWRfbWVtYmVyOiBkYXRhLmlkX21lbWJlcixcclxuXHRcdFx0XHRcdFx0bGFzdG5hbWU6IGRhdGEubGFzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiBkYXRhLmxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0XHRwaG9uZW51bWJlcjogZGF0YS5waG9uZW51bWJlclxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YSBzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5oaWRlRWRpdFBvcHVwKCk7XHJcblxyXG5cdFx0XHRcdGlmIChyZXNwb25zZS5yZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0aGlzLm9uVXNlclVwZGF0ZWQoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiAnRXJyb3IhJyxcclxuXHRcdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgdXBkYXRpbmcgdXNlciBpbmZvcm1hdGlvbi4gUGxlYXNlIHRyeSBhZ2FpbicsXHJcblx0XHRcdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywgeyBpZDogJ21vZGFsRGlhbG9ndWUnIH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YSBlcnJvcjogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRvblVzZXJVcGRhdGVkKCkge1xyXG5cdFx0XHR0aGlzLnNob3dJbmZvU2xpZGVyKHtcclxuXHRcdFx0XHR0aXRsZTogJ1VzZXIgdXBkYXRlZCcsXHJcblx0XHRcdFx0Ym9keTogJ1VzZXIgaW5mbyBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXHJcblx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxyXG5cdFx0XHRcdGVuZFRpbWVyOiA0MDAwXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZUVkaXRQb3B1cChldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLWVkaXQtbW9kYWwnLCB7IGlkOiAnZWRpdFVzZXJNb2RhbCcgfSk7XHJcblx0XHRcdHRoaXMuZWRpdFVzZXJEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWRpdFVzZXJEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLmVkaXRVc2VyID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdHVzZXJEYXRhOiB7fSxcclxuXHRcdFx0XHR1c2VySWQ6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRGVsZXRlIHVzZXIgY29kZWZsb3dcclxuXHRcdCovXHJcblx0XHRkZWxldGVVc2VyQ2xpY2soZXZlbnQ6IEV2ZW50LCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSB1c2VyPycsXHJcblx0XHRcdFx0Ym9keTogJ1BsZWFzZSBjb25maXJtLCB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHVzZXInLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0c2hvd0J0bjI6IHRydWUsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZVVzZXJDb25maXJtLmJpbmQodGhpcywgdXNlcklkKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHsgaWQ6ICdtb2RhbERpYWxvZ3VlJyB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGVVc2VyQ29uZmlybSh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2RlbGV0ZVVzZXJDb25maXJtLCB1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZGVsZXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdGlmIChyZXNwb25zZS5yZXNwID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmhpZGVNb2RhbERpYWxvZ3VlKCk7XHJcblx0XHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIGRlbGV0aW5nIHVzZXIuIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtbW9kYWwnLCB7IGlkOiAnbW9kYWxEaWFsb2d1ZScgfSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICcnLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKG9yZGVyQnk6IGFueSkge1xyXG5cdFx0XHRpZiAob3JkZXJCeSA9PT0gdGhpcy5zb3J0T3JkZXIpIHtcclxuXHRcdFx0XHR0aGlzLnNvcnRPcmRlciA9ICctJyArIG9yZGVyQnk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSBvcmRlckJ5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogYW55KSB7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlciA9IHtcclxuXHRcdFx0XHR0aXRsZTogcGFyYW1zLnRpdGxlLFxyXG5cdFx0XHRcdGJvZHk6IHBhcmFtcy5ib2R5XHJcblx0XHRcdH07XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1pbmZvLXNsaWRlcicsIHsgaWQ6ICdpbmZvU2xpZGVyJyB9KTtcclxuXHRcdFx0fSwgcGFyYW1zLnN0YXJ0VGltZXIpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5oaWRlSW5mb1NsaWRlcigpO1xyXG5cdFx0XHR9LCBwYXJhbXMuZW5kVGltZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVJbmZvU2xpZGVyKCkge1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtaW5mby1zbGlkZXInLCB7IGlkOiAnaW5mb1NsaWRlcicgfSk7XHJcblx0XHRcdHRoaXMuaW5mb1NsaWRlckRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyID0ge1xyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJzTGlzdENvbnRyb2xsZXInLCBhcHAuVXNlcnNMaXN0Q29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBZGRVc2VyQ29udHJvbGxlciBpbXBsZW1lbnRzIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnQVBJU2VydmljZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRzY29wZS4kb24oJ2FkZC11c2VyJywgZnVuY3Rpb24oZXZlbnQsIGFyZ3MpIHtcclxuXHRcdFx0XHR0aGlzLmFkZFVzZXIoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudXNlckRhdGFEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRoaXMudXRpbHNTZXJ2aWNlLnZhbGlkYXRlRW1haWwodmFsKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUZvcm0oKSB7XHJcblx0XHRcdC8vIG1ha2UgbnVsbCB1bmRlZmluZWQgY2hlY2tzIGhlcmVcclxuXHRcdFx0aWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmZpcnN0bmFtZSkgfHwgdGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEubGFzdG5hbWUpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tbmFtZScpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5lbWFpbCkpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1lbWFpbCcpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5waG9uZW51bWJlcikpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1waG9uZW51bWJlcicpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5sb2NhdGlvbikpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1sb2NhdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnb3RvVXNlckxpc3QoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdhZGQgdXNlcjogJywgdGhpcy51c2VyRGF0YSk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy52YWxpZGF0ZUZvcm0oKSkge1xyXG5cdFx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2FkZHVzZXInLFxyXG5cdFx0XHRcdFx0ZGF0YTogdGhpcy51c2VyRGF0YVxyXG5cdFx0XHRcdH0pLnN1Y2Nlc3MoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5yZXNwICYmIHJlc3BvbnNlLnJlc3AgPT09ICdFbWFpbCBhbHJlYWR5IGluIHVzZScpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnZW1haWxJblVzZScpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5nb3RvVXNlckxpc3QoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KS5lcnJvcigocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdlcnJvcjogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dXNlckRhdGFEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLnVzZXJEYXRhID0ge1xyXG5cdFx0XHRcdCdmaXJzdG5hbWUnOiAnJyxcclxuXHRcdFx0XHQnbGFzdG5hbWUnOiAnJyxcclxuXHRcdFx0XHQnZW1haWwnOiAnJyxcclxuXHRcdFx0XHQncGhvbmVudW1iZXInOiAnJyxcclxuXHRcdFx0XHQnbG9jYXRpb24nOiAnSU4nXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd01vZGFsRGlhbG9ndWUoZXJyb3JUeXBlOiBzdHJpbmcpIHtcclxuXHRcdFx0bGV0IHRpdGxlOiBzdHJpbmcgPSAnJyxcclxuXHRcdFx0XHRib2R5OiBzdHJpbmcgPSAnJztcclxuXHJcblx0XHRcdHN3aXRjaCAoZXJyb3JUeXBlKSB7XHJcblx0XHRcdFx0Y2FzZSAnZW1haWxJblVzZSc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdFbWFpbCBhbHJlYWR5IGluIHVzZSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ0VtYWlsIElEIGlzIGFscmVhZHkgaW4gdXNlLCBwbGVhc2UgZW50ZXIgYSB1bmlxdWUgRW1haWwgYWRkcmVzcyc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tbmFtZSc6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCBGaXJzdCBuYW1lL0xhc3QgbmFtZSc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tZW1haWwnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgdGhlIGVtYWlsIGFkZHJlc3MnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLXBob25lbnVtYmVyJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHBob25lIG51bWJlcic7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnaW5WYWxpZEZvcm0tbG9jYXRpb24nOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIHNlbGVjdCBsb2NhdGlvbic7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LW1vZGFsJywgeyBpZDogJ21vZGFsRGlhbG9ndWUnIH0pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiB0aXRsZSxcclxuXHRcdFx0XHRib2R5OiBib2R5LFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtbW9kYWwnLCB7IGlkOiAnbW9kYWxEaWFsb2d1ZScgfSk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogZmFsc2UsXHJcblx0XHRcdFx0dGl0bGU6ICcnLFxyXG5cdFx0XHRcdGJvZHk6ICcnLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICcnLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGJ0bjJDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0FkZFVzZXJDb250cm9sbGVyJywgYXBwLkFkZFVzZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEVkaXRVc2VyQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignRWRpdFVzZXJDb250cm9sbGVyJywgYXBwLkVkaXRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBNb2RhbERpYWxvZ3VlQ29udHJvbGxlciB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXInLCBhcHAuTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlckZvcm1Db250cm9sbGVyIHtcclxuXHRcdGZvcm1TdWJtaXQ6IEZ1bmN0aW9uO1xyXG5cdFx0dXNlckRhdGE6IGFueTtcclxuXHRcdHVzZXJEYXRhSWQ6IGFueTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRcdG9uRm9ybVN1Ym1pdChldmVudDogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zb2xlLmxvZygnb25Gb3JtU3VibWl0Jyk7XHJcblx0XHRcdHRoaXMuZm9ybVN1Ym1pdCh7IGRhdGE6IHRoaXMudXNlckRhdGEsIHVzZXJEYXRhSWQ6IHRoaXMudXNlckRhdGFJZCB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlckZvcm1Db250cm9sbGVyJywgYXBwLlVzZXJGb3JtQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckNvbnRyb2xsZXIge1xyXG5cdFx0c29ydEZ1bmM6IEZ1bmN0aW9uO1xyXG5cdFx0ZGVmYXVsdENsYXNzOiBzdHJpbmc7XHJcblx0XHRsYXN0U29ydE9yZGVyOiBzdHJpbmc7XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJGVsZW1lbnQnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0dGhpcy5kZWZhdWx0Q2xhc3MgPSAnYXJyb3cgYXJyb3ctZG93bic7XHJcblx0XHRcdHRoaXMubGFzdFNvcnRPcmRlciA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihldmVudDogRXZlbnQsIHNvcnRPcmRlcjogc3RyaW5nKSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy11cCc7XHJcblx0XHRcdGlmIChhbmd1bGFyLmVsZW1lbnQoZXZlbnQudGFyZ2V0KS5maW5kKCdzcGFuJykuaGFzQ2xhc3MoJ2Fycm93LXVwJykpIHtcclxuXHRcdFx0XHRuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMubGFzdFNvcnRPcmRlciAhPT0gc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KCcjaGVhZGluZ18nICsgdGhpcy5sYXN0U29ydE9yZGVyKS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyh0aGlzLmRlZmF1bHRDbGFzcyk7XHJcblx0XHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gc29ydE9yZGVyO1xyXG5cdFx0XHR9XHJcblx0XHRcdGFuZ3VsYXIuZWxlbWVudChldmVudC50YXJnZXQpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKG5ld0NsYXNzKTtcclxuXHJcblx0XHRcdHRoaXMuc29ydEZ1bmMoe1xyXG5cdFx0XHRcdCdvcmRlckJ5Jzogc29ydE9yZGVyXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdUYWJsZUhlYWRlckNvbnRyb2xsZXInLCBhcHAuVGFibGVIZWFkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJDb250cm9sbGVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1x0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdJbmZvU2xpZGVyQ29udHJvbGxlcicsIGFwcC5JbmZvU2xpZGVyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRWRpdFVzZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGlzVmlzaWJsZTogJz0nLFxyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHR1c2VySWQ6ICc9JyxcclxuXHRcdFx0aGlkZVBvcHVwOiAnJicsXHJcblx0XHRcdHVwZGF0ZURhdGE6ICcmJyxcclxuXHRcdFx0ZGlzY2FyZEZvcm06ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ0VkaXRVc2VyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0XHRsaW5rKHNjb3BlOm5nLklTY29wZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctZWRpdC1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRcdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuaWQpKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHNjb3BlLiRvbignaGlkZS1lZGl0LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuKCAoKSA9PiBuZXcgRWRpdFVzZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdlZGl0VXNlcicsIGFwcC5FZGl0VXNlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcblx0XHRcdGlzVmlzaWJsZTogJz0nLFxyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRib2R5OiAnPScsXHJcblx0XHRcdGJ0bjFUeHQ6ICc9JyxcclxuXHRcdFx0YnRuMlR4dDogJz0nLFxyXG5cdFx0XHRzaG93QnRuMjogJz0nLFxyXG5cdFx0XHRidG4xQ2FsbGJhY2s6ICcmJyxcclxuXHRcdFx0YnRuMkNhbGxiYWNrOiAnJicsXHJcblx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6ICcmJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL21vZGFsLWRpYWxvZ3VlLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRsaW5rKHNjb3BlOm5nLklTY29wZSkge1xyXG5cdFx0XHRzY29wZS4kb24oJ3Nob3ctbW9kYWwnLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtbW9kYWwnLCBmdW5jdGlvbihldmVudCwgcGFyYW1zOiBhbnkpIHtcclxuXHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLmlkKSkubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBNb2RhbERpYWxvZ3VlRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCdtb2RhbERpYWxvZ3VlJywgYXBwLk1vZGFsRGlhbG9ndWVEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVc2VyRm9ybURpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0cHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHB1YmxpYyBzY29wZSA9IHtcclxuXHRcdFx0dXNlckRhdGE6ICc9JyxcclxuXHRcdFx0dXNlcklkOiAnPScsXHJcblx0XHRcdGVkaXRNb2RlOiAnPScsXHJcblx0XHRcdHZhbGlkYXRlRW1haWw6ICcmJyxcclxuXHRcdFx0Zm9ybVN1Ym1pdDogJyYnLFxyXG5cdFx0XHRkaXNjYXJkRm9ybTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy91c2VyLWZvcm0uZGlyZWN0aXZlLmh0bWwnO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXIgPSAnVXNlckZvcm1Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVXNlckZvcm1EaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd1c2VyRm9ybScsIGFwcC5Vc2VyRm9ybURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0YWJsZUhlYWRpbmc6ICc9JyxcclxuXHRcdFx0c29ydEZ1bmM6ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1RhYmxlSGVhZGVyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgVGFibGVIZWFkZXJEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn0gXHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd0YWJsZUhlYWRlcicsIGFwcC5UYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdC8vIHByaXZhdGUgdGltZXI6IG51bWJlcjtcclxuXHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRib2R5OiAnPSdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ0luZm9TbGlkZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGUpIHtcclxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LWluZm8tc2xpZGVyJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWluZm8tc2xpZGVyJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0YW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5pZCkpLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgSW5mb1NsaWRlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnaW5mb1NsaWRlcicsIGFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQVBJU2VydmljZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRodHRwJ107XHJcbiAgICAgICAgaHR0cFNlcnZpY2U6IG5nLklIdHRwU2VydmljZTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cFNlcnZpY2UgPSAkaHR0cDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldENhbGwocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHBhcmFtcy5jb25maWcgfHwge307XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChwYXJhbXMudXJsLCBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9zdENhbGwocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcmFtczogJywgcGFyYW1zKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChwYXJhbXMudXJsLCBwYXJhbXMuZGF0YSwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogcGFyYW1zLmhlYWRlcnNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogcGFyYW1zLnVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJC5wYXJhbShwYXJhbXMuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgfSk7Ki9cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnQVBJU2VydmljZScsIGFwcC5BUElTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAgICAgYnJvYWRjYXN0RXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoZXZlbnROYW1lLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ1NoYXJlZFNlcnZpY2UnLCBhcHAuU2hhcmVkU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVXRpbHNTZXJ2aWNlIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgICAgICBnZXREYXRhVHlwZShvYmo6IGFueSkge1xyXG5cdFx0XHRyZXR1cm4gKHt9KS50b1N0cmluZy5jYWxsKG9iaikudG9Mb3dlckNhc2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpc051bGxVbmRlZmluZWQodmFsOiBhbnksIHZhbGlkYXRlWmVyb05hTj86IEJvb2xlYW4pIHtcclxuXHRcdFx0bGV0IGlzTnVsbDogQm9vbGVhbiA9IGZhbHNlLFxyXG5cdFx0XHRcdHR5cGUgPSB0aGlzLmdldERhdGFUeXBlKHZhbCk7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdbb2JqZWN0IGFycmF5XSc6XHJcblx0XHRcdFx0XHRpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ1tvYmplY3Qgb2JqZWN0XSc6XHJcblx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAodmFsKSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSBcIlwiIHx8IHZhbCA9PT0gXCJudWxsXCIgfHwgdmFsID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHZhbGlkYXRlWmVyb05hTiAmJiAodmFsID09PSAwIHx8IGlzTmFOKHZhbCkpKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlzTnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRjbG9uZShvYmo6IGFueSkge1xyXG5cdFx0XHRpZiAob2JqID09IG51bGwgfHwgdHlwZW9mIChvYmopICE9ICdvYmplY3QnKVxyXG5cdFx0XHRcdHJldHVybiBvYmo7XHJcblxyXG5cdFx0XHR2YXIgdGVtcCA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcclxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iailcclxuXHRcdFx0XHR0ZW1wW2tleV0gPSB0aGlzLmNsb25lKG9ialtrZXldKTtcclxuXHJcblx0XHRcdHJldHVybiB0ZW1wO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbGlkYXRlRW1haWwoZW1haWw6IHN0cmluZyk6IEJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgZW1haWxSZWdleHAgPSAvXlthLXowLTkhIyQlJicqK1xcLz0/Xl9ge3x9fi4tXStAW2EtejAtOV0oW2EtejAtOS1dKlthLXowLTldKT8oXFwuW2EtejAtOV0oW2EtejAtOS1dKlthLXowLTldKT8pKiQvaTtcclxuXHJcblx0XHRcdGlmIChlbWFpbCAmJiBlbWFpbFJlZ2V4cC50ZXN0KGVtYWlsKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldE9iamVjdEZyb21BcnIoYXJyOiBBcnJheTxhbnk+LCBwcm9wTmFtZTogc3RyaW5nLCBwcm9wVmFsdWU6IGFueSkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChhcnJbaV1bcHJvcE5hbWVdID09IHByb3BWYWx1ZSkgcmV0dXJuIGFycltpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGxvZyguLi5tc2c6IGFueVtdKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnVXRpbHNTZXJ2aWNlJywgYXBwLlV0aWxzU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2pxdWVyeS9qcXVlcnkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXIuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL2FuZ3VsYXJqcy9hbmd1bGFyLXJvdXRlLmQudHNcIiAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXBwLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9tb2R1bGVzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb25zdGFudHMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbmZpZy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvcm91dGUtaGFuZGxlci50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvdXNlci1saXN0LmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9hZGQtdXNlci5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2FwcC1jb25maWcuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3VzZXItZGF0YS5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvaGVhZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvdXNlcnMtbGlzdC5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItZm9ybS5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9hcGkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL3V0aWxzLnNlcnZpY2UudHMnIC8+XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHRleHBvcnQgdmFyIGZvcm1BcHAgPSBhbmd1bGFyLm1vZHVsZSgnZm9ybUFwcCcsIFsnbmdSb3V0ZScsICdjb250cm9sbGVycycsICdzZXJ2aWNlcycsICdkaXJlY3RpdmVzJ10pO1xyXG5cclxuXHRmb3JtQXBwLmNvbmZpZyhDb25maWcpO1xyXG4gICAgZm9ybUFwcC5ydW4oWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdTaGFyZWRTZXJ2aWNlJywgUm91dGVIYW5kbGVyXSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
