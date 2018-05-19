import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as parseDate from 'date-fns/parse';
import * as formatDate from 'date-fns/format';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';
import {AppSecret} from 'app/models/app-secret.model';

@Component({
  selector: 'ayro-remove-app-secret',
  templateUrl: './remove-app-secret.component.html',
})
export class RemoveAppSecretComponent {

  @Input()
  public appSecret: AppSecret;

  constructor(private appService: AppService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public remove(): void {
    this.appService.removeAppSecret(this.appSecret).subscribe(() => {
      this.ngbActiveModal.close();
      this.alertService.success('App secret removido com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível remover o app secret, por favor tente novamente mais tarde!');
    });
  }

  public formatAppSecretDate(appSecret: AppSecret): string {
    return formatDate(parseDate(appSecret.registration_date), 'dd/MM/yyyy HH:mm');
  }
}
