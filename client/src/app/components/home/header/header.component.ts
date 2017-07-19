import {Component, OnInit} from '@angular/core';

import {AccountService} from 'app/services/account.service';
import {Account} from 'app/models/account.model';

@Component({
  selector: 'chz-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public account: Account;

  constructor(private accountService: AccountService) {

  }

  public ngOnInit() {
    this.accountService.getAuthenticatedAccount().subscribe((account: Account) => {
      this.account = account;
    });
  }
}
