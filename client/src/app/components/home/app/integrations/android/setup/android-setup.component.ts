import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'chz-android-setup',
  templateUrl: './android-setup.component.html',
})
export class AndroidSetupIntegrationComponent implements OnInit {

  public app: App;
  public channel: Channel;
  public configuration: any = {fcm: {}};

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_ANDROID);
    if (this.activatedRoute.parent) {
      this.activatedRoute.parent.params.subscribe((params: {app: string}) => {
        this.appService.getApp(params.app).subscribe((app: App) => {
          this.app = app;
          const integration = this.app.getIntegration(Integration.CHANNEL_ANDROID);
          if (integration) {
            this.configuration = integration.configuration;
          }
        });
      });
    }
  }

  public copyAppToken() {
    // Copy to Clipboard
  }

  public hasIntegration() {
    return this.app.getIntegration(Integration.CHANNEL_ANDROID) !== null;
  }

  public testIntegration() {
    this.appService.getApp(this.app.id).subscribe((app: App) => {
      this.app = app;
      if (this.hasIntegration()) {
        this.alertService.success('Integration tested with success.');
      } else {
        this.alertService.error('Test failed, please reviews the steps again.');
      }
    });
  }

  public updateConfiguration() {
    this.integrationService.updateAndroid(this.app, this.configuration).subscribe((app: App) => {
      this.app = app;
      this.alertService.success('Configuration updated with success.');
    }, () => {
      this.alertService.error('Couldn\'t update the configuration, please try again later!');
    });
  }
}
