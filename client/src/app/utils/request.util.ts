import {Headers, RequestOptions} from '@angular/http';

import {StorageUtil} from './storage.util';

export class RequestUtil {

  public static newOptions() {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    return new RequestOptions({headers});
  }

  public static newOptionsWithAppToken() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Token': StorageUtil.getApiToken(),
    });
    return new RequestOptions({headers});
  }

  private constructor() {

  }
}
