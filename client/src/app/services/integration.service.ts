import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';
import {Channel} from 'app/models/channel.model';
import {SlackChannel} from 'app/models/slack-channel.model';
import {FacebookPage} from 'app/models/facebook-page.model';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

import * as channelsData from 'app/services/data/channels.json';

@Injectable()
export class IntegrationService {

  private static readonly CHANNELS = 'channels';

  private channelById: Map<string, Channel> = new Map<string, Channel>();
  private channelsByType: Map<string, Channel[]> = new Map<string, Channel[]>();

  constructor(private http: Http) {
    this.indexChannels();
  }

  public getChannel(id: string): Channel {
    const channel = this.channelById.get(id);
    return channel;
  }

  public listChannels(type: string): Channel[] | null {
    return this.channelsByType.get(type) || null;
  }

  public getIntegration(app: App, channel: Channel): Observable<Integration> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new Integration(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public updateIntegration(app: App, channel: Channel, configuration: any): Observable<Integration> {
    return this.http.put(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), configuration, RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new Integration(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public removeIntegration(app: App, channel: Channel): Observable<null> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), RequestUtils.newJsonOptionsWithApiToken())
      .map(() => null)
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public listFacebookPages(app: App): Observable<FacebookPage[]> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/messenger/pages`), RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => {
        const pages: FacebookPage[] = [];
        (res.json() as any[]).forEach((data: any) => {
          pages.push(new FacebookPage(data));
        });
        return pages;
      })
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public createSlackChannel(app: App, channel: string): Observable<SlackChannel> {
    return this.http.post(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/slack/channels`), {channel}, RequestUtils.newJsonOptionsWithApiToken())
      .map((res: Response) => new SlackChannel(res.json()))
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

  private indexChannels() {
    (channelsData[IntegrationService.CHANNELS] as any[]).forEach((data: any) => {
      const channel = new Channel(data);
      this.channelById.set(data.id, channel);
      if (!this.channelsByType.has(data.type)) {
        this.channelsByType.set(data.type, []);
      }
      this.channelsByType.get(data.type).push(channel);
    });
  }
}
