import {bootstrap, ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/browser'
import 'rxjs/Rx'
import {App} from './components/app.component'
import { GenericConfig } from './services/generic-config.service'
import { CurrentGameConfig } from './services/current-game-config.service'

bootstrap(App, [ELEMENT_PROBE_PROVIDERS, GenericConfig, CurrentGameConfig]).catch(console.error);
