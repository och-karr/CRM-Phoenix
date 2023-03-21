import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, switchMap, take, throwError} from 'rxjs';
import {RefreshTokenService} from "./services/context/refresh-token.service";
import {UserService} from "./services/user.service";

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private _refreshTokenService: RefreshTokenService, private _userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 403 && e.error.message === 'Token is invalid') {
          return this._refreshTokenService.get().pipe(
            take(1),
            switchMap((token: string | null) => {
              return this._userService.refresh(token).pipe(
                switchMap((credentials) => {
                  const updatedRequest: HttpRequest<any> = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${credentials.data.accessToken}`
                    }
                  });

                  return next.handle(updatedRequest);
                })
              );
            })
          )
        }

        return throwError(() => e)
      })
    );
  }

}
