import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CreateAppComponent} from 'app/components/home/apps/create-app/create-app.component';
import {AccountService} from 'app/services/account.service';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {Account} from 'app/models/account.model';
import {App} from 'app/models/app.model';
import {Channel} from 'app/models/channel.model';

@Component({
  selector: 'chz-apps',
  templateUrl: './apps.component.html',
})
export class AppsComponent implements OnInit {

  public account: Account;
  public apps: App[] = [];

  constructor(private accountService: AccountService, private appService: AppService, private integrationService: IntegrationService, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.accountService.getAuthenticatedAccount().subscribe((account: Account) => {
      this.account = account;
    });
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

  public getChannel(id: string): Channel {
    return this.integrationService.getChannel(id);
  }
}