import {bootstrap} from 'angular2/platform/browser'
import 'rxjs/Rx'
import {App} from './components/app.component'
import { GenericConfig } from './services/GenericConfig.service'
import { CurrentGameConfig } from './services/CurrentGameConfig.service'

bootstrap(App, [GenericConfig, CurrentGameConfig]).catch(console.error);
