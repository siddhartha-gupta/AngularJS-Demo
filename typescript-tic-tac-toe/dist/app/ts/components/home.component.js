System.register(['angular2/core', 'angular2/common', 'angular2/router', '../services/event-pub-sub.service', '../settings', '../services/generic-config.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, event_pub_sub_service_1, settings_1, generic_config_service_1;
    var Home;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (event_pub_sub_service_1_1) {
                event_pub_sub_service_1 = event_pub_sub_service_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(genericConfig, router, customEventService) {
                    this.genericConfig = genericConfig;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.gameLevels = [];
                    this.gameStarter = [];
                    this.gameLevels = [{
                            'value': 1,
                            'text': 'Easy',
                            'cssClass': 'btn-success'
                        },
                        {
                            'value': 2,
                            'text': 'Medium',
                            'cssClass': 'btn-warning'
                        },
                        {
                            'value': 3,
                            'text': 'Expert',
                            'cssClass': 'btn-danger'
                        }];
                    this.gameStarter = [{
                            'value': 1,
                            'text': 'You',
                            'cssClass': 'btn-info'
                        },
                        {
                            'value': 2,
                            'text': 'Computer',
                            'cssClass': 'btn-primary'
                        }];
                    this.model = {
                        gameLevel: 2,
                        firstChance: 1
                    };
                }
                Home.prototype.startGame = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('startGame: ', this.model);
                    this.genericConfig.config.playerstarts = (this.model.firstChance === 1) ? true : false;
                    this.genericConfig.config.gameLevel = this.model.gameLevel;
                    console.log('startGame: ', this.genericConfig.config);
                    this.router.navigate(['GamePlay']);
                };
                Home = __decorate([
                    core_1.Component({
                        selector: 'Home',
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass],
                        templateUrl: settings_1._settings.templatePath.component + 'home.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, router_1.Router, event_pub_sub_service_1.CustomEventService])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
        }
    }
});

//# sourceMappingURL=home.component.js.map
