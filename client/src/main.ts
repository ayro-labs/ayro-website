import 'assets/styles/main.less';

import 'assets/img/favicon.ico';
import 'assets/img/logo_header.png';
import 'assets/img/flag_brazil.png';
import 'assets/img/flag_usa.png';
import 'assets/img/chat_mobile.png';
import 'assets/img/integrations/slack.png';
import 'assets/img/integrations/slack_micro.png';
import 'assets/img/integrations/android.png';
import 'assets/img/integrations/ios.png';
import 'assets/img/integrations/website.png';
import 'assets/img/integrations/wordpress.png';
import 'assets/img/integrations/messenger.png';
import 'assets/img/integrations/twitter.png';
import 'assets/img/plugins/greetings-message.png';
import 'assets/img/plugins/office-hours.png';
import 'assets/img/guides/user-identity/app_secrets.png';
import 'assets/img/guides/website/setup_color.png';
import 'assets/img/guides/website/floating_button.png';
import 'assets/img/guides/website/conversation.png';
import 'assets/img/guides/wordpress/setup_color.png';
import 'assets/img/guides/wordpress/floating_button.png';
import 'assets/img/guides/wordpress/conversation.png';
import 'assets/img/guides/wordpress/notification_sound.png';
import 'assets/img/guides/wordpress/default_texts.png';
import 'assets/img/guides/android/setup_color.png';
import 'assets/img/guides/android/setup_fcm.png';
import 'assets/img/guides/slack/signin.png';
import 'assets/img/guides/slack/setup_channel.png';
import 'assets/img/guides/slack/cmd_send.png';
import 'assets/img/guides/slack/cmd_profile.png';

import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

import 'zone.js/dist/zone';

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
} else {
  Error.stackTraceLimit = Infinity;
  // tslint:disable-next-line: no-var-requires
  require('zone.js/dist/long-stack-trace-zone');
}

platformBrowserDynamic().bootstrapModule(AppModule);
