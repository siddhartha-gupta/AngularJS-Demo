import {Injectable} from 'angular2/core'
import { GenericConfig } from './generic-config.service'

@Injectable()
export class GameStatus {
	constructor(public genericConfig: GenericConfig) { }

	checkGameEnd(isHuman?: Boolean) {
		console.log('checkGameEnd: ', isHuman);
		let gridValue = (isHuman) ? 1 : 2;

		for (let n = 0; n < this.genericConfig.config.gridComputationLen; n++) {
			let n1 = this.genericConfig.currentGame.moves[this.genericConfig.config.ways[n][1]],
				n2 = this.genericConfig.currentGame.moves[this.genericConfig.config.ways[n][2]],
				n3 = this.genericConfig.currentGame.moves[this.genericConfig.config.ways[n][3]];

			if ((n1 == gridValue) && (n2 == gridValue) && (n3 == gridValue)) {
				this.genericConfig.currentGame.isWon = true;
				break;
			}
		}

		if (this.genericConfig.currentGame.isWon) {
			this.onGameWon(isHuman);
			return 'gameWon';
		} else {
			if (this.genericConfig.currentGame.stepsPlayed > 8) {
				this.onGameDraw();
				return 'gameDraw';
			} else if (!this.genericConfig.config.multiPlayer && isHuman) {
				console.log('makeAIMove: ', isHuman);
				return 'makeAIMove';
			}
		}
	}

	onGameWon(isHuman?: Boolean) {
		console.log('onGameWon: ', isHuman);
		this.genericConfig.config.playGame = false;
		if (isHuman) {
			this.genericConfig.gameScore.totalGames += 1;
			this.genericConfig.gameScore.playerWins += 1;
			this.genericConfig.computerConfig.playerstarts = true;
		} else {
			this.genericConfig.gameScore.totalGames += 1;
			this.genericConfig.gameScore.computerWins += 1;
			this.genericConfig.computerConfig.playerstarts = false;
		}
	}

	onGameDraw() {
		this.genericConfig.config.playGame = false;
		this.genericConfig.gameScore.totalGames += 1;
		this.genericConfig.gameScore.draws += 1;
		this.genericConfig.computerConfig.playerstarts = !this.genericConfig.computerConfig.playerstarts;
	}
}
