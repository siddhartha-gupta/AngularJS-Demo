import {Injectable, EventEmitter} from 'angular2/core'
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router'

@Injectable()
export class CustomEventService {
	public onRouteChange: EventEmitter<string> = new EventEmitter();
	public onHeaderClicked: EventEmitter<Object> = new EventEmitter();
	public onPlayersListReceived: EventEmitter<Object> = new EventEmitter();
	public onSendingInvite: EventEmitter<Object> = new EventEmitter();
	public onInviteRequest: EventEmitter<Object> = new EventEmitter();
	public onInviteAction: EventEmitter<Object> = new EventEmitter();
	public onMoveReceived: EventEmitter<Object> = new EventEmitter();
	public onReMatchRequest: EventEmitter<Object> = new EventEmitter(); 
	public onStartGame: EventEmitter<Object> = new EventEmitter();
	public onEndGame: EventEmitter<Object> = new EventEmitter();

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

	sendingInvite() {
		this.onSendingInvite.emit(null);
	}

	inviteRequest(data: any) {
		this.onInviteRequest.emit(data);
	}

	inviteAction(data: any) {
		this.onInviteAction.emit(data);
	}

	moveReceived(data: any) {
		this.onMoveReceived.emit(data);
	}

	reMatchRequest() {
		this.onReMatchRequest.emit(null);
	}

	startGame() {
		this.onStartGame.emit(null);
	}

	endGame() {
		this.onEndGame.emit(null);	
	}
}
