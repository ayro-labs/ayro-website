import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AuthService} from 'app/services/auth.service';
import {AccountService} from 'app/services/account.service';
import {EventService, IEvent} from 'app/services/event.service';
import {Account} from 'app/models/account.model';

@Component({
  selector: 'chz-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private static readonly INTRO_URL = '/';

  public account: Account;
  public loading: boolean = true;

  private currentUrl: string;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private accountService: AccountService, private eventService: EventService, private router: Router) {

  }

  public ngOnInit() {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    this.accountService.getAuthenticatedAccount().subscribe((account: Account) => {
      this.account = account;
      this.loading = false;
      if (account) {
        this.subscriptions.push(this.eventService.subscribe('account_name_changed', (event: IEvent) => {
          this.account.name = event.value;
        }));
        this.subscriptions.push(this.eventService.subscribe('account_logo_changed', (event: IEvent) => {
          this.account.logo = event.value;
        }));
      }
    });
  }

  public ngOnDestroy() {
    this.unsubscribeEvents();
  }

  public isIntroUrl() {
    return this.currentUrl === HeaderComponent.INTRO_URL;
  }

  public signOut() {
    this.authService.signOut().subscribe(() => {
      this.account = null;
      this.unsubscribeEvents();
      this.router.navigate(['/']);
    });
  }

  private unsubscribeEvents() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
