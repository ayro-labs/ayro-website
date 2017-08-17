import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

export interface IEvent {
  name: string;
  value: any;
}

@Injectable()
export class EventService {

  private subjects: Map<string, Subject<IEvent>> = new Map<string, Subject<IEvent>>();

  public publish(event: string, value: any) {
    const subject = this.subjects.get(event);
    if (subject) {
      subject.next({value, name: event});
    }
  }

  public subscribe(event: string, callback: (alert: IEvent) => void): Subscription {
    let subject = this.subjects.get(event);
    if (!subject) {
      subject = new Subject<IEvent>();
      this.subjects.set(event, subject);
    }
    return subject.subscribe(callback);
  }
}
