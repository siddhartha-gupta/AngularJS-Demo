System.register(['angular2/core', 'angular2/platform/browser', '../helpers/settings', '../services/GenericConfig.service', '../services/CurrentGameConfig.service', '../services/AIGamePlay.service', '../services/GameStatus.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, settings_1, GenericConfig_service_1, CurrentGameConfig_service_1, AIGamePlay_service_1, GameStatus_service_1, utils_service_1;
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
            function (GenericConfig_service_1_1) {
                GenericConfig_service_1 = GenericConfig_service_1_1;
            },
            function (CurrentGameConfig_service_1_1) {
                CurrentGameConfig_service_1 = CurrentGameConfig_service_1_1;
            },
            function (AIGamePlay_service_1_1) {
                AIGamePlay_service_1 = AIGamePlay_service_1_1;
            },
            function (GameStatus_service_1_1) {
                GameStatus_service_1 = GameStatus_service_1_1;
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
                    if (liElem) {
                        for (var i = 0, len = liElem.length; i < length; i += 1) {
                            liElem[i].removeEventListener('click', that.onBlockClick.bind(that), false);
                        }
                    }
                    this._dom.setInnerHTML(elem, '');
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
                    console.log('onBlockClick');
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    var cellnum = parseInt(event.target.getAttribute('data-cellnum'), 10);
                    // debugger;
                    if (!this.currentGameConfig.currentGame.isWon) {
                        console.log(this.currentGameConfig.currentGame.moves);
                        console.log('cellnum: ', cellnum, ' :move: ', this.currentGameConfig.currentGame.moves[cellnum]);
                        if (this.currentGameConfig.currentGame.moves[cellnum] === 0) {
                            this.renderer.setText(event.target, 'X');
                            this.renderer.setElementClass(event.target, 'x-text', true);
                            this.currentGameConfig.currentGame.moves[cellnum] = 1;
                            this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = cellnum;
                            this.currentGameConfig.currentGame.stepsPlayed++;
                            this.checkGameEnd(true);
                        }
                        else {
                            alert('You cannot move here!');
                        }
                    }
                };
                GamePlay.prototype.checkGameEnd = function (isHuman) {
                    var _this = this;
                    console.log('checkGameEnd: ', isHuman);
                    var status = this.gameStatus.checkGameEnd(isHuman);
                    console.log(status);
                    switch (status) {
                        case 'gameComplete':
                            setTimeout(function () {
                                _this.startGame();
                            }, 100);
                            break;
                        case 'makeAIMove':
                            this.makeAIMove();
                    }
                };
                GamePlay.prototype.makeAIMove = function () {
                    console.log('makeAIMove');
                    var result = '00';
                    // check if ai can win
                    result = this.aiGamePlay.chooseMove(true);
                    // check move to prevent ai loss
                    if (!result || result == '00') {
                        result = this.aiGamePlay.chooseMove(false);
                    }
                    else {
                        console.log('winning move is possible: ', result);
                    }
                    // check best possible move for ai
                    if (!result || result == '00') {
                        result = this.aiGamePlay.seekBestMove();
                    }
                    else {
                        console.log('move to prevent defeat: ', result);
                    }
                    if (!result || result == '00' || result <= 10) {
                        result = this.aiGamePlay.makeRandomMove();
                        console.log('making random move: ', result);
                    }
                    else {
                        console.log('best move available: ', result);
                    }
                    console.log('result: ', result);
                    this.currentGameConfig.currentGame.moves[result] = 2;
                    this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = result;
                    // $('li[id*=combine_' + result + ']').text('O').addClass('o-text');
                    var elem = this._dom.query('li[id*=combine_' + result + ']');
                    this.renderer.setText(elem, 'O');
                    this.renderer.setElementClass(elem, 'o-text', true);
                    this.currentGameConfig.currentGame.stepsPlayed++;
                    this.checkGameEnd(false);
                };
                GamePlay = __decorate([
                    core_1.Component({
                        selector: 'game-play-grid',
                        providers: [AIGamePlay_service_1.AIGamePlay, GameStatus_service_1.GameStatus, utils_service_1.Utils, browser_1.BrowserDomAdapter],
                        templateUrl: settings_1._settings.buildPath + 'gameplay.template.html'
                    }), 
                    __metadata('design:paramtypes', [GenericConfig_service_1.GenericConfig, CurrentGameConfig_service_1.CurrentGameConfig, AIGamePlay_service_1.AIGamePlay, GameStatus_service_1.GameStatus, utils_service_1.Utils, core_1.ElementRef, core_1.Renderer, browser_1.BrowserDomAdapter])
                ], GamePlay);
                return GamePlay;
            })();
            exports_1("GamePlay", GamePlay);
        }
    }
});

//# sourceMappingURL=game-play.component.js.map
