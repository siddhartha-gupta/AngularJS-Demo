System.register(['angular2/core', '../helpers/settings', '../services/GenericConfig.service', '../services/CurrentGameConfig.service', '../services/AIGamePlay.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, settings_1, GenericConfig_service_1, CurrentGameConfig_service_1, AIGamePlay_service_1, utils_service_1;
    var GamePlay;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            GamePlay = (function () {
                function GamePlay(genericConfig, currentGameConfig, aiGamePlay, elementRef, renderer, utils) {
                    this.genericConfig = genericConfig;
                    this.currentGameConfig = currentGameConfig;
                    this.aiGamePlay = aiGamePlay;
                    this.elementRef = elementRef;
                    this.renderer = renderer;
                    this.utils = utils;
                    this.theHtmlString = '';
                    this.drawGrid();
                }
                GamePlay.prototype.drawGrid = function () {
                    var _this = this;
                    var gridCell = [];
                    this.theHtmlString = '';
                    console.log(this.genericConfig.config.gridSize);
                    console.log(this.currentGameConfig.currentGame);
                    for (var i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
                        for (var j = 1; j <= len; j += 1) {
                            var idAttr = [], combinedId = i.toString() + j.toString();
                            gridCell.push('<li data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
                            this.currentGameConfig.currentGame.moves[combinedId] = 0;
                        }
                    }
                    this.theHtmlString = gridCell.join('');
                    // this.renderer.listen();
                    this.renderer.listen(this.elementRef.nativeElement, 'click', function (event) {
                        console.log('Element clicked');
                        // console.log(event);
                        _this.onBlockClick(event);
                    });
                    // $('#game-grid li').off('click').on('click', game.gamePlay.onBlockClick);
                };
                GamePlay.prototype.onBlockClick = function (event) {
                    console.log('onBlockClick');
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    var cellnum = event.target.getAttribute('data-cellnum');
                    if (!this.currentGameConfig.currentGame.isWon) {
                        if (this.currentGameConfig.currentGame.moves[cellnum] === 0) {
                            this.renderer.setText(event.target, 'X');
                            // $('li[id*=combine_' + cellnum + ']').text('X').addClass('x-text');
                            this.currentGameConfig.currentGame.moves[cellnum] = 1;
                            this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = cellnum;
                            this.currentGameConfig.currentGame.stepsPlayed++;
                            console.log('calling checkGameEnd');
                            this.checkGameEnd(true);
                        }
                        else {
                            alert('You cannot move here!');
                        }
                    }
                };
                GamePlay.prototype.checkGameEnd = function (isHuman) {
                    console.log('checkGameEnd: ', isHuman);
                    var gridValue = (isHuman) ? 1 : 2;
                    for (n = 0; n < this.genericConfig.config.gridComputationLen; n++) {
                        var n1 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][1]], n2 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][2]], n3 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][3]];
                        if ((n1 == gridValue) && (n2 == gridValue) && (n3 == gridValue)) {
                            this.currentGameConfig.currentGame.isWon = true;
                            break;
                        }
                    }
                    if (this.currentGameConfig.currentGame.isWon) {
                        this.onGameWon();
                    }
                    else {
                        if (this.currentGameConfig.currentGame.stepsPlayed > 8) {
                            this.onGameDraw();
                        }
                        else if (isHuman) {
                            console.log('makeAIMove: ', isHuman);
                            this.makeAIMove();
                        }
                    }
                };
                GamePlay.prototype.onGameWon = function (isHuman) {
                    if (isHuman) {
                        this.genericConfig.config.gameScore.total_games += 1;
                        this.genericConfig.config.gameScore.player_win += 1;
                        // $('#total_games').text(this.genericConfig.config.gameScore.total_games);
                        // $('#player_win').text(this.genericConfig.config.gameScore.player_win);
                        // showWinnerText('Player won the match');
                        this.genericConfig.config.playerstarts = true;
                    }
                    else {
                        this.genericConfig.config.gameScore.total_games += 1;
                        this.genericConfig.config.gameScore.computer_win += 1;
                        // $('#total_games').text(this.genericConfig.config.gameScore.total_games);
                        // $('#computer_win').text(this.genericConfig.config.gameScore.computer_win);
                        // showWinnerText('Computer won the match');
                        this.genericConfig.config.playerstarts = false;
                    }
                };
                GamePlay.prototype.onGameDraw = function () {
                    this.genericConfig.config.gameScore.total_games += 1;
                    this.genericConfig.config.gameScore.draws += 1;
                    // $('#total_games').text(this.genericConfig.config.gameScore.total_games);
                    // $('#draws').text(this.genericConfig.config.gameScore.draws);
                    // showWinnerText('Match drawn');
                    this.genericConfig.config.playerstarts = !this.genericConfig.config.playerstarts;
                    // setTimeout(function() {
                    // 	game.app.startGame();
                    // }, 1000);
                };
                GamePlay.prototype.makeAIMove = function () {
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
                    $('li[id*=combine_' + result + ']').text('O').addClass('o-text');
                    this.currentGameConfig.currentGame.stepsPlayed++;
                    this.checkGameEnd(false);
                };
                GamePlay = __decorate([
                    core_1.Component({
                        selector: 'game-play-grid',
                        providers: [AIGamePlay_service_1.AIGamePlay, utils_service_1.Utils],
                        templateUrl: settings_1._settings.buildPath + 'gameplay.template.html'
                    }), 
                    __metadata('design:paramtypes', [GenericConfig_service_1.GenericConfig, CurrentGameConfig_service_1.CurrentGameConfig, AIGamePlay_service_1.AIGamePlay, core_1.ElementRef, core_1.Renderer, utils_service_1.Utils])
                ], GamePlay);
                return GamePlay;
            })();
            exports_1("GamePlay", GamePlay);
        }
    }
});

//# sourceMappingURL=game-play.component.js.map
