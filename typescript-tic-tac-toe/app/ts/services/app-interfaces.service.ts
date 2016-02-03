export interface CurrentGameConfigInterface {
	isWon: Boolean;
	moves: Array<any>;
	stepsPlayed: number;
	movesIndex: Array<any>;
}

export interface GenericConfigInterface {
	gridSize: number;
	ways: Array<Array<any>>;
	choices: Array<number>;
	corners: Array<number>;
	playerstarts: Boolean;
	gameScore: {
		'totalGames': number;
		'draws': number;
		'playerWins': number;
		'computerWins': number;
				};
	gridComputationLen: number
}
