import {Component, OnInit} from '@angular/core';

import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';

@Component({
  selector: 'chz-integrations',
  templateUrl: './integrations.component.html',
})
export class IntegrationsComponent implements OnInit {

  public customerChannels: Channel[] = [];
  public businessChannels: Channel[] = [];

  constructor(private integrationService: IntegrationService) {

  }

  public ngOnInit() {
    this.integrationService.listChannels('customer').subscribe((channels: Channel[]) => {
      this.customerChannels = channels;
    });
    this.integrationService.listChannels('business').subscribe((channels: Channel[]) => {
      this.businessChannels = channels;
    });
  }
}
