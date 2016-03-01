/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface DocEventServiceInterface {
		bindMouseEvent(callback: Function): void;
		bindKeyboardEvent(callback: Function): void;
		unbindMouseEvent(): void;
		unbindKeyboardEvent(): void;
	}
}
