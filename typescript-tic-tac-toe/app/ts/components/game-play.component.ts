import {Component, View, OnInit, ElementRef, Renderer} from 'angular2/core'
import {BrowserDomAdapter} from 'angular2/platform/browser'
// import { ELEMENT_PROBE_BINDINGS} from 'angular2/debug'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import { Winner } from '../directives/winner.directive'

import { _settings } from '../settings'
import { GenericConfig } from '../services/GenericConfig.service'
import { CurrentGameConfig } from '../services/CurrentGameConfig.service'
import { AIGamePlay } from '../services/AIGamePlay.service'
import { GameStatus } from '../services/GameStatus.service'
import { Utils } from '../services/utils.service'

@Component({
	selector: 'game-play-grid',
	providers: [AIGamePlay, GameStatus, Utils, BrowserDomAdapter],
	directives: [Winner],
	templateUrl: _settings.buildPath + 'gameplay.template.html'
})

export class GamePlay {
	winnerText: string;
	displayWinnerText: Boolean;

	constructor(public genericConfig: GenericConfig, public currentGameConfig: CurrentGameConfig, public aiGamePlay: AIGamePlay, public gameStatus: GameStatus, public utils: Utils, public elementRef: ElementRef, public renderer: Renderer, private _dom: BrowserDomAdapter) {
		this.winnerText = '';
		this.displayWinnerText = false;

		console.log(this.currentGameConfig);
		console.log(this.genericConfig);
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

		console.log('onBlockClick');
		if (this.genericConfig.config.playGame) {
			let cellnum: number = parseInt(event.target.getAttribute('data-cellnum'), 10);

			if (!this.currentGameConfig.currentGame.isWon) {
				console.log(this.currentGameConfig.currentGame.moves);
				console.log('cellnum: ', cellnum, ' :move: ', this.currentGameConfig.currentGame.moves[cellnum]);
				if (this.currentGameConfig.currentGame.moves[cellnum] === 0) {
					this.renderer.setText(event.target, 'X');
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
		console.log('makeAIMove');
		let result: number = 0;

		// check if ai can win
		result = this.aiGamePlay.chooseMove(true);

		// check move to prevent ai loss
		if (this.genericConfig.config.gameLevel > 1) {
			if (!result || result === 0) {
				result = this.aiGamePlay.chooseMove(false);
			} else {
				console.log('winning move is possible: ', result);
			}
		}

		// check best possible move for ai
		if (this.genericConfig.config.gameLevel > 2) {
			if (!result || result === 0) {
				result = this.aiGamePlay.seekBestMove();
			} else {
				console.log('move to prevent defeat: ', result);
			}
		}

		if (!result || result == 0 || result <= 10) {
			result = this.aiGamePlay.makeRandomMove();
			console.log('making random move: ', result);
		} else {
			console.log('best move available: ', result);
		}
		console.log('result: ', result);

		this.currentGameConfig.currentGame.moves[result] = 2;
		this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = result;
		var elem = this._dom.query('li[id*=combine_' + result + ']');

		this.renderer.setText(elem, 'O');
		this.renderer.setElementClass(elem, 'o-text', true);
		this.currentGameConfig.currentGame.stepsPlayed++;
		this.getGameStatus(false);
	}

	getGameStatus(isHuman: Boolean) {
		console.log('getGameStatus: ', isHuman);
		let status: string = this.gameStatus.checkGameEnd(isHuman);

		console.log(status);
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
		console.log('showWinnerText: ', text);

		this.domCleanUp();
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
