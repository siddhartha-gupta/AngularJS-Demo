import {Component, View, OnInit} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router'

import {headerInterface} from '../helpers/app-interfaces'
import {_settings} from '../helpers/settings'
import {LocalStorage} from '../services/localStorage.service'

@Component({
	selector: 'app-header',
	directives: [],
	providers: [LocalStorage],
	templateUrl: _settings.buildPath + 'header.template.html'
})

export class AppHeader {
	imgUrl: string;
	headerItems: headerInterface[] = [];

	constructor(private router: Router, private location: Location, private LS: LocalStorage) {
		this.imgUrl = 'app/img/angularjs-logo.png';
		this.headerItems = [{
			'name': 'backBtn',
			'clickFunc': 'goBack',
			'text': 'Go back',
			'showBtn': false
		},
			{
				'name': 'resetBtn',
				'clickFunc': 'resetApp',
				'text': 'Reset app',
				'showBtn': true
			}];

		router.subscribe((val) => this.onRouteChange(val))
	}

	onRouteChange(val: string) {
		console.log('headerChange: ', val);

		let routeName = val.match(/[^?]*/i)[0];

		switch (routeName) {
			case 'book':
				for (var key in this.headerItems) {
					if (this.headerItems[key].name === 'backBtn') {
						this.headerItems[key].showBtn = true;
					}
				}
				break;

			default:
				for (var key in this.headerItems) {
					if (this.headerItems[key].name === 'backBtn') {
						this.headerItems[key].showBtn = false;
					}
				}
				break;
		}
	}

	headerFunc($event: Event, funcName: string) {
		this[funcName]($event);
	}

	goBack($event: Event) {
		console.log('goBack');
		this.location.back();
	}

	resetApp($event: Event) {
		console.log('resetApp');
		this.LS.resetStorage();
		this.router.navigate(['./Home']);
	}
}
