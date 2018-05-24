import {Component} from '@angular/core';

import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';

@Component({
  selector: 'ayro-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private integrationService: IntegrationService) {

  }

  public getChannel(id: string): Channel {
    return this.integrationService.getChannel(id);
  }
}
