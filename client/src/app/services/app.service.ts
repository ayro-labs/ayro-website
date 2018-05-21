import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {_throw} from 'rxjs/observable/throw';
import {map, catchError} from 'rxjs/operators';

import {App} from 'app/models/app.model';
import {AppSecret} from 'app/models/app-secret.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class AppService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public getConfigs(): Observable<any> {
    return this.http.get<any>('/apps/configs', RequestUtils.getJsonOptions()).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public listApps(withIntegrations?: boolean, withPlugins?: boolean): Observable<App[]> {
    return this.http.get<App[]>(RequestUtils.getApiUrl(`/apps?integrations=${withIntegrations || false}&plugins=${withPlugins || false}`), RequestUtils.getJsonOptions()).pipe(
      map((data: App[]) => {
        const apps: App[] = [];
        data.forEach((app: App) => {
          apps.push(new App(app));
        });
        return apps;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public getApp(id: string, withIntegrations?: boolean, withPlugins?: boolean): Observable<App> {
    return this.http.get<App>(RequestUtils.getApiUrl(`/apps/${id}?integrations=${withIntegrations || false}&plugins=${withPlugins || false}`), RequestUtils.getJsonOptions()).pipe(
      map((data: App) => new App(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public createApp(name: string): Observable<App> {
    return this.http.post<App>(RequestUtils.getApiUrl('/apps'), {name}, RequestUtils.getJsonOptions()).pipe(
      map((data: App) => new App(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public updateApp(app: App, name: string): Observable<App> {
    return this.http.put<App>(RequestUtils.getApiUrl(`/apps/${app.id}`), {name}, RequestUtils.getJsonOptions()).pipe(
      map((data: App) => new App(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public updateAppIcon(app: App, icon: File): Observable<App> {
    const formData: FormData = new FormData();
    formData.append('icon', icon);
    return this.http.put<App>(RequestUtils.getApiUrl(`/apps/${app.id}/icon`), formData, RequestUtils.getOptions()).pipe(
      map((data: App) => new App(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public deleteApp(app: App): Observable<void> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${app.id}`), RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public listAppSecrets(app: App): Observable<AppSecret[]> {
    return this.http.get<AppSecret[]>(RequestUtils.getApiUrl(`/apps/${app.id}/secrets`), RequestUtils.getJsonOptions()).pipe(
      map((data: AppSecret[]) => {
        const appSecrets: AppSecret[] = [];
        data.forEach((appSecret: any) => {
          appSecrets.push(new AppSecret(appSecret));
        });
        return appSecrets;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public createAppSecret(app: App): Observable<AppSecret> {
    return this.http.post<AppSecret>(RequestUtils.getApiUrl(`/apps/${app.id}/secrets`), null, RequestUtils.getJsonOptions()).pipe(
      map((data: AppSecret) => new AppSecret(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public removeAppSecret(appSecret: AppSecret): Observable<void> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${appSecret.app}/secrets/${appSecret.id}`), RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }
}
