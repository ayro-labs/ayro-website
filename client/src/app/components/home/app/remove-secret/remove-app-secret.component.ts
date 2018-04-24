import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';
import {AppSecret} from 'app/models/app-secret.model';

import * as moment from 'moment';

@Component({
  selector: 'ayro-remove-app-secret',
  templateUrl: './remove-app-secret.component.html',
})
export class RemoveAppSecretComponent {

  @Input()
  public appSecret: AppSecret;

  constructor(private appService: AppService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close() {
    this.ngbActiveModal.dismiss();
  }

  public delete() {
    this.appService.removeAppSecret(this.appSecret).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('App secret removido com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível remover o app secret, por favor tente novamente mais tarde!');
    });
  }

  public formatAppSecretDate(appSecret: AppSecret): string {
    return moment(appSecret.registration_date).format('DD/MM/YYYY HH:mm');
  }
}
