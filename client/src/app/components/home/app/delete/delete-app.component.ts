import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
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

  public close(): void {
    this.ngbActiveModal.dismiss();
  }

  public isAppNameMatched(): boolean {
    return this.name === this.app.name;
  }

  public delete(): void {
    this.appService.deleteApp(this.app).subscribe(() => {
      this.trackDeleteApp();
      this.ngbActiveModal.close();
      this.alertService.success('App removido com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível remover o app, por favor tente novamente mais tarde!');
    });
  }

  private trackDeleteApp(): void {
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
