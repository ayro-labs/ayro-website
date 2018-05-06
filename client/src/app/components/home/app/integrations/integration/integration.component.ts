import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';
import {ApiError} from 'app/services/commons/api.error';

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
  public loaded = new EventEmitter<OnLoaded>();

  public app: App;
  public integration: Integration;
  public loading = true;

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    const error = this.activatedRoute.snapshot.queryParamMap.get('error');
    if (error) {
      this.alertService.apiError(null, new ApiError(error));
    }
    this.appService.getApp(appId).mergeMap((app) => {
      this.app = app;
      return this.integrationService.getIntegration(app, this.channel);
    }).subscribe((integration) => {
      this.integration = integration;
      this.loading = false;
      this.loaded.emit({app: this.app, integration: this.integration});
    });
  }

  public trackByRelatedLink(index: number) {
    return index;
  }
}
