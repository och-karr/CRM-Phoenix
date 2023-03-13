import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {UserService} from "../../services/user.service";

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this._userService.verify().pipe(
      map(data => {
        return data.data.user.context.email_verified ?
          true : this._router.parseUrl(activatedRoute.data['redirectUrl'])
      })
    )
  }
}
