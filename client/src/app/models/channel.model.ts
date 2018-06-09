/* tslint:disable:variable-name */

export class Channel {

  public id: string;
  public type: string;
  public slug: string;
  public name: string;
  public summary: string;
  public picture: string;
  public related_links: any[];
  public released: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.type = data.type;
      this.slug = data.slug;
      this.name = data.name;
      this.summary = data.summary;
      this.picture = data.picture;
      this.related_links = data.related_links;
      this.released = data.released;
    }
  }
}
