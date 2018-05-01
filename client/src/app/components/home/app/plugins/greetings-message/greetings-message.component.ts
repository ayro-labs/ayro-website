import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {PluginService} from 'app/services/plugin.service';
import {PluginType} from 'app/models/plugin-type.model';
import {App} from 'app/models/app.model';
import {Plugin} from 'app/models/plugin.model';

@Component({
  selector: 'ayro-greetings-message',
  templateUrl: './greetings-message.component.html',
})
export class GreetingsMessagePluginComponent implements OnInit {

  public app: App;
  public plugin: Plugin;
  public pluginType: PluginType;
  public loading = true;

  constructor(private appService: AppService, private pluginService: PluginService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.pluginType = this.pluginService.getPluginType(Plugin.TYPE_GREETINGS_MESSAGE);
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
