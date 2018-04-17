import {Component, OnInit} from '@angular/core';
import {Angulartics2} from 'angulartics2';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {Angulartics2Facebook} from 'angulartics2/facebook';

import {AppService} from 'app/services/app.service';

import * as Ayro from 'ayro';

@Component({
  selector: 'ayro-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  private static readonly DEVELOPMENT_MODE = 'development';

  constructor(private appService: AppService, private angulartics: Angulartics2, public angulartics2GoogleTagManager: Angulartics2GoogleTagManager, public angulartics2Facebook: Angulartics2Facebook) {

  }

  public ngOnInit() {
    this.angulartics.developerMode(process.env.NODE_ENV === AppComponent.DEVELOPMENT_MODE);
    this.appService.getConfigs().subscribe((configs) => {
      Ayro.init({
        app_token: configs.appToken,
        chatbox: {
          title: 'Como podemos ajudá-lo?',
          input_placeholder: 'Digite uma mensagem...',
        },
      });
    });
  }
}
