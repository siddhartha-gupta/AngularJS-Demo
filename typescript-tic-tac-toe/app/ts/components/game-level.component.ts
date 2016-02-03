import {Component, View, OnInit} from 'angular2/core'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import { _settings } from '../settings'
import { GenericConfig } from '../services/GenericConfig.service'
import { Utils } from '../services/utils.service'
import { levelModelInterface } from '../services/app-interfaces.service'

@Component({
	selector: 'game-level',
	providers: [Utils],
	templateUrl: _settings.buildPath + 'gamelevel.template.html'
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
