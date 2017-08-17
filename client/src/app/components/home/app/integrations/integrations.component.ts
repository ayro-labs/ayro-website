
import {Component, OnInit} from '@angular/core';

import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';
import {Integration} from 'app/models/integration.model';

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
    this.customerChannels = this.integrationService.listChannels(Integration.TYPE_CUSTOMER);
    this.businessChannels = this.integrationService.listChannels(Integration.TYPE_BUSINESS);
  }
}
