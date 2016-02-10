System.register(['angular2/core', './generic-config.service', './current-game-config.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, generic_config_service_1, current_game_config_service_1, utils_service_1;
    var AIGamePlay;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (current_game_config_service_1_1) {
                current_game_config_service_1 = current_game_config_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            AIGamePlay = (function () {
                function AIGamePlay(genericConfig, currentGameConfig, utils) {
                    this.genericConfig = genericConfig;
                    this.currentGameConfig = currentGameConfig;
                    this.utils = utils;
                }
                AIGamePlay.prototype.makeAIMove = function () {
                    var result = 0;
                    // check if ai can win
                    result = this.chooseMove(true);
                    // check move to prevent ai loss
                    if (this.genericConfig.computerConfig.gameLevel > 1) {
                        if (!result || result === 0) {
                            result = this.chooseMove(false);
                        }
                        else {
                            this.utils.log('winning move is possible: ', result);
                        }
                    }
                    // check best possible move for ai
                    if (this.genericConfig.computerConfig.gameLevel > 2) {
                        if (!result || result === 0) {
                            result = this.seekBestMove();
                        }
                        else {
                            this.utils.log('move to prevent defeat: ', result);
                        }
                    }
                    if (!result || result == 0 || result <= 10) {
                        result = this.makeRandomMove();
                        this.utils.log('making random move: ', result);
                    }
                    else {
                        this.utils.log('best move available: ', result);
                    }
                    return result;
                };
                AIGamePlay.prototype.chooseMove = function (istowin) {
                    var gridValue = (istowin) ? 2 : 1, result;
                    for (var n = 0; n < this.genericConfig.config.gridComputationLen; n++) {
                        var n1 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][1]], n2 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][2]], n3 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][3]];
                        if ((n1 == gridValue) && (n2 == gridValue) && (n3 === 0)) {
                            result = this.genericConfig.config.ways[n][3];
                            break;
                        }
                        if ((n3 == gridValue) && (n1 == gridValue) && (n2 === 0)) {
                            result = this.genericConfig.config.ways[n][2];
                            break;
                        }
                        if ((n2 == gridValue) && (n3 == gridValue) && (n1 === 0)) {
                            result = this.genericConfig.config.ways[n][1];
                            break;
                        }
                    }
                    return result;
                };
                AIGamePlay.prototype.seekBestMove = function () {
                    var moveIndex0 = parseInt(this.currentGameConfig.currentGame.movesIndex[0], 10), moveIndex1 = parseInt(this.currentGameConfig.currentGame.movesIndex[1], 10), moveIndex2 = parseInt(this.currentGameConfig.currentGame.movesIndex[2], 10), moveIndex3 = parseInt(this.currentGameConfig.currentGame.movesIndex[3], 10), result, dlta, randomPosition = [];
                    switch (this.currentGameConfig.currentGame.stepsPlayed) {
                        case 0:
                            result = this.genericConfig.config.choices[2 * Math.floor(Math.random() * 5)];
                            if (result == 22) {
                                this.aiThinking = 1;
                            }
                            else {
                                this.aiThinking = 2;
                            }
                            break;
                        case 1:
                            if (moveIndex0 == 11 || moveIndex0 == 13 || moveIndex0 == 31 || moveIndex0 == 33) {
                                result = 22;
                                this.aiThinking = 1;
                            }
                            else if (moveIndex0 == 22) {
                                result = this.chooseCorner('noPrefrence');
                                this.aiThinking = 2;
                            }
                            else {
                                result = 22;
                                this.aiThinking = 3;
                            }
                            break;
                        case 2:
                            if (this.aiThinking == 1) {
                                if (moveIndex1 == 11 || moveIndex1 == 13 || moveIndex1 == 31 || moveIndex1 == 33) {
                                    result = 44 - moveIndex1;
                                }
                                else {
                                    dlta = 22 - moveIndex1;
                                    randomPosition.push(22 + dlta + (10 / dlta));
                                    randomPosition.push(22 + dlta - (10 / dlta));
                                    result = randomPosition[Math.floor(Math.random() * randomPosition.length)];
                                }
                            }
                            else if (this.aiThinking == 2) {
                                if (moveIndex1 == 22) {
                                    result = 44 - moveIndex0;
                                    this.aiThinking = 21;
                                }
                                else if (moveIndex1 == 11 || moveIndex1 == 13 || moveIndex1 == 31 || moveIndex1 == 33) {
                                    result = this.chooseCorner('blank');
                                    this.aiThinking = 22;
                                }
                                else {
                                    result = 22;
                                    this.aiThinking = 23;
                                }
                            }
                            break;
                        case 3:
                            if (this.aiThinking == 1) {
                                if (moveIndex2 == 44 - moveIndex0) {
                                    result = this.genericConfig.config.choices[1 + (2 * Math.floor(Math.random() * 4))];
                                }
                                else {
                                    result = 44 - moveIndex0;
                                }
                            }
                            else if (this.aiThinking === 2 && (moveIndex2 == 44 - moveIndex1)) {
                                result = this.chooseCorner('blank');
                            }
                            else if (this.aiThinking == 3) {
                                if (moveIndex2 == 11 || moveIndex2 == 13 || moveIndex2 == 31 || moveIndex2 == 33) {
                                    result = 44 - moveIndex2;
                                }
                                if (moveIndex2 == 44 - moveIndex0) {
                                    dlta = 22 - moveIndex2;
                                    result = 22 + (10 / dlta);
                                    this.cachedNextMove = result + dlta;
                                    console.log('cachedNextMove: ', this.cachedNextMove);
                                }
                                else {
                                    dlta = 22 - moveIndex0;
                                    randomPosition.push(moveIndex0 + (10 / dlta));
                                    randomPosition.push(moveIndex0 - (10 / dlta));
                                    randomPosition.push(moveIndex2 + dlta);
                                    result = randomPosition[Math.floor(Math.random() * randomPosition.length)];
                                }
                            }
                            break;
                        case 4:
                            if (this.aiThinking == 22) {
                                for (var i = 0; i < 4; i++) {
                                    if (this.currentGameConfig.currentGame.moves[this.genericConfig.config.corners[i]] === 0) {
                                        result = this.genericConfig.config.corners[i];
                                    }
                                }
                            }
                            else if (this.aiThinking == 23) {
                                dlta = moveIndex1 - moveIndex0;
                                var rp0 = 44 - (moveIndex1 + dlta);
                                randomPosition.push(rp0);
                                randomPosition.push((rp0 + moveIndex0) / 2);
                                result = randomPosition[Math.floor(Math.random() * randomPosition.length)];
                            }
                            else if (this.aiThinking == 1) {
                                result = 44 + moveIndex2 - (2 * moveIndex3);
                            }
                            break;
                        case 5:
                            if (this.aiThinking == 3 && this.cachedNextMove !== undefined) {
                                result = this.cachedNextMove;
                            }
                            break;
                    }
                    console.log('playerStartsGame: ', result);
                    return result;
                };
                AIGamePlay.prototype.makeRandomMove = function () {
                    var result;
                    do {
                        result = this.genericConfig.config.choices[Math.floor(Math.random() * 9)];
                    } while (this.currentGameConfig.currentGame.moves[result] !== 0);
                    return result;
                };
                AIGamePlay.prototype.chooseCorner = function (choice) {
                    var result;
                    switch (choice) {
                        case 'blank':
                            do {
                                result = this.genericConfig.config.corners[Math.floor(Math.random() * 4)];
                            } while (this.currentGameConfig.currentGame.moves[result] !== 0);
                            break;
                        case 'noPrefrence':
                            result = this.genericConfig.config.corners[Math.floor(Math.random() * 4)];
                            break;
                    }
                    return result;
                };
                AIGamePlay = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, current_game_config_service_1.CurrentGameConfig, utils_service_1.Utils])
                ], AIGamePlay);
                return AIGamePlay;
            })();
            exports_1("AIGamePlay", AIGamePlay);
        }
    }
});

//# sourceMappingURL=ai-gamePlay.service.js.map
