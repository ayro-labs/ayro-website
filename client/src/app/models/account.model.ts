export class Account {

  private static readonly LOGO_URL = `${process.env.API_URL}/img/accounts/`;
  private static readonly NO_LOGO_URL = '/assets/img/icon_no_account.jpg';

  public name: string;
  public email: string;
  public logo: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.email = data.email;
      this.logo = data.logo;
      this.registration_date = data.registration_date;
    }
  }

  public getLogoUrl() {
    return this.logo ? Account.LOGO_URL + this.logo : Account.NO_LOGO_URL;
  }
}
