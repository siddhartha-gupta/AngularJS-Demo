System.register(['angular2/core', '../services/event-pub-sub.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, event_pub_sub_service_1;
    var ServerCommunicator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (event_pub_sub_service_1_1) {
                event_pub_sub_service_1 = event_pub_sub_service_1_1;
            }],
        execute: function() {
            ServerCommunicator = (function () {
                function ServerCommunicator(customEventService) {
                    this.customEventService = customEventService;
                    this.sender = null;
                    this.recipient = null;
                }
                ServerCommunicator.prototype.initSocket = function () {
                    this.socket = io.connect('http://10.4.3.88:5000');
                    this.msgReceiver();
                    console.log('this.socket: ', this.socket);
                };
                ServerCommunicator.prototype.msgSender = function (identifier, data) {
                    if (!this.socket) {
                        this.initSocket();
                    }
                    var recipient = this.recipient;
                    console.log('msgSender: ', this.socket);
                    this.socket.emit(identifier, data);
                    /*
                    this.socket.emit('create-join-room', {
                        'username': username,
                        'recipient': recipient
                    });
            
                    this.socket.emit('private-message', {
                        'recipient': recipient,
                        'content': content
                    });*/
                };
                ServerCommunicator.prototype.msgReceiver = function () {
                    // register-email
                    // add-recipient
                    // send-message
                    var _this = this;
                    this.socket.on('email-registered', function (data) {
                        console.log('email-registered:', data);
                    });
                    this.socket.on('current-players-list', function (data) {
                        _this.playersList = data;
                        console.log('current-players-list:', _this.playersList);
                        _this.customEventService.playersListReceived(data);
                    });
                    this.socket.on('add-recipient-resp', function (data) {
                        console.log('add-recipient-resp:', data);
                        _this.customEventService.recipientAdded(data);
                    });
                    this.socket.on('send-message-resp', function (data) {
                        console.log('send-message-resp: ', data);
                        _this.customEventService.moveReceived(data);
                    });
                };
                ServerCommunicator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [event_pub_sub_service_1.CustomEventService])
                ], ServerCommunicator);
                return ServerCommunicator;
            })();
            exports_1("ServerCommunicator", ServerCommunicator);
        }
    }
});

//# sourceMappingURL=server-communicator.service.js.map
