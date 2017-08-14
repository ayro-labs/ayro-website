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

@Component({
  selector: 'chz-website-setup',
  templateUrl: './website-setup.component.html',
})
export class WebsiteSetupIntegrationComponent implements OnInit {

  public app: App;
  public channel: Channel;
  public configuration: any = {};

  constructor(private appService: AppService, private integrationService: IntegrationService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.channel = this.integrationService.getChannel(Integration.CHANNEL_WEBSITE);
    if (this.activatedRoute.parent) {
      this.activatedRoute.parent.params.subscribe((params: {app: string}) => {
        this.appService.getApp(params.app).subscribe((app: App) => {
          this.app = app;
          const integration = this.app.getIntegration(Integration.CHANNEL_WEBSITE);
          if (integration) {
            this.configuration = integration.configuration || {};
          }
        });
      });
    }
  }

  public copyAppToken() {
    // Copy to Clipboard
  }

  public hasIntegration() {
    return this.app.getIntegration(Integration.CHANNEL_WEBSITE) !== null;
  }

  public testIntegration() {
    this.appService.getApp(this.app.id).subscribe((app: App) => {
      this.app = app;
      if (this.hasIntegration()) {
        this.alertService.success('Integration tested with success.');
      } else {
        this.alertService.error('Test failed, please reviews the steps again.');
      }
    });
  }

  public updateConfiguration() {
    this.integrationService.updateIntegration(this.app, this.channel, this.configuration).subscribe((app: App) => {
      this.app = app;
      this.alertService.success('Configuration updated with success.');
    }, () => {
      this.alertService.error('Couldn\'t update the configuration, please try again later!');
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
}
