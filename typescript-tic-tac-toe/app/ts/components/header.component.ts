import {Component, View, OnInit} from 'angular2/core'

import {headerInterface} from '../services/app-interfaces.service'
import {Utils} from '../services/utils.service'
import {CustomEventService} from '../services/event-pub-sub.service'
import {_settings} from '../settings'

@Component({
	selector: 'app-header',
	providers: [Utils],
	styleUrls: [_settings.cssPath + 'header.css'],
	templateUrl: _settings.templatePath.component + 'header.template.html'
})

export class AppHeader {
	headerLeftButton: headerInterface;
	headerRightButton: headerInterface;
	heading: string;

	constructor(private utils: Utils, private customEventService: CustomEventService) {
		this.headerLeftButton = {
			'btnType': 'left',
			'text': 'Main Menu',
			'showBtn': false
		};

		this.headerRightButton = {
			'btnType': 'right',
			'text': 'Scorecard',
			'showBtn': false
		};

		this.heading = 'Tic Tac Toe';
		customEventService.onRouteChange.subscribe((val: string) => this.onRouteChange(val));
	}

	onRouteChange(val: string) {
		this.utils.log('onRouteChange, log from header: ', val);

		let routeName = val.match(/[^?]*/i)[0];

		switch (routeName) {
			case 'gameplay':
				this.headerLeftButton.showBtn = true;
				this.headerRightButton.showBtn = true;
				break;

			default:
				this.headerLeftButton.showBtn = false;
				this.headerRightButton.showBtn = false;
				break;
		}
	}

	headerFunc(event: Event, btnType: string) {
		event.preventDefault();
		event.stopPropagation();

		this.customEventService.headerBtnClicked(btnType);
	}
}
