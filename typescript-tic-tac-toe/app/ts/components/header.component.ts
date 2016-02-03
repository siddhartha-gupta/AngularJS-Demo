import {Component, View, OnInit} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

import {_settings} from '../settings'

@Component({
	selector: 'app-header',
	directives: [],
	providers: [],
	templateUrl: _settings.buildPath + 'header.template.html'
})

export class AppHeader {
	constructor() {	}
}
