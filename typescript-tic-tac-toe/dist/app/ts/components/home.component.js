System.register(['angular2/core', 'angular2/common', 'angular2/router', '../services/server-communicator.service', '../services/event-pub-sub.service', '../settings', '../services/generic-config.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, server_communicator_service_1, event_pub_sub_service_1, settings_1, generic_config_service_1;
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
            function (server_communicator_service_1_1) {
                server_communicator_service_1 = server_communicator_service_1_1;
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
                function Home(genericConfig, router, customEventService, serverCommunicator) {
                    var _this = this;
                    this.genericConfig = genericConfig;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.serverCommunicator = serverCommunicator;
                    this.gameLevels = [];
                    this.opponentOptions = [];
                    this.gameStarter = [];
                    this.model = {
                        gameLevel: 2,
                        opponent: 2,
                        firstChance: 1,
                        userEmail: '',
                        username: ''
                    };
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
                    this.opponentOptions = [{
                            'value': 1,
                            'text': 'vs Computer',
                            'cssClass': 'btn-info'
                        },
                        {
                            'value': 2,
                            'text': 'Multi Player',
                            'cssClass': 'btn-primary'
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
                    customEventService.onHeaderClicked.subscribe(function (data) { return _this.onHeaderClicked(data); });
                }
                Home.prototype.onHeaderClicked = function (data) {
                    if (data.routeName === '') {
                        switch (data.btnType) {
                            case 'left':
                                break;
                            case 'right':
                                this.startGame();
                                break;
                        }
                    }
                };
                Home.prototype.startGame = function (event) {
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    if (this.model.opponent === 2) {
                        this.genericConfig.config.multiPlayer = true;
                        this.genericConfig.multiPlayerConfig.emailId = this.model.userEmail;
                        this.genericConfig.multiPlayerConfig.username = this.model.username;
                        this.genericConfig.multiPlayerConfig.player1 = false;
                        this.genericConfig.multiPlayerConfig.playerSymbol = 'o';
                        this.genericConfig.multiPlayerConfig.playerTurn = false;
                        this.serverCommunicator.initSocket();
                        this.serverCommunicator.sender = this.model.userEmail;
                        this.serverCommunicator.msgSender('register-email', {
                            emailId: this.model.userEmail,
                            username: this.model.username
                        });
                        this.router.navigate(['PlayersList']);
                    }
                    else {
                        this.genericConfig.config.multiPlayer = false;
                        this.genericConfig.computerConfig.playerstarts = (this.model.firstChance === 1) ? true : false;
                        this.genericConfig.computerConfig.gameLevel = this.model.gameLevel;
                        this.router.navigate(['GamePlay']);
                    }
                };
                Home = __decorate([
                    core_1.Component({
                        selector: 'Home',
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass],
                        styleUrls: [settings_1._settings.cssPath + 'home.css'],
                        templateUrl: settings_1._settings.templatePath.component + 'home.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, router_1.Router, event_pub_sub_service_1.CustomEventService, server_communicator_service_1.ServerCommunicator])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
        }
    }
});

//# sourceMappingURL=home.component.js.map
