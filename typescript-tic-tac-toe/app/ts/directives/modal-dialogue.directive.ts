import {Component, View, OnInit, Output, EventEmitter} from 'angular2/core'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'

@Component({
	selector: 'modal-dialogue, [modal-dialogue]',
	// outputs: ['btn1Callback', 'btn2Callback'],
	templateUrl: _settings.templatePath.directive + 'modal-dialogue.template.html'
})

export class ModalDialouge {
	@Output() btn1Callback: EventEmitter<any> = new EventEmitter();
	constructor(private genericConfig: GenericConfig) { }

	mainMenu(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.hideModal();
	}

	hideModal(event?: Event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();

		}

		this.genericConfig.config.modalDialogue = {
			isVisible: false,
			title: '',
			body: ''
		};

		this.btn1Callback.emit(event);
	}
}
