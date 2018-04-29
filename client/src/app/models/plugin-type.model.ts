export class PluginType {

  public id: string;
  public slug: string;
  public name: string;
  public picture_url: string;
  public released: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.slug = data.slug;
      this.name = data.name;
      this.picture_url = data.picture_url;
      this.released = data.released;
    }
  }
}
