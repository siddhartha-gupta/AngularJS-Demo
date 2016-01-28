import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {api} from './api.service'

@Component({
	selector: 'app-content',
	providers: [api]
})

@View({
	directives: [],
	templateUrl: 'app/templates/booksListing.template.html'
})

export class BooksListing {
	public booksData: Array<Object>;

	constructor(public api: api) { }

	ngOnInit() {
		this.api.getData('https://www.googleapis.com/books/v1/volumes?q=test').subscribe(
			data => this.booksData = data.items,
			error => console.error('Error: ' + error),
			() => console.log('Completed!: ', this.booksData)
		);
	}

	showbook(event: Event, data: any) {
		event.preventDefault();
		event.stopPropagation();

		let id = data.id;
		console.log(id);
	}
}
