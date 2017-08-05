import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'chz-edit-app',
  templateUrl: './edit-app.component.html',
})
export class EditAppComponent {

  public name: string;

  @Input()
  public app: App;

  constructor(private appService: AppService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal) {

  }

  public close() {
    this.ngbActiveModal.dismiss();
  }

  public update() {
    this.appService.updateApp(this.app, this.name).subscribe((app: App) => {
      this.ngbActiveModal.close(app);
      this.alertService.success('App updated with success!');
    }, () => {
      this.alertService.error('Couldn\'t update the app, please try again later!');
    });
  }
}
