import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from 'app/services/auth.service';
import {AlertService} from 'app/services/alert.service';
import {ErrorUtils} from 'app/utils/error.utils';

@Component({
  selector: 'ayro-signin',
  templateUrl: './signin.component.html',
})
export class SignInComponent {

  public email: string;
  public password: string;

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router)  {

  }

  public signIn() {
    this.authService.signIn(this.email, this.password).subscribe(() => {
      this.router.navigate(['/apps']);
    }, (err) => {
      const message = ErrorUtils.getErrorMessage(ErrorUtils.CONTEXT_AUTHENTICATION, err);
      this.alertService.error(message);
    });
  }
}
