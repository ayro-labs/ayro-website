import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Angulartics2} from 'angulartics2';

import {AccountService} from 'app/services/account.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {ErrorUtils} from 'app/utils/error.utils';

@Component({
  selector: 'ayro-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent {

  public name: string;
  public email: string;
  public password: string;

  constructor(private accountService: AccountService, private eventService: EventService, private alertService: AlertService, private router: Router, private angulartics: Angulartics2) {

  }

  public signUp() {
    this.accountService.createAccount(this.name, this.email, this.password).mergeMap(() => {
      this.trackSignUp();
      return this.accountService.login(this.email, this.password);
    }).subscribe((account) => {
      this.eventService.publish(EventService.EVENT_ACCOUNT_CHANGED, account);
      this.router.navigate(['/apps']);
    }, (err) => {
      this.alertService.apiError(ErrorUtils.CONTEXT_AUTHENTICATION, err);
    });
  }

  private trackSignUp() {
    this.angulartics.eventTrack.next({
      action: 'sign_up',
      properties: {
        event: 'sign_up',
        category: 'engagement',
        label: 'Sign Up',
      },
    });
  }
}
