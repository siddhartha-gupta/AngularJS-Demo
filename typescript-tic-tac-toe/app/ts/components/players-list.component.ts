import {Component} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'

import { ServerCommunicator } from '../services/server-communicator.service'
import { CustomEventService } from '../services/event-pub-sub.service'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'
import { homeModelInterface, initSetupInterface } from '../services/app-interfaces.service'

@Component({
	selector: 'PlayersList',
	directives: [ROUTER_DIRECTIVES],
	templateUrl: _settings.templatePath.component + 'player-list.template.html'
})

export class PlayersList {
	constructor(private router: Router, private customEventService: CustomEventService, private serverCommunicator: ServerCommunicator) {
		customEventService.onHeaderClicked.subscribe((data: any) => this.onHeaderClicked(data));
	}

	onHeaderClicked(data: any) {
		console.log('onHeaderClicked: ', data);
		if (data.routeName === '/playerslist') {
			switch (data.btnType) {
				case 'left':
					this.goToHome();
					break;

				case 'right':
					this.startGame();
					break;
			}
		}
	}

	goToHome() {
		this.router.navigate(['Home']);
	}

	startGame() {
		this.router.navigate(['GamePlay']);
	}
}
