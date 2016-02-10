import {Injectable} from 'angular2/core'
import { GenericConfig } from './generic-config.service'
import { CurrentGameConfig } from './current-game-config.service'

@Injectable()
export class GameStatus {
	constructor(public genericConfig: GenericConfig, public currentGameConfig: CurrentGameConfig) { }

	checkGameEnd(isHuman?: Boolean) {
		console.log('checkGameEnd: ', isHuman);
		let gridValue = (isHuman) ? 1 : 2;

		for (let n = 0; n < this.genericConfig.config.gridComputationLen; n++) {
			let n1 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][1]],
				n2 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][2]],
				n3 = this.currentGameConfig.currentGame.moves[this.genericConfig.config.ways[n][3]];

			if ((n1 == gridValue) && (n2 == gridValue) && (n3 == gridValue)) {
				this.currentGameConfig.currentGame.isWon = true;
				break;
			}
		}

		if (this.currentGameConfig.currentGame.isWon) {
			this.onGameWon(isHuman);
			return 'gameWon';
		} else {
			if (this.currentGameConfig.currentGame.stepsPlayed > 8) {
				this.onGameDraw();
				return 'gameDraw';
			} else if (this.genericConfig.config.multiPlayer) {
				console.log('makeAIMove: ', isHuman);
				return 'sendMoveToSever';
			} else if (isHuman) {
				console.log('makeAIMove: ', isHuman);
				return 'makeAIMove';
			}
		}
	}

	onGameWon(isHuman?: Boolean) {
		console.log('onGameWon: ', isHuman);
		if (isHuman) {
			this.genericConfig.config.gameScore.totalGames += 1;
			this.genericConfig.config.gameScore.playerWins += 1;
			this.genericConfig.config.playerstarts = true;
		} else {
			this.genericConfig.config.gameScore.totalGames += 1;
			this.genericConfig.config.gameScore.computerWins += 1;
			this.genericConfig.config.playerstarts = false;
		}
	}

	onGameDraw() {
		this.genericConfig.config.gameScore.totalGames += 1;
		this.genericConfig.config.gameScore.draws += 1;
		this.genericConfig.config.playerstarts = !this.genericConfig.config.playerstarts;
	}
}
