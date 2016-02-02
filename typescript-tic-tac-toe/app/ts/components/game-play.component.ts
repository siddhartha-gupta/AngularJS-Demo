import {Component, View, OnInit, ElementRef, Renderer} from 'angular2/core'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import { _settings } from '../helpers/settings'
import { GenericConfig } from '../services/GenericConfig.service'
import { CurrentGameConfig } from '../services/CurrentGameConfig.service'
import { AIGamePlay } from '../services/AIGamePlay.service'

@Component({
	selector: 'game-play-grid',
	templateUrl: _settings.buildPath + 'gameplay.template.html'
})

export class GamePlay {
	theHtmlString: string = '';

	constructor(public genericConfig: GenericConfig, public currentGameConfig: CurrentGameConfig, public aiGamePlay: AIGamePlay, public elementRef: ElementRef, public renderer: Renderer) {
		this.drawGrid();
	}

	drawGrid() {
		let gridCell: Array<any> = [];

		this.theHtmlString = '';
		console.log(this.genericConfig.config.gridSize);
		console.log(this.currentGameConfig.currentGame);

		for (let i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
			for (let j = 1; j <= len; j += 1) {
				let idAttr: Array<any> = [],
					combinedId = i.toString() + j.toString();

				gridCell.push('<li data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
				this.currentGameConfig.currentGame.moves[combinedId] = 0;
			}
		}
		this.theHtmlString = gridCell.join('');

		// this.renderer.listen();
		this.renderer.listen(this.elementRef.nativeElement, 'click', (event: Event) => {
			console.log('Element clicked');
			// console.log(event);
			this.onBlockClick(event);
		});
		// $('#game-grid li').off('click').on('click', game.gamePlay.onBlockClick);
	}

	onBlockClick(event: Event) {
		console.log('onBlockClick');

		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		var cellnum = event.target.getAttribute('data-cellnum');

		if (!this.currentGameConfig.currentGame.isWon) {
			if (this.currentGameConfig.currentGame.moves[cellnum] === 0) {
				this.renderer.setText(event.target, 'X');
				// $('li[id*=combine_' + cellnum + ']').text('X').addClass('x-text');

				this.currentGameConfig.currentGame.moves[cellnum] = 1;
				this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = cellnum;
				this.currentGameConfig.currentGame.stepsPlayed++;
				console.log('calling checkGameEnd');
				this.checkGameEnd(true);
			} else {
				alert('You cannot move here!');
			}
		}
	}

	checkGameEnd(isHuman: Boolean) {
		console.log('checkGameEnd: ', isHuman);
		var gridValue = (isHuman) ? 1 : 2;

		for (n = 0; n < this.genericConfig.config.gridComputationLen; n++) {
			var n1 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][1]],
				n2 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][2]],
				n3 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][3]];

			if ((n1 == gridValue) && (n2 == gridValue) && (n3 == gridValue)) {
				this.currentGameConfig.currentGame.isWon = true;
				break;
			}
		}

		if (this.currentGameConfig.currentGame.isWon) {
			this.onGameWon();
		} else {
			if (this.currentGameConfig.currentGame.stepsPlayed > 8) {
				this.onGameDraw();
			} else if (isHuman) {
				console.log('makeAIMove: ', isHuman);
				this.makeAIMove();
			}
		}
	}

	onGameWon(isHuman?: Boolean) {
		if (isHuman) {
			this.genericConfig.config.gameScore.total_games += 1;
			this.genericConfig.config.gameScore.player_win += 1;

			// $('#total_games').text(this.genericConfig.config.gameScore.total_games);
			// $('#player_win').text(this.genericConfig.config.gameScore.player_win);

			// showWinnerText('Player won the match');
			this.genericConfig.config.playerstarts = true;
			// setTimeout(function() {
			// 	game.app.startGame();
			// }, 1000);
		} else {
			this.genericConfig.config.gameScore.total_games += 1;
			this.genericConfig.config.gameScore.computer_win += 1;

			// $('#total_games').text(this.genericConfig.config.gameScore.total_games);
			// $('#computer_win').text(this.genericConfig.config.gameScore.computer_win);

			// showWinnerText('Computer won the match');
			this.genericConfig.config.playerstarts = false;
			// setTimeout(function() {
			// 	game.app.startGame();
			// }, 1000);
		}
	}

	onGameDraw() {
		this.genericConfig.config.gameScore.total_games += 1;
		this.genericConfig.config.gameScore.draws += 1;

		// $('#total_games').text(this.genericConfig.config.gameScore.total_games);
		// $('#draws').text(this.genericConfig.config.gameScore.draws);

		// showWinnerText('Match drawn');
		this.genericConfig.config.playerstarts = !this.genericConfig.config.playerstarts;
		// setTimeout(function() {
		// 	game.app.startGame();
		// }, 1000);
	}

	makeAIMove() {
		let result = '00';

		// check if ai can win
		result = this.aiGamePlay.chooseMove(true);

		// check move to prevent ai loss
		if (!result || result == '00') {
			result = this.aiGamePlay.chooseMove(false);
		} else {
			console.log('winning move is possible: ', result);
		}

		// check best possible move for ai
		if (!result || result == '00') {
			result = this.aiGamePlay.seekBestMove();
		} else {
			console.log('move to prevent defeat: ', result);
		}

		if (!result || result == '00' || result <= 10) {
			result = this.aiGamePlay.makeRandomMove();
			console.log('making random move: ', result);
		} else {
			console.log('best move available: ', result);
		}
		console.log('result: ', result);

		this.currentGameConfig.currentGame.moves[result] = 2;
		this.currentGameConfig.currentGame.movesIndex[this.currentGameConfig.currentGame.stepsPlayed] = result;
		$('li[id*=combine_' + result + ']').text('O').addClass('o-text');

		this.currentGameConfig.currentGame.stepsPlayed++;
		checkGameEnd(false);
	}
}
