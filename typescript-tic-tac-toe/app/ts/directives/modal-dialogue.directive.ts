import {Component, View, OnInit, Output, EventEmitter} from 'angular2/core'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'

@Component({
	selector: 'modal-dialogue, [modal-dialogue]',
	inputs: ['isVisible', 'title', 'body', 'showBtn2'],
	templateUrl: _settings.templatePath.directive + 'modal-dialogue.template.html'
})

export class ModalDialouge {
	@Output() btn1Callback: EventEmitter<any> = new EventEmitter();
	@Output() btn2Callback: EventEmitter<any> = new EventEmitter();
	@Output() closeBtnCallback: EventEmitter<any> = new EventEmitter();

	constructor(private genericConfig: GenericConfig) { }

	mainMenu(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.btn1Callback.emit(event);
	}

	playAgain(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.btn2Callback.emit(event);
	}

	hideModal(event?: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.closeBtnCallback.emit(event);
	}
}
