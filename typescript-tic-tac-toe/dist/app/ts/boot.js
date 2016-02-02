System.register(['angular2/platform/browser', 'rxjs/Rx', './components/app.component', './services/GenericConfig.service'], function(exports_1) {
    var browser_1, app_component_1, GenericConfig_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (_1) {},
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (GenericConfig_service_1_1) {
                GenericConfig_service_1 = GenericConfig_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.App, [GenericConfig_service_1.GenericConfig]).catch(console.error);
        }
    }
});

//# sourceMappingURL=boot.js.map
