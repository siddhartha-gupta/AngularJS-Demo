import {Component, View, OnInit} from 'angular2/core'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router'

import {AppHeader} from './header.component'
import {Home} from './home.component'
import {GamePlay} from './game-play.component'
import {GameScore} from './game-score.component'
import {GameLevel} from './game-level.component'

import {_settings} from '../settings'

@Component({
	selector: 'game-app',
	templateUrl: _settings.templatePath.component + 'app.template.html',
	providers: [Home, GamePlay],
	directives: [AppHeader, GameScore, GameLevel, ROUTER_DIRECTIVES]
})

@RouteConfig([
		{ path: '', as: 'Home', component: Home },
	{ path: '/gameplay', as: 'GamePlay', component: GamePlay }
])

export class App {
	constructor() {
		console.log('app class');
	}
}
