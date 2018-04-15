import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Angulartics2} from 'angulartics2';

import {AuthService} from 'app/services/auth.service';
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

  constructor(private authService: AuthService, private alertService: AlertService, private eventService: EventService, private router: Router, private angulartics: Angulartics2) {

  }

  public signIn() {
    this.authService.signIn(this.email, this.password).subscribe((account) => {
      this.eventService.publish('account_changed', account);
      this.trackSignIn();
      this.router.navigate(['/apps']);
    }, (err) => {
      const message = ErrorUtils.getErrorMessage(ErrorUtils.CONTEXT_AUTHENTICATION, err);
      this.alertService.error(message);
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
