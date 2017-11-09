import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';

@Component({
  selector: 'chz-create-app',
  templateUrl: './create-app.component.html',
})
export class CreateAppComponent {

  public name: string;

  constructor(private appService: AppService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close() {
    this.ngbActiveModal.dismiss();
  }

  public create() {
    this.appService.createApp(this.name).subscribe((app) => {
      this.ngbActiveModal.close(app);
      this.alertService.success('App criado com sucesso!');
    }, () => {
      this.alertService.error('Não foi possível criar o app, por favor tente novamente mais tarde!');
    });
  }
}
