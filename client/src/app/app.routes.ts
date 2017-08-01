import {Routes} from '@angular/router';

import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {HomeComponent} from 'app/components/home/home.component';
import {DashboardComponent} from 'app/components/home/dashboard/dashboard.component';
import {AppComponent} from 'app/components/home/app/app.component';
import {AppHomeComponent} from 'app/components/home/app/home/app-home.component';
import {IntegrationsComponent} from 'app/components/home/app/integrations/integrations.component';
import {AndroidIntegrationComponent} from 'app/components/home/app/integrations/android/android.component';
import {AndroidSetupIntegrationComponent} from 'app/components/home/app/integrations/android/setup/android-setup.component';
import {IOSIntegrationComponent} from 'app/components/home/app/integrations/ios/ios.component';
import {WebIntegrationComponent} from 'app/components/home/app/integrations/web/web.component';
import {WebSetupIntegrationComponent} from 'app/components/home/app/integrations/web/setup/web-setup.component';
import {SlackIntegrationComponent} from 'app/components/home/app/integrations/slack/slack.component';

export const AppRoutes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: '', component: HomeComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'apps/:app', component: AppComponent, children: [
      {path: '', component: AppHomeComponent},
      {path: 'integrations', component: IntegrationsComponent},
      {path: 'integrations/web', component: WebIntegrationComponent},
      {path: 'integrations/web/setup', component: WebSetupIntegrationComponent},
      {path: 'integrations/android', component: AndroidIntegrationComponent},
      {path: 'integrations/android/setup', component: AndroidSetupIntegrationComponent},
      {path: 'integrations/ios', component: IOSIntegrationComponent},
      {path: 'integrations/slack', component: SlackIntegrationComponent},
    ]},
  ]},
];
