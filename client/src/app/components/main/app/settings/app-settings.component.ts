import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'ayro-app-settings',
  templateUrl: './app-settings.component.html',
})
export class AppSettingsComponent implements OnInit {

  public name: string;
  public icon: string;
  public loading = true;

  private app: App;

  constructor(private appService: AppService, private alertService: AlertService, private eventService: EventService, private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).subscribe((app) => {
      this.fillFormFields(app);
      this.loading = false;
    });
  }

  public update(): void {
    this.appService.updateApp(this.app, this.name).subscribe((app) => {
      this.fillFormFields(app);
      this.eventService.publish(EventService.EVENT_APP_NAME_CHANGED, app.name);
      this.alertService.success('App atualizado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar o app, por favor tente novamente mais tarde!');
    });
  }

  public updateIcon(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (readEvent: any) => {
      this.icon = readEvent.target.result;
      this.appService.updateAppIcon(this.app, file).subscribe((app) => {
        this.fillFormFields(app);
        this.eventService.publish(EventService.EVENT_APP_ICON_CHANGED, app.icon);
        this.alertService.success('Ícone do app atualizado com sucesso!');
      }, (err) => {
        this.alertService.apiError(null, err, 'Não foi possível atualizar o ícone do app, por favor tente novamente mais tarde!');
      });
    };
    reader.readAsDataURL(file);
  }

  private fillFormFields(app: App): void {
    this.app = app;
    this.name = app.name;
    this.icon = app.getIconUrl();
  }
}
