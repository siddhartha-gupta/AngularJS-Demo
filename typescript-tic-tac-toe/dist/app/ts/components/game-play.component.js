System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router', '../directives/modal-dialogue.directive', '../services/event-pub-sub.service', '../services/generic-config.service', '../services/current-game-config.service', '../services/ai-gamePlay.service', '../services/game-status.service', '../services/utils.service', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, router_1, modal_dialogue_directive_1, event_pub_sub_service_1, generic_config_service_1, current_game_config_service_1, ai_gamePlay_service_1, game_status_service_1, utils_service_1, settings_1;
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
            function (modal_dialogue_directive_1_1) {
                modal_dialogue_directive_1 = modal_dialogue_directive_1_1;
            },
            function (event_pub_sub_service_1_1) {
                event_pub_sub_service_1 = event_pub_sub_service_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (current_game_config_service_1_1) {
                current_game_config_service_1 = current_game_config_service_1_1;
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
                function GamePlay(genericConfig, currentGameConfig, aiGamePlay, gameStatus, utils, renderer, _dom, router, customEventService) {
                    var _this = this;
                    this.genericConfig = genericConfig;
                    this.currentGameConfig = currentGameConfig;
                    this.aiGamePlay = aiGamePlay;
                    this.gameStatus = gameStatus;
                    this.utils = utils;
                    this.renderer = renderer;
                    this._dom = _dom;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.gameInProgress = false;
                    customEventService.onHeaderClicked.subscribe(function (data) { return _this.onHeaderClicked(data); });
                    this.modalDialogue = {
                        isVisible: false,
                        title: '',
                        body: '',
                        showBtn2: false
                    };
                    this.utils.log(this.currentGameConfig);
                    this.utils.log(this.genericConfig);
                }
                GamePlay.prototype.ngOnInit = function () {
                    this.startGame();
                };
                GamePlay.prototype.startGame = function () {
                    this.resetModalConfig();
                    this.gameInProgress = true;
                    this.currentGameConfig.initDefaultConfig();
                    this.drawGrid();
                };
                GamePlay.prototype.drawGrid = function () {
                    var gridCell = [], elem = this._dom.query('ul[id*=game-grid]'), liElem = this._dom.querySelectorAll(elem, 'li'), that = this;
                    this.domCleanUp();
                    for (var i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
                        for (var j = 1; j <= len; j += 1) {
                            var idAttr = [], combinedId = i.toString() + j.toString();
                            gridCell.push('<li data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
                            this.currentGameConfig.currentGame.moves[combinedId] = 0;
                        }
                    }
                    this._dom.setInnerHTML(elem, gridCell.join(''));
                    liElem = this._dom.querySelectorAll(elem, 'li');
                    if (!this.utils.isNullUndefined(liElem)) {
                        for (var i = 0, len = liElem.length; i < len; i++) {
                            this._dom.on(liElem[i], 'click', that.onBlockClick.bind(that));
                        }
                    }
                    if (!this.genericConfig.config.playerstarts && !this.genericConfig.config.multiPlayer) {
                        this.makeAIMove();
                    }
                };
                GamePlay.prototype.onBlockClick = function (event) {
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    this.utils.log('onBlockClick');
                    if (this.genericConfig.config.playGame) {
                        var target = event.target, cellnum = parseInt(target.getAttribute('data-cellnum'), 10);
                        if (!this.currentGameConfig.currentGame.isWon) {
                            this.utils.log(this.currentGameConfig.currentGame.moves);
                            this.utils.log('cellnum: ', cellnum, ' :move: ', this.currentGameConfig.currentGame.moves[cellnum]);
                            if (this.currentGameConfig.currentGame.moves[cellnum] === 0) {
                                this.renderer.setElementClass(target, 'x-text', true);
                                this.currentGameConfig.currentGame.moves[cellnum] = 1;
                                this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = cellnum;
                                this.currentGameConfig.currentGame.stepsPlayed++;
                                this.getGameStatus(true);
                            }
                            else {
                                alert('You cannot move here!');
                            }
                        }
                    }
                };
                GamePlay.prototype.makeAIMove = function () {
                    var result = this.aiGamePlay.makeAIMove();
                    this.utils.log('makeAIMove, result: ', result);
                    this.currentGameConfig.currentGame.moves[result] = 2;
                    this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = result;
                    var elem = this._dom.query('li[id*=combine_' + result + ']');
                    this.renderer.setElementClass(elem, 'o-text', true);
                    this.currentGameConfig.currentGame.stepsPlayed++;
                    this.getGameStatus(false);
                };
                GamePlay.prototype.getGameStatus = function (isHuman) {
                    this.utils.log('getGameStatus: ', isHuman);
                    var status = this.gameStatus.checkGameEnd(isHuman);
                    this.utils.log(status);
                    switch (status) {
                        case 'gameWon':
                            this.genericConfig.config.playGame = false;
                            if (isHuman) {
                                this.showModalDialogue('Player won the match', false);
                            }
                            else {
                                this.showModalDialogue('Computer won the match', false);
                            }
                            break;
                        case 'gameDraw':
                            this.genericConfig.config.playGame = false;
                            this.showModalDialogue('Match Drawn!', false);
                            break;
                        case 'makeAIMove':
                            this.makeAIMove();
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
                                this.showModalDialogue('Current Scorecard', this.gameInProgress);
                                break;
                        }
                    }
                };
                GamePlay.prototype.showModalDialogue = function (text, gameInProgress) {
                    this.utils.log('showModalDialogue: ', text);
                    this.gameInProgress = gameInProgress;
                    this.modalDialogue = {
                        isVisible: true,
                        title: 'Game Status',
                        body: text,
                        showBtn2: !this.gameInProgress
                    };
                };
                GamePlay.prototype.onModalClose = function () {
                    this.resetModalConfig();
                    if (!this.gameInProgress) {
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
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, current_game_config_service_1.CurrentGameConfig, ai_gamePlay_service_1.AIGamePlay, game_status_service_1.GameStatus, utils_service_1.Utils, core_1.Renderer, browser_1.BrowserDomAdapter, router_1.Router, event_pub_sub_service_1.CustomEventService])
                ], GamePlay);
                return GamePlay;
            })();
            exports_1("GamePlay", GamePlay);
        }
    }
});

//# sourceMappingURL=game-play.component.js.map
