import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {mergeMap} from 'rxjs/operators';

import {AppService} from 'app/services/app.service';
import {PluginService} from 'app/services/plugin.service';
import {PluginType} from 'app/models/plugin-type.model';
import {App} from 'app/models/app.model';
import {Plugin} from 'app/models/plugin.model';

export interface OnLoaded {
  app: App;
  plugin: Plugin;
}

@Component({
  selector: 'ayro-plugin',
  templateUrl: './plugin.component.html',
})
export class PluginComponent implements OnInit {

  @Input()
  public pluginType: PluginType;
  @Input()
  public setupPage: boolean;
  @Output()
  public loaded = new EventEmitter<OnLoaded>();

  public app: App;
  public plugin: Plugin;
  public loading = true;

  constructor(private appService: AppService, private pluginService: PluginService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).pipe(
      mergeMap((app) => {
        this.app = app;
        return this.pluginService.getPlugin(app, this.pluginType);
      })
    ).subscribe((plugin) => {
      this.plugin = plugin;
      this.loading = false;
      this.loaded.emit({app: this.app, plugin: this.plugin});
    });
  }
}
