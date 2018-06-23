import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {Angulartics2} from 'angulartics2';
import isEmpty from 'lodash-es/isEmpty';
import cloneDeep from 'lodash-es/cloneDeep';

import {OnLoaded} from 'app/components/main/app/integrations/integration/integration.component';
import {RemoveIntegrationComponent} from 'app/components/main/app/integrations/remove/remove-integration.component';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

@Component({
  selector: 'ayro-android-setup',
  templateUrl: './android-setup.component.html',
})
export class AndroidSetupIntegrationComponent implements OnInit {

  public channel: Channel;
  public app: App;
  public integration: Integration;
  public originalConfiguration: any = {};
  public configuration: any = {fcm: {}};
  public sdkVersion: string;
  public loading = true;

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private router: Router, private ngbModal: NgbModal, private angulartics: Angulartics2) {

  }

  public ngOnInit(): void {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_ANDROID);
    this.appService.getConfigs().subscribe((configs) => {
      this.sdkVersion = configs.androidSdkVersion;
      this.loading = false;
    });
  }

  public onLoaded(data: OnLoaded): void {
    this.app = data.app;
    this.integration = data.integration;
    this.setConfiguration();
  }

  public copyAppToken(): void {
    this.alertService.info('Token copiado!');
  }

  public removeFCMConfiguration(): void {
    this.configuration.fcm = {};
    delete this.originalConfiguration.fcm;
  }

  public testIntegration(): void {
    this.integrationService.getIntegration(this.app, this.channel).subscribe((integration) => {
      this.integration = integration;
      this.setConfiguration();
      if (this.integration) {
        this.trackTestIntegration();
        this.alertService.success('Integração realizada com sucesso!');
      } else {
        this.alertService.error('O teste falhou, por favor revise os passos novamente.');
      }
    });
  }

  public updateIntegration(): void {
    if (this.originalConfiguration.fcm) {
      delete this.configuration.fcm;
    }
    if (this.configuration.fcm && isEmpty(this.configuration.fcm.server_key)) {
      delete this.configuration.fcm.server_key;
    }
    if (this.configuration.fcm && isEmpty(this.configuration.fcm.sender_id)) {
      delete this.configuration.fcm.sender_id;
    }
    this.integrationService.updateIntegration(this.app, this.channel, this.configuration).subscribe((integration) => {
      this.integration = integration;
      this.setConfiguration();
      this.alertService.success('Configuração atualizada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar a configuração, por favor tente novamente mais tarde!');
    });
  }

  public removeIntegration(): void {
    const modalRef = this.ngbModal.open(RemoveIntegrationComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.componentInstance.channel = this.channel;
    modalRef.result.then(() => {
      this.router.navigate(['/apps', this.app.id]);
    }).catch(() => {
      // Nothing to do...
    });
  }

  private setConfiguration(): void {
    if (this.integration) {
      this.originalConfiguration = this.integration.configuration;
      this.configuration = cloneDeep(this.integration.configuration);
      if (!this.configuration.fcm) {
        this.configuration.fcm = {};
      }
    }
  }

  private trackTestIntegration(): void {
    this.angulartics.eventTrack.next({
      action: 'integration_test',
      properties: {
        event: 'integration_test',
        category: 'engagement',
        label: 'Test Integration',
        gtmCustom: {
          channel: this.channel.id,
        },
      },
    });
  }
}
