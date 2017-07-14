import {Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {SignUpComponent} from './components/signup/signup.component';
import {SignInComponent} from './components/signin/signin.component';

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
];
