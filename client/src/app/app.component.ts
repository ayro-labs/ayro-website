import {Component} from '@angular/core';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';

@Component({
  selector: 'ayro-app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private angulartics2GoogleTagManager: Angulartics2GoogleTagManager) {
    this.angulartics2GoogleTagManager.setUsername(null);
  }
}
