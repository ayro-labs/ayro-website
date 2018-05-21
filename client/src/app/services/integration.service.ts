import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {_throw} from 'rxjs/observable/throw';
import {map, catchError} from 'rxjs/operators';

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

  constructor(private eventService: EventService, private http: HttpClient) {
    this.indexChannels();
  }

  public getChannel(id: string): Channel {
    return this.channelById.get(id);
  }

  public listChannels(type: string): Channel[] {
    return this.channelsByType.get(type) || [];
  }

  public getIntegration(app: App, channel: Channel, require?: boolean): Observable<Integration> {
    return this.http.get<Integration>(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}?require=${require || false}`), RequestUtils.getJsonOptions()).pipe(
      map((data: Integration) => data ? new Integration(data) : null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public updateIntegration(app: App, channel: Channel, configuration: any): Observable<Integration> {
    return this.http.put<Integration>(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), configuration, RequestUtils.getJsonOptions()).pipe(
      map((data: Integration) => new Integration(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public removeIntegration(app: App, channel: Channel): Observable<void> {
    return this.http.delete(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/${channel.id}`), RequestUtils.getJsonOptions()).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public listFacebookPages(app: App): Observable<FacebookPage[]> {
    return this.http.get<FacebookPage[]>(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/messenger/pages`), RequestUtils.getJsonOptions()).pipe(
      map((data: FacebookPage[]) => {
        const pages: FacebookPage[] = [];
        data.forEach((page: any) => {
          pages.push(new FacebookPage(page));
        });
        return pages;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public createSlackChannel(app: App, channel: string): Observable<SlackChannel> {
    return this.http.post<SlackChannel>(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/slack/channels`), {channel}, RequestUtils.getJsonOptions()).pipe(
      map((data: SlackChannel) => new SlackChannel(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  public listSlackChannels(app: App): Observable<SlackChannel[]> {
    return this.http.get<SlackChannel[]>(RequestUtils.getApiUrl(`/apps/${app.id}/integrations/slack/channels`), RequestUtils.getJsonOptions()).pipe(
      map((data: SlackChannel[]) => {
        const channels: SlackChannel[] = [];
        data.forEach((channel: SlackChannel) => {
          channels.push(new SlackChannel(channel));
        });
        return channels;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return _throw(apiError);
      })
    );
  }

  private indexChannels(): void {
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
