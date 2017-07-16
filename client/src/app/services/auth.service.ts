import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {RequestUtil} from '../utils/request.util';
import {StorageUtil} from '../utils/storage.util';

@Injectable()
export class AuthService {

  constructor(private http: Http) {

  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post('/auth/accounts', {email, password}, RequestUtil.newOptions())
      .map((res: Response) => {
        const result = res.json();
        StorageUtil.setApiToken(result.token);
        return result.account;
      })
      .catch((err: Response) => err.json());
  }
}
