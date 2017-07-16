export class Account {

  public name: string;
  public email: string;
  public logo_url: string;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.email = data.email;
      this.logo_url = data.logo_url;
      this.registration_date = data.registration_date;
    }
  }
}
