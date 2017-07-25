import {Routes} from '@angular/router';

import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {HomeComponent} from 'app/components/home/home.component';
import {DashboardComponent} from 'app/components/home/dashboard/dashboard.component';
import {AppComponent} from 'app/components/home/app/app.component';
import {IntegrationsComponent} from 'app/components/home/integrations/integrations.component';
import {AndroidIntegrationComponent} from 'app/components/home/integrations/android/android.component';
import {AndroidSetupIntegrationComponent} from 'app/components/home/integrations/android/setup/android-setup.component';
import {IOSIntegrationComponent} from 'app/components/home/integrations/ios/ios.component';
import {WebIntegrationComponent} from 'app/components/home/integrations/web/web.component';
import {WebSetupIntegrationComponent} from 'app/components/home/integrations/web/setup/web-setup.component';
import {SlackIntegrationComponent} from 'app/components/home/integrations/slack/slack.component';

export const AppRoutes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: '', component: HomeComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'apps/:app', component: AppComponent},
    {path: 'apps/:app/integrations', component: IntegrationsComponent},
    {path: 'apps/:app/integrations/web', component: WebIntegrationComponent},
    {path: 'apps/:app/integrations/web/setup', component: WebSetupIntegrationComponent},
    {path: 'apps/:app/integrations/android', component: AndroidIntegrationComponent},
    {path: 'apps/:app/integrations/android/setup', component: AndroidSetupIntegrationComponent},
    {path: 'apps/:app/integrations/ios', component: IOSIntegrationComponent},
    {path: 'apps/:app/integrations/slack', component: SlackIntegrationComponent},
  ]},
];
