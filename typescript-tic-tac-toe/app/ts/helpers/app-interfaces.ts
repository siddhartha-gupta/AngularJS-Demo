export interface modelInterface {
	searchQuery: string;
	searchLimit: number;
	sortOrder: string;
	localSortKey: string;
}

export interface headerInterface {
	name: string;
	clickFunc: number;
	text: string;
	showBtn: Boolean;
}
