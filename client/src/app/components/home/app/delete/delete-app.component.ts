import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Angulartics2} from 'angulartics2';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'ayro-delete-app',
  templateUrl: './delete-app.component.html',
})
export class DeleteAppComponent {

  @Input()
  public app: App;

  public name: string;

  constructor(private appService: AppService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal, private angulartics: Angulartics2) {

  }

  public close() {
    this.ngbActiveModal.dismiss();
  }

  public isAppNameMatched() {
    return this.name === this.app.name;
  }

  public delete() {
    this.appService.deleteApp(this.app).subscribe(() => {
      this.trackDeleteApp();
      this.ngbActiveModal.close();
      this.alertService.success('App removido com sucesso!');
    }, () => {
      this.alertService.error('Não foi possível remover o app, por favor tente novamente mais tarde!');
    });
  }

  private trackDeleteApp() {
    this.angulartics.eventTrack.next({
      action: 'app_delete',
      properties: {
        event: 'app_delete',
        category: 'engagement',
        label: 'Delete App',
      },
    });
  }
}
