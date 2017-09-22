import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import {Account} from 'app/models/account.model';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {StorageUtils} from 'app/utils/storage.utils';

@Injectable()
export class AuthService {

  constructor(private http: Http) {

  }

  public signIn(email: string, password: string): Observable<Account> {
    return this.http.post('/auth/accounts', {email, password}, RequestUtils.newJsonOptions())
      .map((res: Response) => {
        const result = res.json();
        StorageUtils.setApiToken(result.token);
        return new Account(result.account);
      })
      .catch((err: Response) => Observable.throw(ApiError.withResponse(err)));
  }

  public signOut(): Observable<any> {
    return this.http.delete('/auth/accounts', RequestUtils.newJsonOptions())
      .map((res: Response) => res.json())
      .catch(() => Observable.empty());
  }
}
