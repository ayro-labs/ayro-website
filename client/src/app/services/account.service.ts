import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {Account} from 'app/models/account.model';
import {EventService} from 'app/services/event.service';
import {ApiError} from 'app/services/commons/api.error';
import {RequestUtils} from 'app/utils/request.utils';
import {StorageUtils} from 'app/utils/storage.utils';

interface LoginResult {
  token: string;
  account: Account;
}

@Injectable()
export class AccountService {

  constructor(private eventService: EventService, private http: HttpClient) {

  }

  public createAccount(name: string, email: string, password: string): Observable<Account> {
    return this.http.post<Account>(RequestUtils.getApiUrl('/accounts'), {name, email, password}, RequestUtils.getJsonOptions()).pipe(
      map((data: Account) => new Account(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateAccount(data: any): Observable<Account> {
    return this.http.put<Account>(RequestUtils.getApiUrl('/accounts'), data, RequestUtils.getJsonOptions()).pipe(
      map((accountData: Account) => new Account(accountData)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public updateAccountLogo(logo: File): Observable<Account> {
    const formData = new FormData();
    formData.append('logo', logo);
    return this.http.put<Account>(RequestUtils.getApiUrl('/accounts/logo'), formData, RequestUtils.getOptions()).pipe(
      map((data: Account) => new Account(data)),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public login(email: string, password: string): Observable<Account> {
    return this.http.post<LoginResult>(RequestUtils.getApiUrl('/accounts/login'), {email, password}, RequestUtils.getJsonOptions()).pipe(
      map((data: LoginResult) => {
        StorageUtils.setApiToken(data.token);
        return new Account(data.account);
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public logout(): Observable<void> {
    return this.http.post(RequestUtils.getApiUrl('/accounts/logout'), null, RequestUtils.getJsonOptions()).pipe(
      map(() => {
        StorageUtils.removeApiToken();
        return null;
      }),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }

  public getAuthenticatedAccount(): Observable<Account> {
    return this.http.get<Account>(RequestUtils.getApiUrl('/accounts/authenticated'), RequestUtils.getJsonOptions()).pipe(
      map((data: Account) => data ? new Account(data) : null),
      catchError((err: HttpErrorResponse) => {
        const apiError = ApiError.withResponse(err);
        this.eventService.publish(EventService.EVENT_API_ERROR, apiError);
        return throwError(apiError);
      })
    );
  }
}
