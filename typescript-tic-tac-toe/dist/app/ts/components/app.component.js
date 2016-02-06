System.register(['angular2/core', 'angular2/router', './header.component', './home.component', './game-play.component', './game-score.component', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, header_component_1, home_component_1, game_play_component_1, game_score_component_1, settings_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (game_play_component_1_1) {
                game_play_component_1 = game_play_component_1_1;
            },
            function (game_score_component_1_1) {
                game_score_component_1 = game_score_component_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                    console.log('app class');
                }
                App = __decorate([
                    core_1.Component({
                        selector: 'game-app',
                        templateUrl: settings_1._settings.templatePath.component + 'app.template.html',
                        providers: [home_component_1.Home, game_play_component_1.GamePlay],
                        directives: [header_component_1.AppHeader, game_score_component_1.GameScore, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '', as: 'Home', component: home_component_1.Home },
                        { path: '/gameplay', as: 'GamePlay', component: game_play_component_1.GamePlay }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});

//# sourceMappingURL=app.component.js.map
