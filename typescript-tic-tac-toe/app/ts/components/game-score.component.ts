import {Component, View, OnInit} from 'angular2/core'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import { _settings } from '../settings'
import { GenericConfig } from '../services/GenericConfig.service'
import { Utils } from '../services/utils.service'

@Component({
	selector: 'game-score',
	providers: [Utils],
	templateUrl: _settings.templatePath.component + 'gamescore.template.html'
})

export class GameScore {
	constructor(private genericConfig: GenericConfig, private utils: Utils) {
		console.log(genericConfig.config);
	}

	resetGame($event: Event) {
		console.log('resetGame');
	}
}
