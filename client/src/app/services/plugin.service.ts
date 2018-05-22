import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {App} from 'app/models/app.model';
import {Plugin} from 'app/models/plugin.model';
import {PluginType} from 'app/models/plugin-type.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

import * as pluginTypesData from 'app/services/data/plugin-types.json';

@Injectable()
export class PluginService {

  private static readonly TYPES = 'types';

  private pluginTypeById: Map<string, PluginType> = new Map<string, PluginType>();

  constructor(private eventService: EventService, private http: HttpClient) {
    this.indexPluginTypes();
  }

  public getPluginType(id: string): PluginType {
    return this.pluginTypeById.get(id);
  }

  public listPluginTypes(): PluginType[] {
    const pluginTypes: PluginType[] = [];
    this.pluginTypeById.forEach((pluginType) => {
      pluginTypes.push(pluginType);
    });
    return pluginTypes;
  }

  public getPlugin(app: App, pluginType: PluginType, require?: boolean): Observable<Plugin> {
    return this.http.get<Plugin>(RequestUtils.getApiUrl(`/apps/${app.id}/plugins/${pluginType.id}?require=${require || false}`), RequestUtils.getJsonOptions()).pipe(
      map((data: Plugin) => data ? new Plugin(data) : null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public addPlugin(app: App, pluginType: PluginType, configuration: any): Observable<Plugin> {
    return this.http.post<Plugin>(RequestUtils.getApiUrl(`/apps/${app.id}/plugins/${pluginType.id}`), configuration, RequestUtils.getJsonOptions()).pipe(
      map((data: Plugin) => new Plugin(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updatePlugin(app: App, pluginType: PluginType, configuration: any): Observable<Plugin> {
    return this.http.put<Plugin>(RequestUtils.getApiUrl(`/apps/${app.id}/plugins/${pluginType.id}`), configuration, RequestUtils.getJsonOptions()).pipe(
      map((data: Plugin) => new Plugin(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public removePlugin(app: App, pluginType: PluginType): Observable<void> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${app.id}/plugins/${pluginType.id}`), RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  private indexPluginTypes(): void {
    (pluginTypesData[PluginService.TYPES] as any[]).forEach((data: any) => {
      const pluginType = new PluginType(data);
      this.pluginTypeById.set(data.id, pluginType);
    });
  }
}
