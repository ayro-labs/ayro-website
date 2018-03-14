import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

import 'assets/styles/main.less';
import 'assets/img/favicon.ico';
import 'assets/img/logo_header.png';
import 'assets/img/icon_no_account.jpg';
import 'assets/img/icon_no_app.png';
import 'assets/img/flag_brazil.png';
import 'assets/img/flag_usa.png';
import 'assets/img/integrations/slack.png';
import 'assets/img/integrations/slack_micro.png';
import 'assets/img/integrations/android.png';
import 'assets/img/integrations/ios.png';
import 'assets/img/integrations/website.png';
import 'assets/img/integrations/messenger.png';
import 'assets/img/integrations/twitter.png';
import 'assets/img/guides/website/setup_color.png';
import 'assets/img/guides/website/floating_button.png';
import 'assets/img/guides/website/conversation.png';
import 'assets/img/guides/android/setup_color.png';
import 'assets/img/guides/android/setup_fcm.png';
import 'assets/img/guides/slack/signin.png';
import 'assets/img/guides/slack/setup_channel.png';
import 'assets/img/guides/slack/cmd_send.png';
import 'assets/img/guides/slack/cmd_profile.png';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
