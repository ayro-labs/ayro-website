import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutes} from 'app/app.routes';
import {AppComponent} from 'app/app.component';

import {HomeComponent} from 'app/components/home/home.component';
import {CreateAppComponent} from 'app/components/home/modals/create-app.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {AppComponent as ChzAppComponent} from 'app/components/app/app.component';

import {AuthService} from 'app/services/auth.service';
import {AccountService} from 'app/services/account.service';
import {AppService} from 'app/services/app.service';

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
