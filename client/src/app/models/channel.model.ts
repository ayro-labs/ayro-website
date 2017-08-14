export class Channel {

  public id: string;
  public name: string;
  public description: string;
  public picture_url: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.picture_url = data.picture_url;
    }
  }
}
