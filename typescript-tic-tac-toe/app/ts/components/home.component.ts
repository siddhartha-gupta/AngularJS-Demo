import {Component} from 'angular2/core'
import {NgClass} from 'angular2/common'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'

import {CustomEventService} from '../services/event-pub-sub.service'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'
import { homeModelInterface, initSetupInterface } from '../services/app-interfaces.service'

@Component({
	selector: 'Home',
	directives: [ROUTER_DIRECTIVES, NgClass],
	templateUrl: _settings.templatePath.component + 'home.template.html'
})

export class Home {
	model: homeModelInterface;
	gameLevels: initSetupInterface[] = [];
	gameStarter: initSetupInterface[] = [];

	constructor(private genericConfig: GenericConfig, private router: Router, private customEventService: CustomEventService) {
		this.gameLevels = [{
			'value': 1,
			'text': 'Easy',
			'cssClass': 'btn-success'
		},
			{
				'value': 2,
				'text': 'Medium',
				'cssClass': 'btn-warning'
			},
			{
				'value': 3,
				'text': 'Expert',
				'cssClass': 'btn-danger'
			}];

		this.gameStarter = [{
			'value': 1,
			'text': 'You',
			'cssClass': 'btn-info'
		},
			{
				'value': 2,
				'text': 'Computer',
				'cssClass': 'btn-primary'
			}];

		this.model = {
			gameLevel: 2,
			firstChance: 1
		}
	}

	startGame(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		console.log('startGame: ', this.model);
		this.genericConfig.config.playerstarts = (this.model.firstChance === 1) ? true : false;
		this.genericConfig.config.gameLevel = this.model.gameLevel;

		console.log('startGame: ', this.genericConfig.config);
		this.router.navigate(['GamePlay']);
	}
}
