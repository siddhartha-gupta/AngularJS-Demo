export interface CurrentGameConfigInterface {
	isWon: Boolean;
	moves: Array<any>;
	stepsPlayed: number;
	movesIndex: Array<any>;
}

export interface GenericConfigInterface {
	gridSize: number;
	gameLevel: number;
	playGame: Boolean;
	ways: Array<Array<any>>;
	choices: Array<number>;
	corners: Array<number>;
	playerstarts: Boolean;
	modalDialogue: {
		isVisible: Boolean;
		title: string;
		body: string;
	};
	gameScore: {
		'totalGames': number;
		'draws': number;
		'playerWins': number;
		'computerWins': number;
	};
	gridComputationLen: number
}

export interface homeModelInterface {
	gameLevel: number;
	firstChance: number;
}

export interface initSetupInterface {
	value: number;
	text: string;
	cssClass: string;
}
