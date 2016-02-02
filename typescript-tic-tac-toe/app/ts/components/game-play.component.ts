import {Component, View, OnInit} from 'angular2/core'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import { _settings } from '../helpers/settings'
import { GenericConfig } from '../services/GenericConfig.service'

@Component({
	selector: 'game-play-grid',
	templateUrl: _settings.buildPath + 'gameplay.template.html'
})

export class GamePlay {
	constructor(public genericConfig: GenericConfig) {
		genericConfig.initDefaultConfig();
		console.log(genericConfig.config);
	}
}
