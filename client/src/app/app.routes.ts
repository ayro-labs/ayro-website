import {Routes} from '@angular/router';

import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {HomeComponent} from 'app/components/home/home.component';
import {IntroComponent} from 'app/components/home/intro/intro.component';
import {SettingsComponent} from 'app/components/home/settings/settings.component';
import {AppsComponent} from 'app/components/home/apps/apps.component';
import {AppComponent} from 'app/components/home/app/app.component';
import {AppHomeComponent} from 'app/components/home/app/home/app-home.component';
import {AppSettingsComponent} from 'app/components/home/app/settings/app-settings.component';
import {IntegrationsComponent} from 'app/components/home/app/integrations/integrations.component';
import {WebsiteIntegrationComponent} from 'app/components/home/app/integrations/website/website.component';
import {WebsiteSetupIntegrationComponent} from 'app/components/home/app/integrations/website/setup/website-setup.component';
import {AndroidIntegrationComponent} from 'app/components/home/app/integrations/android/android.component';
import {AndroidSetupIntegrationComponent} from 'app/components/home/app/integrations/android/setup/android-setup.component';
import {MessengerIntegrationComponent} from 'app/components/home/app/integrations/messenger/messenger.component';
import {MessengerSetupIntegrationComponent} from 'app/components/home/app/integrations/messenger/setup/messenger-setup.component';
import {SlackIntegrationComponent} from 'app/components/home/app/integrations/slack/slack.component';
import {SlackSetupIntegrationComponent} from 'app/components/home/app/integrations/slack/setup/slack-setup.component';
import {GuidesComponent} from 'app/components/home/guides/guides.component';
import {UserIdentityGuideComponent} from 'app/components/home/guides/user-identity/user-identity-guide.component';
import {UserInformationGuideComponent} from 'app/components/home/guides/user-information/user-information-guide.component';
import {AndroidGuideComponent} from 'app/components/home/guides/android/android-guide.component';
import {WebsiteGuideComponent} from 'app/components/home/guides/website/website-guide.component';
import {SlackGuideComponent} from 'app/components/home/guides/slack/slack-guide.component';

export const AppRoutes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: '', component: HomeComponent, children: [
    {path: '', component: IntroComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'apps', component: AppsComponent},
    {path: 'apps/:app', component: AppComponent, children: [
      {path: '', component: AppHomeComponent},
      {path: 'settings', component: AppSettingsComponent},
      {path: 'integrations', component: IntegrationsComponent},
      {path: 'integrations/website', component: WebsiteIntegrationComponent},
      {path: 'integrations/website/setup', component: WebsiteSetupIntegrationComponent},
      {path: 'integrations/android', component: AndroidIntegrationComponent},
      {path: 'integrations/android/setup', component: AndroidSetupIntegrationComponent},
      {path: 'integrations/messenger', component: MessengerIntegrationComponent},
      {path: 'integrations/messenger/setup', component: MessengerSetupIntegrationComponent},
      {path: 'integrations/slack', component: SlackIntegrationComponent},
      {path: 'integrations/slack/setup', component: SlackSetupIntegrationComponent},
    ]},
    {path: 'guides', component: GuidesComponent, children: [
      {path: 'user-identity', component: UserIdentityGuideComponent},
      {path: 'user-information', component: UserInformationGuideComponent},
      {path: 'website', component: WebsiteGuideComponent},
      {path: 'android', component: AndroidGuideComponent},
      {path: 'slack', component: SlackGuideComponent},
    ]},
  ]},
];
