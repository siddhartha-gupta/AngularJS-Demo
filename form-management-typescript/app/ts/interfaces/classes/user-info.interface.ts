/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface UserFormInterface {
		startEditMode(event: Event): void;
		cancelEditMode(event?: Event): void;
		actionCallback(event: Event, type: string, userId: string): void;
	}
}
