import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'chz-slack',
  templateUrl: './slack.component.html',
})
export class SlackIntegrationComponent implements OnInit {

  public app: App;
  public integration: Integration;
  public channel: Channel;
  public loading: boolean = true;

  constructor(private appService: AppService, private integrationService: IntegrationService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_SLACK);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).subscribe((app) => {
      this.app = app;
      this.integrationService.getIntegration(app, this.channel).subscribe((integration) => {
        this.integration = integration;
        this.loading = false;
      });
    });
  }
}
