System.register(['angular2/core', 'angular2/http', 'angular2/router', '../directives/collapse-title.directive', '../helpers/settings', '../services/api.service', '../services/localStorage.service', '../services/utils.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, collapse_title_directive_1, settings_1, api_service_1, localStorage_service_1, utils_service_1;
    var BooksListing;
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
            function (collapse_title_directive_1_1) {
                collapse_title_directive_1 = collapse_title_directive_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (localStorage_service_1_1) {
                localStorage_service_1 = localStorage_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            }],
        execute: function() {
            BooksListing = (function () {
                // <option selected value="volumeInfo.title">By: Name</option>
                // <option value="-saleInfo.listPrice.amount">By: Price Descending</option>
                // <option value="+saleInfo.listPrice.amount">By: Price Ascending</option>
                function BooksListing(api, LS, utils) {
                    this.api = api;
                    this.LS = LS;
                    this.utils = utils;
                    this.booksData = [];
                    this.showLoader = false;
                    this.inputError = false;
                    this.searchLimitVals = [10, 20, 30, 40];
                    this.sortOrderVals = ['relevance', 'newest'];
                    this.localSortOrderVals = [{
                            'text': 'By: Name',
                            'sortValue': '+volumeInfo.title'
                        }, {
                            'text': 'By: Price Descending',
                            'sortValue': '-saleInfo.listPrice.amount'
                        }, {
                            'text': 'By: Price Ascending',
                            'sortValue': '+saleInfo.listPrice.amount'
                        }];
                    this.checkLSForData();
                }
                BooksListing.prototype.checkLSForData = function () {
                    var searchQuery = this.LS.getValue('searchQuery'), searchLimit = this.LS.getValue('searchLimit'), sortOrder = this.LS.getValue('sortOrder'), localSortKey = this.LS.getValue('localSortKey');
                    if (!this.utils.isNullUndefined(searchQuery) &&
                        !this.utils.isNullUndefined(searchLimit) &&
                        !this.utils.isNullUndefined(sortOrder) &&
                        !this.utils.isNullUndefined(localSortKey)) {
                        this.utils.log('ls value obtained: ', searchQuery);
                        this.model = {
                            searchQuery: searchQuery,
                            searchLimit: searchLimit,
                            sortOrder: sortOrder,
                            localSortKey: localSortKey
                        };
                        this.sendSearchRequest();
                    }
                    else {
                        this.utils.log('ls value not obtained');
                        this.model = {
                            searchQuery: '',
                            searchLimit: 10,
                            sortOrder: 'relevance',
                            localSortKey: '+volumeInfo.title'
                        };
                    }
                };
                BooksListing.prototype.ngOnInit = function () { };
                BooksListing.prototype.searchBooks = function ($event) {
                    this.model.searchQuery = this.model.searchQuery.trim();
                    this.utils.log('searchBooks, searchQuery: ', this.model.searchQuery, ', :searchLimit: ', this.model.searchLimit);
                    if (this.pendingRequest) {
                        this.pendingRequest = this.pendingRequest.unsubscribe();
                    }
                    if (this.model.searchQuery.length > 2) {
                        this.sendSearchRequest();
                        this.inputError = false;
                    }
                    else {
                        this.inputError = true;
                        if (this.model.searchQuery.length === 0) {
                            this.booksData = [];
                        }
                    }
                    this.LS.setValue({
                        'searchQuery': this.model.searchQuery,
                        'searchLimit': this.model.searchLimit,
                        'sortOrder': this.model.sortOrder,
                        'localSortKey': this.model.localSortKey
                    });
                };
                BooksListing.prototype.sendSearchRequest = function () {
                    var _this = this;
                    this.showLoader = true;
                    this.pendingRequest = this.api.getData('https://www.googleapis.com/books/v1/volumes?q=' + this.model.searchQuery + '&maxResults=' + this.model.searchLimit + '&orderBy=' + this.model.sortOrder).
                        delay(500).
                        subscribe(function (data) { return _this.booksData = data.items; }, function (error) { return console.error('Error: ' + error); }, function () { return _this.sortData(); });
                };
                BooksListing.prototype.sortData = function ($event) {
                    this.showLoader = false;
                    var sortkey = this.model.localSortKey, sortDirection = 1;
                    if (sortkey.indexOf('-') > 0) {
                        sortkey = sortkey.replace(/-/, '');
                        sortDirection = -1;
                    }
                    else {
                        sortkey = sortkey.replace(/\+/, '');
                        sortDirection = 1;
                    }
                    if (!this.utils.isNullUndefined(this.booksData)) {
                        this.utils.sortArrayObject(sortkey, this.booksData, sortDirection);
                    }
                };
                BooksListing = __decorate([
                    core_1.Component({
                        selector: 'home',
                        providers: [http_1.HTTP_PROVIDERS, api_service_1.api, localStorage_service_1.LocalStorage, utils_service_1.Utils],
                        directives: [router_1.ROUTER_DIRECTIVES, collapse_title_directive_1.CollapseTitle],
                        templateUrl: settings_1._settings.buildPath + 'booksListing.template.html'
                    }), 
                    __metadata('design:paramtypes', [api_service_1.api, localStorage_service_1.LocalStorage, utils_service_1.Utils])
                ], BooksListing);
                return BooksListing;
            })();
            exports_1("BooksListing", BooksListing);
        }
    }
});

//# sourceMappingURL=books-listing.component.js.map
