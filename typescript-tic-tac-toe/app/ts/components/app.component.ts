import {Component, View, OnInit} from 'angular2/core'

import {AppHeader} from './header.component'
import {GamePlay} from './game-play.component'

import {_settings} from '../helpers/settings'

@Component({
	selector: 'game-app',
	templateUrl: _settings.buildPath + 'app.template.html',
	directives: [AppHeader, GamePlay]
})

export class App {
	constructor() {}
}
