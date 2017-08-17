import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';
import {Channel} from 'app/models/channel.model';

@Component({
  selector: 'chz-remove-integration',
  templateUrl: './remove-integration.component.html',
})
export class RemoveIntegrationComponent {

  @Input()
  public app: App;
  @Input()
  public channel: Channel;

  public name: string;

  constructor(private integrationService: IntegrationService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close() {
    this.ngbActiveModal.dismiss();
  }

  public isAppNameMatched() {
    return this.name === this.app.name;
  }

  public remove() {
    this.integrationService.removeIntegration(this.app, this.channel).subscribe((app: App) => {
      this.ngbActiveModal.close(app);
      this.alertService.success('Integration removed with success!');
    }, () => {
      this.alertService.error('Couldn\'t remove the integration, please try again later!');
    });
  }
}