System.register(['angular2/core', 'angular2/http', 'angular2/router', '../directives/links.directive', '../directives/generic-info.directive', '../services/api.service', '../helpers/settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, links_directive_1, generic_info_directive_1, api_service_1, settings_1;
    var BookDetail;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (links_directive_1_1) {
                links_directive_1 = links_directive_1_1;
            },
            function (generic_info_directive_1_1) {
                generic_info_directive_1 = generic_info_directive_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            BookDetail = (function () {
                function BookDetail(api, _routeParams) {
                    this.api = api;
                    this._routeParams = _routeParams;
                    this.showLoader = false;
                }
                BookDetail.prototype.ngOnInit = function () {
                    var _this = this;
                    this.showLoader = true;
                    var id = this._routeParams.get('id');
                    this.api.getData('https://www.googleapis.com/books/v1/volumes/' + id + '?projection=full').subscribe(function (data) { return _this.bookData = data; }, function (error) { return console.error('Error: ' + error); }, function () { return _this.showLoader = false; });
                };
                BookDetail = __decorate([
                    core_1.Component({
                        selector: 'BookDetail',
                        providers: [http_1.HTTP_PROVIDERS, api_service_1.api],
                        directives: [router_1.ROUTER_DIRECTIVES, links_directive_1.Links, generic_info_directive_1.GenericInfo],
                        templateUrl: settings_1._settings.buildPath + 'bookDetail.template.html'
                    }), 
                    __metadata('design:paramtypes', [api_service_1.api, router_1.RouteParams])
                ], BookDetail);
                return BookDetail;
            })();
            exports_1("BookDetail", BookDetail);
        }
    }
});

//# sourceMappingURL=book-detail.component.js.map
