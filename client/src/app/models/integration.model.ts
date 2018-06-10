/* tslint:disable:variable-name */

export class Integration {

  public static readonly TYPE_USER = 'user';
  public static readonly TYPE_BUSINESS = 'business';

  public static readonly CHANNEL_WEBSITE = 'website';
  public static readonly CHANNEL_WORDPRESS = 'wordpress';
  public static readonly CHANNEL_ANDROID = 'android';
  public static readonly CHANNEL_IOS = 'ios';
  public static readonly CHANNEL_MESSENGER = 'messenger';
  public static readonly CHANNEL_SLACK = 'slack';

  public id: string;
  public type: string;
  public channel: string;
  public configuration: any;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.type = data.type;
      this.channel = data.channel;
      this.configuration = data.configuration;
      this.registration_date = data.registration_date;
    }
  }
}
