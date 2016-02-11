System.register(['angular2/core', 'angular2/router', 'angular2/common', '../directives/modal-dialogue.directive', '../services/server-communicator.service', '../services/event-pub-sub.service', '../services/generic-config.service', '../services/utils.service', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, common_1, modal_dialogue_directive_1, server_communicator_service_1, event_pub_sub_service_1, generic_config_service_1, utils_service_1, settings_1;
    var PlayersList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (modal_dialogue_directive_1_1) {
                modal_dialogue_directive_1 = modal_dialogue_directive_1_1;
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
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            PlayersList = (function () {
                function PlayersList(router, customEventService, serverCommunicator, genericConfig, utils) {
                    var _this = this;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.serverCommunicator = serverCommunicator;
                    this.genericConfig = genericConfig;
                    this.utils = utils;
                    customEventService.onHeaderClicked.subscribe(function (data) { return _this.onHeaderClicked(data); });
                    customEventService.onPlayersListReceived.subscribe(function (data) { return _this.onPlayersListReceived(data); });
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
                    this.serverCommunicator.msgSender('get-players-list', {});
                }
                PlayersList.prototype.onPlayersListReceived = function (data) {
                    var list = [], tempList = [];
                    console.log('on playersList: ', data);
                    if (data) {
                        list = data;
                    }
                    else {
                        list = this.serverCommunicator.playersList;
                    }
                    for (var i = 0, len = list.length; i < len; i++) {
                        if (list[i].emailId !== this.genericConfig.multiPlayerConfig.emailId) {
                            tempList.push(list[i]);
                        }
                    }
                    this.playersList = tempList;
                };
                /*
                * Functions to handler
                * Click on headers for current component
                */
                PlayersList.prototype.onHeaderClicked = function (data) {
                    if (data.routeName === '/playerslist') {
                        switch (data.btnType) {
                            case 'left':
                                this.goToHome();
                                break;
                            case 'right':
                                break;
                        }
                    }
                };
                PlayersList.prototype.goToHome = function () {
                    this.router.navigate(['Home']);
                };
                /*
                * Function to send invite to some user
                * for game play
                */
                PlayersList.prototype.onRecipientSelected = function (event, recipientId) {
                    this.utils.log('onRecipientSelected, recipientId: ', recipientId);
                    this.serverCommunicator.msgSender('send-invite', {
                        emailId: this.genericConfig.multiPlayerConfig.emailId,
                        username: this.genericConfig.multiPlayerConfig.username,
                        recipient: recipientId
                    });
                };
                /*
                * Functions to handle invite
                * and send acceptance or rejection
                */
                PlayersList.prototype.onInviteRequest = function (data) {
                    console.log('onInviteRequest, show some pop up over here: ', data);
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
                PlayersList.prototype.requestAccepted = function () {
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
                    this.router.navigate(['GamePlay']);
                };
                PlayersList.prototype.requestRejected = function () {
                    console.log('requestRejected: ', this);
                    this.serverCommunicator.msgSender('invite-action', {
                        emailId: this.genericConfig.multiPlayerConfig.emailId,
                        recipient: this.requestRecipient,
                        accepted: false
                    });
                    this.resetModalConfig();
                };
                /*
                * Function to handle user response
                * i.e whether user has accepted the invite or not
                */
                PlayersList.prototype.onInviteAction = function (data) {
                    console.log('onInviteAction, data: ', data, ' :typeof(data): ', typeof (data));
                    if (data.accepted) {
                        console.log('onInviteAccepted');
                        this.genericConfig.multiPlayerConfig.playerTurn = true;
                        this.genericConfig.multiPlayerConfig.player1 = true;
                        this.genericConfig.multiPlayerConfig.playerSymbol = 'x';
                        this.genericConfig.multiPlayerConfig.recipient = data.recipient;
                        this.router.navigate(['GamePlay']);
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
                    }
                };
                PlayersList.prototype.resetModalConfig = function () {
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
                PlayersList = __decorate([
                    core_1.Component({
                        selector: 'PlayersList',
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass, modal_dialogue_directive_1.ModalDialouge],
                        styleUrls: [settings_1._settings.cssPath + 'player-list.css'],
                        templateUrl: settings_1._settings.templatePath.component + 'player-list.template.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, event_pub_sub_service_1.CustomEventService, server_communicator_service_1.ServerCommunicator, generic_config_service_1.GenericConfig, utils_service_1.Utils])
                ], PlayersList);
                return PlayersList;
            })();
            exports_1("PlayersList", PlayersList);
        }
    }
});

//# sourceMappingURL=players-list.component.js.map
