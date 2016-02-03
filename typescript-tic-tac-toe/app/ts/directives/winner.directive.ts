import {Component, View, OnInit} from 'angular2/core'
import { _settings } from '../settings'

@Component({
	selector: 'winner-text, [winner-text]',
	inputs: ['text'],
	templateUrl: _settings.templatePath.directive + 'winner.template.html'
})

export class Winner {}
