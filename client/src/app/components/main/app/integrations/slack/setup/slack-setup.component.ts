import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import * as isEmpty from 'lodash/isEmpty';
import * as cloneDeep from 'lodash/cloneDeep';

import {OnLoaded} from 'app/components/main/app/integrations/integration/integration.component';
import {RemoveIntegrationComponent} from 'app/components/main/app/integrations/remove/remove-integration.component';
import {CreateSlackChannelComponent} from 'app/components/main/app/integrations/slack/setup/create-channel/create-slack-channel.component';
import {IntegrationService} from 'app/services/integration.service';
import {AlertService} from 'app/services/alert.service';
import {Channel} from 'app/models/channel.model';
import {SlackChannel} from 'app/models/slack-channel.model';
import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';
import {StorageUtils} from 'app/utils/storage.utils';
import {ErrorUtils} from 'app/utils/error.utils';

@Component({
  selector: 'ayro-slack-setup',
  templateUrl: './slack-setup.component.html',
})
export class SlackSetupIntegrationComponent implements OnInit {

  public channel: Channel;
  public app: App;
  public integration: Integration;
  public originalConfiguration: any = {};
  public configuration: any = {};
  public slackChannels: SlackChannel[] = [];
  public apiToken: string;

  constructor(private integrationService: IntegrationService, private alertService: AlertService, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.apiToken = StorageUtils.getApiToken();
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_SLACK);
  }

  public onLoaded(data: OnLoaded): void {
    this.app = data.app;
    this.integration = data.integration;
    this.setConfiguration();
  }

  public trackBySlackChannel(_index: number, slackChannel: SlackChannel): string {
    return slackChannel.id;
  }

  public compareSlackChannels(channel: SlackChannel, otherChannel: SlackChannel): boolean {
    return channel && otherChannel && channel.id === otherChannel.id;
  }

  public createSlackChannel(): void {
    const modalRef = this.ngbModal.open(CreateSlackChannelComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.result.then((channel: SlackChannel) => {
      this.slackChannels.push(channel);
    }).catch(() => {
      // Nothing to do...
    });
  }

  public updateIntegration(): void {
    const configuration = {channel: this.configuration.channel};
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
      if (isEmpty(this.slackChannels)) {
        this.integrationService.listSlackChannels(this.app).subscribe((slackChannels) => {
          this.slackChannels = slackChannels;
        }, (err) => {
          if (err.code === ErrorUtils.INTERNAL_ERROR && err.cause === ErrorUtils.TOKEN_REVOKED) {
            this.alertService.error('O acesso ao Slack foi revogado, por favor entre novamente com sua conta.');
            this.integration = null;
          }
        });
      }
    }
  }
}
