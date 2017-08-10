import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'chz-edit-app',
  templateUrl: './edit-app.component.html',
})
export class EditAppComponent implements OnInit {

  public name: string;
  public icon: string;
  public updatedApp: App;

  @Input()
  public app: App;

  constructor(private appService: AppService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal, private elementRef: ElementRef) {

  }

  public ngOnInit() {
    this.name = this.app.name;
    this.icon = `http://api.chatz.io/img/apps/${this.app.icon}`;
  }

  public close() {
    if (this.updatedApp) {
      this.ngbActiveModal.close(this.updatedApp);
    } else {
      this.ngbActiveModal.dismiss();
    }
  }

  public updateName() {
    this.appService.updateApp(this.app, this.name).subscribe((app: App) => {
      this.updatedApp = app;
      this.alertService.success('App name updated with success!');
    }, () => {
      this.alertService.error('Couldn\'t update the app name, please try again later!');
    });
  }

  public updateIcon(event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.icon = e.target.result;
      const iconElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('#icon-input');
      if (iconElement && iconElement.files && iconElement.files.length > 0) {
        this.appService.updateAppIcon(this.app, iconElement.files.item(0)).subscribe((app: App) => {
          this.updatedApp = app;
          this.alertService.success('App icon updated with success!');
        }, () => {
          this.alertService.error('Couldn\'t update the app icon, please try again later!');
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
