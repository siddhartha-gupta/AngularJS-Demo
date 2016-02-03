import {Component, View, OnInit} from 'angular2/core'
import {_settings} from '../settings'

@Component({
	selector: 'app-header',
	templateUrl: _settings.templatePath.component + 'header.template.html'
})

export class AppHeader {
	constructor() {	}
}
