import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, switchMap, tap} from 'rxjs';
import {AccessTokenService} from "./context/access-token.service";
import {RefreshTokenService} from "./context/refresh-token.service";
import {RoleService} from "./context/role.service";
import {LoggedService} from "./context/logged.service";

@Injectable()
export class UserService {
  constructor(private _httpClient: HttpClient, private _accessTokenService: AccessTokenService, private _refreshTokenService: RefreshTokenService, private _roleService: RoleService, private _loggedService: LoggedService) {
  }

  login(data: any): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', data).pipe(
      tap(val => {
        console.log(val)
        this._accessTokenService.set(val.data.accessToken);
        this._refreshTokenService.set(val.data.refreshToken);
      })
    );
  }

  register(data: any): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/register', data);
  }

  logout(): void {
    this._accessTokenService.remove();
    this._refreshTokenService.remove();
    this._roleService.remove();
    this._loggedService.remove();
  }

  verify(): Observable<any> {
    return this._httpClient.get<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/me').pipe(
      tap(val => {
        console.log(val)
        console.log(val.data.user.context.role);
        this._roleService.set(val.data.user.context.role);
      })
    );
  }

  refresh(token: string | null): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/refresh', {
        data: {
          refreshToken: token,
        },
      }).pipe(
      tap(val => {
        console.log(val)
      }),
      switchMap((credentials: any) => {
        const accessToken = credentials.data.accessToken;
        const refreshToken = credentials.data.refreshToken;
        this._accessTokenService.set(accessToken);
        this._refreshTokenService.set(refreshToken);

        return of(credentials);
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
