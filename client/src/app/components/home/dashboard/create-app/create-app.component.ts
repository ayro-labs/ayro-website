import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';

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
    this.appService.createApp(this.name).subscribe((app: App) => {
      this.ngbActiveModal.close(app);
      this.alertService.success('App created with success!');
    }, () => {
      this.alertService.error('Couldn\'t create the app, please try again later!');
    });
  }
}
