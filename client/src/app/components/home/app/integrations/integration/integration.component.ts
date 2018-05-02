import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

export interface OnLoaded {
  app: App;
  integration: Integration;
}

@Component({
  selector: 'ayro-integration',
  templateUrl: './integration.component.html',
})
export class IntegrationComponent implements OnInit {

  @Input()
  public channel: Channel;
  @Input()
  public setupPage: boolean;
  @Output()
  public onLoaded = new EventEmitter<OnLoaded>();

  public app: App;
  public integration: Integration;
  public loading = true;

  constructor(private appService: AppService, private integrationService: IntegrationService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).mergeMap((app) => {
      this.app = app;
      return this.integrationService.getIntegration(app, this.channel);
    }).subscribe((integration) => {
      this.integration = integration;
      this.loading = false;
      this.onLoaded.emit({app: this.app, integration: this.integration});
    });
  }
}
