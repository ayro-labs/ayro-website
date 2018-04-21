import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

export interface IEvent {
  name: string;
  value: any;
}

@Injectable()
export class EventService {

  public static readonly EVENT_API_ERROR = 'api_error';
  public static readonly EVENT_ACCOUNT_NAME_CHANGED = 'account_name_changed';
  public static readonly EVENT_ACCOUNT_LOGO_CHANGED = 'account_logo_changed';
  public static readonly EVENT_ACCOUNT_CHANGED = 'account_changed';
  public static readonly EVENT_APP_NAME_CHANGED = 'app_name_changed';
  public static readonly EVENT_APP_ICON_CHANGED = 'app_icon_changed';

  private subjects: Map<string, Subject<IEvent>> = new Map<string, Subject<IEvent>>();

  public publish(event: string, value: any) {
    const subject = this.subjects.get(event);
    if (subject) {
      subject.next({value, name: event});
    }
  }

  public subscribe(event: string, callback: (event: IEvent) => void): Subscription {
    let subject = this.subjects.get(event);
    if (!subject) {
      subject = new Subject<IEvent>();
      this.subjects.set(event, subject);
    }
    return subject.subscribe(callback);
  }
}
