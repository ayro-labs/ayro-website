import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Angulartics2} from 'angulartics2';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {Angulartics2Facebook} from 'angulartics2/facebook';

import {AppService} from 'app/services/app.service';
import {EventService} from 'app/services/event.service';
import {AlertService} from 'app/services/alert.service';
import {ErrorUtils} from 'app/utils/error.utils';

import * as Ayro from 'ayro';

@Component({
  selector: 'ayro-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  private static readonly DEVELOPMENT_MODE = 'development';

  private static readonly ERRORS_TO_EXIT = [
    ErrorUtils.AUTHENTICATION_REQUIRED,
    ErrorUtils.TOKEN_EXPIRED,
  ];

  constructor(private appService: AppService, private eventService: EventService, private alertService: AlertService, private router: Router, private angulartics: Angulartics2, public angulartics2GoogleTagManager: Angulartics2GoogleTagManager, public angulartics2Facebook: Angulartics2Facebook) {

  }

  public ngOnInit() {
    this.angulartics.developerMode(process.env.NODE_ENV === AppComponent.DEVELOPMENT_MODE);
    this.appService.getConfigs().subscribe((configs) => {
      Ayro.init({
        app_token: configs.appToken,
      });
    });
    this.eventService.subscribe(EventService.EVENT_API_ERROR, (event) => {
      const err = event.value;
      if (AppComponent.ERRORS_TO_EXIT.includes(err.code)) {
        this.alertService.apiError(null, err);
        this.router.navigate(['/']);
        this.eventService.publish(EventService.EVENT_ACCOUNT_CHANGED, null);
      }
    });
  }
}
