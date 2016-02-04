import {bootstrap} from 'angular2/platform/browser'
import {provide} from 'angular2/core'
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http'
import 'rxjs/Rx'
import {App} from './components/app.component'

bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy }), provide(APP_BASE_HREF, { useValue: '/' })]).catch(console.error);
