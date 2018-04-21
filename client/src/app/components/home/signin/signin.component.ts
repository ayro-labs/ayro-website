import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Angulartics2} from 'angulartics2';

import {AccountService} from 'app/services/account.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {ErrorUtils} from 'app/utils/error.utils';

@Component({
  selector: 'ayro-signin',
  templateUrl: './signin.component.html',
})
export class SignInComponent {

  public email: string;
  public password: string;

  constructor(private accountService: AccountService, private alertService: AlertService, private eventService: EventService, private router: Router, private angulartics: Angulartics2) {

  }

  public login() {
    this.accountService.login(this.email, this.password).subscribe((account) => {
      this.eventService.publish(EventService.EVENT_ACCOUNT_CHANGED, account);
      this.trackSignIn();
      this.router.navigate(['/apps']);
    }, (err) => {
      this.alertService.apiError(ErrorUtils.CONTEXT_AUTHENTICATION, err);
    });
  }

  private trackSignIn() {
    this.angulartics.eventTrack.next({
      action: 'login',
      properties: {
        event: 'login',
        category: 'engagement',
        label: 'Login',
      },
    });
  }
}
