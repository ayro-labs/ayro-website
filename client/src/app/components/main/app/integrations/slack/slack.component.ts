import {Component, OnInit} from '@angular/core';

import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'ayro-slack',
  templateUrl: './slack.component.html',
})
export class SlackIntegrationComponent implements OnInit {

  public channel: Channel;

  constructor(private integrationService: IntegrationService) {

  }

  public ngOnInit(): void {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_SLACK);
  }
}
