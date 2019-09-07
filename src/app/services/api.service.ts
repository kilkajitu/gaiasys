import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';

import {Observable} from 'rxjs';

import {httpOptions} from '../common/headers';

/* TODO: PUSH ALL REDUNDANT CODE TO ONE FUNCTION AND CALL IT */

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }
  /* Wrapper to convert to http params */
  toHttpParams(params) {
    return Object.getOwnPropertyNames(params)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }

  /** GET  from the server . Pass params*/
  get<T>(url: string, paramsObj: any): Observable<T[]> {
    const headerJson = {
      'Content-Type': 'application/json'
    }
    if (this.tokenService.getToken()) {
      headerJson['token'] = this.tokenService.getToken();
    } else {
      this.tokenService.setUpOnLogin(null);
      return;
    }
    if (paramsObj == null) {
      paramsObj = {};
    }
    const headers = new HttpHeaders(headerJson);

    const options = {headers: headers, params: this.toHttpParams(paramsObj)};
    if (paramsObj) {

      return this.http.get<T[]>(url, options);
    } else {
      return this.http.get<T[]>(url);
    }
  }

  //////// Save methods //////////

  /** POST: */
  post<T>(url: string, body: T): Observable<any> {
    const headerJson = {
      'Content-Type': 'application/json'
    }

    if (this.tokenService.getToken()) {
      headerJson['token'] = this.tokenService.getToken();
    } else {
      this.tokenService.setUpOnLogin(null);
      return;
    }
    const headers = new HttpHeaders(headerJson);

    const options = {headers: headers};
    return this.http.post<T>(url, body, options)

  }

  loginPost<T>(url: string, body: T): Observable<any> {

    return this.http.post<T>(url, body, httpOptions)

  }

  /** DELETE: delete  from the server */
  delete<T>(url, paramsObj): Observable<{}> {

    const headerJson = {
      'Content-Type': 'application/json'
    }

    if (this.tokenService.getToken()) {
      headerJson['token'] = this.tokenService.getToken();
    } else {
      this.tokenService.setUpOnLogin(null);
      return;
    }
    const headers = new HttpHeaders(headerJson);

    const options = {headers: headers, params: this.toHttpParams(paramsObj)};
    return this.http.delete(url, options)

  }

  /** PUT: update  on the server. Returns the updated record upon success. */
  put<T>(url: string, body: Object): Observable<T> {

    const headerJson = {
      'Content-Type': 'application/json'
    }

    if (this.tokenService.getToken()) {
      headerJson['token'] = this.tokenService.getToken();
    } else {
      this.tokenService.setUpOnLogin(null);
      return;
    }
    const headers = new HttpHeaders(headerJson);

    const options = {headers: headers};

    return this.http.put<T>(url, body, options)

  }
}
