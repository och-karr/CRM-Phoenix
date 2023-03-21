import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, take, tap, throwError} from 'rxjs';
import {RefreshTokenService} from "./services/context/refresh-token.service";
import {UserService} from "./services/user.service";
import {LoggedService} from "./services/context/logged.service";

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private _refreshTokenService: RefreshTokenService, private _userService: UserService, private _loggedService: LoggedService) {}

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
              );
            })
          )
        }

        return throwError(() => e)
      })
    );
  }

}
