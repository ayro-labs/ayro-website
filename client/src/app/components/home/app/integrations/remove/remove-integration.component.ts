import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {Angulartics2} from 'angulartics2';

import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';
import {Channel} from 'app/models/channel.model';

@Component({
  selector: 'ayro-remove-integration',
  templateUrl: './remove-integration.component.html',
})
export class RemoveIntegrationComponent {

  @Input()
  public app: App;
  @Input()
  public channel: Channel;

  public name: string;

  constructor(private integrationService: IntegrationService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal, private angulartics: Angulartics2) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public isAppNameMatched(): boolean {
    return this.name === this.app.name;
  }

  public remove(): void {
    this.integrationService.removeIntegration(this.app, this.channel).subscribe(() => {
      this.trackRemoveIntegration();
      this.ngbActiveModal.close();
      this.alertService.success('Integração removida com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível remover a integração, por favor tente novamente mais tarde!');
    });
  }

  private trackRemoveIntegration(): void {
    this.angulartics.eventTrack.next({
      action: 'integration_remove',
      properties: {
        event: 'integration_remove',
        category: 'engagement',
        label: 'Remove Integration',
        gtmCustom: {
          channel: this.channel.id,
        },
      },
    });
  }
}
