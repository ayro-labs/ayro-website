import {Component, OnInit} from '@angular/core';

import {AppService} from '../../services/app.service';

@Component({
  selector: 'chz-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public apps: any;

  constructor(private appService: AppService) {

  }

  public ngOnInit() {
    this.appService.listApps().subscribe((apps: any) => {
      this.apps = apps;
    });
  }
}
