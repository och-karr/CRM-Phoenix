import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {STORAGE} from "../storage";

@Injectable()
export class RoleService {
  private _roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this._storage.getItem('role'));

  constructor(@Inject(STORAGE) private _storage: Storage) {}

  get(): Observable<string | null> {
    return this._roleSubject.asObservable();
  }

  set(role: string): void {
    this._storage.setItem('role', role)
    this._roleSubject.next(role);
  }

  remove(): void {
    this._storage.removeItem('role')
    this._roleSubject.next('');
  }
}
