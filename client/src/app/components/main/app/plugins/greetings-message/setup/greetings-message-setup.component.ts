import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import cloneDeep from 'lodash-es/cloneDeep';

import {OnLoaded} from 'app/components/main/app/plugins/plugin/plugin.component';
import {RemovePluginComponent} from 'app/components/main/app/plugins/remove/remove-plugin.component';
import {PluginService} from 'app/services/plugin.service';
import {AlertService} from 'app/services/alert.service';
import {PluginType} from 'app/models/plugin-type.model';
import {App} from 'app/models/app.model';
import {Plugin} from 'app/models/plugin.model';

@Component({
  selector: 'ayro-greetings-message-setup',
  templateUrl: './greetings-message-setup.component.html',
})
export class GreetingsMessageSetupPluginComponent implements OnInit {

  private static readonly DEFAULT_MESSAGE = 'Seja bem vindo! Sinta-se a vontade para nos perguntar qualquer coisa. Estamos aqui para ajudar.';

  public app: App;
  public plugin: Plugin;
  public pluginType: PluginType;
  public configuration: any = {};
  public loading = true;

  constructor(private pluginService: PluginService, private alertService: AlertService, private router: Router, private ngbModal: NgbModal) {

  }

  public ngOnInit(): void {
    this.pluginType = this.pluginService.getPluginType(Plugin.TYPE_GREETINGS_MESSAGE);
  }

  public onLoaded(data: OnLoaded): void {
    this.app = data.app;
    this.plugin = data.plugin;
    this.setConfiguration();
  }

  public addPlugin(): void {
    this.pluginService.addPlugin(this.app, this.pluginType, this.configuration).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.alertService.success('Plugin adicionado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível adicionar o plugin, por favor tente novamente mais tarde!');
    });
  }

  public updatePlugin(): void {
    this.pluginService.updatePlugin(this.app, this.pluginType, this.configuration).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.alertService.success('Configuração atualizada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar a configuração, por favor tente novamente mais tarde!');
    });
  }

  public removePlugin(): void {
    const modalRef = this.ngbModal.open(RemovePluginComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.componentInstance.pluginType = this.pluginType;
    modalRef.result.then(() => {
      this.router.navigate(['/apps', this.app.id]);
    }).catch(() => {
      // Nothing to do...
    });
  }

  private setConfiguration(): void {
    this.configuration = this.plugin ? cloneDeep(this.plugin.configuration) : {};
    if (!this.configuration.message) {
      this.configuration.message = GreetingsMessageSetupPluginComponent.DEFAULT_MESSAGE;
    }
  }
}
