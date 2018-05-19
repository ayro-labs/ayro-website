import {Component, OnInit, ElementRef} from '@angular/core';
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

  constructor(private appService: AppService, private alertService: AlertService, private eventService: EventService, private activatedRoute: ActivatedRoute, private elementRef: ElementRef) {

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
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.icon = e.target.result;
      const iconElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('#icon');
      if (iconElement && iconElement.files && iconElement.files.length > 0) {
        this.appService.updateAppIcon(this.app, iconElement.files.item(0)).subscribe((app) => {
          this.fillFormFields(app);
          this.eventService.publish(EventService.EVENT_APP_ICON_CHANGED, app.icon);
          this.alertService.success('Ícone do app atualizado com sucesso!');
        }, (err) => {
          this.alertService.apiError(null, err, 'Não foi possível atualizar o ícone do app, por favor tente novamente mais tarde!');
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  private fillFormFields(app: App): void {
    this.app = app;
    this.name = app.name;
    this.icon = app.getIconUrl();
  }
}
