
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'chz-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  public app: App;

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: {app: string}) => {
      this.appService.getApp(params.app).subscribe((app: App) => {
        this.app = app;
      });
    });
  }
}
