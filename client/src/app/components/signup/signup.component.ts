import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Angulartics2} from 'angulartics2';

import {AccountService} from 'app/services/account.service';
import {AuthService} from 'app/services/auth.service';

@Component({
  selector: 'ayro-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent {

  public name: string;
  public email: string;
  public password: string;

  constructor(private accountService: AccountService, private authService: AuthService, private router: Router, private angulartics: Angulartics2) {

  }

  public signUp() {
    this.accountService.createAccount(this.name, this.email, this.password).mergeMap(() => {
      this.trackSignUp();
      return this.authService.signIn(this.email, this.password);
    }).subscribe(() => {
      this.router.navigate(['/apps']);
    }, () => {
      this.router.navigate(['/signin']);
    });
  }

  private trackSignUp() {
    this.angulartics.eventTrack.next({
      action: 'sign_up',
      properties: {
        event: 'sign_up',
        category: 'engagement',
        label: 'Sign Up',
      }
    });
  }
}
