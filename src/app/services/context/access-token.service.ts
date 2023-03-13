import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {STORAGE} from "../storage";

@Injectable()
export class AccessTokenService {
  private _accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this._storage.getItem('accessToken'));

  constructor(@Inject(STORAGE) private _storage: Storage) {}

  get(): Observable<string | null> {
    return this._accessTokenSubject.asObservable();
  }

  set(token: string): void {
    this._storage.setItem('accessToken', token)
    this._accessTokenSubject.next(token);
  }

  remove(): void {
    this._storage.removeItem('accessToken')
    this._accessTokenSubject.next('');
  }
}
