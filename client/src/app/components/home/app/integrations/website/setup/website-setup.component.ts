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
  selector: 'chz-website-setup',
  templateUrl: './website-setup.component.html',
})
export class WebsiteSetupIntegrationComponent implements OnInit {

  public app: App;
  public integration: Integration;
  public channel: Channel;
  public configuration: any = {};
  public loading: boolean = true;

  public sdkVersion = process.env.AYRO_JS_VERSION;

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_WEBSITE);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).subscribe((app) => {
      this.app = app;
      this.integrationService.getIntegration(app, this.channel).subscribe((integration) => {
        this.integration = integration;
        this.setConfiguration();
        this.loading = false;
      });
    });
  }

  public copyAppToken() {
    this.alertService.info('Token copiado!');
  }

  public testIntegration() {
    this.integrationService.getIntegration(this.app, this.channel).subscribe((integration) => {
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
    this.integrationService.updateIntegration(this.app, this.channel, this.configuration).subscribe((integration) => {
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
    }
  }
}
