import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {api} from './api.service'

@Component({
	selector: 'books-app',
	providers: [api]
})

@View({
	directives: [],
	templateUrl: 'app/templates/app.template.html'
})

export class App {
	public booksData: Array<Object>;

	constructor(public api: api) { }

	ngOnInit() {
		this.api.getData('https://www.googleapis.com/books/v1/volumes?q=test').subscribe(
			data => this.booksData = data.items,
			error => console.error('Error: ' + error),
			() => console.log('Completed!: ', this.booksData);
		);
	}

	showbook(event, data) {
		event.preventDefault();
		event.stopPropagation();

		console.log(data.id);
		// let id = $scope.id;
		// $scope.showbookfn(id);
	}
}
