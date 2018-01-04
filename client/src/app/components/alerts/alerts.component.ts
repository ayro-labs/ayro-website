import {Component, OnInit} from '@angular/core';

import {AlertService, IAlert} from 'app/services/alert.service';

@Component({
  selector: 'ayro-alerts',
  templateUrl: './alerts.component.html',
})
export class AlertsComponent implements OnInit {

  public alerts: IAlert[] = [];

  constructor(private alertService: AlertService) {

  }

  public ngOnInit(): void {
    this.alertService.subscribe((alert) => {
      this.alerts.push(alert);
      setTimeout(() => {
        this.close(alert);
      }, 5000);
    });
  }

  public close(alert: IAlert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
