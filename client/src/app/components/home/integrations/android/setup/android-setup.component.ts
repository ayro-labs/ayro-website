import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
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
  public fcmConfig: any = {};

  constructor(private appService: AppService, private integrationService: IntegrationService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_ANDROID);
    this.activatedRoute.params.subscribe((params: {app: string}) => {
      this.appService.getApp(params.app).subscribe((app: App) => {
        this.app = app;
      });
    });
  }

  public save() {
    this.integrationService.addAndroid(this.app, {fcm: this.fcmConfig});
  }
}
