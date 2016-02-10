System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router', '../services/server-communicator.service', '../directives/modal-dialogue.directive', '../services/event-pub-sub.service', '../services/generic-config.service', '../services/ai-gamePlay.service', '../services/game-status.service', '../services/utils.service', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, router_1, server_communicator_service_1, modal_dialogue_directive_1, event_pub_sub_service_1, generic_config_service_1, ai_gamePlay_service_1, game_status_service_1, utils_service_1, settings_1;
    var GamePlay;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (server_communicator_service_1_1) {
                server_communicator_service_1 = server_communicator_service_1_1;
            },
            function (modal_dialogue_directive_1_1) {
                modal_dialogue_directive_1 = modal_dialogue_directive_1_1;
            },
            function (event_pub_sub_service_1_1) {
                event_pub_sub_service_1 = event_pub_sub_service_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (ai_gamePlay_service_1_1) {
                ai_gamePlay_service_1 = ai_gamePlay_service_1_1;
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
                function GamePlay(genericConfig, aiGamePlay, gameStatus, utils, renderer, _dom, router, customEventService, serverCommunicator) {
                    var _this = this;
                    this.genericConfig = genericConfig;
                    this.aiGamePlay = aiGamePlay;
                    this.gameStatus = gameStatus;
                    this.utils = utils;
                    this.renderer = renderer;
                    this._dom = _dom;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.serverCommunicator = serverCommunicator;
                    customEventService.onHeaderClicked.subscribe(function (data) { return _this.onHeaderClicked(data); });
                    customEventService.onMoveReceived.subscribe(function (data) { return _this.onMoveReceived(data); });
                    this.modalDialogue = {
                        isVisible: false,
                        title: '',
                        body: '',
                        showBtn2: false
                    };
                    this.utils.log(this.genericConfig);
                }
                GamePlay.prototype.ngOnInit = function () {
                    this.startGame();
                };
                GamePlay.prototype.startGame = function () {
                    this.resetModalConfig();
                    this.genericConfig.config.playGame = true;
                    this.genericConfig.initCurrentGameConfig();
                    this.drawGrid();
                };
                GamePlay.prototype.getHoverClass = function () {
                    var className = 'player1';
                    if (this.genericConfig.config.multiPlayer && !this.genericConfig.multiPlayerConfig.player1) {
                        className = 'player2';
                    }
                    return className;
                };
                GamePlay.prototype.drawGrid = function () {
                    var gridCell = [], elem = this._dom.query('ul[id*=game-grid]'), liElem = this._dom.querySelectorAll(elem, 'li'), that = this, hoverClass = this.getHoverClass();
                    this.domCleanUp();
                    for (var i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
                        for (var j = 1; j <= len; j += 1) {
                            var idAttr = [], combinedId = i.toString() + j.toString();
                            gridCell.push('<li class="' + hoverClass + '" data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
                            this.genericConfig.currentGame.moves[combinedId] = 0;
                        }
                    }
                    this._dom.setInnerHTML(elem, gridCell.join(''));
                    liElem = this._dom.querySelectorAll(elem, 'li');
                    if (!this.utils.isNullUndefined(liElem)) {
                        for (var i = 0, len = liElem.length; i < len; i++) {
                            this._dom.on(liElem[i], 'click', that.onBlockClick.bind(that));
                        }
                    }
                    if (!this.genericConfig.computerConfig.playerstarts) {
                        this.makeAIMove();
                    }
                };
                GamePlay.prototype.onBlockClick = function (event) {
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    this.utils.log('onBlockClick: ', this.genericConfig.config.playGame);
                    if (this.canPlay()) {
                        var target = event.target, cellnum = parseInt(target.getAttribute('data-cellnum'), 10);
                        if (!this.genericConfig.currentGame.isWon) {
                            this.utils.log(this.genericConfig.currentGame.moves);
                            this.utils.log('cellnum: ', cellnum, ' :move: ', this.genericConfig.currentGame.moves[cellnum]);
                            if (this.genericConfig.currentGame.moves[cellnum] === 0) {
                                this.genericConfig.currentGame.moves[cellnum] = 1;
                                this.genericConfig.currentGame.movesIndex[this.genericConfig.currentGame.stepsPlayed] = cellnum;
                                this.genericConfig.currentGame.stepsPlayed++;
                                this.setClass(target, true, this.genericConfig.multiPlayerConfig.playerSymbol);
                                this.getGameStatus(true, cellnum);
                                this.sendMoveToSever(cellnum, this.genericConfig.multiPlayerConfig.playerSymbol);
                            }
                            else {
                                alert('You cannot move here!');
                            }
                        }
                    }
                    else {
                        console.log('not allowed to play for now');
                    }
                };
                GamePlay.prototype.canPlay = function () {
                    if (this.genericConfig.config.multiPlayer) {
                        if (this.genericConfig.multiPlayerConfig.playerTurn && this.genericConfig.config.playGame) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return this.genericConfig.config.playGame;
                    }
                };
                GamePlay.prototype.setClass = function (target, isHuman, symbol) {
                    switch (isHuman) {
                        case true:
                            if (this.genericConfig.config.multiPlayer) {
                                this.renderer.setElementClass(target, symbol + '-text', true);
                            }
                            else {
                                this.renderer.setElementClass(target, 'x-text', true);
                            }
                            break;
                        case false:
                            this.renderer.setElementClass(target, 'o-text', true);
                    }
                };
                /*
                * While playing with computer
                * we make use of below function
                */
                GamePlay.prototype.makeAIMove = function () {
                    if (!this.genericConfig.config.multiPlayer) {
                        var result = this.aiGamePlay.makeAIMove(), elem = this._dom.query('li[id*=combine_' + result + ']');
                        this.utils.log('makeAIMove, result: ', result);
                        this.genericConfig.currentGame.moves[result] = 2;
                        this.genericConfig.currentGame.movesIndex[this.genericConfig.currentGame.stepsPlayed] = result;
                        this.genericConfig.currentGame.stepsPlayed++;
                        this.setClass(elem, false, 'o');
                        this.getGameStatus(false, result);
                    }
                };
                /*
                * While playing in multiplayer mode
                * we make use of below function
                */
                GamePlay.prototype.onMoveReceived = function (data) {
                    var result = parseInt(data.move), elem = this._dom.query('li[id*=combine_' + result + ']');
                    this.utils.log('make multiPlayer move, result: ', result);
                    this.genericConfig.currentGame.moves[result] = 2;
                    this.genericConfig.currentGame.movesIndex[this.genericConfig.currentGame.stepsPlayed] = result;
                    this.genericConfig.currentGame.stepsPlayed++;
                    this.setClass(elem, true, data.symbol);
                    this.getGameStatus(false, result);
                    this.genericConfig.multiPlayerConfig.playerTurn = true;
                };
                GamePlay.prototype.getGameStatus = function (isHuman, move) {
                    this.utils.log('getGameStatus: ', isHuman);
                    var status = this.gameStatus.checkGameEnd(isHuman);
                    this.utils.log(status);
                    switch (status) {
                        case 'gameWon':
                            this.genericConfig.config.playGame = false;
                            if (isHuman) {
                                this.showModalDialogue('Player won the match');
                            }
                            else {
                                this.showModalDialogue('Computer won the match');
                            }
                            break;
                        case 'gameDraw':
                            this.genericConfig.config.playGame = false;
                            this.showModalDialogue('Match Drawn!');
                            break;
                        case 'makeAIMove':
                            this.makeAIMove();
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
                GamePlay.prototype.domCleanUp = function () {
                    var elem = this._dom.query('ul[id*=game-grid]'), liElem = this._dom.querySelectorAll(elem, 'li'), that = this;
                    if (liElem) {
                        for (var i = 0, len = liElem.length; i < length; i += 1) {
                            liElem[i].removeEventListener('click', that.onBlockClick.bind(that), false);
                        }
                    }
                    this._dom.setInnerHTML(elem, '');
                };
                GamePlay.prototype.onHeaderClicked = function (data) {
                    if (data.routeName === '/gameplay') {
                        switch (data.btnType) {
                            case 'left':
                                this.goToHome();
                                break;
                            case 'right':
                                this.showModalDialogue('Current Scorecard');
                                break;
                        }
                    }
                };
                GamePlay.prototype.showModalDialogue = function (text) {
                    this.utils.log('showModalDialogue: ', text);
                    this.modalDialogue = {
                        isVisible: true,
                        title: 'Game Status',
                        body: text,
                        showBtn2: !this.genericConfig.config.playGame
                    };
                };
                GamePlay.prototype.onModalClose = function () {
                    this.resetModalConfig();
                    if (!this.genericConfig.config.playGame) {
                        this.startGame();
                    }
                };
                GamePlay.prototype.goToHome = function () {
                    this.resetModalConfig();
                    console.log('goToHome');
                    this.router.navigate(['Home']);
                };
                GamePlay.prototype.resetModalConfig = function () {
                    this.modalDialogue = {
                        isVisible: false,
                        title: '',
                        body: '',
                        showBtn2: false
                    };
                };
                GamePlay = __decorate([
                    core_1.Component({
                        selector: 'GamePlay',
                        providers: [ai_gamePlay_service_1.AIGamePlay, game_status_service_1.GameStatus, utils_service_1.Utils, browser_1.BrowserDomAdapter],
                        directives: [router_1.ROUTER_DIRECTIVES, modal_dialogue_directive_1.ModalDialouge],
                        // styleUrls: [_settings.cssPath + 'gameplay.css'],
                        // encapsulation: ViewEncapsulation.Native,
                        templateUrl: settings_1._settings.templatePath.component + 'gameplay.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, ai_gamePlay_service_1.AIGamePlay, game_status_service_1.GameStatus, utils_service_1.Utils, core_1.Renderer, browser_1.BrowserDomAdapter, router_1.Router, event_pub_sub_service_1.CustomEventService, server_communicator_service_1.ServerCommunicator])
                ], GamePlay);
                return GamePlay;
            })();
            exports_1("GamePlay", GamePlay);
        }
    }
});

//# sourceMappingURL=game-play.component.js.map
