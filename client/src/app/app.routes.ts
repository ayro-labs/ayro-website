import {Routes} from '@angular/router';

import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {SignOutComponent} from 'app/components/home/signout/signout.component';
import {HomeComponent} from 'app/components/home/home.component';
import {DashboardComponent} from 'app/components/home/dashboard/dashboard.component';
import {SettingsComponent} from 'app/components/home/settings/settings.component';
import {AppComponent} from 'app/components/home/app/app.component';
import {AppHomeComponent} from 'app/components/home/app/home/app-home.component';
import {IntegrationsComponent} from 'app/components/home/app/integrations/integrations.component';
import {AndroidIntegrationComponent} from 'app/components/home/app/integrations/android/android.component';
import {AndroidSetupIntegrationComponent} from 'app/components/home/app/integrations/android/setup/android-setup.component';
import {IOSIntegrationComponent} from 'app/components/home/app/integrations/ios/ios.component';
import {WebsiteIntegrationComponent} from 'app/components/home/app/integrations/website/website.component';
import {WebsiteSetupIntegrationComponent} from 'app/components/home/app/integrations/website/setup/website-setup.component';
import {SlackIntegrationComponent} from 'app/components/home/app/integrations/slack/slack.component';
import {SlackSetupIntegrationComponent} from 'app/components/home/app/integrations/slack/setup/slack-setup.component';

export const AppRoutes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: '', component: HomeComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'signout', component: SignOutComponent},
    {path: 'apps/:app', component: AppComponent, children: [
      {path: '', component: AppHomeComponent},
      {path: 'integrations', component: IntegrationsComponent},
      {path: 'integrations/website', component: WebsiteIntegrationComponent},
      {path: 'integrations/website/setup', component: WebsiteSetupIntegrationComponent},
      {path: 'integrations/android', component: AndroidIntegrationComponent},
      {path: 'integrations/android/setup', component: AndroidSetupIntegrationComponent},
      {path: 'integrations/ios', component: IOSIntegrationComponent},
      {path: 'integrations/slack', component: SlackIntegrationComponent},
      {path: 'integrations/slack/setup', component: SlackSetupIntegrationComponent},
    ]},
  ]},
];
