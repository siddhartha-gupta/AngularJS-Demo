import {bootstrap} from 'angular2/platform/browser'
import 'rxjs/Rx'
import {App} from './components/app.component'
import { GenericConfig } from './services/generic-config.service'
import { CurrentGameConfig } from './services/current-game-config.service'

bootstrap(App, [GenericConfig, CurrentGameConfig]).catch(console.error);
