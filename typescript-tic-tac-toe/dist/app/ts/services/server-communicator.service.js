System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ServerCommunicator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ServerCommunicator = (function () {
                function ServerCommunicator() {
                    this.sender = null;
                    this.recipient = null;
                }
                ServerCommunicator.prototype.initSocket = function (username, recipient) {
                    this.socket = io.connect('http://localhost:5000');
                    console.log(this.socket);
                    this.sender = username;
                    this.recipient = recipient;
                    this.socket.emit("create-join-room", {
                        "username": username,
                        "recipient": recipient
                    });
                    this.msgReceiver();
                };
                ServerCommunicator.prototype.msgSender = function (content) {
                    var recipient = this.recipient;
                    this.socket.emit("private-message", {
                        "recipient": recipient,
                        "content": content
                    });
                };
                ServerCommunicator.prototype.msgReceiver = function () {
                    this.socket.on("add-message", function (data) {
                        console.log('add-message:', data);
                    });
                };
                ServerCommunicator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ServerCommunicator);
                return ServerCommunicator;
            })();
            exports_1("ServerCommunicator", ServerCommunicator);
        }
    }
});

//# sourceMappingURL=server-communicator.service.js.map
