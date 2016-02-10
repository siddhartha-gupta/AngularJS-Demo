import {bootstrap, ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/browser'
import {provide} from 'angular2/core'
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from 'angular2/router'
import 'rxjs/Rx'
import {App} from './components/app.component'
import {CustomEventService} from './services/event-pub-sub.service'
import {ServerCommunicator} from './services/server-communicator.service'
import { GenericConfig } from './services/generic-config.service'

bootstrap(App, [ROUTER_PROVIDERS, ELEMENT_PROBE_PROVIDERS, CustomEventService, ServerCommunicator, GenericConfig, provide(LocationStrategy, { useClass: HashLocationStrategy }), provide(APP_BASE_HREF, { useValue: '/' })]).catch(console.error);
