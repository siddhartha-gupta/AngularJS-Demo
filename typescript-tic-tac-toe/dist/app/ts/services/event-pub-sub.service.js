System.register(['angular2/core', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1;
    var CustomEventService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            CustomEventService = (function () {
                function CustomEventService(router, location) {
                    var _this = this;
                    this.router = router;
                    this.location = location;
                    this.onRouteChange = new core_1.EventEmitter();
                    this.onHeaderClicked = new core_1.EventEmitter();
                    this.onPlayersListReceived = new core_1.EventEmitter();
                    this.onInviteRequest = new core_1.EventEmitter();
                    this.onInviteAccepted = new core_1.EventEmitter();
                    this.onInviteRejected = new core_1.EventEmitter();
                    this.onMoveReceived = new core_1.EventEmitter();
                    this.onRestartGame = new core_1.EventEmitter();
                    router.subscribe(function (val) { return _this.routeChangeEmitter(val); });
                }
                CustomEventService.prototype.routeChangeEmitter = function (val) {
                    this.onRouteChange.emit(val);
                };
                CustomEventService.prototype.headerBtnClicked = function (btnType) {
                    this.onHeaderClicked.emit({
                        btnType: btnType,
                        routeName: this.location.path()
                    });
                };
                CustomEventService.prototype.playersListReceived = function (data) {
                    this.onPlayersListReceived.emit(data);
                };
                CustomEventService.prototype.inviteRequest = function (data) {
                    this.onInviteRequest.emit(data);
                };
                CustomEventService.prototype.inviteAccepted = function (data) {
                    this.onInviteAccepted.emit(data);
                };
                CustomEventService.prototype.inviteRejected = function (data) {
                    this.onInviteRejected.emit(data);
                };
                CustomEventService.prototype.moveReceived = function (data) {
                    this.onMoveReceived.emit(data);
                };
                CustomEventService.prototype.restartGame = function (data) {
                    this.onRestartGame.emit(data);
                };
                CustomEventService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location])
                ], CustomEventService);
                return CustomEventService;
            })();
            exports_1("CustomEventService", CustomEventService);
        }
    }
});

//# sourceMappingURL=event-pub-sub.service.js.map
