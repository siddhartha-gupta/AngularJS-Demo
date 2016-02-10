import {Component} from 'angular2/core'
import {NgClass} from 'angular2/common'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'

import { ServerCommunicator } from '../services/server-communicator.service'
import { CustomEventService } from '../services/event-pub-sub.service'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'
import { homeModelInterface, initSetupInterface } from '../services/app-interfaces.service'

@Component({
	selector: 'Home',
	directives: [ROUTER_DIRECTIVES, NgClass],
	styleUrls: [_settings.cssPath + 'home.css'],
	templateUrl: _settings.templatePath.component + 'home.template.html'
})

export class Home {
	model: homeModelInterface;
	gameLevels: initSetupInterface[] = [];
	opponentOptions: initSetupInterface[] = [];
	gameStarter: initSetupInterface[] = [];

	constructor(private genericConfig: GenericConfig, private router: Router, private customEventService: CustomEventService, private serverCommunicator: ServerCommunicator) {

		this.model = {
			gameLevel: 2,
			opponent: 2,
			firstChance: 1,
			userEmail: '',
			username: ''
		};

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

		this.opponentOptions = [{
			'value': 1,
			'text': 'vs Computer',
			'cssClass': 'btn-info'
		},
			{
				'value': 2,
				'text': 'Multi Player',
				'cssClass': 'btn-primary'
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

		customEventService.onHeaderClicked.subscribe((data: any) => this.onHeaderClicked(data));
	}

	onHeaderClicked(data: any) {
		if (data.routeName === '') {
			switch (data.btnType) {
				case 'left':
					break;

				case 'right':
					this.startGame();
					break;
			}
		}
	}

	startGame(event?: Event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (this.model.opponent === 2) {
			this.genericConfig.config.emailId = this.model.userEmail;
			this.genericConfig.config.username = this.model.username;

			this.serverCommunicator.initSocket();
			this.serverCommunicator.sender = this.model.userEmail;

			this.serverCommunicator.msgSender('register-email', {
				emailId: this.model.userEmail,
				username: this.model.username
			});

			this.router.navigate(['PlayersList']);
		} else {
			this.genericConfig.config.playerstarts = (this.model.firstChance === 1) ? true : false;
			this.genericConfig.config.gameLevel = this.model.gameLevel;
			this.router.navigate(['GamePlay']);
		}
	}
}
