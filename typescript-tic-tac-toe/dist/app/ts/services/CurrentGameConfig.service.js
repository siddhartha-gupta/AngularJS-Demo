System.register(['angular2/core', './GenericConfig.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, GenericConfig_service_1;
    var CurrentGameConfig;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (GenericConfig_service_1_1) {
                GenericConfig_service_1 = GenericConfig_service_1_1;
            }],
        execute: function() {
            CurrentGameConfig = (function () {
                function CurrentGameConfig(genericConfig) {
                    this.genericConfig = genericConfig;
                    this.initDefaultConfig();
                }
                CurrentGameConfig.prototype.initDefaultConfig = function () {
                    console.log('initDefaultConfig');
                    this.currentGame = {
                        isWon: false,
                        moves: [],
                        stepsPlayed: 0,
                        movesIndex: []
                    };
                    for (i = 0; i <= this.genericConfig.config.gridComputationLen; i++) {
                        this.currentGame.movesIndex[i] = 0;
                    }
                    // if (!this.genericConfig.config.playerstarts) game.gamePlay.makeAIMove();
                };
                CurrentGameConfig = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [GenericConfig_service_1.GenericConfig])
                ], CurrentGameConfig);
                return CurrentGameConfig;
            })();
            exports_1("CurrentGameConfig", CurrentGameConfig);
        }
    }
});

//# sourceMappingURL=CurrentGameConfig.service.js.map
