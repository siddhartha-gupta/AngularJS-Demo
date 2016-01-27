import {bootstrap} from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http'
import 'rxjs/Rx'
import {App} from './app.component'

bootstrap(App, [HTTP_PROVIDERS]).catch(console.error);
