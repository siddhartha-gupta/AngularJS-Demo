import {Injectable, EventEmitter} from 'angular2/core'
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router'

@Injectable()
export class CustomEventService {
	public onRouteChange: EventEmitter<string> = new EventEmitter();
	public onHeaderClicked: EventEmitter<Object> = new EventEmitter();
	public onPlayersListReceived: EventEmitter<Object> = new EventEmitter();
	public onInviteRequest: EventEmitter<Object> = new EventEmitter();
	public onInviteAccepted: EventEmitter<Object> = new EventEmitter();
	public onInviteRejected: EventEmitter<Object> = new EventEmitter();
	public onInviteAction: EventEmitter<Object> = new EventEmitter();
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

	inviteRequest(data: any) {
		this.onInviteRequest.emit(data);
	}

	inviteAccepted(data: any) {
		this.onInviteAccepted.emit(data);
	}

	inviteRejected(data: any) {
		this.onInviteRejected.emit(data);
	}

	inviteAction(data: any) {
		this.onInviteAction.emit(data);
	}

	moveReceived(data: any) {
		this.onMoveReceived.emit(data);
	}

	restartGame(data: any) {
		this.onRestartGame.emit(data);
	}
}
