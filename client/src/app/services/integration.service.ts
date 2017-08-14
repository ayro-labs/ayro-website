import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Channel} from 'app/models/channel.model';
import {SlackChannel} from 'app/models/slack-channel.model';
import {Integration} from 'app/models/integration.model';
import {App} from 'app/models/app.model';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

import * as channelsData from 'app/services/data/channels.json';

@Injectable()
export class IntegrationService {

  public indexedChannels: any = {};

  constructor(private http: Http) {
    this.indexChannels();
  }

  public getChannel(id: string): Channel {
    return this.indexedChannels[id];
  }

  public listChannels(type: string): Channel[] {
    const channels: Channel[] = [];
    (channelsData[type] as any[]).forEach((channelData: any) => {
      channels.push(new Channel(channelData));
    });
    return channels;
  }

  public updateIntegration(app: App, channel: Channel, configuration: any): Observable<App> {
    return this.http.put(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), configuration, RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public removeIntegration(app: App, channel: Channel): Observable<App> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public listSlackChannels(app: App): Observable<SlackChannel[]> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/slack/channels`), RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => {
        const channels: SlackChannel[] = [];
        (res.json() as any[]).forEach((data: any) => {
          channels.push(new SlackChannel(data));
        });
        return channels;
      })
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public createSlackChannel(app: App, channel: string): Observable<SlackChannel> {
    return this.http.post(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/slack/channels`), {channel}, RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new SlackChannel(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  private indexChannels() {
    (channelsData[Integration.TYPE_CUSTOMER] as any[]).forEach((data: any) => {
      this.indexedChannels[data.id] = new Channel(data);
    });
    (channelsData[Integration.TYPE_BUSINESS] as any[]).forEach((data: any) => {
      this.indexedChannels[data.id] = new Channel(data);
    });
  }
}
