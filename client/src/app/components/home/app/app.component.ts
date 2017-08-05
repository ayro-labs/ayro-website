import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {EditAppComponent} from 'app/components/home/app/edit/edit-app.component';
import {AppService} from 'app/services/app.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'chz-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  public app: App;

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: {app: string}) => {
      this.appService.getApp(params.app).subscribe((app: App) => {
        this.app = app;
      });
    });
  }

  public editApp() {
    const modalRef = this.ngbModal.open(EditAppComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.result.then((app: App) => {
      this.app = app;
    }).catch(() => {
      // Nothing to do...
    });
  }
}
