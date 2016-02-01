System.register(['angular2/core', '../helpers/settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, settings_1;
    var GamePlay;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            GamePlay = (function () {
                function GamePlay() {
                }
                GamePlay = __decorate([
                    core_1.Component({
                        selector: 'game-play-grid',
                        templateUrl: settings_1._settings.buildPath + 'gameplay.template.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], GamePlay);
                return GamePlay;
            })();
            exports_1("GamePlay", GamePlay);
        }
    }
});

//# sourceMappingURL=game-play.component.js.map
