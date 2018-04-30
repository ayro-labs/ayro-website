import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

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

  constructor(private eventService: EventService, private http: Http) {
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
    return this.http.get(RequestUtils.getApiUrl(`/apps/${app.id}/plugins/${pluginType.id}?require=${require || false}`), RequestUtils.getJsonOptions())
      .map((res: Response) => res.json() ? new Plugin(res.json()) : null)
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public addPlugin(app: App, pluginType: PluginType, channels: string[], configuration: any): Observable<Plugin> {
    return this.http.post(RequestUtils.getApiUrl(`/apps/${app.id}/plugins/${pluginType.id}`), {channels, configuration}, RequestUtils.getJsonOptions())
      .map((res: Response) => new Plugin(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public updatePlugin(app: App, pluginType: PluginType, channels: string[], configuration: any): Observable<Plugin> {
    return this.http.put(RequestUtils.getApiUrl(`/apps/${app.id}/plugins/${pluginType.id}`), {channels, configuration}, RequestUtils.getJsonOptions())
      .map((res: Response) => new Plugin(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public removePlugin(app: App, pluginType: PluginType): Observable<void> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${app.id}/plugins/${pluginType.id}`), RequestUtils.getJsonOptions())
      .map(() => null)
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  private indexPluginTypes() {
    (pluginTypesData[PluginService.TYPES] as any[]).forEach((data: any) => {
      const pluginType = new PluginType(data);
      this.pluginTypeById.set(data.id, pluginType);
    });
  }
}
