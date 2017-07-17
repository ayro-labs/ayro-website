import {Integration} from 'app/models/integration.model';

export class App {

  public id: string;
  public account: string;
  public name: string;
  public token: string;
  public integrations: Integration[];
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.account = data.account;
      this.name = data.name;
      this.token = data.token;
      if (data.integrations) {
        this.integrations = [];
        for (const integration of data.integrations) {
          this.integrations.push(new Integration(integration));
        }
      }
      this.registration_date = data.registration_date;
    }
  }
}
