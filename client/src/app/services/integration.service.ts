import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Channel} from 'app/models/channel.model';
import {Integration} from 'app/models/integration.model';
import {App} from 'app/models/app.model';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtil} from 'app/utils/request.util';

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

  public addAndroid(app: App, configuration: any): Observable<void> {
    return this.http.post(RequestUtil.getUrl(`/apps/${app.id}/integrations/android`), configuration, RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public addWeb(app: App, configuration: any): Observable<void> {
    return this.http.post(RequestUtil.getUrl(`/apps/${app.id}/integrations/website`), configuration, RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public addSlack(app: App, configuration: any): Observable<void> {
    return this.http.post(RequestUtil.getUrl(`/apps/${app.id}/integrations/slack`), configuration, RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => new App(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  private indexChannels() {
    (channelsData[Integration.TYPE_CUSTOMER] as any[]).forEach((data) => {
      this.indexedChannels[data.id] = new Channel(data);
    });
    (channelsData[Integration.TYPE_BUSINESS] as any[]).forEach((data) => {
      this.indexedChannels[data.id] = new Channel(data);
    });
  }
}
