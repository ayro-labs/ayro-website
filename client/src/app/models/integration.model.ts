export class Integration {

  public static readonly TYPE_CUSTOMER: string = 'customer';
  public static readonly TYPE_BUSINESS: string = 'business';

  public static readonly CHANNEL_ANDROID: string = 'android';
  public static readonly CHANNEL_IOS: string = 'ios';
  public static readonly CHANNEL_WEB: string = 'web';
  public static readonly CHANNEL_SLACK: string = 'slack';

  public type: string;
  public channel: string;
  public configuration: any;
  public registration_date: Date;

  constructor(data?: any) {
    if (data) {
      this.type = data.type;
      this.channel = data.channel;
      this.configuration = data.configuration;
      this.registration_date = data.registration_date;
    }
  }
}
