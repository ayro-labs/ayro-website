import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from 'app/services/auth.service';

@Component({
  selector: 'chz-signout',
  templateUrl: './signout.component.html',
})
export class SignOutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router)  {

  }

  public ngOnInit() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
