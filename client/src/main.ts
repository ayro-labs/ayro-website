import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import './assets/css/main.less';
import './assets/img/favicon.ico';
import './assets/img/sign_in_slack.png';
import './assets/img/integrations/slack.png';
import './assets/img/integrations/android.png';
import './assets/img/integrations/ios.png';
import './assets/img/integrations/website.png';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
