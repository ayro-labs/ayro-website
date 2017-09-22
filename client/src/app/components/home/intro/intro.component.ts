import {Component} from '@angular/core';

import {IntegrationService} from 'app/services/integration.service';

@Component({
  selector: 'chz-intro',
  templateUrl: './intro.component.html',
})
export class IntroComponent {

  constructor(private integrationService: IntegrationService) {

  }

  public getChannel(id: string) {
    return this.integrationService.getChannel(id);
  }
}
