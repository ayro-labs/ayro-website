import {Component, OnInit} from '@angular/core';

import {PluginService} from 'app/services/plugin.service';
import {PluginType} from 'app/models/plugin-type.model';
import {Plugin} from 'app/models/plugin.model';

@Component({
  selector: 'ayro-greetings-message',
  templateUrl: './greetings-message.component.html',
})
export class GreetingsMessagePluginComponent implements OnInit {

  public pluginType: PluginType;

  constructor(private pluginService: PluginService) {

  }

  public ngOnInit() {
    this.pluginType = this.pluginService.getPluginType(Plugin.TYPE_GREETINGS_MESSAGE);
  }
}
