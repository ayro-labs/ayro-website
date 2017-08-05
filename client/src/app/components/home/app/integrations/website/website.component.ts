import {Component, OnInit} from '@angular/core';

import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'chz-website',
  templateUrl: './website.component.html',
})
export class WebsiteIntegrationComponent implements OnInit {

  public channel: Channel;

  constructor(private integrationService: IntegrationService) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_WEBSITE);
  }
}
