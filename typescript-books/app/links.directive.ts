import {Component, View, OnInit} from 'angular2/core'
import { _settings } from './settings'

@Component({
	selector: 'links, [links]',
	inputs: ['url', 'text'],
	templateUrl: _settings.buildPath + '/directives/links.template.html'
})

export class Links {

}


