import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {mergeMap} from 'rxjs/operators';
import * as parseDate from 'date-fns/parse';
import * as formatDate from 'date-fns/format';

import {DeleteAppComponent} from 'app/components/main/app/delete/delete-app.component';
import {RemoveAppSecretComponent} from 'app/components/main/app/remove-secret/remove-app-secret.component';
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

@Component({
  selector: 'ayro-app-dashboard',
  templateUrl: './app-dashboard.component.html',
})
export class AppDashboardComponent implements OnInit {

  public account: Account;
  public app: App;
  public appSecrets: AppSecret[];
  public loading = true;

  constructor(private accountService: AccountService, private appService: AppService, private integrationService: IntegrationService, private pluginService: PluginService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    const appId = this.activatedRoute.snapshot.paramMap.get('app');
    this.accountService.getAuthenticatedAccount().pipe(
      mergeMap((account) => {
        this.account = account;
        return this.appService.getApp(appId, true, true);
      }),
      mergeMap((app) => {
        this.app = app;
        return this.appService.listAppSecrets(this.app);
      })
    ).subscribe((appSecrets) => {
      this.appSecrets = appSecrets;
      this.loading = false;
    });
  }

  public trackByIntegration(_index: number, integration: Integration): string {
    return integration.id;
  }

  public trackByApp(_index: number, appSecret: AppSecret): string {
    return appSecret.id;
  }

  public trackByPlugin(_index: number, plugin: Plugin): string {
    return plugin.id;
  }

  public getChannel(id: string): Channel {
    return this.integrationService.getChannel(id);
  }

  public getPluginType(id: string): PluginType {
    return this.pluginService.getPluginType(id);
  }

  public copyAppToken(): void {
    this.alertService.info('Token copiado!');
  }

  public deleteApp(): void {
    const modalRef = this.ngbModal.open(DeleteAppComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.result.then(() => {
      this.router.navigate(['/apps']);
    }).catch(() => {
      // Nothing to do...
    });
  }

  public createAppSecret(): void {
    this.appService.createAppSecret(this.app).subscribe((appSecret) => {
      this.appSecrets.push(appSecret);
      this.alertService.success('App secret criado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível criar o app secret, por favor tente novamente mais tarde!');
    });
  }

  public removeAppSecret(appSecret: AppSecret): void {
    const modalRef = this.ngbModal.open(RemoveAppSecretComponent);
    modalRef.componentInstance.appSecret = appSecret;
    modalRef.result.then(() => {
      this.appSecrets.splice(this.appSecrets.indexOf(appSecret), 1);
    }).catch(() => {
      // Nothing to do...
    });
  }

  public formatAppSecretDate(appSecret: AppSecret): string {
    return formatDate(parseDate(appSecret.registration_date), 'DD/MM/YYYY HH:mm');
  }
}
