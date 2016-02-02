System.register(['angular2/core', '../helpers/settings', '../services/GenericConfig.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, settings_1, GenericConfig_service_1;
    var GameScore;
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
            }],
        execute: function() {
            GameScore = (function () {
                function GameScore(genericConfig) {
                    this.genericConfig = genericConfig;
                    console.log(genericConfig.config);
                }
                GameScore.prototype.resetGame = function ($event) {
                    console.log('resetGame');
                };
                GameScore = __decorate([
                    core_1.Component({
                        selector: 'game-score',
                        templateUrl: settings_1._settings.buildPath + 'gamescore.template.html'
                    }), 
                    __metadata('design:paramtypes', [GenericConfig_service_1.GenericConfig])
                ], GameScore);
                return GameScore;
            })();
            exports_1("GameScore", GameScore);
        }
    }
});

//# sourceMappingURL=game-score.component.js.map
