import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {RequestUtil} from '../utils/request.util';

@Injectable()
export class AccountService {

  constructor(private http: Http) {

  }

  public createAccount(name: string, email: string, password: string): Observable<any> {
    return this.http.post('/accounts', {name, email, password}, RequestUtil.newOptionsWithAppToken())
      .map((res: Response) => res.json())
      .catch((err: Response) => err.json());
  }
}
