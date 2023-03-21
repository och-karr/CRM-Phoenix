import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {STORAGE} from "../storage";

@Injectable()
export class RefreshTokenService {
  private _refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this._storage.getItem('refreshToken'));

  constructor(@Inject(STORAGE) private _storage: Storage) {}

  get(): Observable<string | null> {
    return this._refreshTokenSubject.asObservable();
  }

  set(token: string): void {
    this._storage.setItem('refreshToken', token)
    this._refreshTokenSubject.next(token);
  }

  remove(): void {
    this._storage.removeItem('refreshToken')
    this._refreshTokenSubject.next('');
  }
}
