export class Channel {

  public name: string;
  public picture_url: string;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.picture_url = data.picture_url;
    }
  }
}
