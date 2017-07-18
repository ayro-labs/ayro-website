import {Routes} from '@angular/router';

import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {HomeComponent} from 'app/components/home/home.component';
import {DashboardComponent} from 'app/components/dashboard/dashboard.component';
import {AppComponent} from 'app/components/app/app.component';

export const AppRoutes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: '', component: HomeComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'apps/:id', component: AppComponent},
  ]},
];
