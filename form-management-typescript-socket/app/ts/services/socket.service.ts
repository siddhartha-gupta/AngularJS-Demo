/// <reference path='../../_all.ts' />

module app {
	'use strict';

	declare var io: any;

	export class SocketService implements SocketServiceInterface {
		private socket: any;

		public static $inject = [
			'UtilsService',
			'SharedService'
		];

		constructor(
			private utilsService: UtilsService,
			private sharedService: SharedService
		) { }

		initSocket(callback: Function) {
			console.log('initSocket');
			// this.socket = io.connect('https://tic-tac-toe-881512.herokuapp.com');
			this.socket = io.connect('http://localhost:5000');
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
				console.log('emit socket identifier: ', identifier);
				this.socket.emit(identifier, data);
			}
		}

		msgReceiver() {
			this.socket.on('users-list-resp', (data: any) => {
				this.sharedService.broadcastEvent('users-list-resp', data);
			});

			this.socket.on('add-user-resp', (data: any) => {
				this.utilsService.log('add-user-resp:', data);
				// this.customEventService.registerEmail(data);
			});

			this.socket.on('update-user-resp', (data: any) => {
				this.utilsService.log('update-user-resp:', data);
				// this.customEventService.playersListReceived(data);
			});

			this.socket.on('delete-user-received', (data: any) => {
				this.utilsService.log('delete-user-resp:', data);
				// this.customEventService.inviteRequest(data);
			});

			this.socket.on('delete-all-user-resp', (data: any) => {
				this.utilsService.log('delete-all-user-resp:', data);
				// this.customEventService.inviteAction(data);
			});
		}
	}
}
services.service('SocketService', app.SocketService);
