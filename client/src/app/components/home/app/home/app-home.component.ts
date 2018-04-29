import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {DeleteAppComponent} from 'app/components/home/app/delete/delete-app.component';
import {RemoveAppSecretComponent} from 'app/components/home/app/remove-secret/remove-app-secret.component';
import {AccountService} from 'app/services/account.service';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {PluginService} from 'app/services/plugin.service';
import {AlertService} from 'app/services/alert.service';
import {Account} from 'app/models/account.model';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {AppSecret} from 'app/models/app-secret.model';
import {Integration} from 'app/models/integration.model';
import {Plugin} from 'app/models/plugin.model';
import {PluginType} from 'app/models/plugin-type.model';

import * as moment from 'moment';

@Component({
  selector: 'ayro-app-home',
  templateUrl: './app-home.component.html',
})
export class AppHomeComponent implements OnInit {

  public account: Account;
  public app: App;
  public appSecrets: AppSecret[];
  public loading = true;

  constructor(private accountService: AccountService, private appService: AppService, private integrationService: IntegrationService, private pluginService: PluginService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    const appId = this.activatedRoute.snapshot.paramMap.get('app');
    this.accountService.getAuthenticatedAccount().mergeMap((account) => {
      this.account = account;
      return this.appService.getApp(appId, true, true);
    }).mergeMap((app) => {
      this.app = app;
      return this.appService.listAppSecrets(this.app);
    }).subscribe((appSecrets) => {
      this.appSecrets = appSecrets;
      this.loading = false;
    });
  }

  public trackByIntegration(_index: number, integration: Integration) {
    return integration.id;
  }

  public trackByApp(_index: number, appSecret: AppSecret) {
    return appSecret.id;
  }

  public trackByPlugin(_index: number, plugin: Plugin) {
    return plugin.id;
  }

  public getChannel(id: string): Channel {
    return this.integrationService.getChannel(id);
  }

  public getPluginType(id: string): PluginType {
    return this.pluginService.getPluginType(id);
  }

  public copyAppToken() {
    this.alertService.info('Token copiado!');
  }

  public deleteApp() {
    const modalRef = this.ngbModal.open(DeleteAppComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.result.then(() => {
      this.router.navigate(['/apps']);
    });
  }

  public createAppSecret() {
    this.appService.createAppSecret(this.app).subscribe((appSecret) => {
      this.appSecrets.push(appSecret);
      this.alertService.success('App secret criado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível criar o app secret, por favor tente novamente mais tarde!');
    });
  }

  public removeAppSecret(appSecret: AppSecret) {
    const modalRef = this.ngbModal.open(RemoveAppSecretComponent);
    modalRef.componentInstance.appSecret = appSecret;
    modalRef.result.then(() => {
      this.appSecrets.splice(this.appSecrets.indexOf(appSecret), 1);
    });
  }

  public formatAppSecretDate(appSecret: AppSecret): string {
    return moment(appSecret.registration_date).format('DD/MM/YYYY HH:mm');
  }
}
