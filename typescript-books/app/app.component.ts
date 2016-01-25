import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
	selector: 'books-app'
})

@View({
	template: `
	<h1>{{title}}</h1>
  `,
  viewProviders: [HTTP_PROVIDERS]
})

export class App {
	// We inject the created router via DI
	public title = 'Google Books API';
	public booksData;

	constructor(http: Http) {
		http.get('https://www.googleapis.com/books/v1/volumes?q=test')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(booksData => this.booksData = booksData);
	}

	ngOnInit() {
	}
}
