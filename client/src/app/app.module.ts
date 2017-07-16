import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {SignUpComponent} from './components/signup/signup.component';
import {SignInComponent} from './components/signin/signin.component';

import {AuthService} from './services/auth.service';
import {AccountService} from './services/account.service';
import {AppService} from './services/app.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
  ],
  providers: [
    AuthService,
    AccountService,
    AppService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
