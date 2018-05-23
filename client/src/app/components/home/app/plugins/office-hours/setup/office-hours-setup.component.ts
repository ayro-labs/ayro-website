import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import * as cloneDeep from 'lodash/cloneDeep';
import * as clone from 'lodash/clone';
import * as pickBy from 'lodash/pickBy';
import * as forOwn from 'lodash/forOwn';
import * as formatDate from 'date-fns/format';

import {OnLoaded} from 'app/components/home/app/plugins/plugin/plugin.component';
import {RemovePluginComponent} from 'app/components/home/app/plugins/remove/remove-plugin.component';
import {PluginService} from 'app/services/plugin.service';
import {AlertService} from 'app/services/alert.service';
import {PluginType} from 'app/models/plugin-type.model';
import {App} from 'app/models/app.model';
import {Plugin} from 'app/models/plugin.model';

@Component({
  selector: 'ayro-office-hours-setup',
  templateUrl: './office-hours-setup.component.html',
})
export class OfficeHoursSetupPluginComponent implements OnInit {

  private static readonly UTC = '+00:00';

  private static readonly DAYS: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  private static readonly TIMEZONES: string[] = [
    'UTC-12:00',
    'UTC-11:00',
    'UTC-10:00',
    'UTC-09:30',
    'UTC-09:00',
    'UTC-08:00',
    'UTC-07:00',
    'UTC-06:00',
    'UTC-05:00',
    'UTC-04:00',
    'UTC-03:30',
    'UTC-03:00',
    'UTC-02:00',
    'UTC-01:00',
    'UTC',
    'UTC+01:00',
    'UTC+02:00',
    'UTC+03:00',
    'UTC+03:30',
    'UTC+04:00',
    'UTC+04:30',
    'UTC+05:00',
    'UTC+05:30',
    'UTC+05:45',
    'UTC+06:00',
    'UTC+06:30',
    'UTC+07:00',
    'UTC+08:00',
    'UTC+08:30',
    'UTC+08:45',
    'UTC+09:00',
    'UTC+09:30',
    'UTC+10:00',
    'UTC+10:30',
    'UTC+11:00',
    'UTC+12:00',
    'UTC+12:45',
    'UTC+13:00',
    'UTC+14:00',
  ];

  private static readonly START_TIMES: string[] = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];

  private static readonly END_TIMES: string[] = [
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '23:59',
  ];

  private static readonly DEFAULT_START_TIME = '09:00';
  private static readonly DEFAULT_END_TIME = '18:00';
  private static readonly DEFAULT_REPLY = 'Obrigado por entrar em contato. Nossa equipe não está disponível no momento, mas nós o responderemos assim que voltarmos.';

  public app: App;
  public plugin: Plugin;
  public pluginType: PluginType;
  public configuration: any = this.getDefaultConfiguration();

  public days = clone(OfficeHoursSetupPluginComponent.DAYS);
  public timezones = clone(OfficeHoursSetupPluginComponent.TIMEZONES);
  public startTimes = clone(OfficeHoursSetupPluginComponent.START_TIMES);
  public endTimes = clone(OfficeHoursSetupPluginComponent.END_TIMES);

  constructor(private pluginService: PluginService, private alertService: AlertService, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.pluginType = this.pluginService.getPluginType(Plugin.TYPE_OFFICE_HOURS);
  }

  public onLoaded(data: OnLoaded): void {
    this.app = data.app;
    this.plugin = data.plugin;
    this.setConfiguration();
  }

  public trackByTimezone(index: number): number {
    return index;
  }

  public trackByDay(index: number): number {
    return index;
  }

  public trackByStartTime(index: number): number {
    return index;
  }

  public trackByEndTime(index: number): number {
    return index;
  }

  public disableTimeRange(day: string): void {
    this.configuration.time_range[day].disabled = true;
  }

  public enableTimeRange(day: string): void {
    this.configuration.time_range[day].disabled = false;
  }

  public addPlugin(): void {
    const configuration = this.formatConfiguration();
    this.pluginService.addPlugin(this.app, this.pluginType, configuration).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.alertService.success('Plugin adicionado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível adicionar o plugin, por favor tente novamente mais tarde!');
    });
  }

  public updatePlugin(): void {
    const configuration = this.formatConfiguration();
    this.pluginService.updatePlugin(this.app, this.pluginType, configuration).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.alertService.success('Configuração atualizada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar a configuração, por favor tente novamente mais tarde!');
    });
  }

  public removePlugin(): void {
    const modalRef = this.ngbModal.open(RemovePluginComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.componentInstance.pluginType = this.pluginType;
    modalRef.result.then(() => {
      this.router.navigate(['/apps', this.app.id]);
    }).catch(() => {
      // Nothing to do...
    });
  }

  private setConfiguration(): void {
    this.configuration = this.plugin ? cloneDeep(this.plugin.configuration) : this.getDefaultConfiguration();
    this.setDefaultTimezoneIfNeeded();
    this.days.forEach((day: any) => {
      this.setDefaultTimeRangeIfNeeded(day);
    });
    this.setDefaultReplyIfNeeded();
  }

  private getDefaultConfiguration(): any {
    return {time_range: {}};
  }

  private setDefaultTimezoneIfNeeded(): void {
    if (!this.configuration.timezone) {
      const timezone = formatDate(new Date(), 'Z');
      if (timezone === OfficeHoursSetupPluginComponent.UTC) {
        this.configuration.timezone = 'UTC';
      } else {
        this.configuration.timezone = 'UTC' + timezone;
      }
    }
  }

  private setDefaultTimeRangeIfNeeded(day: string): void {
    if (!this.configuration.time_range[day]) {
      this.configuration.time_range[day] = {
        start: OfficeHoursSetupPluginComponent.DEFAULT_START_TIME,
        end: OfficeHoursSetupPluginComponent.DEFAULT_END_TIME,
        disabled: this.plugin ? true : false,
      };
    }
  }

  private setDefaultReplyIfNeeded(): void {
    if (!this.configuration.reply) {
      this.configuration.reply = OfficeHoursSetupPluginComponent.DEFAULT_REPLY;
    }
  }

  private formatConfiguration(): any {
    const configuration = {
      timezone: this.configuration.timezone,
      time_range: pickBy(this.configuration.time_range, (range: any) => {
        return !range.disabled;
      }),
      reply: this.configuration.reply,
    };
    forOwn(configuration.time_range, (range: any) => {
      delete range.disabled;
    });
    return configuration;
  }
}
