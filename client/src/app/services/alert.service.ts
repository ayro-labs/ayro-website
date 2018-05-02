import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {ApiError} from 'app/services/commons/api.error';
import {ErrorUtils} from 'app/utils/error.utils';

export interface Alert {
  type: string;
  id?: string;
  message: string;
}

@Injectable()
export class AlertService {

  private subject: Subject<Alert>;

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

  public apiError(context: string, err: ApiError, errorMessage?: string) {
    const message = ErrorUtils.getErrorMessage(context, err, errorMessage);
    if (message) {
      this.subject.next({message, id: err.code, type: 'danger'});
    }
  }

  public subscribe(callback: (alert: Alert) => void) {
    return this.subject.subscribe(callback);
  }
}
