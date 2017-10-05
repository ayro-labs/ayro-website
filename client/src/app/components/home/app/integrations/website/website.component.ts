import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'chz-website',
  templateUrl: './website.component.html',
})
export class WebsiteIntegrationComponent implements OnInit {

  public app: App;
  public integration: Integration;
  public channel: Channel;

  constructor(private appService: AppService, private integrationService: IntegrationService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_WEBSITE);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).subscribe((app: App) => {
      this.app = app;
      this.integrationService.getIntegration(app, this.channel).subscribe((integration: Integration) => {
        this.integration = integration;
      });
    });
  }

  public hasIntegration() {
    return this.integration !== null;
  }
}
