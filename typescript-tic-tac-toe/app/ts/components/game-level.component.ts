import {Component, View, OnInit} from 'angular2/core'

import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'
import { Utils } from '../services/utils.service'

@Component({
	selector: 'game-level',
	providers: [Utils],
	templateUrl: _settings.templatePath.component + 'gamelevel.template.html'
})

export class GameLevel {
	radioItems: Array<Object>;

	constructor(private genericConfig: GenericConfig, private utils: Utils) {
		this.radioItems = [{
			'value': 1,
			'text': 'Easy',
		},
			{
				'value': 2,
				'text': 'Medium'
			},
			{
				'value': 3,
				'text': 'Expert'
			}];
	}
}
