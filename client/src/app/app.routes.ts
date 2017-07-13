import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {SignUpComponent} from './signup/signup.component';
import {SignInComponent} from './signin/signin.component';

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
];
