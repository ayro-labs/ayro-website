import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CreateAppComponent} from './modals/create-app.component';

import {AccountService} from '../../services/account.service';
import {AppService} from '../../services/app.service';
import {Account} from '../../models/account.model';
import {App} from '../../models/app.model';

@Component({
  selector: 'chz-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public account: Account;
  public apps: App[];

  constructor(private accountService: AccountService, private appService: AppService, private router: Router, private ngbModal: NgbModal) {

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
      this.router.navigate(['/apps', app.id]);
    }).catch(() => {
      // Nothing to do...
    });
  }
}
