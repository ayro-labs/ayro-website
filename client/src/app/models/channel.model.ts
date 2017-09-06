export class Channel {

  public id: string;
  public name: string;
  public type: string;
  public picture_url: string;
  public released: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
      this.picture_url = data.picture_url;
      this.released = data.released;
    }
  }
}
