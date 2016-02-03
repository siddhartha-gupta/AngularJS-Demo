System.register(['angular2/core', '../settings', '../services/generic-config.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, settings_1, generic_config_service_1, utils_service_1;
    var GameLevel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            GameLevel = (function () {
                function GameLevel(genericConfig, utils) {
                    this.genericConfig = genericConfig;
                    this.utils = utils;
                    this.radioItems = [{
                            'value': 1,
                            'text': 'Easy',
                        },
                        {
                            'value': 2,
                            'text': 'Medium'
                        },
                        {
                            'value': 3,
                            'text': 'Expert'
                        }];
                }
                GameLevel = __decorate([
                    core_1.Component({
                        selector: 'game-level',
                        providers: [utils_service_1.Utils],
                        templateUrl: settings_1._settings.templatePath.component + 'gamelevel.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, utils_service_1.Utils])
                ], GameLevel);
                return GameLevel;
            })();
            exports_1("GameLevel", GameLevel);
        }
    }
});

//# sourceMappingURL=game-level.component.js.map
