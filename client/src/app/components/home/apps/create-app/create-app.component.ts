import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Angulartics2} from 'angulartics2';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';

@Component({
  selector: 'ayro-create-app',
  templateUrl: './create-app.component.html',
})
export class CreateAppComponent {

  public name: string;

  constructor(private appService: AppService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal, private angulartics: Angulartics2) {

  }

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public create(): void {
    this.appService.createApp(this.name).subscribe((app) => {
      this.trackCreateApp();
      this.ngbActiveModal.close(app);
      this.alertService.success('App criado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível criar o app, por favor tente novamente mais tarde!');
    });
  }

  private trackCreateApp(): void {
    this.angulartics.eventTrack.next({
      action: 'app_create',
      properties: {
        event: 'app_create',
        category: 'engagement',
        label: 'Create App',
      },
    });
  }
}
