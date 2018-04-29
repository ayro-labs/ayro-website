import {Integration} from 'app/models/integration.model';
import {Plugin} from 'app/models/plugin.model';

export class App {

  private static readonly ICON_URL = `${process.env.API_URL}/img/apps/`;
  private static readonly NO_ICON_URL = '/assets/img/icon_no_app.png';

  public id: string;
  public account: string;
  public name: string;
  public icon: string;
  public token: string;
  public integrations: Integration[] = [];
  public plugins: Plugin[] = [];
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.account = data.account;
      this.icon = data.icon;
      this.name = data.name;
      this.token = data.token;
      if (data.integrations) {
        this.integrations = [];
        for (const integration of data.integrations) {
          this.integrations.push(new Integration(integration));
        }
      }
      if (data.plugins) {
        this.plugins = [];
        for (const plugin of data.plugins) {
          this.plugins.push(new Plugin(plugin));
        }
      }
      this.registration_date = data.registration_date;
    }
  }

  public getIntegration(channel: string) {
    const found = this.integrations.find((integration) => {
      return integration.channel === channel;
    });
    return found || null;
  }

  public getIconUrl() {
    return this.icon ? App.ICON_URL + this.icon : App.NO_ICON_URL;
  }
}
