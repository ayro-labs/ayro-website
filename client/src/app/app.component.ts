import {Component} from '@angular/core';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {Angulartics2Facebook} from 'angulartics2/facebook';

@Component({
  selector: 'ayro-app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(public angulartics2GoogleTagManager: Angulartics2GoogleTagManager, public angulartics2Facebook: Angulartics2Facebook) {

  }
}
