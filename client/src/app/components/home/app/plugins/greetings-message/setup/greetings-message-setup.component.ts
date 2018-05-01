import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {RemovePluginComponent} from 'app/components/home/app/plugins/remove/remove-plugin.component';
import {AppService} from 'app/services/app.service';
import {PluginService} from 'app/services/plugin.service';
import {AlertService} from 'app/services/alert.service';
import {PluginType} from 'app/models/plugin-type.model';
import {App} from 'app/models/app.model';
import {Plugin} from 'app/models/plugin.model';

import * as _ from 'lodash';

@Component({
  selector: 'ayro-greetings-message-setup',
  templateUrl: './greetings-message-setup.component.html',
})
export class GreetingsMessageSetupPluginComponent implements OnInit {

  private static readonly DEFAULT_MESSAGE = 'Seja bem vindo! Sinta-se a vontade para perguntar o que quiser. Estamos aqui para ajudar.';

  public app: App;
  public plugin: Plugin;
  public pluginType: PluginType;
  public configuration: any = {};
  public loading = true;

  constructor(private appService: AppService, private pluginService: PluginService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute, private ngbModal: NgbModal) {

  }

  public ngOnInit() {
    this.pluginType = this.pluginService.getPluginType(Plugin.TYPE_GREETINGS_MESSAGE);
    const appId = this.activatedRoute.parent.snapshot.paramMap.get('app');
    this.appService.getApp(appId).mergeMap((app) => {
      this.app = app;
      return this.pluginService.getPlugin(app, this.pluginType);
    }).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.loading = false;
    });
  }

  public addPlugin() {
    this.pluginService.addPlugin(this.app, this.pluginType, this.configuration).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.alertService.success('Plugin adicionado com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível adicionar o plugin, por favor tente novamente mais tarde!');
    });
  }

  public updatePlugin() {
    this.pluginService.updatePlugin(this.app, this.pluginType, this.configuration).subscribe((plugin) => {
      this.plugin = plugin;
      this.setConfiguration();
      this.alertService.success('Configuração atualizada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar a configuração, por favor tente novamente mais tarde!');
    });
  }

  public removePlugin() {
    const modalRef = this.ngbModal.open(RemovePluginComponent);
    modalRef.componentInstance.app = this.app;
    modalRef.componentInstance.pluginType = this.pluginType;
    modalRef.result.then(() => {
      this.router.navigate(['/apps', this.app.id]);
    });
  }

  private setConfiguration() {
    this.configuration = this.plugin ? _.cloneDeep(this.plugin.configuration) : {};
    if (!this.configuration.message) {
      this.configuration.message = GreetingsMessageSetupPluginComponent.DEFAULT_MESSAGE;
    }
  }
}