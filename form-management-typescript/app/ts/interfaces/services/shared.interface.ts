/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface SharedServiceInterface {
		broadcastEvent(eventName: string, data: any): void;
	}
}
