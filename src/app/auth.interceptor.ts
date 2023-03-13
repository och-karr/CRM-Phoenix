import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, switchMap, take} from 'rxjs';
import {AccessTokenService} from "./services/context/access-token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _accessTokenService: AccessTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._accessTokenService.get().pipe(
      take(1),
      switchMap((token: string | null) => {
        const updatedRequest: HttpRequest<any> = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })

        return next.handle(updatedRequest);
      })
    )
  }
}
