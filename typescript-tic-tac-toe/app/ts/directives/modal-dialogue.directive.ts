import {Component, View, OnInit, Output, EventEmitter} from 'angular2/core'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'

@Component({
	selector: 'modal-dialogue, [modal-dialogue]',
	inputs: ['isVisible', 'title', 'body', 'btn1Txt', 'btn2Txt', 'showBtn2'],
	styleUrls: [_settings.cssPath + 'modal.css'],
	templateUrl: _settings.templatePath.directive + 'modal-dialogue.template.html'
})

export class ModalDialouge {
	@Output() btn1Callback: EventEmitter<any> = new EventEmitter();
	@Output() btn2Callback: EventEmitter<any> = new EventEmitter();
	@Output() closeBtnCallback: EventEmitter<any> = new EventEmitter();

	constructor(private genericConfig: GenericConfig) { }

	btn1Clicked(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.btn1Callback.emit(event);
	}

	btn2Clicked(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.btn2Callback.emit(event);
	}

	closeBtnClicked(event?: Event) {
		event.preventDefault();
		event.stopPropagation();

		this.closeBtnCallback.emit(event);
	}
}
