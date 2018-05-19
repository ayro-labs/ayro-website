import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Angulartics2} from 'angulartics2';
import {Subscription} from 'rxjs/Subscription';
import {finalize} from 'rxjs/operators/finalize';

import {AccountService} from 'app/services/account.service';
import {EventService} from 'app/services/event.service';
import {Account} from 'app/models/account.model';

@Component({
  selector: 'ayro-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private static readonly INTRO_URL = '/';
  private static readonly SIGN_URLS = ['/signin', '/signup'];

  public navbarCollapsed = true;
  public account: Account;
  public loading = true;

  private currentUrl: string;
  private subscriptions: Subscription[] = [];

  constructor(private accountService: AccountService, private eventService: EventService, private router: Router, private angulartics: Angulartics2) {

  }

  public ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.onRouteChanged();
    this.router.events.subscribe((event) => {
      this.onRouteChanged(event);
    });
    this.subscriptions.push(this.eventService.subscribe(EventService.EVENT_ACCOUNT_NAME_CHANGED, (event) => {
      this.account.name = event.value;
    }));
    this.subscriptions.push(this.eventService.subscribe(EventService.EVENT_ACCOUNT_LOGO_CHANGED, (event) => {
      this.account.logo = event.value;
    }));
    this.subscriptions.push(this.eventService.subscribe(EventService.EVENT_ACCOUNT_CHANGED, (event) => {
      this.account = event.value;
      if (this.account) {
        this.angulartics.setUsername.next(this.account.id);
      }
    }));
    this.accountService.getAuthenticatedAccount().subscribe((account) => {
      this.account = account;
      this.loading = false;
      if (this.account) {
        this.angulartics.setUsername.next(this.account.id);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public isIntroUrl(): boolean {
    return this.currentUrl === HeaderComponent.INTRO_URL;
  }

  public isSignInOrSignUpUrl(): boolean {
    return HeaderComponent.SIGN_URLS.includes(this.currentUrl);
  }

  public logout(): void {
    this.accountService.logout().pipe(
      finalize(() => {
        this.account = null;
        this.router.navigate(['/']);
      })
    ).subscribe(null, null);
  }

  private onRouteChanged(event?: any): void {
    if (event && event instanceof NavigationEnd) {
      this.currentUrl = event.url;
    }
    window.scroll(0, 0);
  }
}
