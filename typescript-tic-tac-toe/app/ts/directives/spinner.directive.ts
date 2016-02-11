import {Component, View, OnInit, Output, EventEmitter} from 'angular2/core'
import { _settings } from '../settings'
import { GenericConfig } from '../services/generic-config.service'

@Component({
	selector: 'spinner, [spinner]',
	inputs: ['showLoader'],
	styleUrls: [_settings.cssPath + 'spinner.css'],
	templateUrl: _settings.templatePath.directive + 'spinner.template.html'
})

export class Spinner {
	constructor() { }
}
