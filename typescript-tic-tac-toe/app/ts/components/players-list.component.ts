import {Component} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {NgClass} from 'angular2/common'

import { ModalDialouge } from '../directives/modal-dialogue.directive'
import { ModalDialogueInterface } from '../services/app-interfaces.service'
import { ServerCommunicator } from '../services/server-communicator.service'
import { CustomEventService } from '../services/event-pub-sub.service'
import { GenericConfig } from '../services/generic-config.service'
import { homeModelInterface, initSetupInterface } from '../services/app-interfaces.service'
import { Utils } from '../services/utils.service'
import { _settings } from '../settings'

@Component({
	selector: 'PlayersList',
	directives: [ROUTER_DIRECTIVES, NgClass, ModalDialouge],
	styleUrls: [_settings.cssPath + 'player-list.css'],
	templateUrl: _settings.templatePath.component + 'player-list.template.html'
})

export class PlayersList {
	private playersList: Array<any>;
	modalDialogue: ModalDialogueInterface;
	requestRecipient: string;

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
		customEventService.onInviteAction.subscribe((data: any) => this.onInviteAction(data));

		this.requestRecipient = '';
		this.modalDialogue = {
			isVisible: false,
			title: '',
			body: '',
			btn1Txt: '',
			btn2Txt: '',
			showBtn2: false
		};

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
			username: this.genericConfig.multiPlayerConfig.username,
			recipient: recipientId
		});
	}

	onInviteRequest(data: any) {
		console.log('onInviteRequest, show some pop up over here: ', data);
		this.modalDialogue = {
			isVisible: true,
			title: 'Game invite request',
			body: 'Invited to play a match from: ' + data.username + ' - ' + data.email,
			btn1Txt: 'Reject',
			btn2Txt: 'Accept',
			showBtn2: true
		};
		this.requestRecipient = data.emailId;
	}

	requestAccepted() {
		console.log('requestAccepted');

		this.genericConfig.multiPlayerConfig.playerTurn = false;
		this.genericConfig.multiPlayerConfig.player1 = false;
		this.genericConfig.multiPlayerConfig.playerSymbol = 'o';
		this.genericConfig.multiPlayerConfig.recipient = this.requestRecipient;

		this.serverCommunicator.msgSender('invite-action', {
			emailId: this.genericConfig.multiPlayerConfig.emailId,
			recipient: this.requestRecipient,
			accepted: true
		});
		this.resetModalConfig();

		this.router.navigate(['GamePlay']);
	}

	requestRejected() {
		console.log('requestRejected');

		this.serverCommunicator.msgSender('invite-action', {
			emailId: this.genericConfig.multiPlayerConfig.emailId,
			recipient: this.requestRecipient,
			accepted: false
		});
		this.resetModalConfig();
	}

	onInviteAction(data: any) {
		console.log('onInviteAction, data: ', data, ' :typeof(data): ', typeof (data));

		if(data.accepted) {
			console.log('onInviteAccepted');

			this.genericConfig.multiPlayerConfig.playerTurn = true;
			this.genericConfig.multiPlayerConfig.player1 = true;
			this.genericConfig.multiPlayerConfig.playerSymbol = 'x';
			this.genericConfig.multiPlayerConfig.recipient = data.recipient;
			this.router.navigate(['GamePlay']);
		} else {
			console.log('onInviteRejected');
		}
	}

	resetModalConfig() {
		this.modalDialogue = {
			isVisible: false,
			title: '',
			body: '',
			btn1Txt: '',
			btn2Txt: '',
			showBtn2: false
		};
		this.requestRecipient = '';
	}
}
