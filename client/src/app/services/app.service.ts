import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {App} from 'app/models/app.model';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtil} from 'app/utils/request.util';

@Injectable()
export class AppService {

  constructor(private http: Http) {

  }

  public listApps(): Observable<App[]> {
    return this.http.get(RequestUtil.getUrl('/apps'), RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => {
        const datas: any[] = res.json();
        const apps: App[] = [];
        datas.forEach((data) => {
          apps.push(new App(data));
        });
        return apps;
      })
      .catch((err: Response) => Observable.throw(new ApiError(err)));
  }

  public createApp(name: string): Observable<App> {
    return this.http.post(RequestUtil.getUrl('/apps'), {name}, RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(new ApiError(err)));
  }

  public getApp(id: string): Observable<App> {
    return this.http.get(RequestUtil.getUrl(`/apps/${id}`), RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(new ApiError(err)));
  }
}
