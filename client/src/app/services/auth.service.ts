import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private options: RequestOptions;

  constructor(private http: Http) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    this.options = new RequestOptions({headers});
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post('/auth/accounts', {email, password}, this.options)
      .map((res: Response) => res.json())
      .catch((err: Response) => err.json());
  }
}
