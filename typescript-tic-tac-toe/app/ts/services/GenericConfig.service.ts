import {Injectable} from 'angular2/core'

@Injectable()
export class GenericConfig {
	public config: Object;

	constructor() {}

	initDefaultConfig() {
		this.config = {
				gridSize: 3,
				ways: [
					[0, 11, 12, 13],
					[0, 21, 22, 23],
					[0, 31, 32, 33],
					[0, 11, 21, 31],
					[0, 12, 22, 32],
					[0, 13, 23, 33],
					[0, 11, 22, 33],
					[0, 13, 22, 31]
				],
				choices: [11, 12, 13, 21, 22, 23, 31, 32, 33],
				corners: [11, 13, 31, 33],
				playerstarts: true,
				gameScore: {
					'total_games': 0,
					'draws': 0,
					'player_win': 0,
					'computer_win': 0,
				},
				gridComputationLen: 0
			};

		this.config.gridComputationLen = (this.config.gridSize * this.config.gridSize) - 1;
	}
}
