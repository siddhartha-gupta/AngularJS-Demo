import {Component} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'

import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'

@Component({
	selector: 'Home',
	directives: [ROUTER_DIRECTIVES],
	templateUrl: _settings.templatePath.component + 'home.template.html'
})

export class Home {
	radioItems: Array<Object>;

	constructor(private genericConfig: GenericConfig) {
		this.radioItems = [{
			'value': 1,
			'text': 'Easy',
		},
			{
				'value': 2,
				'text': 'Medium'
			},
			{
				'value': 3,
				'text': 'Expert'
			}];
	}
}
