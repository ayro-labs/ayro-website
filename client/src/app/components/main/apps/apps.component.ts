import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import {CreateAppComponent} from 'app/components/main/apps/create-app/create-app.component';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {Account} from 'app/models/account.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';
import {Channel} from 'app/models/channel.model';

@Component({
  selector: 'ayro-apps',
  templateUrl: './apps.component.html',
})
export class AppsComponent implements OnInit {

  public account: Account;
  public apps: App[] = [];
  public loading = true;

  constructor(private appService: AppService, private integrationService: IntegrationService, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.appService.listApps(true).subscribe((apps: App[]) => {
      this.apps = apps;
      this.loading = false;
    });
  }

  public trackByApp(_index: number, app: App): string {
    return app.id;
  }

  public trackByIntegration(_index: number, integration: Integration): string {
    return integration.id;
  }

  public createApp(): void {
    const modalRef = this.ngbModal.open(CreateAppComponent);
    modalRef.result.then((app: App) => {
      this.router.navigate(['apps', app.id]);
    }).catch(() => {
      // Nothing to do...
    });
  }

  public getChannel(id: string): Channel {
    return this.integrationService.getChannel(id);
  }
}
