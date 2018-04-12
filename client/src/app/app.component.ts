import {Component, OnInit} from '@angular/core';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {Angulartics2Facebook} from 'angulartics2/facebook';

import {AppService} from 'app/services/app.service';

import * as Ayro from 'ayro';

@Component({
  selector: 'ayro-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private appService: AppService, public angulartics2GoogleTagManager: Angulartics2GoogleTagManager, public angulartics2Facebook: Angulartics2Facebook) {

  }

  public ngOnInit() {
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
