import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {App} from 'app/models/app.model';
import {AppSecret} from 'app/models/app-secret.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class AppService {

  constructor(private eventService: EventService, private http: Http) {

  }

  public getConfigs(): Observable<any> {
    return this.http.get('/apps/configs', RequestUtils.getJsonOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public listApps(withIntegrations?: boolean, withPlugins?: boolean): Observable<App[]> {
    return this.http.get(RequestUtils.getApiUrl(`/apps?integrations=${withIntegrations || false}&plugins=${withPlugins || false}`), RequestUtils.getJsonOptions())
      .map((res: Response) => {
        const apps: App[] = [];
        (res.json() as any[]).forEach((data: any) => {
          apps.push(new App(data));
        });
        return apps;
      }).catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public getApp(id: string, withIntegrations?: boolean, withPlugins?: boolean): Observable<App> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${id}?integrations=${withIntegrations || false}&plugins=${withPlugins || false}`), RequestUtils.getJsonOptions())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public createApp(name: string): Observable<App> {
    return this.http.post(RequestUtils.getApiUrl('/apps'), {name}, RequestUtils.getJsonOptions())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public updateApp(app: App, name: string): Observable<App> {
    return this.http.put(RequestUtils.getApiUrl(`/apps/${app.id}`), {name}, RequestUtils.getJsonOptions())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public updateAppIcon(app: App, icon: File): Observable<App> {
    const formData: FormData = new FormData();
    formData.append('icon', icon);
    return this.http.put(RequestUtils.getApiUrl(`/apps/${app.id}/icon`), formData, RequestUtils.getOptions())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public deleteApp(app: App): Observable<void> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${app.id}`), RequestUtils.getJsonOptions())
      .map(() => null)
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public listAppSecrets(app: App): Observable<AppSecret[]> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${app.id}/secrets`), RequestUtils.getJsonOptions())
      .map((res: Response) => {
        const appSecrets: AppSecret[] = [];
        (res.json() as any[]).forEach((data: any) => {
          appSecrets.push(new AppSecret(data));
        });
        return appSecrets;
      }).catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public createAppSecret(app: App): Observable<AppSecret> {
    return this.http.post(RequestUtils.getApiUrl(`/apps/${app.id}/secrets`), null, RequestUtils.getJsonOptions())
      .map((res: Response) => new AppSecret(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public removeAppSecret(appSecret: AppSecret): Observable<void> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${appSecret.app}/secrets/${appSecret.id}`), RequestUtils.getJsonOptions())
      .map(() => null)
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }
}
