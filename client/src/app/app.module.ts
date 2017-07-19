import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutes} from 'app/app.routes';
import {AppComponent} from 'app/app.component';

import {HeaderComponent} from 'app/components/home/header/header.component';
import {FooterComponent} from 'app/components/home/footer/footer.component';
import {HomeComponent} from 'app/components/home/home.component';
import {DashboardComponent} from 'app/components/home/dashboard/dashboard.component';
import {CreateAppComponent} from 'app/components/home/dashboard/modals/create-app.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {AppComponent as ChzAppComponent} from 'app/components/home/app/app.component';
import {IntegrationsComponent} from 'app/components/home/integrations/integrations.component';

import {AuthService} from 'app/services/auth.service';
import {AccountService} from 'app/services/account.service';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';

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
    SignUpComponent,
    SignInComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    CreateAppComponent,
    ChzAppComponent,
    IntegrationsComponent,
  ],
  entryComponents: [
    CreateAppComponent,
  ],
  providers: [
    AuthService,
    AccountService,
    AppService,
    IntegrationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
