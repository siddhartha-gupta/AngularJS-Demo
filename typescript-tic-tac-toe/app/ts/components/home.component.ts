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
	constructor() { 
		console.log('home classs');
	}

}
