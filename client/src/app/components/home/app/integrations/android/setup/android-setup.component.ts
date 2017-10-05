import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {RemoveIntegrationComponent} from 'app/components/home/app/integrations/remove/remove-integration.component';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {Channel} from 'app/models/channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

import * as _ from 'lodash';

@Component({
  selector: 'chz-android-setup',
  templateUrl: './android-setup.component.html',
})
export class AndroidSetupIntegrationComponent implements OnInit {

  public app: App;
  public integration: Integration;
  public channel: Channel;
  public configuration: any = {fcm: {}};

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_ANDROID);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).subscribe((app: App) => {
      this.app = app;
      this.integrationService.getIntegration(app, this.channel).subscribe((integration: Integration) => {
        this.integration = integration;
        this.setConfiguration();
      });
    });
  }

  public copyAppToken() {
    // Copy to Clipboard
  }

  public hasIntegration() {
    return this.integration !== null;
  }

  public testIntegration() {
    this.integrationService.getIntegration(this.app, this.channel).subscribe((integration: Integration) => {
      this.integration = integration;
      this.setConfiguration();
      if (this.integration) {
        this.alertService.success('Integração realizada com sucesso!');
      } else {
        this.alertService.error('O teste falhou, por favor revise os passos novamente.');
      }
    });
  }

  public updateConfiguration() {
    const configuration = _.cloneDeep(this.configuration);
    if (configuration.primary_color) {
      configuration.primary_color = '#' + configuration.primary_color;
    }
    if (configuration.conversation_color) {
      configuration.conversation_color = '#' + configuration.conversation_color;
    }
    this.integrationService.updateIntegration(this.app, this.channel, configuration).subscribe((integration: Integration) => {
      this.integration = integration;
      this.setConfiguration();
      this.alertService.success('Configuração atualizada com sucesso!');
    }, () => {
      this.alertService.error('Não foi possível atualizar a configuração, por favor tente novamente mais tarde!');
    });
  }

  public removeIntegration() {
    const modalRef = this.ngbModal.open(RemoveIntegrationComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.componentInstance.channel = this.channel;
    modalRef.result.then(() => {
      this.router.navigate(['/apps', this.app.id]);
    }).catch(() => {
      // Nothing to do...
    });
  }

  private setConfiguration() {
    if (this.integration) {
      this.configuration = _.cloneDeep(this.integration.configuration) || {};
      if (!this.configuration.fcm) {
        this.configuration.fcm = {};
      }
      if (this.configuration.primary_color) {
        this.configuration.primary_color = this.configuration.primary_color.replace('#', '');
      }
      if (this.configuration.conversation_color) {
        this.configuration.conversation_color = this.configuration.conversation_color.replace('#', '');
      }
    }
  }
}
