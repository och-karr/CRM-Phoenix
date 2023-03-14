import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {UserService} from "../../services/user.service";

@Injectable()
export class HasBioGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._userService.getBio().pipe(
      map(data => {
        return !data ?
          true : this._router.parseUrl(activatedRoute.data['hasBioUrl'])
      }),
      catchError((err) => {
        if (err.status === 404) {
          return of(true);
        } else {
          return of(this._router.parseUrl(activatedRoute.data['hasBioUrl']))
        }
      })
    )
  }
}
