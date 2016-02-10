import {Injectable} from 'angular2/core'
import { CustomEventService } from '../services/event-pub-sub.service'

declare var io: any;

@Injectable()
export class ServerCommunicator {
	private socket: any;
	public sender: string;
	public recipient: string;
	public playersList: Array<any>;

	constructor(private customEventService: CustomEventService) {
		this.sender = null;
		this.recipient = null;
	}

	initSocket() {
		this.socket = io.connect('http://10.4.3.88:5000');
		this.msgReceiver();
		console.log('this.socket: ', this.socket);
	}

	msgSender(identifier: string, data?: Object) {
		if (!this.socket) {
			this.initSocket();
		}
		let recipient = this.recipient;

		console.log('msgSender: ', this.socket);
		this.socket.emit(identifier, data);
		/*
		this.socket.emit('create-join-room', {
			'username': username,
			'recipient': recipient
		});

		this.socket.emit('private-message', {
			'recipient': recipient,
			'content': content
		});*/
	}

	msgReceiver() {
		// register-email
		// add-recipient
		// send-message

		this.socket.on('email-registered', (data: any) => {
			console.log('email-registered:', data);
		});

		this.socket.on('current-players-list', (data: any) => {
			this.playersList = data;
			console.log('current-players-list:', this.playersList);
			this.customEventService.playersListReceived(data);
		});

		this.socket.on('add-recipient-resp', (data: any) => {
			console.log('add-recipient-resp:', data);
			this.customEventService.recipientAdded(data);
		});

		this.socket.on('send-message-resp', (data:any) => {
			console.log('send-message-resp: ',data);
			this.customEventService.moveReceived(data);
		});
	}
}
