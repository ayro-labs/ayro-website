import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Account} from 'app/models/account.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {StorageUtils} from 'app/utils/storage.utils';

@Injectable()
export class AccountService {

  constructor(private eventService: EventService, private http: Http) {

  }

  public createAccount(name: string, email: string, password: string): Observable<Account> {
    return this.http.post(RequestUtils.getApiUrl('/accounts'), {name, email, password}, RequestUtils.getJsonOptions())
      .map((res: Response) => new Account(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public updateAccount(data: any): Observable<Account> {
    return this.http.put(RequestUtils.getApiUrl('/accounts'), data, RequestUtils.getJsonOptions())
      .map((res: Response) => new Account(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public updateAccountLogo(logo: File): Observable<Account> {
    const formData: FormData = new FormData();
    formData.append('logo', logo);
    return this.http.put(RequestUtils.getApiUrl('/accounts/logo'), formData, RequestUtils.getOptions())
      .map((res: Response) => new Account(res.json()))
      .catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public login(email: string, password: string): Observable<Account> {
    return this.http.post(RequestUtils.getApiUrl('/accounts/login'), {email, password}, RequestUtils.getJsonOptions())
      .map((res: Response) => {
        const result = res.json();
        StorageUtils.setApiToken(result.token);
        return new Account(result.account);
      }).catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public logout(): Observable<void> {
    return this.http.post(RequestUtils.getApiUrl('/accounts/logout'), null, RequestUtils.getJsonOptions())
      .map(() => {
        StorageUtils.removeApiToken();
        return null;
      }).catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }

  public getAuthenticatedAccount(): Observable<Account> {
    return this.http.get(RequestUtils.getApiUrl('/accounts/authenticated'), RequestUtils.getJsonOptions())
      .map((res: Response) => {
        const result = res.json();
        return result ? new Account(result) : null;
      }).catch((err: Response) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return Observable.throw(apiError);
      });
  }
}
