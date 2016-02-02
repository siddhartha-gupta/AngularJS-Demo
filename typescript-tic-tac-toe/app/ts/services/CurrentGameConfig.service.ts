import {Injectable} from 'angular2/core'
import { GenericConfig } from './GenericConfig.service'

@Injectable()
export class CurrentGameConfig {
	public currentGame: Object;

	constructor(public genericConfig: GenericConfig) {
		this.initDefaultConfig();
	}

	initDefaultConfig() {
		console.log('initDefaultConfig');
		this.currentGame = {
			isWon: false,
			moves: [],
			stepsPlayed: 0,
			movesIndex: []
		};

		for (i = 0; i <= this.genericConfig.config.gridComputationLen; i++) {
			this.currentGame.movesIndex[i] = 0;
		}
	}
}
