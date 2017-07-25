import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

export interface IAlert {
  message: string;
  type: string;
}

@Injectable()
export class AlertService {

  private observable: Observable<IAlert>;
  private observer: Observer<IAlert>;

  constructor() {
    this.observable = new Observable((observer) => {
      this.observer = observer;
    });
  }

  public success(message: string) {
    this.observer.next({message, type: 'success'});
  }

  public info(message: string) {
    this.observer.next({message, type: 'info'});
  }

  public warn(message: string) {
    this.observer.next({message, type: 'warning'});
  }

  public error(message: string) {
    this.observer.next({message, type: 'danger'});
  }

  public subscribe(callback: (alert: IAlert) => void) {
    return this.observable.subscribe(callback);
  }
}
