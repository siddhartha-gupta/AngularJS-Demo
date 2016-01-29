import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {RouteConfig, RouterLink, RouterOutlet, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy, Router} from 'angular2/router'

import {AppHeader} from './header.component'
import {BooksListing} from './books-listing.component'
import {BookDetail} from './book-detail.component'

@Component({
	selector: 'books-app'
})

@View({
	templateUrl: 'app/templates/app.template.html',
	directives: [AppHeader, RouterLink, RouterOutlet, BooksListing, BookDetail]
})

@RouteConfig([
	{ path: '', as: 'Home', component: BooksListing },
	{ path: '/test', as: 'Test', component: BookDetail }
])

export class App {
	router: Router;
    location: Location;

	constructor(router: Router, location: Location) {
		this.router = router;
		this.location = location;
	}
}
