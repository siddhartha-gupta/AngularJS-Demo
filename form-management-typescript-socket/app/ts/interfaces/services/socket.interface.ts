/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface SocketServiceInterface {
		initSocket(callback: Function): void;
		msgSender(identifier: string, data?: Object): void;
		msgReceiver(): void;
	}
}
