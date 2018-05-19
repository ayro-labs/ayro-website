import {Component} from '@angular/core';

import {IntegrationService} from 'app/services/integration.service';
import {Channel} from 'app/models/channel.model';

@Component({
  selector: 'ayro-intro',
  templateUrl: './intro.component.html',
})
export class IntroComponent {

  constructor(private integrationService: IntegrationService) {

  }

  public getChannel(id: string): Channel {
    return this.integrationService.getChannel(id);
  }
}
