import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {AppService} from 'app/services/app.service';
import {EventService} from 'app/services/event.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'ayro-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  public app: App;

  private subscriptions: Subscription[] = [];

  constructor(private appService: AppService, private eventService: EventService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    const appId = this.activatedRoute.snapshot.paramMap.get('app');
    this.appService.getApp(appId, true).subscribe((app) => {
      this.app = app;
      this.subscriptions.push(this.eventService.subscribe(EventService.EVENT_APP_NAME_CHANGED, (event) => {
        this.app.name = event.value;
      }));
      this.subscriptions.push(this.eventService.subscribe(EventService.EVENT_APP_ICON_CHANGED, (event) => {
        this.app.icon_url = event.value;
      }));
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
