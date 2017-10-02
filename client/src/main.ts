import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

import 'assets/css/main.less';
import 'assets/img/favicon.ico';
import 'assets/img/sign_in_slack.png';
import 'assets/img/integrations/slack.png';
import 'assets/img/integrations/android.png';
import 'assets/img/integrations/ios.png';
import 'assets/img/integrations/website.png';
import 'assets/img/integrations/messenger.png';
import 'assets/img/integrations/twitter.png';
import 'assets/img/guides/website/color-setup.png';
import 'assets/img/guides/website/floating-button.png';
import 'assets/img/guides/website/conversation.png';
import 'assets/img/guides/android/color-setup.png';
import 'assets/img/guides/android/fcm-setup.png';
import 'assets/img/guides/slack/signin.png';
import 'assets/img/guides/slack/channel-setup.png';
import 'assets/img/guides/slack/cmd-chz.png';
import 'assets/img/guides/slack/cmd-profile.png';
import '.well-known/acme-challeng/igrcu0o0tbmjUj5L7B2qpuoHRx61UI8qzH5V9CJyGeI';

if (process.env.PRODUCTION) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
