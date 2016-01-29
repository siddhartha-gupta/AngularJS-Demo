import {Component, View, OnInit} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router'

import {AppHeader} from './header.component'
import {BooksListing} from './books-listing.component'
import {BookDetail} from './book-detail.component'
import { _settings } from './settings'

@Component({
	selector: 'books-app',
	templateUrl: _settings.buildPath + 'app.template.html',
	providers: [BooksListing, BookDetail],
	directives: [AppHeader, ROUTER_DIRECTIVES]
})

@RouteConfig([
	{ path: '', as: 'Home', component: BooksListing },
	{ path: '/book:id', as: 'Book', component: BookDetail }
])

export class App {
	constructor() {}
}
