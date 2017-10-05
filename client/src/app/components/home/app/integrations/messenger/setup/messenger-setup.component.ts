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
  selector: 'chz-messenger-setup',
  templateUrl: './messenger-setup.component.html',
})
export class MessengerSetupIntegrationComponent implements OnInit {

  public app: App;
  public channel: Channel;
  public originalConfiguration: any = {};
  public configuration: any = {};
  public facebookPages: FacebookPage[] = [];

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_MESSENGER);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).subscribe((app: App) => {
      this.app = app;
      this.setupIntegration();
    });
  }

  public comparePages(page: any, otherPage: any) {
    return page && otherPage && page.id === otherPage.id;
  }

  public hasIntegration() {
    return this.app.getIntegration(Integration.CHANNEL_MESSENGER) !== null;
  }

  public updateConfiguration() {
    this.integrationService.updateIntegration(this.app, this.channel, this.configuration).subscribe((app: App) => {
      this.app = app;
      this.setupIntegration();
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

  private setupIntegration() {
    const integration = this.app.getIntegration(Integration.CHANNEL_MESSENGER);
    if (integration) {
      this.originalConfiguration = integration.configuration;
      this.configuration = _.cloneDeepDeep(integration.configuration);
      this.integrationService.listFacebookPages(this.app).subscribe((facebookPages: FacebookPage[]) => {
        this.facebookPages = facebookPages;
      });
    }
  }
}
