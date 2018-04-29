import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {App} from 'app/models/app.model';
import {Integration} from 'app/models/integration.model';
import {Channel} from 'app/models/channel.model';
import {SlackChannel} from 'app/models/slack-channel.model';
import {FacebookPage} from 'app/models/facebook-page.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

import * as channelsData from 'app/services/data/channels.json';

@Injectable()
export class IntegrationService {

  private static readonly CHANNELS = 'channels';

  private channelById: Map<string, Channel> = new Map<string, Channel>();
  private channelsByType: Map<string, Channel[]> = new Map<string, Channel[]>();

  constructor(private eventService: EventService, private http: Http) {
    this.indexChannels();
  }

  public getChannel(id: string): Channel {
    return this.channelById.get(id);
  }

  public listChannels(type: string): Channel[] {
    return this.channelsByType.get(type) || [];
  }

  public getIntegration(app: App, channel: Channel, require?: boolean): Observable<Integration> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}?require=${require || false}`), RequestUtils.getJsonOptions())
      .map((res: Response) => res.json() ? new Integration(res.json()) : null)
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public updateIntegration(app: App, channel: Channel, configuration: any): Observable<Integration> {
    return this.http.put(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), configuration, RequestUtils.getJsonOptions())
      .map((res: Response) => new Integration(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public removeIntegration(app: App, channel: Channel): Observable<void> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), RequestUtils.getJsonOptions())
      .map(() => null)
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public listFacebookPages(app: App): Observable<FacebookPage[]> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/messenger/pages`), RequestUtils.getJsonOptions())
      .map((res: Response) => {
        const pages: FacebookPage[] = [];
        (res.json() as any[]).forEach((data: any) => {
          pages.push(new FacebookPage(data));
        });
        return pages;
      }).catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public createSlackChannel(app: App, channel: string): Observable<SlackChannel> {
    return this.http.post(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/slack/channels`), {channel}, RequestUtils.getJsonOptions())
      .map((res: Response) => new SlackChannel(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public listSlackChannels(app: App): Observable<SlackChannel[]> {
    return this.http.get(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/slack/channels`), RequestUtils.getJsonOptions())
      .map((res: Response) => {
        const channels: SlackChannel[] = [];
        (res.json() as any[]).forEach((data: any) => {
          channels.push(new SlackChannel(data));
        });
        return channels;
      }).catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
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
