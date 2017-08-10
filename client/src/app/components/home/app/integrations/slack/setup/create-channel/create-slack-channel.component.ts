import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';
import {SlackChannel} from 'app/models/slack-channel.model';

@Component({
  selector: 'chz-create-slack-channel',
  templateUrl: './create-slack-channel.component.html',
})
export class CreateSlackChannelComponent {

  public name: string;

  @Input()
  public app: App;

  constructor(private integrationService: IntegrationService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close() {
    this.ngbActiveModal.dismiss();
  }

  public create() {
    this.integrationService.createSlackChannel(this.app, this.name).subscribe((channel: SlackChannel) => {
      this.ngbActiveModal.close(channel);
      this.alertService.success('Channel created with success!');
    }, () => {
      this.alertService.error('Couldn\'t create the channel, please try again later!');
    });
  }
}
