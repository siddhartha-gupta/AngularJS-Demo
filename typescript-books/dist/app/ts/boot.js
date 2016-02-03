System.register(['angular2/platform/browser', 'angular2/router', 'angular2/http', 'rxjs/Rx', './components/app.component'], function(exports_1) {
    var browser_1, router_1, http_1, app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.App, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]).catch(console.error);
        }
    }
});

//# sourceMappingURL=boot.js.map
