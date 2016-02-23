/// <reference path='../../_all.ts' />

module app {
	'use strict'

	export interface ModalDialogueInterface {
		isVisible: Boolean,
		title: string,
		body: string,
		btn1Txt: string,
		btn2Txt?: string,
		showBtn2: Boolean,
		btn1Callback?: Function,
		btn2Callback?: Function,
		closeBtnCallback?: Function,
	}
}
