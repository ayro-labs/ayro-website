/* tslint:disable:variable-name */

export class PluginType {

  public id: string;
  public slug: string;
  public name: string;
  public summary: string;
  public description: string;
  public picture: string;
  public released: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.slug = data.slug;
      this.name = data.name;
      this.summary = data.summary;
      this.description = data.description;
      this.picture = data.picture;
      this.released = data.released;
    }
  }
}
