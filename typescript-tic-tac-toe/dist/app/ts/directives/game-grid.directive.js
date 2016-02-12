System.register(['angular2/core', 'angular2/platform/browser', '../services/ai-gamePlay.service', '../services/generic-config.service', '../services/utils.service', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, ai_gamePlay_service_1, generic_config_service_1, utils_service_1, settings_1;
    var GameGrid;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (ai_gamePlay_service_1_1) {
                ai_gamePlay_service_1 = ai_gamePlay_service_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            GameGrid = (function () {
                function GameGrid(genericConfig, renderer, _dom, aiGamePlay, utils) {
                    this.genericConfig = genericConfig;
                    this.renderer = renderer;
                    this._dom = _dom;
                    this.aiGamePlay = aiGamePlay;
                    this.utils = utils;
                    this.onGridElemClick = new core_1.EventEmitter();
                    this.onMakeAIMove = new core_1.EventEmitter();
                }
                GameGrid.prototype.drawGrid = function () {
                    var gridCell = [], elem = this._dom.query('ul[id*=game-grid]'), liElem = this._dom.querySelectorAll(elem, 'li'), that = this, hoverClass = this.utils.getHoverClass();
                    this.domCleanUp();
                    for (var i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
                        for (var j = 1; j <= len; j += 1) {
                            var idAttr = [], combinedId = i.toString() + j.toString();
                            gridCell.push('<li class="' + hoverClass + '" data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
                            this.genericConfig.currentGame.moves[combinedId] = 0;
                        }
                    }
                    this._dom.setInnerHTML(elem, gridCell.join(''));
                    liElem = this._dom.querySelectorAll(elem, 'li');
                    if (!this.utils.isNullUndefined(liElem)) {
                        for (var i = 0, len = liElem.length; i < len; i++) {
                            this._dom.on(liElem[i], 'click', that.onBlockClick.bind(that));
                        }
                    }
                    if (!this.genericConfig.computerConfig.playerstarts) {
                        this.makeAIMove();
                    }
                };
                GameGrid.prototype.onBlockClick = function (event) {
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    this.utils.log('onBlockClick: ', this.genericConfig.config.playGame);
                    if (this.utils.canPlay()) {
                        var target = event.target, cellnum = parseInt(target.getAttribute('data-cellnum'), 10);
                        if (!this.genericConfig.currentGame.isWon) {
                            this.utils.log(this.genericConfig.currentGame.moves);
                            this.utils.log('cellnum: ', cellnum, ' :move: ', this.genericConfig.currentGame.moves[cellnum]);
                            if (this.genericConfig.currentGame.moves[cellnum] === 0) {
                                this.setClass(target, true, this.genericConfig.multiPlayerConfig.playerSymbol);
                                this.onGridElemClick.emit({
                                    cellnum: cellnum,
                                    playerSymbol: this.genericConfig.multiPlayerConfig.playerSymbol
                                });
                            }
                            else {
                                alert('You cannot move here!');
                            }
                        }
                    }
                    else {
                        this.utils.log('not allowed to play for now');
                    }
                };
                GameGrid.prototype.makeAIMove = function () {
                    if (!this.genericConfig.config.multiPlayer) {
                        var result = this.aiGamePlay.makeAIMove(), elem = this._dom.query('li[id*=combine_' + result + ']');
                        this.utils.log('makeAIMove, result: ', result);
                        this.genericConfig.updateCurrentGameConfig(result, 2);
                        this.setClass(elem, false, 'o');
                        this.onMakeAIMove.emit(result);
                    }
                };
                GameGrid.prototype.onMoveReceived = function (data) {
                    var elem = this._dom.query('li[id*=combine_' + data.result + ']');
                    this.setClass(elem, true, data.symbol);
                };
                GameGrid.prototype.domCleanUp = function () {
                    var elem = this._dom.query('ul[id*=game-grid]'), liElem = this._dom.querySelectorAll(elem, 'li'), that = this;
                    if (liElem) {
                        for (var i = 0, len = liElem.length; i < length; i += 1) {
                            liElem[i].removeEventListener('click', that.onBlockClick.bind(that), false);
                        }
                    }
                    this._dom.setInnerHTML(elem, '');
                };
                GameGrid.prototype.setClass = function (target, isHuman, symbol) {
                    switch (isHuman) {
                        case true:
                            if (this.genericConfig.config.multiPlayer) {
                                this.renderer.setElementClass(target, symbol + '-text', true);
                            }
                            else {
                                this.renderer.setElementClass(target, 'x-text', true);
                            }
                            break;
                        case false:
                            this.renderer.setElementClass(target, 'o-text', true);
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], GameGrid.prototype, "onGridElemClick", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], GameGrid.prototype, "onMakeAIMove", void 0);
                GameGrid = __decorate([
                    core_1.Component({
                        selector: 'game-grid, [game-grid]',
                        inputs: ['showLoader'],
                        providers: [browser_1.BrowserDomAdapter],
                        templateUrl: settings_1._settings.templatePath.directive + 'game-grid.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig, core_1.Renderer, browser_1.BrowserDomAdapter, ai_gamePlay_service_1.AIGamePlay, utils_service_1.Utils])
                ], GameGrid);
                return GameGrid;
            })();
            exports_1("GameGrid", GameGrid);
        }
    }
});

//# sourceMappingURL=game-grid.directive.js.map
