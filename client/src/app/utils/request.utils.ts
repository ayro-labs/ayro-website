import {Headers, RequestOptions} from '@angular/http';

import {StorageUtils} from 'app/utils/storage.utils';

export class RequestUtils {

  public static getApiUrl(url: string) {
    return process.env.API_URL + url;
  }

  public static newJsonOptions() {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    return new RequestOptions({headers});
  }

  public static newJsonOptionsWithApiToken() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Token': StorageUtils.getApiToken(),
    });
    return new RequestOptions({headers});
  }

  public static newOptionsWithApiToken() {
    const headers = new Headers({
      'X-Token': StorageUtils.getApiToken(),
    });
    return new RequestOptions({headers});
  }

  private constructor() {

  }
}
