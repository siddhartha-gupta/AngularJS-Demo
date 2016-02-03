import {Injectable} from 'angular2/core'
import { GenericConfig } from './GenericConfig.service'
import { CurrentGameConfig } from './CurrentGameConfig.service'

@Injectable()
export class GameStatus {
	constructor(public genericConfig: GenericConfig, public currentGameConfig: CurrentGameConfig) { }

	checkGameEnd(isHuman?: Boolean) {
		var gridValue = (isHuman) ? 1 : 2;

		for (let n = 0; n < this.genericConfig.config.gridComputationLen; n++) {
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
			return 'gameComplete';
		} else {
			if (this.currentGameConfig.currentGame.stepsPlayed > 8) {
				this.onGameDraw();
				return 'gameComplete';
			} else if (isHuman) {
				this.utils.log('makeAIMove: ', isHuman);
				return 'makeAIMove';
			}
		}
	}

	onGameWon(isHuman?: Boolean) {
		if (isHuman) {
			this.genericConfig.config.gameScore.totalGames+= 1;
			this.genericConfig.config.gameScore.playerWins+= 1;

			// showWinnerText('Player won the match');
			this.genericConfig.config.playerstarts = true;
			// setTimeout(function() {
			// 	game.app.startGame();
			// }, 1000);
		} else {
			this.genericConfig.config.gameScore.totalGames+= 1;
			this.genericConfig.config.gameScore.computerWins += 1;

			// showWinnerText('Computer won the match');
			this.genericConfig.config.playerstarts = false;
			// setTimeout(function() {
			// 	game.app.startGame();
			// }, 1000);
		}
	}

	onGameDraw() {
		this.genericConfig.config.gameScore.totalGames+= 1;
		this.genericConfig.config.gameScore.draws += 1;

		// showWinnerText('Match drawn');
		this.genericConfig.config.playerstarts = !this.genericConfig.config.playerstarts;
		// setTimeout(function() {
		// 	game.app.startGame();
		// }, 1000);
	}
}
