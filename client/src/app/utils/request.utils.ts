import {Headers, RequestOptions} from '@angular/http';

import {StorageUtils} from 'app/utils/storage.utils';

export class RequestUtils {

  public static getApiUrl(url: string) {
    return process.env.API_URL + url;
  }

  public static getJsonOptions() {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    const apiToken = StorageUtils.getApiToken();
    if (apiToken) {
      headers.set('Authorization', `Bearer ${apiToken}`);
    }
    return new RequestOptions({headers});
  }

  public static getOptions() {
    const headers = new Headers({});
    const apiToken = StorageUtils.getApiToken();
    if (apiToken) {
      headers.set('Authorization', `Bearer ${apiToken}`);
    }
    return new RequestOptions({headers});
  }

  private constructor() {

  }
}
