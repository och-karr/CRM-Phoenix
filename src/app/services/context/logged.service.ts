import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {STORAGE} from "../storage";

@Injectable()
export class LoggedService {
  private _loggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._storage.getItem('isLogged') === 'true');

  constructor(@Inject(STORAGE) private _storage: Storage) {}

  get(): Observable<boolean> {
    return this._loggedSubject.asObservable();
  }

  set(isLogged: boolean): void {
    this._storage.setItem('isLogged', isLogged.toString())
    this._loggedSubject.next(isLogged);
  }

  remove(): void {
    this._storage.removeItem('isLogged')
    this._loggedSubject.next(false);
  }
}

