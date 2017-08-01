
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private accountService: AccountService, private appService: AppService, private integrationService: IntegrationService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.accountService.getAuthenticatedAccount().subscribe((account: Account) => {
      this.account = account;
    });
    this.activatedRoute.params.subscribe((params: {app: string}) => {
      this.appService.getApp(params.app).subscribe((app: App) => {
        this.app = app;
      });
    });
  }

  public getChannel(id: string): Channel {
    return this.integrationService.getChannel(id);
  }
}
