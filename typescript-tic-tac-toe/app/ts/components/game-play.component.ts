import {Component, View, OnInit, ElementRef, Renderer} from 'angular2/core'
import {BrowserDomAdapter} from 'angular2/platform/browser'

import { _settings } from '../settings'
import { Winner } from '../directives/winner.directive'

import { GenericConfig } from '../services/generic-config.service'
import { CurrentGameConfig } from '../services/current-game-config.service'
import { AIGamePlay } from '../services/ai-gamePlay.service'
import { GameStatus } from '../services/game-status.service'
import { Utils } from '../services/utils.service'

@Component({
	selector: 'game-play-grid',
	providers: [AIGamePlay, GameStatus, Utils, BrowserDomAdapter],
	directives: [Winner],
	templateUrl: _settings.templatePath.component + 'gameplay.template.html'
})

export class GamePlay {
	winnerText: string;
	displayWinnerText: Boolean;

	constructor(public genericConfig: GenericConfig, public currentGameConfig: CurrentGameConfig, public aiGamePlay: AIGamePlay, public gameStatus: GameStatus, public utils: Utils, public elementRef: ElementRef, public renderer: Renderer, private _dom: BrowserDomAdapter) {
		this.winnerText = '';
		this.displayWinnerText = false;

		this.utils.log(this.currentGameConfig);
		this.utils.log(this.genericConfig);
	}

	ngOnInit() {
		this.startGame();
	}

	startGame() {
		this.currentGameConfig.initDefaultConfig();
		this.drawGrid();
	}

	drawGrid() {
		let gridCell: Array<any> = [],
			elem = this._dom.query('ul[id*=game-grid]'),
			liElem = this._dom.querySelectorAll(elem, 'li'),
			that = this;

		this.domCleanUp();
		for (let i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
			for (let j = 1; j <= len; j += 1) {
				let idAttr: Array<any> = [],
					combinedId = i.toString() + j.toString();

				gridCell.push('<li data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
				this.currentGameConfig.currentGame.moves[combinedId] = 0;
			}
		}
		this._dom.setInnerHTML(elem, gridCell.join(''));

		liElem = this._dom.querySelectorAll(elem, 'li');
		if (!this.utils.isNullUndefined(liElem)) {
			for (let i = 0, len = liElem.length; i < len; i++) {
				this._dom.on(liElem[i], 'click', that.onBlockClick.bind(that));
			}
		}

		if (!this.genericConfig.config.playerstarts) {
			this.makeAIMove();
		}
	}

	onBlockClick(event: Event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.utils.log('onBlockClick');
		if (this.genericConfig.config.playGame) {
			let cellnum: number = parseInt(event.target.getAttribute('data-cellnum'), 10);

			if (!this.currentGameConfig.currentGame.isWon) {
				this.utils.log(this.currentGameConfig.currentGame.moves);
				this.utils.log('cellnum: ', cellnum, ' :move: ', this.currentGameConfig.currentGame.moves[cellnum]);
				if (this.currentGameConfig.currentGame.moves[cellnum] === 0) {
					// this.renderer.setText(event.target, 'x');
					this.renderer.setElementClass(event.target, 'x-text', true);

					this.currentGameConfig.currentGame.moves[cellnum] = 1;
					this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = cellnum;
					this.currentGameConfig.currentGame.stepsPlayed++;
					this.getGameStatus(true);
				} else {
					alert('You cannot move here!');
				}
			}
		}
	}

	makeAIMove() {
		this.utils.log('makeAIMove');
		let result: number = 0;

		// check if ai can win
		result = this.aiGamePlay.chooseMove(true);

		// check move to prevent ai loss
		if (this.genericConfig.config.gameLevel > 1) {
			if (!result || result === 0) {
				result = this.aiGamePlay.chooseMove(false);
			} else {
				this.utils.log('winning move is possible: ', result);
			}
		}

		// check best possible move for ai
		if (this.genericConfig.config.gameLevel > 2) {
			if (!result || result === 0) {
				result = this.aiGamePlay.seekBestMove();
			} else {
				this.utils.log('move to prevent defeat: ', result);
			}
		}

		if (!result || result == 0 || result <= 10) {
			result = this.aiGamePlay.makeRandomMove();
			this.utils.log('making random move: ', result);
		} else {
			this.utils.log('best move available: ', result);
		}
		this.utils.log('result: ', result);

		this.currentGameConfig.currentGame.moves[result] = 2;
		this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = result;
		var elem = this._dom.query('li[id*=combine_' + result + ']');

		// this.renderer.setText(elem, 'o');
		this.renderer.setElementClass(elem, 'o-text', true);
		this.currentGameConfig.currentGame.stepsPlayed++;
		this.getGameStatus(false);
	}

	getGameStatus(isHuman: Boolean) {
		this.utils.log('getGameStatus: ', isHuman);
		let status: string = this.gameStatus.checkGameEnd(isHuman);

		this.utils.log(status);
		switch (status) {
			case 'gameWon':
				this.genericConfig.config.playGame = false;
				if (isHuman) {
					this.showWinnerText('Player won the match');
				} else {
					this.showWinnerText('Computer won the match');
				}
				break;

			case 'gameDraw':
				this.genericConfig.config.playGame = false;
				this.showWinnerText('Match Drawn!');
				break;

			case 'makeAIMove':
				this.makeAIMove();
		}
	}

	showWinnerText(text: string) {
		this.utils.log('showWinnerText: ', text);

		this.winnerText = text;
		this.displayWinnerText = true;

		setTimeout(() => {
			this.displayWinnerText = false;
			this.winnerText = '';
			this.genericConfig.config.playGame = true;
			this.startGame();
		}, 2000);
	}

	domCleanUp() {
		let elem = this._dom.query('ul[id*=game-grid]'),
			liElem = this._dom.querySelectorAll(elem, 'li'),
			that = this;

		if (liElem) {
			for (let i = 0, len = liElem.length; i < length; i += 1) {
				liElem[i].removeEventListener('click', that.onBlockClick.bind(that), false);
			}
		}
		this._dom.setInnerHTML(elem, '');
	}
}
