/* tslint:disable:variable-name */

export class AppSecret {

  public id: string;
  public app: string;
  public secret: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.app = data.app;
      this.secret = data.secret;
      this.registration_date = data.registration_date instanceof Date ? data.registration_date : new Date(data.registration_date);
    }
  }
}
