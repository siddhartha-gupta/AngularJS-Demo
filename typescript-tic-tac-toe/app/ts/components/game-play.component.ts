import {Component, View, OnInit, ElementRef, DynamicComponentLoader} from 'angular2/core'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import { _settings } from '../helpers/settings'
import { GenericConfig } from '../services/GenericConfig.service'
import { CurrentGameConfig } from '../services/CurrentGameConfig.service'

@Component({
	selector: 'game-play-grid',
	templateUrl: _settings.buildPath + 'gameplay.template.html'
})

export class GamePlay {
	theHtmlString: string = '';

	constructor(public genericConfig: GenericConfig, public currentGameConfig: CurrentGameConfig) {
		this.drawGrid();
	}

	drawGrid() {
		let gridCell: Array<any> = [];

		this.theHtmlString= '';
		console.log(this.genericConfig.config.gridSize);
		console.log(this.currentGameConfig.currentGame);
		
		for (let i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
			for (let j = 1; j <= len; j += 1) {
				let idAttr: Array<any> = [],
					combinedId = i.toString() + j.toString();

				gridCell.push('<li data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick($event)"></li>');
				this.currentGameConfig.currentGame.moves[combinedId] = 0;
			}
		}
		this.theHtmlString = gridCell.join('');
		// $('#game-grid li').off('click').on('click', game.gamePlay.onBlockClick);
	}

	onBlockClick($event: Event) {
		console.log('onBlockClick');
	}
}
