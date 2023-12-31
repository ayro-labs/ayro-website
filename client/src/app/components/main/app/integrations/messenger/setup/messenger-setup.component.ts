import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import isEmpty from 'lodash-es/isEmpty';
import cloneDeep from 'lodash-es/cloneDeep';

import {OnLoaded} from 'app/components/main/app/integrations/integration/integration.component';
import {RemoveIntegrationComponent} from 'app/components/main/app/integrations/remove/remove-integration.component';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {Channel} from 'app/models/channel.model';
import {FacebookPage} from 'app/models/facebook-page.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';
import {StorageUtils} from 'app/utils/storage.utils';

@Component({
  selector: 'ayro-messenger-setup',
  templateUrl: './messenger-setup.component.html',
})
export class MessengerSetupIntegrationComponent implements OnInit {

  public channel: Channel;
  public app: App;
  public integration: Integration;
  public originalConfiguration: any = {};
  public configuration: any = {};
  public facebookPages: FacebookPage[] = [];
  public apiToken: string;

  constructor(private integrationService: IntegrationService, private alertService: AlertService, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.apiToken = StorageUtils.getApiToken();
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_MESSENGER);
  }

  public onLoaded(data: OnLoaded): void {
    this.app = data.app;
    this.integration = data.integration;
    this.setConfiguration();
  }

  public trackByFacebookPage(_index: number, facebookPage: FacebookPage): string {
    return facebookPage.id;
  }

  public compareFacebookPages(page: FacebookPage, otherPage: FacebookPage): boolean {
    return page && otherPage && page.id === otherPage.id;
  }

  public updateIntegration(): void {
    const configuration = {page: this.configuration.page};
    this.integrationService.updateIntegration(this.app, this.channel, configuration).subscribe((integration) => {
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
      if (isEmpty(this.facebookPages)) {
        this.integrationService.listFacebookPages(this.app).subscribe((facebookPages) => {
          this.facebookPages = facebookPages;
        });
      }
    }
  }
}
