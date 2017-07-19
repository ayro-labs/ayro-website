import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CreateAppComponent} from 'app/components/home/dashboard/modals/create-app.component';
import {AppService} from 'app/services/app.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'chz-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public apps: App[] = [];

  constructor(private appService: AppService, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.appService.listApps().subscribe((apps: App[]) => {
      this.apps = apps;
    });
  }

  public createApp() {
    const modalRef = this.ngbModal.open(CreateAppComponent);
    modalRef.result.then((app: App) => {
      this.router.navigate(['apps', app.id]);
    }).catch(() => {
      // Nothing to do...
    });
  }
}
