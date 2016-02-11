System.register(['angular2/core', '../services/event-pub-sub.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, event_pub_sub_service_1, utils_service_1;
    var ServerCommunicator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (event_pub_sub_service_1_1) {
                event_pub_sub_service_1 = event_pub_sub_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            ServerCommunicator = (function () {
                function ServerCommunicator(customEventService, utils) {
                    this.customEventService = customEventService;
                    this.utils = utils;
                    this.sender = null;
                    this.recipient = null;
                }
                ServerCommunicator.prototype.initSocket = function () {
                    this.socket = io.connect('http://localhost:5000');
                    this.msgReceiver();
                };
                ServerCommunicator.prototype.msgSender = function (identifier, data) {
                    if (!this.socket) {
                        this.initSocket();
                    }
                    var recipient = this.recipient;
                    this.socket.emit(identifier, data);
                };
                ServerCommunicator.prototype.msgReceiver = function () {
                    var _this = this;
                    this.socket.on('register-email-resp', function (data) {
                        _this.utils.log('register-email-resp:', data);
                    });
                    this.socket.on('current-players-list-resp', function (data) {
                        _this.playersList = data;
                        _this.customEventService.playersListReceived(data);
                    });
                    this.socket.on('invite-request', function (data) {
                        _this.customEventService.inviteRequest(data);
                    });
                    this.socket.on('send-message-resp', function (data) {
                        _this.customEventService.moveReceived(data);
                    });
                    this.socket.on('restart-game-resp', function (data) {
                        _this.customEventService.restartGame(data);
                    });
                };
                ServerCommunicator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [event_pub_sub_service_1.CustomEventService, utils_service_1.Utils])
                ], ServerCommunicator);
                return ServerCommunicator;
            })();
            exports_1("ServerCommunicator", ServerCommunicator);
        }
    }
});

//# sourceMappingURL=server-communicator.service.js.map
