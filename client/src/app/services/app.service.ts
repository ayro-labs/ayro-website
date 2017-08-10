import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {App} from 'app/models/app.model';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class AppService {

  constructor(private http: Http) {

  }

  public listApps(): Observable<App[]> {
    return this.http.get(RequestUtils.getApiUrl('/apps'), RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => {
        const apps: App[] = [];
        (res.json() as any[]).forEach((data: any) => {
          apps.push(new App(data));
        });
        return apps;
      })
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public createApp(name: string): Observable<App> {
    return this.http.post(RequestUtils.getApiUrl('/apps'), {name}, RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public updateApp(app: App, name: string): Observable<App> {
    return this.http.put(RequestUtils.getApiUrl(`/apps/${app.id}`), {name}, RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public updateAppIcon(app: App, icon: File): Observable<App> {
    const formData: FormData = new FormData();
    formData.append('icon', icon);
    return this.http.put(RequestUtils.getApiUrl(`/apps/${app.id}/icon`), formData, RequestUtils.newOptionsWithApiToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public getApp(id: string): Observable<App> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${id}`), RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }
}
