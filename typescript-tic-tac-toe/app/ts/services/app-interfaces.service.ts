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
	gameScore: {
		'totalGames': number;
		'draws': number;
		'playerWins': number;
		'computerWins': number;
	};
	gridComputationLen: number;
	multiPlayer: Boolean;
}

export interface homeModelInterface {
	gameLevel: number;
	opponent: number;
	firstChance: number;
	userEmail: string;
	username: string;
}

export interface initSetupInterface {
	value: number;
	text: string;
	cssClass: string;
}

export interface headerInterface {
	text: string;
	btnType: string;
	showBtn: Boolean;
}

export interface ModalDialogueInterface {
	isVisible: Boolean;
	title: string;
	body: string;
	showBtn2: Boolean;
};
