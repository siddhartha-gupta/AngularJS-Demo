import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {api} from './api.service'

@Component({
	selector: 'books-app',
	providers: [api]
})

@View({
	directives: [Alert],
	template: `
	<ul class="books-listing">
		<li *ngFor="#bookData of booksData" class="well col-xs-11">
			<img class="pull-left img-size" src="{{bookData.volumeInfo.imageLinks.smallThumbnail}}" />
			<div class="pull-left book-info">
				<h4 class="well-title">{{bookData.volumeInfo.title}}</h4>
				<strong>Publisher: </strong><span>{{bookData.volumeInfo.publisher}}</span><br/>
			</div>
        </li>
	</ul>
  `
})

export class App {
	public booksData: Array<Object>;

	constructor(public api: api) { }

	ngOnInit() {
		this.api.getData('https://www.googleapis.com/books/v1/volumes?q=test').subscribe(
			data => this.booksData = data.items,
			error => console.error('Error: ' + error),
			() => console.log('Completed!')
		);
	}
}
