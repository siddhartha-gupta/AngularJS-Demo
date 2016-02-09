System.register(['angular2/core', 'angular2/router', '../services/server-communicator.service', '../services/event-pub-sub.service', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, server_communicator_service_1, event_pub_sub_service_1, settings_1;
    var PlayersList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            }],
        execute: function() {
            PlayersList = (function () {
                function PlayersList(router, customEventService, serverCommunicator) {
                    var _this = this;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.serverCommunicator = serverCommunicator;
                    customEventService.onHeaderClicked.subscribe(function (data) { return _this.onHeaderClicked(data); });
                }
                PlayersList.prototype.onHeaderClicked = function (data) {
                    console.log('onHeaderClicked: ', data);
                    if (data.routeName === '/playerslist') {
                        switch (data.btnType) {
                            case 'left':
                                this.goToHome();
                                break;
                            case 'right':
                                this.startGame();
                                break;
                        }
                    }
                };
                PlayersList.prototype.goToHome = function () {
                    this.router.navigate(['Home']);
                };
                PlayersList.prototype.startGame = function () {
                    this.router.navigate(['GamePlay']);
                };
                PlayersList = __decorate([
                    core_1.Component({
                        selector: 'PlayersList',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        templateUrl: settings_1._settings.templatePath.component + 'player-list.template.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, event_pub_sub_service_1.CustomEventService, server_communicator_service_1.ServerCommunicator])
                ], PlayersList);
                return PlayersList;
            })();
            exports_1("PlayersList", PlayersList);
        }
    }
});

//# sourceMappingURL=players-list.component.js.map
