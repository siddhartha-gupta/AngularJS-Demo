System.register(['angular2/core', 'angular2/router', '../services/server-communicator.service', '../services/event-pub-sub.service', '../services/generic-config.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, server_communicator_service_1, event_pub_sub_service_1, generic_config_service_1, utils_service_1;
    var InviteHandler;
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
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            InviteHandler = (function () {
                function InviteHandler(router, customEventService, serverCommunicator, genericConfig, utils) {
                    var _this = this;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.serverCommunicator = serverCommunicator;
                    this.genericConfig = genericConfig;
                    this.utils = utils;
                    customEventService.onInviteRequest.subscribe(function (data) { return _this.onInviteRequest(data); });
                    customEventService.onInviteAction.subscribe(function (data) { return _this.onInviteAction(data); });
                    this.requestRecipient = '';
                    this.modalDialogue = {
                        isVisible: false,
                        title: '',
                        body: '',
                        btn1Txt: '',
                        btn2Txt: '',
                        showBtn2: false,
                        btn1Callback: function () { },
                        btn2Callback: function () { },
                        closeBtnCallback: function () { }
                    };
                }
                /*
                * Function to send invite to some user
                * for game play
                */
                InviteHandler.prototype.onRecipientSelected = function (event, recipientId) {
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    this.utils.log('onRecipientSelected, recipientId: ', recipientId);
                    this.serverCommunicator.msgSender('send-invite', {
                        emailId: this.genericConfig.multiPlayerConfig.emailId,
                        username: this.genericConfig.multiPlayerConfig.username,
                        recipient: recipientId
                    });
                    this.customEventService.sendingInvite();
                };
                /*
                * Functions to handle invite
                * and send acceptance or rejection
                */
                InviteHandler.prototype.onInviteRequest = function (data) {
                    console.log('onInviteRequest, show some pop up over here: ', data);
                    this.customEventService.reMatchRequest();
                    this.modalDialogue = {
                        isVisible: true,
                        title: 'Game invite request',
                        body: 'Invited to play a match from: ' + data.username + ' - ' + data.emailId,
                        btn1Txt: 'Reject',
                        btn2Txt: 'Accept',
                        showBtn2: true,
                        btn1Callback: this.requestRejected.bind(this),
                        btn2Callback: this.requestAccepted.bind(this),
                        closeBtnCallback: this.requestRejected.bind(this)
                    };
                    this.requestRecipient = data.emailId;
                };
                InviteHandler.prototype.requestAccepted = function () {
                    console.log('requestAccepted');
                    this.genericConfig.multiPlayerConfig.playerTurn = false;
                    this.genericConfig.multiPlayerConfig.player1 = false;
                    this.genericConfig.multiPlayerConfig.playerSymbol = 'o';
                    this.genericConfig.multiPlayerConfig.recipient = this.requestRecipient;
                    this.serverCommunicator.msgSender('invite-action', {
                        emailId: this.genericConfig.multiPlayerConfig.emailId,
                        recipient: this.requestRecipient,
                        accepted: true
                    });
                    this.resetModalConfig();
                    this.customEventService.startGame();
                };
                InviteHandler.prototype.requestRejected = function () {
                    console.log('requestRejected: ', this);
                    this.serverCommunicator.msgSender('invite-action', {
                        emailId: this.genericConfig.multiPlayerConfig.emailId,
                        recipient: this.requestRecipient,
                        accepted: false
                    });
                    this.resetModalConfig();
                    this.customEventService.endGame();
                };
                /*
                * Function to handle user response
                * i.e whether user has accepted the invite or not
                */
                InviteHandler.prototype.onInviteAction = function (data) {
                    console.log('onInviteAction, data: ', data, ' :typeof(data): ', typeof (data));
                    if (data.accepted) {
                        console.log('onInviteAccepted');
                        this.genericConfig.multiPlayerConfig.playerTurn = true;
                        this.genericConfig.multiPlayerConfig.player1 = true;
                        this.genericConfig.multiPlayerConfig.playerSymbol = 'x';
                        this.genericConfig.multiPlayerConfig.recipient = data.recipient;
                        this.customEventService.startGame();
                    }
                    else {
                        console.log('onInviteRejected');
                        this.modalDialogue = {
                            isVisible: true,
                            title: 'Game invite response',
                            body: 'It looks like user has declined the game play request',
                            btn1Txt: 'Ok',
                            btn2Txt: '',
                            showBtn2: false,
                            btn1Callback: this.resetModalConfig.bind(this),
                            closeBtnCallback: this.resetModalConfig.bind(this)
                        };
                        this.customEventService.endGame();
                    }
                };
                InviteHandler.prototype.resetModalConfig = function () {
                    this.modalDialogue = {
                        isVisible: false,
                        title: '',
                        body: '',
                        btn1Txt: '',
                        btn2Txt: '',
                        showBtn2: false,
                        btn1Callback: function () { },
                        btn2Callback: function () { },
                        closeBtnCallback: function () { }
                    };
                    this.requestRecipient = '';
                };
                InviteHandler = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, event_pub_sub_service_1.CustomEventService, server_communicator_service_1.ServerCommunicator, generic_config_service_1.GenericConfig, utils_service_1.Utils])
                ], InviteHandler);
                return InviteHandler;
            })();
            exports_1("InviteHandler", InviteHandler);
        }
    }
});

//# sourceMappingURL=invite-handler.service.js.map
