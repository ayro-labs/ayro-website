import {Headers, RequestOptions} from '@angular/http';

import {StorageUtil} from './storage.util';

export class RequestUtil {

  public static getUrl(url: string) {
    return RequestUtil.BASE_URL + url;
  }

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

  private static readonly BASE_URL: string = 'http://api.closic.com';

  private constructor() {

  }
}
