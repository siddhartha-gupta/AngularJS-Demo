System.register(['angular2/core', './GenericConfig.service', './CurrentGameConfig.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, GenericConfig_service_1, CurrentGameConfig_service_1;
    var GameStatus;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (GenericConfig_service_1_1) {
                GenericConfig_service_1 = GenericConfig_service_1_1;
            },
            function (CurrentGameConfig_service_1_1) {
                CurrentGameConfig_service_1 = CurrentGameConfig_service_1_1;
            }],
        execute: function() {
            GameStatus = (function () {
                function GameStatus(genericConfig, currentGameConfig) {
                    this.genericConfig = genericConfig;
                    this.currentGameConfig = currentGameConfig;
                }
                GameStatus.prototype.checkGameEnd = function (isHuman) {
                    console.log('checkGameEnd: ', isHuman);
                    var gridValue = (isHuman) ? 1 : 2;
                    for (var n = 0; n < this.genericConfig.config.gridComputationLen; n++) {
                        var n1 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][1]], n2 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][2]], n3 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][3]];
                        if ((n1 == gridValue) && (n2 == gridValue) && (n3 == gridValue)) {
                            this.currentGameConfig.currentGame.isWon = true;
                            break;
                        }
                    }
                    if (this.currentGameConfig.currentGame.isWon) {
                        this.onGameWon();
                        return 'gameWon';
                    }
                    else {
                        if (this.currentGameConfig.currentGame.stepsPlayed > 8) {
                            this.onGameDraw();
                            return 'gameDraw';
                        }
                        else if (isHuman) {
                            console.log('makeAIMove: ', isHuman);
                            return 'makeAIMove';
                        }
                    }
                };
                GameStatus.prototype.onGameWon = function (isHuman) {
                    if (isHuman) {
                        this.genericConfig.config.gameScore.totalGames += 1;
                        this.genericConfig.config.gameScore.playerWins += 1;
                        this.genericConfig.config.playerstarts = true;
                    }
                    else {
                        this.genericConfig.config.gameScore.totalGames += 1;
                        this.genericConfig.config.gameScore.computerWins += 1;
                        this.genericConfig.config.playerstarts = false;
                    }
                };
                GameStatus.prototype.onGameDraw = function () {
                    this.genericConfig.config.gameScore.totalGames += 1;
                    this.genericConfig.config.gameScore.draws += 1;
                    this.genericConfig.config.playerstarts = !this.genericConfig.config.playerstarts;
                };
                GameStatus = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [GenericConfig_service_1.GenericConfig, CurrentGameConfig_service_1.CurrentGameConfig])
                ], GameStatus);
                return GameStatus;
            })();
            exports_1("GameStatus", GameStatus);
        }
    }
});

//# sourceMappingURL=GameStatus.service.js.map
