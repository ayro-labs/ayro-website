import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AppService} from 'app/services/app.service';
import {EventService, IEvent} from 'app/services/event.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'chz-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  public app: App;

  private subscriptions: Subscription[] = [];

  constructor(private appService: AppService, private eventService: EventService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: {app: string}) => {
      this.appService.getApp(params.app).subscribe((app: App) => {
        this.app = app;
        this.subscriptions.push(this.eventService.subscribe('app_name_changed', (event: IEvent) => {
          this.app.name = event.value;
        }));
        this.subscriptions.push(this.eventService.subscribe('app_icon_changed', (event: IEvent) => {
          this.app.icon = event.value;
        }));
      });
    });
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
