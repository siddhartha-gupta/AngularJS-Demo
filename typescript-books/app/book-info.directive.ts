import {Component, View, OnInit} from 'angular2/core'
import { _settings } from './settings'

@Component({
	selector: 'book-info, [book-info]',
	inputs: ['data', 'text'],
	templateUrl: _settings.buildPath + '/directives/book-info.template.html'
})

export class BookInfo {

}


