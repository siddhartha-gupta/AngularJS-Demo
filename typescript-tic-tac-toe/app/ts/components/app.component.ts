import {Component, View, OnInit} from 'angular2/core'

import {AppHeader} from './header.component'
import {GamePlay} from './game-play.component'

import {_settings} from '../helpers/_settings'

@Component({
	selector: 'game-app',
	templateUrl: _settings.buildPath + 'app.template.html',
	providers: [GamePlay],
	directives: [AppHeader]
})

export class App {
	constructor() {}
}
