System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var GenericConfig;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GenericConfig = (function () {
                function GenericConfig() {
                    this.initDefaultConfig();
                }
                GenericConfig.prototype.initDefaultConfig = function () {
                    this.config = {
                        gridSize: 3,
                        gameLevel: 2,
                        playGame: true,
                        ways: [
                            [0, 11, 12, 13],
                            [0, 21, 22, 23],
                            [0, 31, 32, 33],
                            [0, 11, 21, 31],
                            [0, 12, 22, 32],
                            [0, 13, 23, 33],
                            [0, 11, 22, 33],
                            [0, 13, 22, 31]
                        ],
                        choices: [11, 12, 13, 21, 22, 23, 31, 32, 33],
                        corners: [11, 13, 31, 33],
                        playerstarts: true,
                        modalDialogue: {
                            isVisible: false,
                            title: '',
                            body: ''
                        },
                        gameScore: {
                            'totalGames': 0,
                            'draws': 0,
                            'playerWins': 0,
                            'computerWins': 0,
                        },
                        gridComputationLen: 0
                    };
                    this.config.gridComputationLen = (this.config.gridSize * this.config.gridSize) - 1;
                };
                GenericConfig = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GenericConfig);
                return GenericConfig;
            })();
            exports_1("GenericConfig", GenericConfig);
        }
    }
});

//# sourceMappingURL=generic-config.service.js.map
