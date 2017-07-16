import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {RequestUtil} from '../utils/request.util';

@Injectable()
export class AppService {

  constructor(private http: Http) {

  }

  public listApps(): Observable<any> {
    return this.http.get('/apps', RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => res.json())
      .catch((err: Response) => err.json());
  }

  public createApp(name: string): Observable<any> {
    return this.http.post('/apps', {name}, RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => res.json())
      .catch((err: Response) => err.json());
  }
}
