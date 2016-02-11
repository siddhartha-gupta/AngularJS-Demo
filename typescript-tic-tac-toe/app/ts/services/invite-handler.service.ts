import {Injectable} from 'angular2/core'

import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import { ModalDialogueInterface } from '../services/app-interfaces.service'
import { ServerCommunicator } from '../services/server-communicator.service'
import { CustomEventService } from '../services/event-pub-sub.service'
import { GenericConfig } from '../services/generic-config.service'
import { Utils } from '../services/utils.service'

@Injectable()
export class InviteHandler {
	modalDialogue: ModalDialogueInterface;
	requestRecipient: string;

	constructor(
		private router: Router,
		private customEventService: CustomEventService,
		private serverCommunicator: ServerCommunicator,
		private genericConfig: GenericConfig,
		private utils: Utils
	) {
		customEventService.onInviteRequest.subscribe((data: any) => this.onInviteRequest(data));
		customEventService.onInviteAction.subscribe((data: any) => this.onInviteAction(data));

		this.requestRecipient = '';
		this.modalDialogue = {
			isVisible: false,
			title: '',
			body: '',
			btn1Txt: '',
			btn2Txt: '',
			showBtn2: false,
			btn1Callback: function() { },
			btn2Callback: function() { },
			closeBtnCallback: function() { }
		};
	}

	/*
	* Function to send invite to some user
	* for game play
	*/
	onRecipientSelected(event: Event, recipientId: string) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.utils.log('onRecipientSelected, recipientId: ', recipientId);

		this.serverCommunicator.msgSender('send-invite', {
			emailId: this.genericConfig.multiPlayerConfig.emailId,
			username: this.genericConfig.multiPlayerConfig.username,
			recipient: recipientId
		});
	}

	/*
	* Functions to handle invite
	* and send acceptance or rejection
	*/
	onInviteRequest(data: any) {
		console.log('onInviteRequest, show some pop up over here: ', data);

		this.customEventService.reMatchRequest();
		this.modalDialogue = {
			isVisible: true,
			title: 'Game invite request',
			body: 'Invited to play a match from: ' + data.username + ' - ' + data.emailId,
			btn1Txt: 'Reject',
			btn2Txt: 'Accept',
			showBtn2: true,
			btn1Callback: this.requestRejected.bind(this),
			btn2Callback: this.requestAccepted.bind(this),
			closeBtnCallback: this.requestRejected.bind(this)
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
		this.customEventService.startGame();
	}

	requestRejected() {
		console.log('requestRejected: ', this);

		this.serverCommunicator.msgSender('invite-action', {
			emailId: this.genericConfig.multiPlayerConfig.emailId,
			recipient: this.requestRecipient,
			accepted: false
		});
		this.resetModalConfig();
	}

	/*
	* Function to handle user response
	* i.e whether user has accepted the invite or not
	*/
	onInviteAction(data: any) {
		console.log('onInviteAction, data: ', data, ' :typeof(data): ', typeof (data));

		if (data.accepted) {
			console.log('onInviteAccepted');

			this.genericConfig.multiPlayerConfig.playerTurn = true;
			this.genericConfig.multiPlayerConfig.player1 = true;
			this.genericConfig.multiPlayerConfig.playerSymbol = 'x';
			this.genericConfig.multiPlayerConfig.recipient = data.recipient;
			this.customEventService.startGame();
		} else {
			console.log('onInviteRejected');
			this.modalDialogue = {
				isVisible: true,
				title: 'Game invite response',
				body: 'It looks like user has declined the game play request',
				btn1Txt: 'Ok',
				btn2Txt: '',
				showBtn2: false,
				btn1Callback: this.resetModalConfig.bind(this),
				closeBtnCallback: this.resetModalConfig.bind(this)
			};
		}
	}

	resetModalConfig() {
		this.modalDialogue = {
			isVisible: false,
			title: '',
			body: '',
			btn1Txt: '',
			btn2Txt: '',
			showBtn2: false,
			btn1Callback: function() { },
			btn2Callback: function() { },
			closeBtnCallback: function() { }
		};
		this.requestRecipient = '';
	}
}
