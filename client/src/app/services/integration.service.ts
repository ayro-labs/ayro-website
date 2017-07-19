import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {Channel} from 'app/models/channel.model';

import * as channelsData from 'app/services/data/channels.json';

@Injectable()
export class IntegrationService {

  public listChannels(type: string): Observable<Channel[]> {
    return Observable.create((observer: Observer<Channel[]>) => {
      const channels: Channel[] = [];
      channelsData[type].forEach((channelData: any) => {
        channels.push(new Channel(channelData));
      });
      observer.next(channels);
    });
  }
}
