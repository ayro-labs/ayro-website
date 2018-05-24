import {Component, OnInit} from '@angular/core';

import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'ayro-integrations',
  templateUrl: './integrations.component.html',
})
export class IntegrationsComponent implements OnInit {

  public userChannels: Channel[] = [];
  public businessChannels: Channel[] = [];

  constructor(private integrationService: IntegrationService) {

  }

  public ngOnInit(): void {
    this.userChannels = this.integrationService.listChannels(Integration.TYPE_USER);
    this.businessChannels = this.integrationService.listChannels(Integration.TYPE_BUSINESS);
  }

  public trackByChannel(_index: number, channel: Channel): string {
    return channel.id;
  }
}
