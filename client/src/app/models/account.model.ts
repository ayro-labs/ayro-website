/* tslint:disable:variable-name */

export class Account {

  private static readonly NO_LOGO_URL = '/assets/img/icon_no_account.jpg';

  public id: string;
  public name: string;
  public email: string;
  public logo: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.logo = data.logo;
      this.registration_date = data.registration_date;
    }
  }

  public getLogoUrl(): string {
    return this.logo || Account.NO_LOGO_URL;
  }
}
