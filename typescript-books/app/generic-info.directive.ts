import {Component, View, OnInit} from 'angular2/core'
import { _settings } from './settings'

@Component({
	selector: 'book-info, [book-info]',
	inputs: ['data', 'text'],
	templateUrl: _settings.buildPath + '/directives/generic-info.template.html'
})

export class GenericInfo { }
