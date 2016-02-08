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
    var ModalDialouge;
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
            ModalDialouge = (function () {
                function ModalDialouge(genericConfig) {
                    this.genericConfig = genericConfig;
                    this.btn1Callback = new core_1.EventEmitter();
                    this.btn2Callback = new core_1.EventEmitter();
                    this.closeBtnCallback = new core_1.EventEmitter();
                }
                ModalDialouge.prototype.mainMenu = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.btn1Callback.emit(event);
                };
                ModalDialouge.prototype.playAgain = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.btn2Callback.emit(event);
                };
                ModalDialouge.prototype.hideModal = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.closeBtnCallback.emit(event);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialouge.prototype, "btn1Callback", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialouge.prototype, "btn2Callback", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialouge.prototype, "closeBtnCallback", void 0);
                ModalDialouge = __decorate([
                    core_1.Component({
                        selector: 'modal-dialogue, [modal-dialogue]',
                        inputs: ['isVisible', 'title', 'body', 'showBtn2'],
                        templateUrl: settings_1._settings.templatePath.directive + 'modal-dialogue.template.html'
                    }), 
                    __metadata('design:paramtypes', [generic_config_service_1.GenericConfig])
                ], ModalDialouge);
                return ModalDialouge;
            })();
            exports_1("ModalDialouge", ModalDialouge);
        }
    }
});

//# sourceMappingURL=modal-dialogue.directive.js.map
