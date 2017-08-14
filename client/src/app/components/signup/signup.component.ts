import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AccountService} from 'app/services/account.service';
import {AuthService} from 'app/services/auth.service';

@Component({
  selector: 'chz-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent {

  public name: string;
  public email: string;
  public password: string;

  constructor(private accountService: AccountService, private authService: AuthService, private router: Router) {

  }

  public signUp() {
    this.accountService.createAccount(this.name, this.email, this.password).subscribe(() => {
      this.authService.signIn(this.email, this.password).subscribe(() => {
        this.router.navigate(['/']);
      }, () => {
        this.router.navigate(['/signin']);
      });
    });
  }
}
