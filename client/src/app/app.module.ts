import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap/alert/alert.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import {ClipboardModule} from 'ngx-clipboard';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {Angulartics2Facebook} from 'angulartics2/facebook';

import {AppRoutes} from 'app/app.routes';
import {AppComponent} from 'app/app.component';

import {ContainerComponent} from 'app/components/container/container.component';
import {MainComponent} from 'app/components/main/main.component';
import {HeaderComponent} from 'app/components/main/header/header.component';
import {FooterComponent} from 'app/components/main/footer/footer.component';
import {AlertsComponent} from 'app/components/main/alerts/alerts.component';
import {NotFoundComponent} from 'app/components/main/not-found/not-found.component';
import {HomeComponent} from 'app/components/main/home/home.component';
import {SignUpComponent} from 'app/components/main/signup/signup.component';
import {SignInComponent} from 'app/components/main/signin/signin.component';
import {TermsComponent} from 'app/components/main/terms/terms.component';
import {PrivacyComponent} from 'app/components/main/privacy/privacy.component';
import {PrivacyEnglishComponent} from 'app/components/main/privacy/privacy-en.component';
import {SettingsComponent} from 'app/components/main/settings/settings.component';
import {AppsComponent} from 'app/components/main/apps/apps.component';
import {CreateAppComponent} from 'app/components/main/apps/create-app/create-app.component';
import {AppComponent as AppContainerComponent} from 'app/components/main/app/app.component';
import {AppDashboardComponent} from 'app/components/main/app/dashboard/app-dashboard.component';
import {AppSettingsComponent} from 'app/components/main/app/settings/app-settings.component';
import {DeleteAppComponent} from 'app/components/main/app/delete/delete-app.component';
import {RemoveAppSecretComponent} from 'app/components/main/app/remove-secret/remove-app-secret.component';

// Integrations
import {IntegrationsComponent} from 'app/components/main/app/integrations/integrations.component';
import {IntegrationComponent} from 'app/components/main/app/integrations/integration/integration.component';
import {RemoveIntegrationComponent} from 'app/components/main/app/integrations/remove/remove-integration.component';
import {WebsiteIntegrationComponent} from 'app/components/main/app/integrations/website/website.component';
import {WebsiteSetupIntegrationComponent} from 'app/components/main/app/integrations/website/setup/website-setup.component';
import {WordPressIntegrationComponent} from 'app/components/main/app/integrations/wordpress/wordpress.component';
import {WordPressSetupIntegrationComponent} from 'app/components/main/app/integrations/wordpress/setup/wordpress-setup.component';
import {AndroidIntegrationComponent} from 'app/components/main/app/integrations/android/android.component';
import {AndroidSetupIntegrationComponent} from 'app/components/main/app/integrations/android/setup/android-setup.component';
import {MessengerIntegrationComponent} from 'app/components/main/app/integrations/messenger/messenger.component';
import {MessengerSetupIntegrationComponent} from 'app/components/main/app/integrations/messenger/setup/messenger-setup.component';
import {SlackIntegrationComponent} from 'app/components/main/app/integrations/slack/slack.component';
import {SlackSetupIntegrationComponent} from 'app/components/main/app/integrations/slack/setup/slack-setup.component';
import {CreateSlackChannelComponent} from 'app/components/main/app/integrations/slack/setup/create-channel/create-slack-channel.component';

// Plugins
import {PluginsComponent} from 'app/components/main/app/plugins/plugins.component';
import {PluginComponent} from 'app/components/main/app/plugins/plugin/plugin.component';
import {RemovePluginComponent} from 'app/components/main/app/plugins/remove/remove-plugin.component';
import {OfficeHoursPluginComponent} from 'app/components/main/app/plugins/office-hours/office-hours.component';
import {OfficeHoursSetupPluginComponent} from 'app/components/main/app/plugins/office-hours/setup/office-hours-setup.component';
import {GreetingsMessagePluginComponent} from 'app/components/main/app/plugins/greetings-message/greetings-message.component';
import {GreetingsMessageSetupPluginComponent} from 'app/components/main/app/plugins/greetings-message/setup/greetings-message-setup.component';

// Guides
import {GuidesComponent} from 'app/components/main/guides/guides.component';
import {UserIdentityGuideComponent} from 'app/components/main/guides/user-identity/user-identity-guide.component';
import {UserInformationGuideComponent} from 'app/components/main/guides/user-information/user-information-guide.component';
import {WebsiteGuideComponent} from 'app/components/main/guides/website/website-guide.component';
import {WordPressGuideComponent} from 'app/components/main/guides/wordpress/wordpress-guide.component';
import {AndroidGuideComponent} from 'app/components/main/guides/android/android-guide.component';
import {SlackGuideComponent} from 'app/components/main/guides/slack/slack-guide.component';

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
    RouterModule.forRoot(AppRoutes.listRoutes()),
    FormsModule,
    NgbAlertModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgbCollapseModule.forRoot(),
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
    MainComponent,
    NotFoundComponent,
    HomeComponent,
    TermsComponent,
    PrivacyComponent,
    PrivacyEnglishComponent,
    SettingsComponent,
    AppsComponent,
    CreateAppComponent,
    AppContainerComponent,
    AppDashboardComponent,
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
