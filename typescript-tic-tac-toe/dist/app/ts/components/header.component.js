System.register(['angular2/core', '../services/utils.service', '../services/event-pub-sub.service', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, utils_service_1, event_pub_sub_service_1, settings_1;
    var AppHeader;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            },
            function (event_pub_sub_service_1_1) {
                event_pub_sub_service_1 = event_pub_sub_service_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            AppHeader = (function () {
                function AppHeader(utils, customEventService) {
                    var _this = this;
                    this.utils = utils;
                    this.customEventService = customEventService;
                    this.heading = 'Tic Tac Toe';
                    this.headerLeftButton = {
                        'btnType': '',
                        'text': '',
                        'showBtn': false
                    };
                    this.headerRightButton = {
                        'btnType': 'right',
                        'text': 'Start game',
                        'showBtn': true
                    };
                    customEventService.onRouteChange.subscribe(function (val) { return _this.onRouteChange(val); });
                }
                AppHeader.prototype.onRouteChange = function (val) {
                    this.utils.log('onRouteChange, log from header: ', val);
                    var routeName = val.match(/[^?]*/i)[0];
                    switch (routeName) {
                        case 'gameplay':
                            this.gamePlayHeaderBtns();
                            break;
                        case 'playerslist':
                            this.playersListHeaderBtns();
                            break;
                        default:
                            this.homeHeaderBtns();
                            break;
                    }
                };
                AppHeader.prototype.homeHeaderBtns = function () {
                    this.headerLeftButton = {
                        'btnType': '',
                        'text': '',
                        'showBtn': false
                    };
                    this.headerRightButton = {
                        'btnType': 'right',
                        'text': 'Start game',
                        'showBtn': true
                    };
                };
                AppHeader.prototype.playersListHeaderBtns = function () {
                    this.headerLeftButton = {
                        'btnType': 'left',
                        'text': 'Main Menu',
                        'showBtn': true
                    };
                    this.headerRightButton = {
                        'btnType': 'right',
                        'text': 'Start game',
                        'showBtn': true
                    };
                };
                AppHeader.prototype.gamePlayHeaderBtns = function () {
                    this.headerLeftButton = {
                        'btnType': 'left',
                        'text': 'Main Menu',
                        'showBtn': true
                    };
                    this.headerRightButton = {
                        'btnType': 'right',
                        'text': 'Status',
                        'showBtn': true
                    };
                };
                AppHeader.prototype.headerFunc = function (event, btnType) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.customEventService.headerBtnClicked(btnType);
                };
                AppHeader = __decorate([
                    core_1.Component({
                        selector: 'app-header',
                        providers: [utils_service_1.Utils],
                        styleUrls: [settings_1._settings.cssPath + 'header.css'],
                        templateUrl: settings_1._settings.templatePath.component + 'header.template.html'
                    }), 
                    __metadata('design:paramtypes', [utils_service_1.Utils, event_pub_sub_service_1.CustomEventService])
                ], AppHeader);
                return AppHeader;
            })();
            exports_1("AppHeader", AppHeader);
        }
    }
});

//# sourceMappingURL=header.component.js.map
