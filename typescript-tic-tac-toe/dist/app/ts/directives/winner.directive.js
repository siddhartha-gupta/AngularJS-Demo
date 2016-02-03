System.register(['angular2/core', '../settings'], function(exports_1) {
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
    var Winner;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            Winner = (function () {
                function Winner() {
                }
                Winner = __decorate([
                    core_1.Component({
                        selector: 'winner-text, [winner-text]',
                        inputs: ['text'],
                        templateUrl: settings_1._settings.templatePath.directive + 'winner.template.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Winner);
                return Winner;
            })();
            exports_1("Winner", Winner);
        }
    }
});

//# sourceMappingURL=winner.directive.js.map
