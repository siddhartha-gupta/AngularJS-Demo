import {bootstrap} from 'angular2/platform/browser'
import 'rxjs/Rx'
import {App} from './components/app.component'

bootstrap(App, []).catch(console.error);
