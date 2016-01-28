import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {AppHeader} from './header.component'
import {BooksListing} from './booksListing.component'

@Component({
	selector: 'books-app',
	providers: []
})

@View({
	directives: [AppHeader,BooksListing],
	templateUrl: 'app/templates/app.template.html'
})

export class App {
	public booksData: Array<Object>;

	constructor() {}
}
