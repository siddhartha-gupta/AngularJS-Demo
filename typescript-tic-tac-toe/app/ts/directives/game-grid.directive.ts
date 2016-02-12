import {Component, Output, EventEmitter, Renderer} from 'angular2/core'
import {BrowserDomAdapter} from 'angular2/platform/browser'

import { AIGamePlay } from '../services/ai-gamePlay.service'
import { GenericConfig } from '../services/generic-config.service'
import { Utils } from '../services/utils.service'
import { _settings } from '../settings'

@Component({
	selector: 'game-grid, [game-grid]',
	inputs: ['showLoader'],
	providers: [BrowserDomAdapter],
	templateUrl: _settings.templatePath.directive + 'game-grid.template.html'
})

export class GameGrid {
	@Output() onGridElemClick: EventEmitter<any> = new EventEmitter();
	@Output() onMakeAIMove: EventEmitter<any> = new EventEmitter();

	constructor(
		private genericConfig: GenericConfig,
		public renderer: Renderer,
		private _dom: BrowserDomAdapter,
		private aiGamePlay: AIGamePlay,
		private utils: Utils
	) { }

	drawGrid() {
		let gridCell: Array<any> = [],
			elem = this._dom.query('ul[id*=game-grid]'),
			liElem = this._dom.querySelectorAll(elem, 'li'),
			that = this,
			hoverClass = this.utils.getHoverClass();

		this.domCleanUp();
		for (let i = 1, len = this.genericConfig.config.gridSize; i <= len; i += 1) {
			for (let j = 1; j <= len; j += 1) {
				let idAttr: Array<any> = [],
					combinedId = i.toString() + j.toString();

				gridCell.push('<li class="' + hoverClass + '" data-cellnum="' + combinedId + '" id="' + 'combine_' + combinedId + '" (click)="onBlockClick()"></li>');
				this.genericConfig.currentGame.moves[combinedId] = 0;
			}
		}
		this._dom.setInnerHTML(elem, gridCell.join(''));

		liElem = this._dom.querySelectorAll(elem, 'li');
		if (!this.utils.isNullUndefined(liElem)) {
			for (let i = 0, len = liElem.length; i < len; i++) {
				this._dom.on(liElem[i], 'click', that.onBlockClick.bind(that));
			}
		}

		if (!this.genericConfig.computerConfig.playerstarts) {
			this.makeAIMove();
		}
	}

	onBlockClick(event: Event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.utils.log('onBlockClick: ', this.genericConfig.config.playGame);
		if (this.utils.canPlay()) {
			let target = <HTMLInputElement>event.target,
				cellnum: number = parseInt(target.getAttribute('data-cellnum'), 10);

			if (!this.genericConfig.currentGame.isWon) {
				this.utils.log(this.genericConfig.currentGame.moves);
				this.utils.log('cellnum: ', cellnum, ' :move: ', this.genericConfig.currentGame.moves[cellnum]);
				if (this.genericConfig.currentGame.moves[cellnum] === 0) {
					this.setClass(target, true, this.genericConfig.multiPlayerConfig.playerSymbol);
					this.onGridElemClick.emit({
						cellnum: cellnum,
						playerSymbol: this.genericConfig.multiPlayerConfig.playerSymbol
					});
				} else {
					alert('You cannot move here!');
				}
			}
		} else {
			this.utils.log('not allowed to play for now');
		}
	}

	makeAIMove() {
		if (!this.genericConfig.config.multiPlayer) {
			let result: number = this.aiGamePlay.makeAIMove(),
				elem: HTMLInputElement = this._dom.query('li[id*=combine_' + result + ']');

			this.utils.log('makeAIMove, result: ', result);
			this.genericConfig.updateCurrentGameConfig(result, 2);
			this.setClass(elem, false, 'o');

			this.onMakeAIMove.emit(result);
		}
	}

	onMoveReceived(data: any) {
		let elem: HTMLInputElement = this._dom.query('li[id*=combine_' + data.result + ']');
		this.setClass(elem, true, data.symbol);
	}

	domCleanUp() {
		let elem = this._dom.query('ul[id*=game-grid]'),
			liElem = this._dom.querySelectorAll(elem, 'li'),
			that = this;

		if (liElem) {
			for (let i = 0, len = liElem.length; i < length; i += 1) {
				liElem[i].removeEventListener('click', that.onBlockClick.bind(that), false);
			}
		}
		this._dom.setInnerHTML(elem, '');
	}

	setClass(target: HTMLInputElement, isHuman: Boolean, symbol: string) {
		switch (isHuman) {
			case true:
				if (this.genericConfig.config.multiPlayer) {
					this.renderer.setElementClass(target, symbol + '-text', true);
				} else {
					this.renderer.setElementClass(target, 'x-text', true);
				}
				break;

			case false:
				this.renderer.setElementClass(target, 'o-text', true);
		}

	}
}
