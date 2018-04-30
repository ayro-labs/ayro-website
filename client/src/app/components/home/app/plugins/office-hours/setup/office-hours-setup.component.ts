import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {RemovePluginComponent} from 'app/components/home/app/plugins/remove/remove-plugin.component';
import {AppService} from 'app/services/app.service';
import {PluginService} from 'app/services/plugin.service';
import {AlertService} from 'app/services/alert.service';
import {PluginType} from 'app/models/plugin-type.model';
import {App} from 'app/models/app.model';
import {Plugin} from 'app/models/plugin.model';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'ayro-office-hours-setup',
  templateUrl: './office-hours-setup.component.html',
})
export class OfficeHoursSetupPluginComponent implements OnInit {

  private static readonly DAYS: string[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
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
  private static readonly SUPPORTED_CHANNELS: string[] = ['website', 'wordpress', 'android'];

  public app: App;
  public plugin: Plugin;
  public pluginType: PluginType;
  public configuration: any = this.getDefaultConfiguration();
  public loading = true;

  public days: string[] = _.clone(OfficeHoursSetupPluginComponent.DAYS);
  public timezones: string[] = _.clone(OfficeHoursSetupPluginComponent.TIMEZONES);
  public startTimes: string[] = _.clone(OfficeHoursSetupPluginComponent.START_TIMES);
  public endTimes: string[] = _.clone(OfficeHoursSetupPluginComponent.END_TIMES);
  public channels: string[] = _.clone(OfficeHoursSetupPluginComponent.SUPPORTED_CHANNELS);

  constructor(private appService: AppService, private pluginService: PluginService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.pluginType = this.pluginService.getPluginType(Plugin.TYPE_OFFICE_HOURS);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).mergeMap((app) => {
      this.app = app;
      return this.pluginService.getPlugin(app, this.pluginType);
    }).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.loading = false;
    });
  }

  public trackByDay(index: number) {
    return index;
  }

  public disableTimeRange(day: string) {
    this.configuration.time_range[day].disabled = true;
  }

  public enableTimeRange(day: string) {
    this.configuration.time_range[day].disabled = false;
  }

  public addPlugin() {
    const configuration = this.formatConfiguration();
    this.pluginService.addPlugin(this.app, this.pluginType, this.channels, configuration).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.alertService.success('Plugin adicionado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível adicionar o plugin, por favor tente novamente mais tarde!');
    });
  }

  public updatePlugin() {
    const configuration = this.formatConfiguration();
    this.pluginService.updatePlugin(this.app, this.pluginType, this.channels, configuration).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.alertService.success('Configuração atualizada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar a configuração, por favor tente novamente mais tarde!');
    });
  }

  public removePlugin() {
    const modalRef = this.ngbModal.open(RemovePluginComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.componentInstance.pluginType = this.pluginType;
    modalRef.result.then(() => {
      this.router.navigate(['/apps', this.app.id]);
    });
  }

  private setConfiguration() {
    if (this.plugin) {
      this.configuration = _.cloneDeep(this.plugin.configuration) || this.getDefaultConfiguration();
    } else {
      this.configuration = this.getDefaultConfiguration();
    }
    this.setDefaultTimezoneIfNeeded();
    this.days.forEach((day) => {
      this.setDefaultTimeRangeIfNeeded(day);
    });
  }

  private getDefaultConfiguration() {
    return {time_range: {}};
  }

  private setDefaultTimezoneIfNeeded() {
    if (!this.configuration.timezone) {
      const now = moment();
      const timezone = now.format('Z');
      if (now.creationData().isUTC) {
        this.configuration.timezone = 'UTC';
      } else {
        this.configuration.timezone = 'UTC' + timezone;
      }
    }
  }

  private setDefaultTimeRangeIfNeeded(day: string) {
    if (!this.configuration.time_range[day]) {
      this.configuration.time_range[day] = {
        start: OfficeHoursSetupPluginComponent.DEFAULT_START_TIME,
        end: OfficeHoursSetupPluginComponent.DEFAULT_END_TIME,
        disabled: this.plugin ? true : false,
      };
    }
  }

  private formatConfiguration() {
    const configuration = {
      timezone: this.configuration.timezone,
      time_range: _.pickBy(this.configuration.time_range, (range) => {
        return !range.disabled;
      }),
      reply: this.configuration.reply,
    };
    _.forOwn(configuration.time_range, (range) => {
      delete range.disabled;
    });
    return configuration;
  }
}
