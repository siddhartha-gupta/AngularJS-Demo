System.register(['angular2/core', 'angular2/router', '../helpers/settings', '../services/localStorage.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, settings_1, localStorage_service_1, utils_service_1;
    var AppHeader;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (localStorage_service_1_1) {
                localStorage_service_1 = localStorage_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            AppHeader = (function () {
                function AppHeader(router, location, LS, utils) {
                    var _this = this;
                    this.router = router;
                    this.location = location;
                    this.LS = LS;
                    this.utils = utils;
                    this.headerItems = [];
                    this.imgUrl = 'app/img/angularjs-logo.png';
                    this.headerItems = [{
                            'name': 'backBtn',
                            'clickFunc': 'goBack',
                            'text': 'Go back',
                            'showBtn': false
                        },
                        {
                            'name': 'resetBtn',
                            'clickFunc': 'resetApp',
                            'text': 'Reset app',
                            'showBtn': true
                        }];
                    router.subscribe(function (val) { return _this.onRouteChange(val); });
                }
                AppHeader.prototype.onRouteChange = function (val) {
                    this.utils.log('headerChange: ', val);
                    var routeName = val.match(/[^?]*/i)[0];
                    switch (routeName) {
                        case 'book':
                            for (var key in this.headerItems) {
                                if (this.headerItems[key].name === 'backBtn') {
                                    this.headerItems[key].showBtn = true;
                                }
                            }
                            break;
                        default:
                            for (var key in this.headerItems) {
                                if (this.headerItems[key].name === 'backBtn') {
                                    this.headerItems[key].showBtn = false;
                                }
                            }
                            break;
                    }
                };
                AppHeader.prototype.headerFunc = function ($event, funcName) {
                    console.log('headerFunc: ', funcName);
                    this[funcName]($event);
                };
                AppHeader.prototype.goBack = function ($event) {
                    this.utils.log('goBack');
                    this.router.navigate(['./BooksListing']);
                };
                AppHeader.prototype.resetApp = function ($event) {
                    this.utils.log('resetApp');
                    this.LS.resetStorage();
                    this.router.navigate(['./BooksListing']);
                };
                AppHeader = __decorate([
                    core_1.Component({
                        selector: 'app-header',
                        directives: [],
                        providers: [localStorage_service_1.LocalStorage, utils_service_1.Utils],
                        templateUrl: settings_1._settings.buildPath + 'header.template.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location, localStorage_service_1.LocalStorage, utils_service_1.Utils])
                ], AppHeader);
                return AppHeader;
            })();
            exports_1("AppHeader", AppHeader);
        }
    }
});

//# sourceMappingURL=header.component.js.map
