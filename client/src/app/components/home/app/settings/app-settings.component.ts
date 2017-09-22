import {Component, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from 'app/services/app.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {App} from 'app/models/app.model';

@Component({
  selector: 'chz-app-settings',
  templateUrl: './app-settings.component.html',
})
export class AppSettingsComponent implements OnInit {

  public name: string;
  public icon: string;
  private app: App;

  constructor(private appService: AppService, private alertService: AlertService, private eventService: EventService, private activatedRoute: ActivatedRoute, private elementRef: ElementRef) {

  }

  public ngOnInit() {
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).subscribe((app: App) => {
      this.fillFormFields(app);
    });
  }

  public update() {
    this.appService.updateApp(this.app, this.name).subscribe((app: App) => {
      this.fillFormFields(app);
      this.eventService.publish('app_name_changed', app.name);
      this.alertService.success('App atualizado com sucesso!');
    }, () => {
      this.alertService.error('Não foi possível atualizar o app, por favor tente novamente mais tarde!');
    });
  }

  public updateIcon(event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.icon = e.target.result;
      const iconElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('#icon-input');
      if (iconElement && iconElement.files && iconElement.files.length > 0) {
        this.appService.updateAppIcon(this.app, iconElement.files.item(0)).subscribe((app: App) => {
          this.fillFormFields(app);
          this.eventService.publish('app_icon_changed', app.icon);
          this.alertService.success('Ícone do app atualizado com sucesso!');
        }, () => {
          this.alertService.error('Não foi possível atualizar o ícone do app, por favor tente novamente mais tarde!');
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  private fillFormFields(app: App) {
    this.app = app;
    this.name = app.name;
    this.icon = `http://api.chatz.io/img/apps/${app.icon}`;
  }
}
