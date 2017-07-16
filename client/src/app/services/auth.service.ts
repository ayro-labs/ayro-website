import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Account} from '../models/account.model';
import {RequestUtil} from '../utils/request.util';
import {StorageUtil} from '../utils/storage.util';
import {ApiError} from './commons/api.error';

@Injectable()
export class AuthService {

  constructor(private http: Http) {

  }

  public login(email: string, password: string): Observable<Account> {
    return this.http.post(RequestUtil.getUrl('/auth/accounts'), {email, password}, RequestUtil.newOptions())
      .map((res: Response) => {
        const result = res.json();
        StorageUtil.setApiToken(result.token);
        return new Account(result.account);
      })
      .catch((err: Response) => Observable.throw(new ApiError(err)));
  }
}
