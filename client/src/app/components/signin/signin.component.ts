import {Component} from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  providers: [AuthService],
})
export class SignInComponent {

  private email: string;
  private password: string;

  constructor(private authService: AuthService)  {

  }

  public signIn() {
    this.authService.login(this.email, this.password).subscribe((result: any) => {
      console.log(result);
    });
  }
}
