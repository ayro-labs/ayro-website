import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'chz-web-setup',
  templateUrl: './web-setup.component.html',
})
export class WebSetupIntegrationComponent implements OnInit {

  public app: App;
  public channel: Channel;
  public config: any = {};

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_WEB);
    if (this.activatedRoute.parent) {
      this.activatedRoute.parent.params.subscribe((params: {app: string}) => {
        this.appService.getApp(params.app).subscribe((app: App) => {
          this.app = app;
        });
      });
    }
  }

  public copyAppToken() {
    // Copy to Clipboard
  }

  public hasIntegration() {
    return this.app.getIntegration(Integration.CHANNEL_WEB) !== null;
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

  public saveConfiguration() {
    this.integrationService.updateWeb(this.app, this.config).subscribe((app: App) => {
      this.app = app;
      this.alertService.success('Configuration updated with success.');
    });
  }
}
