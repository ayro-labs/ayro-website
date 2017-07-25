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
  public webConfig: any = {};
  public componentReady: boolean;

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_WEB);
    this.activatedRoute.params.subscribe((params: {app: string}) => {
      this.appService.getApp(params.app).subscribe((app: App) => {
        this.app = app;
        this.componentReady = true;
      });
    });
  }

  public isIntegrated() {
    console.log(this.app.getIntegration(Integration.CHANNEL_WEB));
    return this.app.getIntegration(Integration.CHANNEL_WEB) !== null;
  }

  public confirmIntegration() {
    this.appService.getApp(this.app.id).subscribe((app: App) => {
      this.app = app;
      if (!app.getIntegration(Integration.CHANNEL_WEB)) {
        this.alertService.error('Integration was not confirmed');
      }
    });
  }

  public save() {
    this.integrationService.addWeb(this.app, this.webConfig);
  }
}
