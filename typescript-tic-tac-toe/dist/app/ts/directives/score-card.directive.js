System.register(['angular2/core', '../settings', '../services/generic-config.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, settings_1, generic_config_service_1;
    var ScoreCard;
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
            }],
        execute: function() {
            ScoreCard = (function () {
                function ScoreCard(genericConfig) {
                    this.genericConfig = genericConfig;
                    this.btn1Callback = new core_1.EventEmitter();
                    this.btn2Callback = new core_1.EventEmitter();
                    this.closeBtnCallback = new core_1.EventEmitter();
                    var opponent = (this.genericConfig.config.multiPlayer) ? this.genericConfig.multiPlayerConfig.recipient : 'Computer';
                    var symbol = (this.genericConfig.config.multiPlayer) ? this.genericConfig.multiPlayerConfig.playerSymbol : 'x';
                    var chance = (this.genericConfig.config.multiPlayer && !this.genericConfig.multiPlayerConfig.player1) ? 'Second' : 'First';
                    this.model = {
                        'opponent': opponent,
                        'symbol': symbol,
                        'chance': chance
                    };
                }
                ScoreCard.prototype.mainMenu = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.btn1Callback.emit(event);
                };
                ScoreCard.prototype.playAgain = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.btn2Callback.emit(event);
                };
                ScoreCard.prototype.hideModal = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.closeBtnCallback.emit(event);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ScoreCard.prototype, "btn1Callback", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ScoreCard.prototype, "btn2Callback", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ScoreCard.prototype, "closeBtnCallback", void 0);
                ScoreCard = __decorate([
                    core_1.Component({
                        selector: 'score-card, [score-card]',
                        inputs: ['isVisible', 'title', 'body', 'showBtn2'],
                        styleUrls: [settings_1._settings.cssPath + 'modal.css'],
                        templateUrl: settings_1._settings.templatePath.directive + 'score-card.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig])
                ], ScoreCard);
                return ScoreCard;
            })();
            exports_1("ScoreCard", ScoreCard);
        }
    }
});

//# sourceMappingURL=score-card.directive.js.map
