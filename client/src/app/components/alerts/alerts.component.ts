import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import {AlertService, IAlert} from 'app/services/alert.service';

@Component({
  selector: 'chz-alerts',
  templateUrl: './alerts.component.html',
})
export class AlertsComponent implements OnInit {

  private subject: Subject<IAlert>;
  private alertSubscription: Subscription;
  private alert: IAlert | null;

  constructor(private alertService: AlertService) {

  }

  public ngOnInit(): void {
    this.subject = new Subject<IAlert>();
    this.alertSubscription = this.alertService.subscribe((alert: IAlert) => {
      this.alert = alert;
      this.subject.next();
    });
    // this.subject.debounceTime(5000).subscribe(() => this.close());
  }

  public close() {
    this.alert = null;
  }
}
