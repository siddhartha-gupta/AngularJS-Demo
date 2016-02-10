import {Injectable, EventEmitter} from 'angular2/core'
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router'

@Injectable()
export class CustomEventService {
	public onRouteChange: EventEmitter<string> = new EventEmitter();
	public onHeaderClicked: EventEmitter<Object> = new EventEmitter();
	public onPlayersListReceived: EventEmitter<Object> = new EventEmitter();
	public onRecipientAdded: EventEmitter<Object> = new EventEmitter();

	constructor(private router: Router, private location: Location) {
		router.subscribe((val) => this.routeChangeEmitter(val));
	}

	routeChangeEmitter(val: string) {
		this.onRouteChange.emit(val);
	}

	headerBtnClicked(btnType: string) {
		console.log('event pub-sub headerBtnClicked: ', btnType);
		// console.log(this.onHeaderClicked);

		this.onHeaderClicked.emit({
			btnType: btnType,
			routeName: this.location.path()
		});
		// this.onRouteChange.emit('gameplay');
	}

	playersListReceived(data: any) {
		this.onPlayersListReceived.emit(data);
	}

	recipientAdded(data: any) {
		this.onRecipientAdded.emit(data);
	}
}
