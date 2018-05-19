import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'ayro-create-slack-channel',
  templateUrl: './create-slack-channel.component.html',
})
export class CreateSlackChannelComponent {

  public name: string;

  @Input()
  public app: App;

  constructor(private integrationService: IntegrationService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public create(): void {
    this.integrationService.createSlackChannel(this.app, this.name).subscribe((channel) => {
      this.ngbActiveModal.close(channel);
      this.alertService.success('Canal criado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível criar o canal, por favor tente novamente mais tarde!');
    });
  }
}
