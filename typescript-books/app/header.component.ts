import {Component, View, OnInit} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router'

@Component({
	selector: 'app-header',
	directives: [],
	templateUrl: 'app/templates/header.template.html'
})

export class AppHeader {
	imgUrl: string;
	headerItems: Array<Object>;

	constructor(private router: Router, private location: Location) {
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

		if (val) {
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
					if (this.headerItems[key].name === 'backBtn') {
						this.headerItems[key].showBtn = false;
					}
					break;
			}
		}
	}

	headerFunc($event: Event, funcName: string) {
		switch (funcName) {
			case 'resetApp':
				this.resetApp($event);
				break;

			case 'goBack':
				this.goBack($event);
				break;
		}
	}

	goBack($event: Event) {
		console.log('goBack');
		this.location.back();
	}

	resetApp($event: Event) {
		console.log('resetApp');
		this.location.replaceState('/');
	}
}
