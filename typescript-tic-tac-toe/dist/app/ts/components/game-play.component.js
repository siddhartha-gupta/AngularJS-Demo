System.register(['angular2/core', 'angular2/router', '../directives/game-grid.directive', '../directives/score-card.directive', '../directives/modal-dialogue.directive', '../directives/spinner.directive', '../directives/invite-handler.directive', '../services/server-communicator.service', '../services/event-pub-sub.service', '../services/generic-config.service', '../services/game-status.service', '../services/utils.service', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, game_grid_directive_1, score_card_directive_1, modal_dialogue_directive_1, spinner_directive_1, invite_handler_directive_1, server_communicator_service_1, event_pub_sub_service_1, generic_config_service_1, game_status_service_1, utils_service_1, settings_1;
    var GamePlay;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (game_grid_directive_1_1) {
                game_grid_directive_1 = game_grid_directive_1_1;
            },
            function (score_card_directive_1_1) {
                score_card_directive_1 = score_card_directive_1_1;
            },
            function (modal_dialogue_directive_1_1) {
                modal_dialogue_directive_1 = modal_dialogue_directive_1_1;
            },
            function (spinner_directive_1_1) {
                spinner_directive_1 = spinner_directive_1_1;
            },
            function (invite_handler_directive_1_1) {
                invite_handler_directive_1 = invite_handler_directive_1_1;
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
            function (game_status_service_1_1) {
                game_status_service_1 = game_status_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            GamePlay = (function () {
                function GamePlay(genericConfig, gameStatus, utils, router, customEventService, serverCommunicator) {
                    var _this = this;
                    this.genericConfig = genericConfig;
                    this.gameStatus = gameStatus;
                    this.utils = utils;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.serverCommunicator = serverCommunicator;
                    customEventService.onHeaderClicked.subscribe(function (data) { return _this.onHeaderClicked(data); });
                    customEventService.onMoveReceived.subscribe(function (data) { return _this.onMoveReceived(data); });
                    customEventService.onReMatchRequest.subscribe(function (data) { return _this.onReMatchRequest(); });
                    customEventService.onStartGame.subscribe(function (data) { return _this.restartGame(); });
                    customEventService.onSendingInvite.subscribe(function (data) { return _this.onSendingInvite(); });
                    customEventService.onEndGame.subscribe(function (data) { return _this.goToHome(); });
                    this.showLoader = false;
                    this.scoreCardConfig = {
                        isVisible: false,
                        title: '',
                        body: '',
                        showBtn2: false
                    };
                    this.utils.log(this.genericConfig);
                }
                GamePlay.prototype.ngOnInit = function () {
                    this.startGame(false);
                };
                GamePlay.prototype.onSendingInvite = function () {
                    this.showLoader = true;
                };
                GamePlay.prototype.startGame = function (restart) {
                    this.utils.log('startGame, restart: ', restart);
                    if (restart && this.genericConfig.config.multiPlayer) {
                        this.serverCommunicator.msgSender('restart-game', {
                            recipient: this.genericConfig.multiPlayerConfig.recipient
                        });
                    }
                    this.resetScoreCard();
                    this.genericConfig.config.playGame = true;
                    this.genericConfig.initCurrentGameConfig();
                    this.gameGrid.drawGrid();
                };
                GamePlay.prototype.restartGame = function () {
                    this.showLoader = false;
                    this.resetScoreCard();
                    this.genericConfig.config.playGame = true;
                    this.genericConfig.initCurrentGameConfig();
                    this.gameGrid.drawGrid();
                };
                GamePlay.prototype.onBlockClick = function (data) {
                    this.sendMoveToSever(data.cellnum, data.playerSymbol);
                    this.genericConfig.updateCurrentGameConfig(data.cellnum, 1);
                    this.getGameStatus(true, data.cellnum);
                };
                /*
                * While playing with computer
                * we make use of below function
                */
                GamePlay.prototype.makeAIMove = function (result) {
                    this.getGameStatus(false, result);
                };
                /*
                * While playing in multiplayer mode
                * we make use of below function
                */
                GamePlay.prototype.onMoveReceived = function (data) {
                    var result = parseInt(data.move);
                    this.utils.log('make multiPlayer move, result: ', result);
                    this.gameGrid.onMoveReceived({
                        result: result,
                        symbol: data.symbol
                    });
                    this.genericConfig.updateCurrentGameConfig(result, 2);
                    this.getGameStatus(false, result);
                    this.genericConfig.multiPlayerConfig.playerTurn = true;
                };
                GamePlay.prototype.getGameStatus = function (isHuman, move) {
                    this.utils.log('getGameStatus: ', isHuman);
                    var status = this.gameStatus.checkGameEnd(isHuman);
                    this.utils.log(status);
                    switch (status) {
                        case 'gameWon':
                            if (isHuman) {
                                this.showScoreCard('You won the match');
                            }
                            else {
                                this.showScoreCard('Your opponent won the match');
                            }
                            break;
                        case 'gameDraw':
                            this.showScoreCard('Match Drawn!');
                            break;
                        case 'makeAIMove':
                            this.gameGrid.makeAIMove();
                            break;
                    }
                };
                GamePlay.prototype.sendMoveToSever = function (move, symbol) {
                    if (this.genericConfig.config.multiPlayer) {
                        this.genericConfig.multiPlayerConfig.playerTurn = false;
                        this.serverCommunicator.msgSender('send-message', {
                            recipient: this.genericConfig.multiPlayerConfig.recipient,
                            move: move,
                            symbol: symbol
                        });
                    }
                };
                GamePlay.prototype.onHeaderClicked = function (data) {
                    if (data.routeName === '/gameplay') {
                        switch (data.btnType) {
                            case 'left':
                                this.goToHome();
                                break;
                            case 'right':
                                this.showScoreCard('Current Scorecard');
                                break;
                        }
                    }
                };
                GamePlay.prototype.showScoreCard = function (text) {
                    this.utils.log('showScoreCard: ', text);
                    this.scoreCardConfig = {
                        isVisible: true,
                        title: 'Game Status',
                        body: text,
                        showBtn2: !this.genericConfig.config.playGame
                    };
                };
                GamePlay.prototype.playAgain = function () {
                    this.resetScoreCard();
                    this.inviteHandler.onRecipientSelected(null, this.genericConfig.multiPlayerConfig.recipient);
                };
                GamePlay.prototype.onReMatchRequest = function () {
                    this.hideScoreCard(true);
                };
                GamePlay.prototype.hideScoreCard = function (noRestart) {
                    this.resetScoreCard();
                    if (!this.genericConfig.config.playGame && !noRestart) {
                        this.startGame(true);
                    }
                };
                GamePlay.prototype.goToHome = function () {
                    this.resetScoreCard();
                    this.utils.log('goToHome');
                    this.router.navigate(['Home']);
                };
                GamePlay.prototype.resetScoreCard = function () {
                    this.scoreCardConfig = {
                        isVisible: false,
                        title: '',
                        body: '',
                        showBtn2: false
                    };
                };
                __decorate([
                    core_1.ViewChild(invite_handler_directive_1.InviteHandler), 
                    __metadata('design:type', invite_handler_directive_1.InviteHandler)
                ], GamePlay.prototype, "inviteHandler", void 0);
                __decorate([
                    core_1.ViewChild(game_grid_directive_1.GameGrid), 
                    __metadata('design:type', game_grid_directive_1.GameGrid)
                ], GamePlay.prototype, "gameGrid", void 0);
                GamePlay = __decorate([
                    core_1.Component({
                        selector: 'GamePlay',
                        providers: [game_status_service_1.GameStatus],
                        directives: [router_1.ROUTER_DIRECTIVES, game_grid_directive_1.GameGrid, score_card_directive_1.ScoreCard, modal_dialogue_directive_1.ModalDialouge, spinner_directive_1.Spinner, invite_handler_directive_1.InviteHandler],
                        // styleUrls: [_settings.cssPath + 'gameplay.css'],
                        // encapsulation: ViewEncapsulation.Native,
                        templateUrl: settings_1._settings.templatePath.component + 'gameplay.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, game_status_service_1.GameStatus, utils_service_1.Utils, router_1.Router, event_pub_sub_service_1.CustomEventService, server_communicator_service_1.ServerCommunicator])
                ], GamePlay);
                return GamePlay;
            })();
            exports_1("GamePlay", GamePlay);
        }
    }
});

//# sourceMappingURL=game-play.component.js.map
