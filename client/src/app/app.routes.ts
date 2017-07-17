import {Routes} from '@angular/router';

import {HomeComponent} from 'app/components/home/home.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {AppComponent} from 'app/components/app/app.component';

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'apps/:id', component: AppComponent},
];
