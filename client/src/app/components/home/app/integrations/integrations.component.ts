import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'chz-integrations',
  templateUrl: './integrations.component.html',
})
export class IntegrationsComponent implements OnInit {

  public app: App;
  public customerChannels: Channel[] = [];
  public businessChannels: Channel[] = [];

  constructor(private appService: AppService, private integrationService: IntegrationService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    if (this.activatedRoute.parent) {
      this.activatedRoute.parent.params.subscribe((params: {app: string}) => {
        this.appService.getApp(params.app).subscribe((app: App) => {
          this.app = app;
        });
      });
    }
    this.customerChannels = this.integrationService.listChannels(Integration.TYPE_CUSTOMER);
    this.businessChannels = this.integrationService.listChannels(Integration.TYPE_BUSINESS);
  }

  public hasIntegration(channel: Channel) {
    return this.app && this.app.getIntegration(channel.id) !== null;
  }
}
