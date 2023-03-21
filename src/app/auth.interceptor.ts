import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, switchMap, take, tap} from 'rxjs';
import {AccessTokenService} from "./services/context/access-token.service";
import {LoggedService} from "./services/context/logged.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _accessTokenService: AccessTokenService, private _loggedService: LoggedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._accessTokenService.get().pipe(
      take(1),
      switchMap((token: string | null) => {
        const updatedRequest: HttpRequest<any> = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })

        return next.handle(updatedRequest).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              if (event.status === 200 || event.status === 201 || event.status === 204) {
                this._loggedService.set(true);
              } else {
                this._loggedService.set(false);
              }
            }
          })
        );
      })
    )
  }
}
