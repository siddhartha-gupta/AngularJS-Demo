import {Component} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {NgClass} from 'angular2/common'

import { ServerCommunicator } from '../services/server-communicator.service'
import { CustomEventService } from '../services/event-pub-sub.service'
import { GenericConfig } from '../services/generic-config.service'
import { homeModelInterface, initSetupInterface } from '../services/app-interfaces.service'
import { Utils } from '../services/utils.service'
import { _settings } from '../settings'

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
		private genericConfig: GenericConfig,
		private utils: Utils
	) {

		customEventService.onHeaderClicked.subscribe((data: any) => this.onHeaderClicked(data));
		customEventService.onPlayersListReceived.subscribe((data: any) => this.onPlayersListReceived(data));
		customEventService.onInviteRequest.subscribe((data: any) => this.onInviteRequest(data));
		customEventService.onInviteAccepted.subscribe((data: any) => this.onInviteAccepted(data));
		customEventService.onInviteRejected.subscribe((data: any) => this.onInviteRejected(data));

		this.serverCommunicator.msgSender('get-players-list', {});
	}

	onPlayersListReceived(data?: any) {
		let list: Array<any> = [],
			tempList: Array<any> = [];

		console.log('on playersList: ', data);
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
		this.utils.log('onRecipientSelected, recipientId: ', recipientId);

		this.serverCommunicator.msgSender('send-invite', {
			emailId: this.genericConfig.multiPlayerConfig.emailId,
			recipient: recipientId
		});
	}

	onInviteRequest(data: any) {
		console.log('onInviteRequest, show some pop up over here: ', data);
	}

	onInviteAccepted(data: any) {
		console.log('onInviteAccepted: ', data);
		this.genericConfig.multiPlayerConfig.playerTurn = true;
		this.genericConfig.multiPlayerConfig.player1 = true;
		this.genericConfig.multiPlayerConfig.playerSymbol = 'x';
		this.genericConfig.multiPlayerConfig.recipient = data;
		this.router.navigate(['GamePlay']);
	}

	onInviteRejected(data: any) {
		console.log('onInviteRejected: ', data);
	}
}
