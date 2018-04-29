import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Angulartics2} from 'angulartics2';

import {PluginService} from 'app/services/plugin.service';
import {AlertService} from 'app/services/alert.service';
import {App} from 'app/models/app.model';
import {PluginType} from 'app/models/plugin-type.model';

@Component({
  selector: 'ayro-remove-plugin',
  templateUrl: './remove-plugin.component.html',
})
export class RemovePluginComponent {

  @Input()
  public app: App;
  @Input()
  public pluginType: PluginType;

  public name: string;

  constructor(private pluginService: PluginService, private alertService: AlertService, private ngbActiveModal: NgbActiveModal, private angulartics: Angulartics2) {

  }

  public close() {
    this.ngbActiveModal.dismiss();
  }

  public isAppNameMatched() {
    return this.name === this.app.name;
  }

  public remove() {
    this.pluginService.removePlugin(this.app, this.pluginType).subscribe(() => {
      this.trackRemovePlugin();
      this.ngbActiveModal.close();
      this.alertService.success('Plugin removido com sucesso!');
    }, (err) => {
      this.close();
      this.alertService.apiError(null, err, 'Não foi possível remover o plugin, por favor tente novamente mais tarde!');
    });
  }

  private trackRemovePlugin() {
    this.angulartics.eventTrack.next({
      action: 'plugin_remove',
      properties: {
        event: 'plugin_remove',
        category: 'engagement',
        label: 'Remove Plugin',
        gtmCustom: {
          pluginType: this.pluginType.id,
        },
      },
    });
  }
}
