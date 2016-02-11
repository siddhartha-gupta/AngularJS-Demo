import {Component, View, OnInit, Output, EventEmitter} from 'angular2/core'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'

@Component({
	selector: 'score-card, [score-card]',
	inputs: ['isVisible', 'title', 'body', 'showBtn2'],
	styleUrls: [_settings.cssPath + 'modal.css'],
	templateUrl: _settings.templatePath.directive + 'score-card.template.html'
})

export class ScoreCard {
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
