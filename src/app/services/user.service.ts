import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AccessTokenService} from "./context/access-token.service";

@Injectable()
export class UserService {
  constructor(private _httpClient: HttpClient, private _accessTokenService: AccessTokenService) {
  }

  login(data: any): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', data).pipe(
      tap(val => {
        console.log(val)
        this._accessTokenService.set(val.data.accessToken);
      })
    );
  }

  register(data: any): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/register', data);
  }

  verify(): Observable<any> {
    return this._httpClient.get<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/me').pipe(
      tap(val => {
        console.log(val)
      })
    );
  }

  getBio(): Observable<any> {
    return this._httpClient.get<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/my-bio').pipe(
      tap(data => console.log(data))
    );
  }

  addBio(data: any): Observable<void> {
    return this._httpClient.post<void>('https://us-central1-courses-auth.cloudfunctions.net/auth/add-bio', data);
  }
}
