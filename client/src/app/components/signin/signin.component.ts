import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'chz-signin',
  templateUrl: './signin.component.html',
})
export class SignInComponent {

  public email: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router)  {

  }

  public signIn() {
    this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
