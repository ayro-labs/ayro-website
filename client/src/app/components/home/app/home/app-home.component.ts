import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {DeleteAppComponent} from 'app/components/home/app/delete/delete-app.component';
import {AccountService} from 'app/services/account.service';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {Account} from 'app/models/account.model';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';

@Component({
  selector: 'chz-app-home',
  templateUrl: './app-home.component.html',
})
export class AppHomeComponent implements OnInit {

  public account: Account;
  public app: App;
  public loading: boolean = true;

  constructor(private accountService: AccountService, private appService: AppService, private integrationService: IntegrationService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: {app: string}) => {
      this.accountService.getAuthenticatedAccount().subscribe((account: Account) => {
        this.account = account;
        this.appService.getApp(params.app).subscribe((app: App) => {
          this.app = app;
          this.loading = false;
        });
      });
    });
  }

  public getChannel(id: string): Channel {
    return this.integrationService.getChannel(id);
  }

  public copyAppToken() {
    // Copy to Clipboard
  }

  public deleteApp() {
    const modalRef = this.ngbModal.open(DeleteAppComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.result.then(() => {
      this.router.navigate(['/apps']);
    }).catch(() => {
      // Nothing to do...
    });
  }
}
