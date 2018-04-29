import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {PluginService} from 'app/services/plugin.service';
import {PluginType} from 'app/models/plugin-type.model';
import {App} from 'app/models/app.model';
import {Plugin} from 'app/models/plugin.model';

@Component({
  selector: 'ayro-office-hours',
  templateUrl: './office-hours.component.html',
})
export class OfficeHoursPluginComponent implements OnInit {

  public app: App;
  public plugin: Plugin;
  public pluginType: PluginType;
  public loading = true;

  constructor(private appService: AppService, private pluginService: PluginService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.pluginType = this.pluginService.getPluginType(Plugin.TYPE_OFFICE_HOURS);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).mergeMap((app) => {
      this.app = app;
      return this.pluginService.getPlugin(app, this.pluginType);
    }).subscribe((plugin) => {
      this.plugin = plugin;
      this.loading = false;
    });
  }
}
