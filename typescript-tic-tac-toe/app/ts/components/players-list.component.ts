import {Component} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {NgClass} from 'angular2/common'

import { ServerCommunicator } from '../services/server-communicator.service'
import { CustomEventService } from '../services/event-pub-sub.service'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'
import { homeModelInterface, initSetupInterface } from '../services/app-interfaces.service'

@Component({
	selector: 'PlayersList',
	directives: [ROUTER_DIRECTIVES, NgClass],
	styleUrls: [_settings.cssPath + 'player-list.css'],
	templateUrl: _settings.templatePath.component + 'player-list.template.html'
})

export class PlayersList {
	private playersList: Array<any>;

	constructor(
		private router: Router,
		private customEventService: CustomEventService,
		private serverCommunicator: ServerCommunicator,
		private genericConfig: GenericConfig
	) {

		customEventService.onHeaderClicked.subscribe((data: any) => this.onHeaderClicked(data));
		customEventService.onPlayersListReceived.subscribe((data: any) => this.onPlayersListReceived(data));
		customEventService.onRecipientAdded.subscribe((data: any) => this.onRecipientAdded(data));

		this.serverCommunicator.msgSender('get-players-list', {});
	}

	onPlayersListReceived(data?: any) {
		let list: Array<any> = [],
			tempList: Array<any> = [],

		if (data) {
			list = data;
		} else {
			list = this.serverCommunicator.playersList;
		}
		for (let i = 0, len = list.length; i < len; i++) {
			if (list[i].emailId !== this.genericConfig.multiPlayerConfig.emailId) {
				tempList.push(list[i]);
			}
		}
		this.playersList = tempList;
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

	onRecipientSelected(event: Event, recipientId: string) {
		console.log('onRecipientSelected, recipientId: ', recipientId);

		this.genericConfig.multiPlayerConfig.player1 = true;
		this.serverCommunicator.msgSender('add-recipient', {
			emailId: this.genericConfig.multiPlayerConfig.emailId,
			recipient: recipientId
		});

		this.onRecipientAdded(recipientId);
	}

	onRecipientAdded(data: any) {
		this.genericConfig.multiPlayerConfig.recipient = data;
		this.genericConfig.multiPlayerConfig.player1 = false;

		this.router.navigate(['GamePlay']);
	}
}
