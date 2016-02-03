System.register(['angular2/core', 'angular2/platform/browser', '../settings', '../directives/winner.directive', '../services/generic-config.service', '../services/current-game-config.service', '../services/ai-gamePlay.service', '../services/game-status.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, settings_1, winner_directive_1, generic_config_service_1, current_game_config_service_1, ai_gamePlay_service_1, game_status_service_1, utils_service_1;
    var GamePlay;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (winner_directive_1_1) {
                winner_directive_1 = winner_directive_1_1;
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
            }],
        execute: function() {
            GamePlay = (function () {
                function GamePlay(genericConfig, currentGameConfig, aiGamePlay, gameStatus, utils, elementRef, renderer, _dom) {
                    this.genericConfig = genericConfig;
                    this.currentGameConfig = currentGameConfig;
                    this.aiGamePlay = aiGamePlay;
                    this.gameStatus = gameStatus;
                    this.utils = utils;
                    this.elementRef = elementRef;
                    this.renderer = renderer;
                    this._dom = _dom;
                    this.winnerText = '';
                    this.displayWinnerText = false;
                    this.utils.log(this.currentGameConfig);
                    this.utils.log(this.genericConfig);
                }
                GamePlay.prototype.ngOnInit = function () {
                    this.startGame();
                };
                GamePlay.prototype.startGame = function () {
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
                    if (!this.genericConfig.config.playerstarts) {
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
                        var cellnum = parseInt(event.target.getAttribute('data-cellnum'), 10);
                        if (!this.currentGameConfig.currentGame.isWon) {
                            this.utils.log(this.currentGameConfig.currentGame.moves);
                            this.utils.log('cellnum: ', cellnum, ' :move: ', this.currentGameConfig.currentGame.moves[cellnum]);
                            if (this.currentGameConfig.currentGame.moves[cellnum] === 0) {
                                this.renderer.setText(event.target, 'X');
                                this.renderer.setElementClass(event.target, 'x-text', true);
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
                    this.utils.log('makeAIMove');
                    var result = 0;
                    // check if ai can win
                    result = this.aiGamePlay.chooseMove(true);
                    // check move to prevent ai loss
                    if (this.genericConfig.config.gameLevel > 1) {
                        if (!result || result === 0) {
                            result = this.aiGamePlay.chooseMove(false);
                        }
                        else {
                            this.utils.log('winning move is possible: ', result);
                        }
                    }
                    // check best possible move for ai
                    if (this.genericConfig.config.gameLevel > 2) {
                        if (!result || result === 0) {
                            result = this.aiGamePlay.seekBestMove();
                        }
                        else {
                            this.utils.log('move to prevent defeat: ', result);
                        }
                    }
                    if (!result || result == 0 || result <= 10) {
                        result = this.aiGamePlay.makeRandomMove();
                        this.utils.log('making random move: ', result);
                    }
                    else {
                        this.utils.log('best move available: ', result);
                    }
                    this.utils.log('result: ', result);
                    this.currentGameConfig.currentGame.moves[result] = 2;
                    this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = result;
                    var elem = this._dom.query('li[id*=combine_' + result + ']');
                    this.renderer.setText(elem, 'O');
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
                                this.showWinnerText('Player won the match');
                            }
                            else {
                                this.showWinnerText('Computer won the match');
                            }
                            break;
                        case 'gameDraw':
                            this.genericConfig.config.playGame = false;
                            this.showWinnerText('Match Drawn!');
                            break;
                        case 'makeAIMove':
                            this.makeAIMove();
                    }
                };
                GamePlay.prototype.showWinnerText = function (text) {
                    var _this = this;
                    this.utils.log('showWinnerText: ', text);
                    this.winnerText = text;
                    this.displayWinnerText = true;
                    setTimeout(function () {
                        _this.displayWinnerText = false;
                        _this.winnerText = '';
                        _this.genericConfig.config.playGame = true;
                        _this.startGame();
                    }, 2000);
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
                GamePlay = __decorate([
                    core_1.Component({
                        selector: 'game-play-grid',
                        providers: [ai_gamePlay_service_1.AIGamePlay, game_status_service_1.GameStatus, utils_service_1.Utils, browser_1.BrowserDomAdapter],
                        directives: [winner_directive_1.Winner],
                        templateUrl: settings_1._settings.templatePath.component + 'gameplay.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, current_game_config_service_1.CurrentGameConfig, ai_gamePlay_service_1.AIGamePlay, game_status_service_1.GameStatus, utils_service_1.Utils, core_1.ElementRef, core_1.Renderer, browser_1.BrowserDomAdapter])
                ], GamePlay);
                return GamePlay;
            })();
            exports_1("GamePlay", GamePlay);
        }
    }
});

//# sourceMappingURL=game-play.component.js.map
