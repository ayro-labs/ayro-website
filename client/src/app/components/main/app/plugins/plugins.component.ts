import {Component, OnInit} from '@angular/core';

import {PluginService} from 'app/services/plugin.service';
import {PluginType} from 'app/models/plugin-type.model';

@Component({
  selector: 'ayro-plugins',
  templateUrl: './plugins.component.html',
})
export class PluginsComponent implements OnInit {

  public pluginTypes: PluginType[] = [];

  constructor(private pluginService: PluginService) {

  }

  public ngOnInit(): void {
    this.pluginTypes = this.pluginService.listPluginTypes();
  }

  public trackByPluginType(_index: number, pluginType: PluginType): string {
    return pluginType.id;
  }
}
