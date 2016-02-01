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
    var Links;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            Links = (function () {
                function Links() {
                }
                Links = __decorate([
                    core_1.Component({
                        selector: 'links, [links]',
                        inputs: ['url', 'text'],
                        templateUrl: settings_1._settings.buildPath + '/directives/links.template.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Links);
                return Links;
            })();
            exports_1("Links", Links);
        }
    }
});

//# sourceMappingURL=links.directive.js.map
