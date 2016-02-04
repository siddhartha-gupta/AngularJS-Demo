import {bootstrap, ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/browser'
import {provide} from 'angular2/core'
import {APP_BASE_HREF} from 'angular2/router'
import 'rxjs/Rx'
import {App} from './components/app.component'
import { GenericConfig } from './services/generic-config.service'
import { CurrentGameConfig } from './services/current-game-config.service'

bootstrap(App, [ELEMENT_PROBE_PROVIDERS, GenericConfig, CurrentGameConfig, provide(APP_BASE_HREF, { useValue: '/' })]).catch(console.error);
