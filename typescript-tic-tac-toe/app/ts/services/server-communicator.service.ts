import {Injectable} from 'angular2/core'

declare var io: any;

@Injectable()
export class ServerCommunicator {
	private socket: any;
	private sender: string;
	private recipient: string;

	constructor() {
		this.sender = null;
		this.recipient = null;
	}

	initSocket(username: string, recipient: string) {
		this.socket = io.connect('http://localhost:5000');
		console.log(this.socket);

		this.sender = username;
		this.recipient = recipient;

		this.socket.emit("create-join-room", {
			"username": username,
			"recipient": recipient
		});
		this.msgReceiver();
	}

	msgSender(content: string) {
		let recipient = this.recipient;

		this.socket.emit("private-message", {
			"recipient": recipient,
			"content": content
		});
	}

	msgReceiver() {
		this.socket.on("add-message", (data: any) => {
			console.log('add-message:', data)
		});
	}
}
