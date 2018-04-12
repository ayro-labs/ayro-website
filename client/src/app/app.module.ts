import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {Angulartics2Facebook} from 'angulartics2/facebook';

import {AppRoutes} from 'app/app.routes';
import {AppComponent} from 'app/app.component';

import {AlertsComponent} from 'app/components/alerts/alerts.component';
import {ContainerComponent} from 'app/components/container/container.component';
import {SignUpComponent} from 'app/components/signup/signup.component';
import {SignInComponent} from 'app/components/signin/signin.component';
import {HeaderComponent} from 'app/components/home/header/header.component';
import {FooterComponent} from 'app/components/home/footer/footer.component';
import {HomeComponent} from 'app/components/home/home.component';
import {IntroComponent} from 'app/components/home/intro/intro.component';
import {TermsComponent} from 'app/components/home/terms/terms.component';
import {PrivacyComponent} from 'app/components/home/privacy/privacy.component';
import {PrivacyEnglishComponent} from 'app/components/home/privacy/privacy-en.component';
import {SettingsComponent} from 'app/components/home/settings/settings.component';
import {AppsComponent} from 'app/components/home/apps/apps.component';
import {CreateAppComponent} from 'app/components/home/apps/create-app/create-app.component';
import {AppComponent as ChzAppComponent} from 'app/components/home/app/app.component';
import {AppHomeComponent} from 'app/components/home/app/home/app-home.component';
import {AppSettingsComponent} from 'app/components/home/app/settings/app-settings.component';
import {DeleteAppComponent} from 'app/components/home/app/delete/delete-app.component';
import {IntegrationsComponent} from 'app/components/home/app/integrations/integrations.component';
import {RemoveIntegrationComponent} from 'app/components/home/app/integrations/remove/remove-integration.component';
import {WebsiteIntegrationComponent} from 'app/components/home/app/integrations/website/website.component';
import {WebsiteSetupIntegrationComponent} from 'app/components/home/app/integrations/website/setup/website-setup.component';
import {WordPressIntegrationComponent} from 'app/components/home/app/integrations/wordpress/wordpress.component';
import {WordPressSetupIntegrationComponent} from 'app/components/home/app/integrations/wordpress/setup/wordpress-setup.component';
import {AndroidIntegrationComponent} from 'app/components/home/app/integrations/android/android.component';
import {AndroidSetupIntegrationComponent} from 'app/components/home/app/integrations/android/setup/android-setup.component';
import {MessengerIntegrationComponent} from 'app/components/home/app/integrations/messenger/messenger.component';
import {MessengerSetupIntegrationComponent} from 'app/components/home/app/integrations/messenger/setup/messenger-setup.component';
import {SlackIntegrationComponent} from 'app/components/home/app/integrations/slack/slack.component';
import {SlackSetupIntegrationComponent} from 'app/components/home/app/integrations/slack/setup/slack-setup.component';
import {CreateSlackChannelComponent} from 'app/components/home/app/integrations/slack/setup/create-channel/create-slack-channel.component';
import {GuidesComponent} from 'app/components/home/guides/guides.component';
import {UserIdentityGuideComponent} from 'app/components/home/guides/user-identity/user-identity-guide.component';
import {UserInformationGuideComponent} from 'app/components/home/guides/user-information/user-information-guide.component';
import {WebsiteGuideComponent} from 'app/components/home/guides/website/website-guide.component';
import {WordPressGuideComponent} from 'app/components/home/guides/wordpress/wordpress-guide.component';
import {AndroidGuideComponent} from 'app/components/home/guides/android/android-guide.component';
import {SlackGuideComponent} from 'app/components/home/guides/slack/slack-guide.component';

import {AuthService} from 'app/services/auth.service';
import {AccountService} from 'app/services/account.service';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleTagManager, Angulartics2Facebook]),
    ClipboardModule,
  ],
  declarations: [
    AppComponent,
    AlertsComponent,
    ContainerComponent,
    SignUpComponent,
    SignInComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IntroComponent,
    TermsComponent,
    PrivacyComponent,
    PrivacyEnglishComponent,
    SettingsComponent,
    AppsComponent,
    CreateAppComponent,
    ChzAppComponent,
    AppHomeComponent,
    AppSettingsComponent,
    DeleteAppComponent,
    IntegrationsComponent,
    RemoveIntegrationComponent,
    WebsiteIntegrationComponent,
    WebsiteSetupIntegrationComponent,
    WordPressIntegrationComponent,
    WordPressSetupIntegrationComponent,
    AndroidIntegrationComponent,
    AndroidSetupIntegrationComponent,
    MessengerIntegrationComponent,
    MessengerSetupIntegrationComponent,
    SlackIntegrationComponent,
    SlackSetupIntegrationComponent,
    CreateSlackChannelComponent,
    GuidesComponent,
    UserIdentityGuideComponent,
    UserInformationGuideComponent,
    WebsiteGuideComponent,
    WordPressGuideComponent,
    AndroidGuideComponent,
    SlackGuideComponent,
  ],
  entryComponents: [
    CreateAppComponent,
    DeleteAppComponent,
    RemoveIntegrationComponent,
    CreateSlackChannelComponent,
  ],
  providers: [
    AuthService,
    AccountService,
    AppService,
    IntegrationService,
    AlertService,
    EventService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
