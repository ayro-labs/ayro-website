import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {App} from '../../../models/app.model';

@Component({
  selector: 'chz-create-app',
  templateUrl: './create-app.component.html',
})
export class CreateAppComponent {

  constructor(private ngbActiveModal: NgbActiveModal) {

  }

  public close() {
    this.ngbActiveModal.dismiss();
  }

  public create() {
    this.ngbActiveModal.close(new App());
  }
}
