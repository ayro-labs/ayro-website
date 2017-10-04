export class FacebookPage {

  public id: string;
  public name: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
}
