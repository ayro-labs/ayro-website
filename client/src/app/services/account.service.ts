import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Account} from 'app/models/account.model';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';

@Injectable()
export class AccountService {

  constructor(private http: Http) {

  }

  public getAuthenticatedAccount(): Observable<Account> {
    return this.http.get(RequestUtils.getApiUrl('/accounts/authenticated'), RequestUtils.newOptionsWithAppToken())
      .map((res: Response) => new Account(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public createAccount(name: string, email: string, password: string): Observable<Account> {
    return this.http.post(RequestUtils.getApiUrl('/accounts'), {name, email, password}, RequestUtils.newOptionsWithAppToken())
      .map((res: Response) => new Account(res.json()))
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }
}
