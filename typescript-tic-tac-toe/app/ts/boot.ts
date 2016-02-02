import {bootstrap} from 'angular2/platform/browser'
import 'rxjs/Rx'
import {App} from './components/app.component'
import { GenericConfig } from './services/GenericConfig.service'

bootstrap(App, [GenericConfig]).catch(console.error);
