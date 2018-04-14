import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Angulartics2} from 'angulartics2';

import {AuthService} from 'app/services/auth.service';
import {AccountService} from 'app/services/account.service';
import {EventService} from 'app/services/event.service';
import {Account} from 'app/models/account.model';
import {ErrorUtils} from 'app/utils/error.utils';

@Component({
  selector: 'ayro-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private static readonly INTRO_URL = '/';
  private static readonly SIGN_URLS = ['/signin', '/signup'];

  public account: Account;
  public loading = true;

  private currentUrl: string;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private accountService: AccountService, private eventService: EventService, private router: Router, private angulartics: Angulartics2) {

  }

  public ngOnInit() {
    this.currentUrl = this.router.url;
    this.onRouteChanged();
    this.router.events.subscribe((event) => {
      this.onRouteChanged(event);
    });
    this.subscriptions.push(this.eventService.subscribe('account_name_changed', (event) => {
      this.account.name = event.value;
    }));
    this.subscriptions.push(this.eventService.subscribe('account_logo_changed', (event) => {
      this.account.logo = event.value;
    }));
    this.subscriptions.push(this.eventService.subscribe('account_changed', (event) => {
      this.account = event.value;
      this.angulartics.setUsername.next(this.account.id);
    }));
    this.accountService.getAuthenticatedAccount().subscribe((account) => {
      this.account = account;
      this.loading = false;
      if (this.account) {
        this.angulartics.setUsername.next(this.account.id);
      }
    }, (err: any) => {
      if (err.code === ErrorUtils.ACCOUNT_DOES_NOT_EXIST) {
        this.signOut();
      }
    });
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public isIntroUrl() {
    return this.currentUrl === HeaderComponent.INTRO_URL;
  }

  public isSignInOrSignUpUrl() {
    return HeaderComponent.SIGN_URLS.includes(this.currentUrl);
  }

  public signOut() {
    this.authService.signOut().subscribe(() => {
      this.account = null;
      this.router.navigate(['/']);
    });
  }

  private onRouteChanged(event?: any) {
    if (event && event instanceof NavigationEnd) {
      this.currentUrl = event.url;
    }
    window.scroll(0, 0);
  }
}
