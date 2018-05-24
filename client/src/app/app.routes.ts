import {Routes} from '@angular/router';

import {ContainerComponent} from 'app/components/container/container.component';
import {MainComponent} from 'app/components/main/main.component';
import {NotFoundComponent} from 'app/components/main/not-found/not-found.component';
import {HomeComponent} from 'app/components/main/home/home.component';
import {SignUpComponent} from 'app/components/main/signup/signup.component';
import {SignInComponent} from 'app/components/main/signin/signin.component';
import {TermsComponent} from 'app/components/main/terms/terms.component';
import {PrivacyComponent} from 'app/components/main/privacy/privacy.component';
import {PrivacyEnglishComponent} from 'app/components/main/privacy/privacy-en.component';
import {SettingsComponent} from 'app/components/main/settings/settings.component';
import {AppsComponent} from 'app/components/main/apps/apps.component';
import {AppComponent} from 'app/components/main/app/app.component';
import {AppDashboardComponent} from 'app/components/main/app/dashboard/app-dashboard.component';
import {AppSettingsComponent} from 'app/components/main/app/settings/app-settings.component';

// Integrations
import {IntegrationsComponent} from 'app/components/main/app/integrations/integrations.component';
import {WebsiteIntegrationComponent} from 'app/components/main/app/integrations/website/website.component';
import {WebsiteSetupIntegrationComponent} from 'app/components/main/app/integrations/website/setup/website-setup.component';
import {WordPressIntegrationComponent} from 'app/components/main/app/integrations/wordpress/wordpress.component';
import {WordPressSetupIntegrationComponent} from 'app/components/main/app/integrations/wordpress/setup/wordpress-setup.component';
import {AndroidIntegrationComponent} from 'app/components/main/app/integrations/android/android.component';
import {AndroidSetupIntegrationComponent} from 'app/components/main/app/integrations/android/setup/android-setup.component';
import {MessengerIntegrationComponent} from 'app/components/main/app/integrations/messenger/messenger.component';
import {MessengerSetupIntegrationComponent} from 'app/components/main/app/integrations/messenger/setup/messenger-setup.component';
import {SlackIntegrationComponent} from 'app/components/main/app/integrations/slack/slack.component';
import {SlackSetupIntegrationComponent} from 'app/components/main/app/integrations/slack/setup/slack-setup.component';

// Plugins
import {PluginsComponent} from 'app/components/main/app/plugins/plugins.component';
import {OfficeHoursPluginComponent} from 'app/components/main/app/plugins/office-hours/office-hours.component';
import {OfficeHoursSetupPluginComponent} from 'app/components/main/app/plugins/office-hours/setup/office-hours-setup.component';
import {GreetingsMessagePluginComponent} from 'app/components/main/app/plugins/greetings-message/greetings-message.component';
import {GreetingsMessageSetupPluginComponent} from 'app/components/main/app/plugins/greetings-message/setup/greetings-message-setup.component';

// Guides
import {GuidesComponent} from 'app/components/main/guides/guides.component';
import {UserIdentityGuideComponent} from 'app/components/main/guides/user-identity/user-identity-guide.component';
import {UserInformationGuideComponent} from 'app/components/main/guides/user-information/user-information-guide.component';
import {WebsiteGuideComponent} from 'app/components/main/guides/website/website-guide.component';
import {WordPressGuideComponent} from 'app/components/main/guides/wordpress/wordpress-guide.component';
import {AndroidGuideComponent} from 'app/components/main/guides/android/android-guide.component';
import {SlackGuideComponent} from 'app/components/main/guides/slack/slack-guide.component';

export class AppRoutes {

  public static listRoutes(): Routes {
    return [
      {path: '', component: MainComponent, children: [
        {path: '', component: HomeComponent},
        {path: 'signup', component: SignUpComponent},
        {path: 'signin', component: SignInComponent},
        {path: 'terms', component: TermsComponent},
        {path: 'privacy', component: PrivacyComponent},
        {path: 'en/privacy', component: PrivacyEnglishComponent},
        {path: 'settings', component: SettingsComponent},
        {path: 'apps', component: AppsComponent},
        {path: 'apps/integrations', component: ContainerComponent, children: [
          {path: '', component: IntegrationsComponent},
          {path: 'website', component: WebsiteIntegrationComponent},
          {path: 'wordpress', component: WordPressIntegrationComponent},
          {path: 'android', component: AndroidIntegrationComponent},
          {path: 'messenger', component: MessengerIntegrationComponent},
          {path: 'slack', component: SlackIntegrationComponent},
        ]},
        {path: 'apps/:app', component: AppComponent, children: [
          {path: '', component: AppDashboardComponent},
          {path: 'settings', component: AppSettingsComponent},
          {path: 'integrations', component: IntegrationsComponent},
          {path: 'integrations/website', component: WebsiteIntegrationComponent},
          {path: 'integrations/website/setup', component: WebsiteSetupIntegrationComponent},
          {path: 'integrations/wordpress', component: WordPressIntegrationComponent},
          {path: 'integrations/wordpress/setup', component: WordPressSetupIntegrationComponent},
          {path: 'integrations/android', component: AndroidIntegrationComponent},
          {path: 'integrations/android/setup', component: AndroidSetupIntegrationComponent},
          {path: 'integrations/messenger', component: MessengerIntegrationComponent},
          {path: 'integrations/messenger/setup', component: MessengerSetupIntegrationComponent},
          {path: 'integrations/slack', component: SlackIntegrationComponent},
          {path: 'integrations/slack/setup', component: SlackSetupIntegrationComponent},
          {path: 'plugins', component: PluginsComponent},
          {path: 'plugins/office-hours', component: OfficeHoursPluginComponent},
          {path: 'plugins/office-hours/setup', component: OfficeHoursSetupPluginComponent},
          {path: 'plugins/greetings-message', component: GreetingsMessagePluginComponent},
          {path: 'plugins/greetings-message/setup', component: GreetingsMessageSetupPluginComponent},
        ]},
        {path: 'guides', component: GuidesComponent, children: [
          {path: 'user-identity', component: UserIdentityGuideComponent},
          {path: 'user-information', component: UserInformationGuideComponent},
          {path: 'website', component: WebsiteGuideComponent},
          {path: 'wordpress', component: WordPressGuideComponent},
          {path: 'android', component: AndroidGuideComponent},
          {path: 'slack', component: SlackGuideComponent},
        ]},
        {path: '**', component: NotFoundComponent},
      ]},
    ];
  }
}
