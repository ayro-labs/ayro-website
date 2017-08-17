import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AccountService} from 'app/services/account.service';
import {AlertService} from 'app/services/alert.service';
import {EventService, IEvent} from 'app/services/event.service';
import {Account} from 'app/models/account.model';

@Component({
  selector: 'chz-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  public account: Account;

  private subscriptions: Subscription[] = [];

  constructor(private accountService: AccountService, private alertService: AlertService, private eventService: EventService, private router: Router) {

  }

  public ngOnInit() {
    this.accountService.getAuthenticatedAccount().subscribe(
      (account: Account) => {
        this.account = account;
        this.subscriptions.push(this.eventService.subscribe('account_name_changed', (event: IEvent) => {
          this.account.name = event.value;
        }));
        this.subscriptions.push(this.eventService.subscribe('account_logo_changed', (event: IEvent) => {
          this.account.logo = event.value;
        }));
      },
      () => {
        this.alertService.error('Couldn\'t authenticate your account, please sign in again!');
        this.router.navigate(['/']);
      }
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
