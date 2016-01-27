import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {api} from './api.service'

@Component({
	selector: 'books-app',
	providers: [api]
})

@View({
	template: `
	<h1>{{title}}</h1>
	<ul class="thumbnails list-unstyled">
		<li *ngFor="#bookData of booksData">
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
	public title = 'Google Books API';
	public booksData: Array<Object>;

	constructor(public api: api) {}

	ngOnInit() {
		this.api.getData('https://www.googleapis.com/books/v1/volumes?q=test').subscribe(
			data => this.booksData = data.items,
			error => console.error('Error: ' + err),
			() => console.log('Completed!')
		);
	}
}
