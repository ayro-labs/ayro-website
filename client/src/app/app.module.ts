import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from 'ngx-clipboard';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {Angulartics2Facebook} from 'angulartics2/facebook';

import {AppRoutes} from 'app/app.routes';
import {AppComponent} from 'app/app.component';

import {AlertsComponent} from 'app/components/alerts/alerts.component';
import {ContainerComponent} from 'app/components/container/container.component';
import {HeaderComponent} from 'app/components/home/header/header.component';
import {FooterComponent} from 'app/components/home/footer/footer.component';
import {HomeComponent} from 'app/components/home/home.component';
import {NotFoundComponent} from 'app/components/home/notfound/notfound.component';
import {IntroComponent} from 'app/components/home/intro/intro.component';
import {SignUpComponent} from 'app/components/home/signup/signup.component';
import {SignInComponent} from 'app/components/home/signin/signin.component';
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
import {RemoveAppSecretComponent} from 'app/components/home/app/remove-secret/remove-app-secret.component';

// Integrations
import {IntegrationsComponent} from 'app/components/home/app/integrations/integrations.component';
import {IntegrationComponent} from 'app/components/home/app/integrations/integration/integration.component';
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

// Plugins
import {PluginsComponent} from 'app/components/home/app/plugins/plugins.component';
import {PluginComponent} from 'app/components/home/app/plugins/plugin/plugin.component';
import {RemovePluginComponent} from 'app/components/home/app/plugins/remove/remove-plugin.component';
import {OfficeHoursPluginComponent} from 'app/components/home/app/plugins/office-hours/office-hours.component';
import {OfficeHoursSetupPluginComponent} from 'app/components/home/app/plugins/office-hours/setup/office-hours-setup.component';
import {GreetingsMessagePluginComponent} from 'app/components/home/app/plugins/greetings-message/greetings-message.component';
import {GreetingsMessageSetupPluginComponent} from 'app/components/home/app/plugins/greetings-message/setup/greetings-message-setup.component';

// Guides
import {GuidesComponent} from 'app/components/home/guides/guides.component';
import {UserIdentityGuideComponent} from 'app/components/home/guides/user-identity/user-identity-guide.component';
import {UserInformationGuideComponent} from 'app/components/home/guides/user-information/user-information-guide.component';
import {WebsiteGuideComponent} from 'app/components/home/guides/website/website-guide.component';
import {WordPressGuideComponent} from 'app/components/home/guides/wordpress/wordpress-guide.component';
import {AndroidGuideComponent} from 'app/components/home/guides/android/android-guide.component';
import {SlackGuideComponent} from 'app/components/home/guides/slack/slack-guide.component';

// Services
import {AccountService} from 'app/services/account.service';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {PluginService} from 'app/services/plugin.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
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
    NotFoundComponent,
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
    RemoveAppSecretComponent,
    IntegrationsComponent,
    IntegrationComponent,
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
    PluginsComponent,
    PluginComponent,
    RemovePluginComponent,
    OfficeHoursPluginComponent,
    OfficeHoursSetupPluginComponent,
    GreetingsMessagePluginComponent,
    GreetingsMessageSetupPluginComponent,
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
    RemoveAppSecretComponent,
    RemoveIntegrationComponent,
    RemovePluginComponent,
    CreateSlackChannelComponent,
  ],
  providers: [
    AccountService,
    AppService,
    IntegrationService,
    PluginService,
    AlertService,
    EventService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
