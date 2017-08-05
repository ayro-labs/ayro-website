import {Headers, RequestOptions} from '@angular/http';

import {StorageUtils} from 'app/utils/storage.utils';

export class RequestUtils {

  public static getApiUrl(url: string) {
    return RequestUtils.API_URL + url;
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
      'X-Token': StorageUtils.getApiToken(),
    });
    return new RequestOptions({headers});
  }

  private static readonly API_URL: string = 'http://api.chatz.io';

  private constructor() {

  }
}
