System.register(['angular2/core', '../helpers/settings', '../services/GenericConfig.service', '../services/CurrentGameConfig.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, settings_1, GenericConfig_service_1, CurrentGameConfig_service_1;
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
            }],
        execute: function() {
            GamePlay = (function () {
                function GamePlay(genericConfig, currentGameConfig) {
                    this.genericConfig = genericConfig;
                    this.currentGameConfig = currentGameConfig;
                    this.theHtmlString = '';
                    this.drawGrid();
                }
                GamePlay.prototype.drawGrid = function () {
                    var gridCell = [];
                    this.theHtmlString = '';
                    console.log(this.genericConfig.config.gridSize);
                    console.log(this.currentGameConfig.currentGame);
                    for (var i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
                        for (var j = 1; j <= len; j += 1) {
                            var idAttr = [], combinedId = i.toString() + j.toString();
                            gridCell.push('<li data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick($event)"></li>');
                            this.currentGameConfig.currentGame.moves[combinedId] = 0;
                        }
                    }
                    this.theHtmlString = gridCell.join('');
                    // $('#game-grid li').off('click').on('click', game.gamePlay.onBlockClick);
                };
                GamePlay.prototype.onBlockClick = function ($event) {
                    console.log('onBlockClick');
                };
                GamePlay = __decorate([
                    core_1.Component({
                        selector: 'game-play-grid',
                        templateUrl: settings_1._settings.buildPath + 'gameplay.template.html'
                    }), 
                    __metadata('design:paramtypes', [GenericConfig_service_1.GenericConfig, CurrentGameConfig_service_1.CurrentGameConfig])
                ], GamePlay);
                return GamePlay;
            })();
            exports_1("GamePlay", GamePlay);
        }
    }
});

//# sourceMappingURL=game-play.component.js.map
