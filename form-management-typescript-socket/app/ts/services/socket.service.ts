/// <reference path='../../_all.ts' />

module app {
	'use strict';

	declare var io: any;

	export class SocketService implements SocketServiceInterface {
		private socket: any;

		constructor() {	}

		initSocket(callback: Function) {
			this.socket = io.connect('https://tic-tac-toe-881512.herokuapp.com');
			// this.socket = io.connect('http://localhost:5000');
			this.msgReceiver();
			callback();
		}

		msgSender(identifier: string, data?: Object) {
			// add-user
			// update-user
			// delete-user
			// delete-all-user

			if (!this.socket) {
				this.initSocket(() => {
					this.msgSender(identifier, data);
				});
			} else {
				this.socket.emit(identifier, data);
			}
		}

		msgReceiver() {
			this.socket.on('add-user-resp', (data: any) => {
				this.utils.log('register-email-resp:', data);
				this.customEventService.registerEmail(data);
			});

			this.socket.on('update-user-resp', (data: any) => {
				this.playersList = data;
				this.customEventService.playersListReceived(data);
			});

			this.socket.on('delete-user-received', (data: any) => {
				this.customEventService.inviteRequest(data);
			});

			this.socket.on('delete-all-user-resp', (data: any) => {
				this.customEventService.inviteAction(data);
			});
		}
	}
}
services.service('SocketService', app.SocketService);
