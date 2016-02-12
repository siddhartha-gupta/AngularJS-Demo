import {Component, ViewChild, OnInit} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'

import { GameGrid } from '../directives/game-grid.directive'
import { ScoreCard } from '../directives/score-card.directive'
import { ModalDialouge } from '../directives/modal-dialogue.directive'
import { Spinner } from '../directives/spinner.directive'
import { InviteHandler } from '../directives/invite-handler.directive'

import { ServerCommunicator } from '../services/server-communicator.service'
import { CustomEventService } from '../services/event-pub-sub.service'
import { ModalDialogueInterface } from '../services/app-interfaces.service'
import { GenericConfig } from '../services/generic-config.service'
import { GameStatus } from '../services/game-status.service'
import { Utils } from '../services/utils.service'
import { _settings } from '../settings'

@Component({
	selector: 'GamePlay',
	providers: [GameStatus],
	directives: [ROUTER_DIRECTIVES, GameGrid, ScoreCard, ModalDialouge, Spinner, InviteHandler],
	// styleUrls: [_settings.cssPath + 'gameplay.css'],
	// encapsulation: ViewEncapsulation.Native,
	templateUrl: _settings.templatePath.component + 'gameplay.template.html'
})

export class GamePlay {
	scoreCardConfig: ModalDialogueInterface;
	showLoader: Boolean;
	@ViewChild(InviteHandler) inviteHandler: InviteHandler;
	@ViewChild(GameGrid) gameGrid: GameGrid;

	constructor(
		public genericConfig: GenericConfig,
		public gameStatus: GameStatus,
		public utils: Utils,
		private router: Router,
		private customEventService: CustomEventService,
		private serverCommunicator: ServerCommunicator
	) {
		customEventService.onHeaderClicked.subscribe((data: any) => this.onHeaderClicked(data));
		customEventService.onMoveReceived.subscribe((data: any) => this.onMoveReceived(data));
		customEventService.onReMatchRequest.subscribe((data: any) => this.onReMatchRequest());
		customEventService.onStartGame.subscribe((data: any) => this.restartGame());
		customEventService.onSendingInvite.subscribe((data: any) => this.onSendingInvite());
		customEventService.onEndGame.subscribe((data: any) => this.goToHome());

		this.showLoader = false;
		this.scoreCardConfig = {
			isVisible: false,
			title: '',
			body: '',
			showBtn2: false
		};
		this.utils.log(this.genericConfig);
	}

	ngOnInit() {
		this.startGame(false);
	}

	onSendingInvite() {
		this.showLoader = true;
	}

	startGame(restart: Boolean) {
		this.utils.log('startGame, restart: ', restart);
		if (restart && this.genericConfig.config.multiPlayer) {
			this.serverCommunicator.msgSender('restart-game', {
				recipient: this.genericConfig.multiPlayerConfig.recipient
			});
		}

		this.resetScoreCard();
		this.genericConfig.config.playGame = true;
		this.genericConfig.initCurrentGameConfig();
		this.gameGrid.drawGrid();
	}

	restartGame() {
		this.showLoader = false;
		this.resetScoreCard();
		this.genericConfig.config.playGame = true;
		this.genericConfig.initCurrentGameConfig();
		this.gameGrid.drawGrid();
	}

	onBlockClick(data: any) {
		this.sendMoveToSever(data.cellnum, data.playerSymbol);
		this.genericConfig.updateCurrentGameConfig(data.cellnum, 1);
		this.getGameStatus(true, data.cellnum);
	}

	/*
	* While playing with computer
	* we make use of below function
	*/
	makeAIMove(result: number) {
		this.getGameStatus(false, result);
	}

	/*
	* While playing in multiplayer mode
	* we make use of below function
	*/
	onMoveReceived(data: any) {
		let result: number = parseInt(data.move);

		this.utils.log('make multiPlayer move, result: ', result);
		this.gameGrid.onMoveReceived({
			result: result,
			symbol: data.symbol
		});

		this.genericConfig.updateCurrentGameConfig(result, 2);
		this.getGameStatus(false, result);
		this.genericConfig.multiPlayerConfig.playerTurn = true;
	}

	getGameStatus(isHuman: Boolean, move: number) {
		this.utils.log('getGameStatus: ', isHuman);
		let status: string = this.gameStatus.checkGameEnd(isHuman);

		this.utils.log(status);
		switch (status) {
			case 'gameWon':
				if (isHuman) {
					this.showScoreCard('You won the match');
				} else {
					this.showScoreCard('Your opponent won the match');
				}
				break;

			case 'gameDraw':
				this.showScoreCard('Match Drawn!');
				break;

			case 'makeAIMove':
				this.gameGrid.makeAIMove();
				break;
		}
	}

	sendMoveToSever(move: number, symbol: string) {
		if (this.genericConfig.config.multiPlayer) {
			this.genericConfig.multiPlayerConfig.playerTurn = false;
			this.serverCommunicator.msgSender('send-message', {
				recipient: this.genericConfig.multiPlayerConfig.recipient,
				move: move,
				symbol: symbol
			});
		}
	}

	onHeaderClicked(data: any) {
		if (data.routeName === '/gameplay') {
			switch (data.btnType) {
				case 'left':
					this.goToHome();
					break;

				case 'right':
					this.showScoreCard('Current Scorecard');
					break;
			}
		}
	}

	showScoreCard(text: string) {
		this.utils.log('showScoreCard: ', text);

		this.scoreCardConfig = {
			isVisible: true,
			title: 'Game Status',
			body: text,
			showBtn2: !this.genericConfig.config.playGame
		};
	}

	playAgain() {
		this.resetScoreCard();
		this.inviteHandler.onRecipientSelected(null, this.genericConfig.multiPlayerConfig.recipient);
	}

	onReMatchRequest() {
		this.hideScoreCard(true);
	}

	hideScoreCard(noRestart?: Boolean) {
		this.resetScoreCard();
		if (!this.genericConfig.config.playGame && !noRestart) {
			this.startGame(true);
		}
	}

	goToHome() {
		this.resetScoreCard();
		this.utils.log('goToHome');
		this.router.navigate(['Home']);
	}

	resetScoreCard() {
		this.scoreCardConfig = {
			isVisible: false,
			title: '',
			body: '',
			showBtn2: false
		};
	}
}
