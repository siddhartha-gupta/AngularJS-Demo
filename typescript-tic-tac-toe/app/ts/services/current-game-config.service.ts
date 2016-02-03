import {Injectable} from 'angular2/core'
import {CurrentGameConfigInterface} from '../services/app-interfaces.service'
import { GenericConfig } from './generic-config.service'

@Injectable()
export class CurrentGameConfig {
	public currentGame: CurrentGameConfigInterface;

	constructor(private genericConfig: GenericConfig) {
		this.initDefaultConfig();
	}

	initDefaultConfig() {
		this.currentGame = {
			isWon: false,
			moves: [],
			stepsPlayed: 0,
			movesIndex: []
		};

		for (let i = 0; i <= this.genericConfig.config.gridComputationLen; i++) {
			this.currentGame.movesIndex[i] = 0;
		}
	}
}
