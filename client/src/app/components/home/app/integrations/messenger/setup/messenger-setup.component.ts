import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {RemoveIntegrationComponent} from 'app/components/home/app/integrations/remove/remove-integration.component';
import {AppService} from 'app/services/app.service';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {Channel} from 'app/models/channel.model';
import {FacebookPage} from 'app/models/facebook-page.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';

import * as _ from 'lodash';

@Component({
  selector: 'ayro-messenger-setup',
  templateUrl: './messenger-setup.component.html',
})
export class MessengerSetupIntegrationComponent implements OnInit {

  public app: App;
  public integration: Integration;
  public channel: Channel;
  public originalConfiguration: any = {};
  public configuration: any = {};
  public facebookPages: FacebookPage[] = [];
  public loading: boolean = true;

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_MESSENGER);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).mergeMap((app) => {
      this.app = app;
      return this.integrationService.getIntegration(app, this.channel);
    }).subscribe((integration) => {
      this.integration = integration;
      this.setConfiguration();
      this.loading = false;
    });
  }

  public updateConfiguration() {
    const configuration = {page: this.configuration.page};
    this.integrationService.updateIntegration(this.app, this.channel, configuration).subscribe((integration) => {
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

  public comparePages(page: any, otherPage: any) {
    return page && otherPage && page.id === otherPage.id;
  }

  private setConfiguration() {
    if (this.integration) {
      this.originalConfiguration = this.integration.configuration;
      this.configuration = _.cloneDeep(this.integration.configuration);
      if (_.isEmpty(this.facebookPages)) {
        this.integrationService.listFacebookPages(this.app).subscribe((facebookPages) => {
          this.facebookPages = facebookPages;
        });
      }
    }
  }
}
