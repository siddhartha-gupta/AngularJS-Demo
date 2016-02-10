import {Injectable, EventEmitter} from 'angular2/core'
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router'

@Injectable()
export class CustomEventService {
	public onRouteChange: EventEmitter<string> = new EventEmitter();
	public onHeaderClicked: EventEmitter<Object> = new EventEmitter();
	public onPlayersListReceived: EventEmitter<Object> = new EventEmitter();
	public onRecipientAdded: EventEmitter<Object> = new EventEmitter();
	public onMoveReceived: EventEmitter<Object> = new EventEmitter();
	public onRestartGame: EventEmitter<Object> = new EventEmitter();

	constructor(private router: Router, private location: Location) {
		router.subscribe((val) => this.routeChangeEmitter(val));
	}

	routeChangeEmitter(val: string) {
		this.onRouteChange.emit(val);
	}

	headerBtnClicked(btnType: string) {
		this.onHeaderClicked.emit({
			btnType: btnType,
			routeName: this.location.path()
		});
	}

	playersListReceived(data: any) {
		this.onPlayersListReceived.emit(data);
	}

	recipientAdded(data: any) {
		this.onRecipientAdded.emit(data);
	}

	moveReceived(data: any) {
		console.log('moveReceived: ', data);
		this.onMoveReceived.emit(data);
	}

	restartGame(data: any) {
		console.log('restartGame: ', data);
		this.onRestartGame.emit(data);
	}
}
