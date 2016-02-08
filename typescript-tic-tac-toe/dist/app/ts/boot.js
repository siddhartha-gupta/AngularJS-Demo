System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', 'rxjs/Rx', './components/app.component', './services/event-pub-sub.service', './services/generic-config.service', './services/current-game-config.service'], function(exports_1) {
    var browser_1, core_1, router_1, app_component_1, event_pub_sub_service_1, generic_config_service_1, current_game_config_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (event_pub_sub_service_1_1) {
                event_pub_sub_service_1 = event_pub_sub_service_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (current_game_config_service_1_1) {
                current_game_config_service_1 = current_game_config_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.App, [router_1.ROUTER_PROVIDERS, browser_1.ELEMENT_PROBE_PROVIDERS, event_pub_sub_service_1.CustomEventService, generic_config_service_1.GenericConfig, current_game_config_service_1.CurrentGameConfig, core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }), core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' })]).catch(console.error);
        }
    }
});

//# sourceMappingURL=boot.js.map
