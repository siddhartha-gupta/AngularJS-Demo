import {Component, View, OnInit} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'app-header'
})

@View({
	directives: [],
	templateUrl: 'app/templates/header.template.html'
})

export class AppHeader {
	public imgUrl: string;

	constructor() {
		this.imgUrl = 'app/img/angularjs-logo.png';
	}
}
