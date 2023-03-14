import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, of, switchMap} from 'rxjs';
import {UserService} from "../../services/user.service";
import {AccessTokenService} from "../../services/context/access-token.service";

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private _userService: UserService, private _accessTokenService: AccessTokenService, private _router: Router) {
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this._accessTokenService.get().pipe(
      switchMap(token => {
        if (token !== null) {
          return this._userService.verify().pipe(
            map(data => {
              return data.data.user.context.email_verified ?
                true : this._router.parseUrl(activatedRoute.data['redirectUrl'])
            })
          )
        } else {
          if (activatedRoute.data['isLogin'] === true) {
            return of(true);
          } else {
            return of(this._router.parseUrl(activatedRoute.data['loginUrl']))
          }
        }
      })
    );
  }
}
