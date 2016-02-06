System.register(['angular2/core', 'angular2/router', './header.component', './books-listing.component', './book-detail.component', '../helpers/settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, header_component_1, books_listing_component_1, book_detail_component_1, settings_1;
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
            function (books_listing_component_1_1) {
                books_listing_component_1 = books_listing_component_1_1;
            },
            function (book_detail_component_1_1) {
                book_detail_component_1 = book_detail_component_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                }
                App = __decorate([
                    core_1.Component({
                        selector: 'books-app',
                        templateUrl: settings_1._settings.buildPath + 'app.template.html',
                        providers: [books_listing_component_1.BooksListing, book_detail_component_1.BookDetail],
                        directives: [header_component_1.AppHeader, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '', as: 'BooksListing', component: books_listing_component_1.BooksListing },
                        { path: '/book', as: 'BookDetail', component: book_detail_component_1.BookDetail }
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
