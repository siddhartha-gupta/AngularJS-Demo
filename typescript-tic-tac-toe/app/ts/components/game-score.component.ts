import {Component, View, OnInit} from 'angular2/core'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import { _settings } from '../helpers/settings'
import { GenericConfig } from '../services/GenericConfig.service'

@Component({
	selector: 'game-score',
	providers: [BrowserDomAdapter],
	templateUrl: _settings.buildPath + 'gamescore.template.html'
})

export class GameScore {
	constructor(private genericConfig: GenericConfig) {
	}
}
