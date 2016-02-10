import {Injectable} from 'angular2/core'
import { CustomEventService } from '../services/event-pub-sub.service'
import { Utils } from '../services/utils.service'

declare var io: any;

@Injectable()
export class ServerCommunicator {
	private socket: any;
	public sender: string;
	public recipient: string;
	public playersList: Array<any>;

	constructor(
		private customEventService: CustomEventService,
		private utils: Utils
	) {
		this.sender = null;
		this.recipient = null;
	}

	initSocket() {
		this.socket = io.connect('http://10.4.3.88:5000');
		this.msgReceiver();
	}

	msgSender(identifier: string, data?: Object) {
		if (!this.socket) {
			this.initSocket();
		}
		let recipient = this.recipient;
		this.socket.emit(identifier, data);
	}

	msgReceiver() {
		this.socket.on('email-registered', (data: any) => {
			this.utils.log('email-registered:', data);
		});

		this.socket.on('current-players-list', (data: any) => {
			this.playersList = data;
			this.customEventService.playersListReceived(data);
		});

		this.socket.on('add-recipient-resp', (data: any) => {
			this.customEventService.recipientAdded(data);
		});

		this.socket.on('send-message-resp', (data: any) => {
			this.customEventService.moveReceived(data);
		});

		this.socket.on('restart-game-resp', (data: any) => {
			this.customEventService.restartGame(data);
		});
	}
}
