import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export interface IAlert {
  message: string;
  type: string;
}

@Injectable()
export class AlertService {

  private subject: Subject<IAlert>;

  constructor() {
    this.subject = new Subject();
  }

  public success(message: string) {
    this.subject.next({message, type: 'success'});
  }

  public info(message: string) {
    this.subject.next({message, type: 'info'});
  }

  public warn(message: string) {
    this.subject.next({message, type: 'warning'});
  }

  public error(message: string) {
    this.subject.next({message, type: 'danger'});
  }

  public subscribe(callback: (alert: IAlert) => void) {
    return this.subject.subscribe(callback);
  }
}
