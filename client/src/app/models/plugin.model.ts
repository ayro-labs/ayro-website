export class Plugin {

  public static readonly TYPE_OFFICE_HOURS: string = 'office_hours';
  public static readonly TYPE_GREETINGS_MESSAGE: string = 'greetings_message';

  public static readonly CHANNEL_WEBSITE: string = 'website';
  public static readonly CHANNEL_WORDPRESS: string = 'wordpress';
  public static readonly CHANNEL_ANDROID: string = 'android';
  public static readonly CHANNEL_IOS: string = 'ios';
  public static readonly CHANNEL_MESSENGER: string = 'messenger';
  public static readonly CHANNEL_SLACK: string = 'slack';

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
