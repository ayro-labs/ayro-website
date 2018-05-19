import {Component, OnInit} from '@angular/core';

import {PluginService} from 'app/services/plugin.service';
import {PluginType} from 'app/models/plugin-type.model';
import {Plugin} from 'app/models/plugin.model';

@Component({
  selector: 'ayro-office-hours',
  templateUrl: './office-hours.component.html',
})
export class OfficeHoursPluginComponent implements OnInit {

  public pluginType: PluginType;

  constructor(private pluginService: PluginService) {

  }

  public ngOnInit(): void {
    this.pluginType = this.pluginService.getPluginType(Plugin.TYPE_OFFICE_HOURS);
  }
}
