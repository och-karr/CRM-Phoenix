import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {RoleService} from "../../services/context/role.service";

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private _roleService: RoleService, private _router: Router) {
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._roleService.get().pipe(
      map(role => {
        return role === 'admin' ?
          true : this._router.parseUrl(activatedRoute.data['loginUrl'])
      }),
      catchError((err) => {
        if (err.status === 404) {
          return of(true);
        } else {
          return of(this._router.parseUrl(activatedRoute.data['loginUrl']))
        }
      })
    )
  }
}
