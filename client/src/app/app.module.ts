import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';

import {HomeComponent} from './components/home/home.component';
import {CreateAppComponent} from './components/home/modals/create-app.component';
import {SignUpComponent} from './components/signup/signup.component';
import {SignInComponent} from './components/signin/signin.component';
import {AppComponent as ChzAppComponent} from './components/app/app.component';

import {AuthService} from './services/auth.service';
import {AccountService} from './services/account.service';
import {AppService} from './services/app.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    ChzAppComponent,
    CreateAppComponent,
  ],
  entryComponents: [
    CreateAppComponent,
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
