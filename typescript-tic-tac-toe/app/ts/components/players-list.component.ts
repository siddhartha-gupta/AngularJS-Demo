import {Component} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {NgClass} from 'angular2/common'

import { ModalDialouge } from '../directives/modal-dialogue.directive'
import { InviteHandler } from '../services/invite-handler.service'
import { ServerCommunicator } from '../services/server-communicator.service'
import { CustomEventService } from '../services/event-pub-sub.service'
import { GenericConfig } from '../services/generic-config.service'
import { Utils } from '../services/utils.service'
import { _settings } from '../settings'

@Component({
	selector: 'PlayersList',
	providers: [InviteHandler],
	directives: [ROUTER_DIRECTIVES, NgClass, ModalDialouge],
	styleUrls: [_settings.cssPath + 'player-list.css'],
	templateUrl: _settings.templatePath.component + 'player-list.template.html'
})

export class PlayersList {
	private playersList: Array<any>;
	showLoader: Boolean;

	constructor(
		private router: Router,
		private customEventService: CustomEventService,
		private serverCommunicator: ServerCommunicator,
		private genericConfig: GenericConfig,
		private utils: Utils,
		private inviteHandler: InviteHandler
	) {
		customEventService.onHeaderClicked.subscribe((data: any) => this.onHeaderClicked(data));
		customEventService.onPlayersListReceived.subscribe((data: any) => this.onPlayersListReceived(data));
		customEventService.onStartGame.subscribe((data: any) => this.onStartGame());
		customEventService.onSendingInvite.subscribe((data: any) => this.onSendingInvite());
		customEventService.onEndGame.subscribe((data: any) => this.endGame());

		this.showLoader = false;
		this.serverCommunicator.msgSender('get-players-list', {});
	}

	onStartGame() {
		this.router.navigate(['GamePlay']);
	}

	onSendingInvite() {
		this.showLoader = true;
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

	/*
	* Functions to handler
	* Click on headers for current component
	*/
	onHeaderClicked(data: any) {
		if (data.routeName === '/playerslist') {
			switch (data.btnType) {
				case 'left':
					this.goToHome();
					break;

				case 'right':
					break;
			}
		}
	}

	goToHome() {
		this.router.navigate(['Home']);
	}

	endGame() {
		this.showLoader = false;
	}
}
