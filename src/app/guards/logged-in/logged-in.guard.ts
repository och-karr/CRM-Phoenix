import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {LoggedService} from "../../services/context/logged.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _loggedService: LoggedService, private _router: Router) {
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._loggedService.get().pipe(
      map(isLogged => {
        return !isLogged ?
          true : this._router.parseUrl(activatedRoute.data['loggedUrl'])
      })
    )
  }
}
