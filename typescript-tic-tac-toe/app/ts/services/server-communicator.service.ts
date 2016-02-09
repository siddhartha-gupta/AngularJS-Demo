import {Injectable} from 'angular2/core'

declare var io: any;

@Injectable()
export class ServerCommunicator {
	private socket: any;
	public sender: string;
	public recipient: string;

	constructor() {
		this.sender = null;
		this.recipient = null;
	}

	initSocket() {
		this.socket = io.connect('http://localhost:5000');
		this.msgReceiver();
	}

	msgSender(identifier: string, data: Object) {
		let recipient = this.recipient;

		this.socket.emit(identifier, data);
		/*
		register-email
		add-recipient
		send-message

		this.socket.emit("create-join-room", {
			"username": username,
			"recipient": recipient
		});

		this.socket.emit("private-message", {
			"recipient": recipient,
			"content": content
		});*/
	}

	msgReceiver() {
		this.socket.on("add-message", (data: any) => {
			console.log('add-message:', data)
		});

		this.socket.on('email-registered', (data: any) => {
			console.log('email-registered:', data)
		});

		this.socket.on('current-players-list', (data: any) => {
			console.log('email-registered:', data)
		});
	}
}
