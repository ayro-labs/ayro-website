/* tslint:disable:variable-name */

export class Plugin {

  public static readonly TYPE_OFFICE_HOURS = 'office_hours';
  public static readonly TYPE_GREETINGS_MESSAGE = 'greetings_message';

  public static readonly CHANNEL_WEBSITE = 'website';
  public static readonly CHANNEL_WORDPRESS = 'wordpress';
  public static readonly CHANNEL_ANDROID = 'android';
  public static readonly CHANNEL_IOS = 'ios';
  public static readonly CHANNEL_MESSENGER = 'messenger';
  public static readonly CHANNEL_SLACK = 'slack';

  public id: string;
  public type: string;
  public channels: string[];
  public configuration: any;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.type = data.type;
      this.channels = data.channels;
      this.configuration = data.configuration;
      this.registration_date = data.registration_date;
    }
  }
}
