import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from 'app/services/auth.service';

@Component({
  selector: 'chz-signout',
  templateUrl: './signout.component.html',
})
export class SignOutComponent {

  public email: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router)  {

  }

  public signOut() {
    this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
